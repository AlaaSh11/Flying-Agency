const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const errorHandler = require('./src/middleware/error.middleware');

dotenv.config();

const authRoutes = require('./src/routes/auth.routes');
const flightsRoutes = require('./src/routes/flights.routes');
const bookingsRoutes = require('./src/routes/bookings.routes');
const surveillanceRoutes = require('./src/routes/surveillance.routes');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});
app.use(limiter);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/flights', flightsRoutes);
app.use('/api/v1/destinations', flightsRoutes);
app.use('/api/v1/bookings', bookingsRoutes);
app.use('/api/v1/surveillance', surveillanceRoutes);
app.use('/api/v1/users', require('./src/routes/user.routes'));
app.use('/api/v1/vip', require('./src/routes/vip.routes'));
app.use('/api/v1/chrono', require('./src/routes/chrono.routes'));

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./src/routes/auth.routes');
const flightsRoutes = require('./src/routes/flights.routes');
const bookingsRoutes = require('./src/routes/bookings.routes');
const surveillanceRoutes = require('./src/routes/surveillance.routes');

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});
app.use(limiter);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/flights', flightsRoutes);
app.use('/api/v1/destinations', flightsRoutes); // Map destinations to the same router as flights
app.use('/api/v1/bookings', bookingsRoutes);
app.use('/api/v1/surveillance', surveillanceRoutes);
app.use('/api/v1/users', require('./src/routes/user.routes'));
app.use('/api/v1/vip', require('./src/routes/vip.routes'));
app.use('/api/v1/chrono', require('./src/routes/chrono.routes'));

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

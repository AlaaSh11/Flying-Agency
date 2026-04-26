export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('unauthorized'));
    return null;
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    // Always return the JSON body — let the caller check for .error
    return response.json();
  }
  
  if (!response.ok) {
    throw new Error('API Error');
  }
  return response.text();
};


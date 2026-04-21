export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`http://localhost:5000${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    // If the window is available, trigger custom event or reload/redirect
    window.dispatchEvent(new Event('unauthorized'));
    return null;
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'API Error');
    }
    return response.json();
  }
  
  if (!response.ok) {
    throw new Error('API Error');
  }
  return response.text();
};

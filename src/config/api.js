const API_BASE_URL = 'https://tutamklmuhammad-pavelsbd6-production.up.railway.app';

// Helper function for handling API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    // Parse error message from response if possible
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    } catch (e) {
      throw new Error(`Error: ${response.status}`);
    }
  }
  
  return response.json();
};

// Login
export const login = async (email, password) => {
    const response = await fetch(
        `${API_BASE_URL}/user/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    
    return handleResponse(response);
};

// Register
export const register = async (userData) => {
    const { name, email, password } = userData;
    const response = await fetch(
        `${API_BASE_URL}/user/register?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    
    return handleResponse(response);
};

// Get All Item
export const getAllItems = async () => {
  const response = await fetch(`${API_BASE_URL}/item/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return handleResponse(response);
};
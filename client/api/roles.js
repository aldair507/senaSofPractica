import axios from 'axios';

export const getRoles = async () => {
  try {
    const response = await axios.get('/api/roles'); // Adjust the API endpoint as per your server setup
    return response.data; // Assuming the response.data contains an array of roles
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error; // Propagate the error so it can be handled where getRoles is called
  }
};

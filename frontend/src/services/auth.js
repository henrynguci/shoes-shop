import axiosClient from './api';

const authService = {
  login: async (username, password) => {
    try {
      const response = await axiosClient.post('/login', {
        username,
        password,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default authService;

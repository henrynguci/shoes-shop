import axiosClient from "./api"

export const authService = {
  login: async (username, password) => {
    try {
      const response = await axiosClient.post('/login', {
        username: username,
        password: password
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
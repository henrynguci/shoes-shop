import axiosClient from "./api"

export const cartService = {
  get: async(Account_ID) => {
    try {
      return await axiosClient.get('/cart', {
        Account_ID: Account_ID
      })
    } catch (error) {
      console.log(error)
    }
  },
  add: async(Account_ID, Product_ID, Color, Size, Amount, Price) => {
    try {
      const response = await axiosClient.post('/cart', {
        Account_ID: Account_ID,
        Product_ID: Product_ID,
        Size: Size,
        Color: Color,
        Amount: Amount,
        Price: Price
      })
      return response
    } catch(error){
      console.log(error)
    }
  },
  detele: async (Account_ID, Product_ID, Color, Size) => {
    try {
      const response = await axiosClient.delete('/cart', {
        Account_ID: Account_ID,
        Product_ID: Product_ID,
        Size: Size,
        Color: Color,
      })
      return response
    } catch(error) {
      console.log(error)
    }
  }
}
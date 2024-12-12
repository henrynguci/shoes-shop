import axiosClient from "./api"

export const productService = {
  getAll: async() => {
    try {
      return await axiosClient.get('/products')
    } catch(error) {
      console.log(error)
    }
  },
  getDetail: async(id) => {
    try {
      const response = await axiosClient.get(`/products/`+id, {
        params: {
          id: id
        }
      })
      return  response
    } catch (error) {
      console.log(error)
    }
  },
  add: async(Product, Version) => {
    try {
      const response = await axiosClient.post('/products', {
        Product: Product,
        Version: Version
      })
      return response
    } catch (error) {
      console.log(error)
    }
  },
  update: async(id, Name, Description, Brand_ID, Gift_ID) => {
    try {
      return await axiosClient.post(`/product/`+id, {
        Name: Name,
        Description: Description,
        Brand_ID: Brand_ID,
        Gift_ID: Gift_ID
      }, {
        params: {
          id: id
        },
      })
    } catch (error) {
      console.log(error)
    }
  },
  delete: async(id) => {
    try {
      return await axiosClient.delete(`/products/`+id, {
        params: {
          id: id
        }
      })
    } catch(error){
      console.log(error)
    }
  }
}
import axiosClient from './api';
/* về kiểu dữ liệu của orderInfo và oderProduct
orderInfo: {
  Voucher_ID: string | null
} ko có thì để null chứ đừng để trống nó lỗi

oderProduct: []{
  Product_ID: string
  Color: string
  Size: string
  Price: string
  Quantity: string
}
*/
export const orderService = {
  checkout: async (Account_ID, orderInfo, orderProduct) => {
    try {
      const response = await axiosClient.post('/checkout', {
        Account_ID: Account_ID,
        orderInfo: orderInfo,
        orderProduct: orderProduct,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

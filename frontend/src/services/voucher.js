import axiosClient from './api';

export const voucherService = {
  get: async (Account_ID) => {
    try {
      return await axiosClient.get(`/voucher`, {
        Account_ID: Account_ID,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

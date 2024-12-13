import * as authService from '../services/auth.service.js';

export const login = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    console.log({ Username, Password });
    const account = await authService.getAccountByUsername(Username);
    if (!account.Password) {
      res.status(404).json({ message: 'Username or password are incorrect!' });
    } else if (authService.comparePassword(Password, account.Password)) {
      res.status(200).json({
        message: 'Login successfully!',
        data: { Account_ID: account.Account_ID, role: account.Role },
      });
    } else {
      res.status(404).json({ message: 'Username or password are incorrect!' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

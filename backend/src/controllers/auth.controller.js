import * as authService from '../services/auth.service.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const account = await authService.getAccountByUsername(username);
    if (!account.Password) {
      res.status(404).json({ message: 'Username or password are incorrect!' });
    } else if (authService.comparePassword(password, account.Password)) {
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

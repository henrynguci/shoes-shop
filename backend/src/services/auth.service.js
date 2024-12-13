import sql from 'mssql';
import bcrypt from 'bcryptjs';

export const getAccountByUsername = async (username) => {
  const request = new sql.Request();
  const result = request
    .input('Username', sql.VarChar(50), username)
    .execute('getAccountByUsername');
  return result.recordset[0];
};

export const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

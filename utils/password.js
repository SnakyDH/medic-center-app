import bcrypt from 'bcrypt';

export const encrypt = async (data) => {
  return await bcrypt.hash(data, 10);
};
export const checkPass = async (data, encrypted) => {
  return await bcrypt.compare(data, encrypted);
};

import bcrypt from 'bcrypt';

export const encrypt = async (data) => {
  return await bcrypt.hash(data, 10);
};
export const compare = async (data, encrypted) => {
  bcrypt.compare(data, encrypted, (err, data) => {
    if (err) {
      throw err;
    }
    if (data) {
      return true;
    } else {
      return false;
    }
  });
};

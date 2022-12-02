import bcrypt from 'bcrypt';

export const encrypt = async (data) => {
  return await bcrypt.hash(data, 10);
};
export const comp = async (data, encrypted) => {
  bcrypt.compare(data, encrypted, (err, data) => {
    //if error than throw error
    if (err) throw err;
    //if both match than you can do anything
    if (data) {
      return true;
    } else {
      return false;
    }
  });
};

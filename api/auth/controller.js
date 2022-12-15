export const verifyLogin = async (req, res, next) => {
  try {
    const aUser = req.user;
    if (!aUser) {
      res.status(401).json({ message: 'Incorrect Credentials' });
    } else {
      res.status(200).json({
        id: aUser.cc,
        name: aUser.name,
        role: aUser.role,
      });
    }
  } catch (error) {
    console.log('ESTOY EN EL ERRROR :C');
    next(error);
  }
};

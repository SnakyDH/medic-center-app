import Recovery from './services.js';
const recovery = new Recovery();
export const getQuestion = async (req, res) => {
  try {
    const { cc } = req.params;
    const data = await recovery.findOne(cc);
    if (data.rowCount !== 0) {
      const info = {
        cc: data.rows[0].cc_user,
        question: data.rows[0].question,
      };
      res.status(200).json(info);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
  }
};

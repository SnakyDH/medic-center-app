import Recovery from './services.js';
import { checkPass } from '../../utils/password.js';
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
export const validateAnswer = async (req, res) => {
  try {
    const { cc, answer } = req.body;
    const dataDB = await recovery.findOne(cc);
    let answerDB = dataDB.rows[0].answer;
    const isMatch = await checkPass(answer, answerDB);
    if (isMatch) {
      res.status(200).json({ message: 'Correct answer' });
    } else {
      res.status(401).json({ message: 'Wrong answer' });
    }
  } catch (error) {
    console.error(error);
  }
};

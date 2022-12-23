import History from './services.js';

const history = new History();
export const getMedicalHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await history.findOne(id);
    if (data.rowCount === 0) {
      res.status(404).json({ message: 'Medical History not found' });
    }
    res.status(200).send(data.rows);
  } catch (error) {
    console.error(error);
  }
};

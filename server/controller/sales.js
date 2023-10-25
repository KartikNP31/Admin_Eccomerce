import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
  try {

    const overallStats = await OverallStat.find();

    if (!overallStats) {
      return res.status(404).json({ message: 'Sales not found' });
    }
    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

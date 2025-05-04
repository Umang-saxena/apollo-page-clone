import Doctor from '../../models/Doctor';
import connectDB from '../../lib/connectDB';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const doctorData = req.body;

      // Create new doctor document
      const newDoctor = new Doctor(doctorData);
      await newDoctor.save();

      res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
    } catch (error) {
      res.status(400).json({ message: 'Error adding doctor', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

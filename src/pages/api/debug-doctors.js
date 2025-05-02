import connectDB from '@/lib/connectDB';
import Doctor from '@/models/Doctor';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await connectDB();
            const doctors = await Doctor.find({});
            console.log('Doctors:', doctors); // logs to terminal
            return res.status(200).json(doctors);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            return res.status(500).json({ error: 'Error fetching doctors' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

import connectDB from '../../lib/connectDB'
import Doctor from '../../models/Doctor' // Adjust the path as necessary
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Connect to the database
            await connectDB();

            // Extract filters and pagination parameters from req.query
            const {
                experience,
                fees,
                languages,
                consultMode,
                availability,
                sortBy,
                page = '1',
                limit = '8',
            } = req.query;

            const filters = {
                experience,
                fees,
                languages,
                consultMode,
                availability,
                sortBy,
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
            };

            // Build the query object based on filters
            let query = {};

            // Filter by experience (range-based, e.g., '5-10 years')
            if (filters.experience) {
                const [minExperience, maxExperience] = filters.experience.split('-').map(Number);
                query['experience.years'] = { $gte: minExperience, $lte: maxExperience };
            }

            // Filter by fees
            if (filters.fees) {
                const [minFees, maxFees] = filters.fees.split('-').map(Number);
                query['fees'] = { $gte: minFees, $lte: maxFees };
            }

            // Filter by languages
            if (filters.languages) {
                const languagesArray = filters.languages.split(',');
                query['languages'] = { $in: languagesArray };
            }

            // Filter by consultMode
            if (filters.consultMode) {
                const modeArray = filters.consultMode.split(',');
                query['modeOfConsult'] = { $in: modeArray };
            }

            // Filter by availability
            if (filters.availability) {
                query['availability'] = filters.availability;
            }

            // Paginate the results
            const skip = (filters.page - 1) * filters.limit;

            // Sorting based on the sortBy parameter
            let sort = {};
            if (filters.sortBy === 'experience') {
                sort['experience.years'] = 1;
            } else if (filters.sortBy === 'fees') {
                sort['fees'] = 1;
            } else if (filters.sortBy === 'rating') {
                sort['rating.percentage'] = -1; // Sort by rating in descending order
            }

            // Query the database to get the doctors with the specified filters and pagination
            const doctors = await Doctor.find(query)
                .sort(sort)
                .skip(skip)
                .limit(filters.limit)
                .lean();

            // Get the total count of doctors for pagination
            const totalDoctors = await Doctor.countDocuments(query);

            // Calculate total pages for pagination
            const totalPages = Math.ceil(totalDoctors / filters.limit);

            // Return the results with pagination details
            res.status(200).json({
                doctors,
                totalDoctors,
                totalPages,
                currentPage: filters.page,
            });
        } catch (error) {
            console.error('Error fetching doctors:', error);
            res.status(500).json({
                error: 'Failed to fetch doctors',
            });
        }
    } else {
        // Handle other HTTP methods (if necessary)
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

import connectDB from 'lib/connectDB';
import Doctor from 'models/Doctor';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Connect to the database
            await connectDB();

            // Extract filters and pagination parameters from the query
            const { searchParams } = new URL(req.url, 'http://localhost'); // Add the base URL to request.url for Node.js
            const filters = {
                experience: searchParams.get('experience'),
                fees: searchParams.get('fees'),
                languages: searchParams.get('languages'),
                consultMode: searchParams.get('consultMode'),  // Changed from modeOfConsult to consultMode
                availability: searchParams.get('availability'),
                sortBy: searchParams.get('sortBy'),
                page: parseInt(searchParams.get('page') || '1'),  // Get page number, default to 1
                limit: parseInt(searchParams.get('limit') || '8'), // Get limit, default to 8
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

            // Filter by consultMode (was modeOfConsult)
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

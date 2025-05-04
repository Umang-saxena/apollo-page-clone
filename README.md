# Apollo Clone Project

## Overview
This project is a Next.js application that provides a platform to consult general physicians online. It includes a frontend built with React components and backend API routes to fetch doctor data with filtering capabilities.

## Running the Project
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Usage

### List Doctors with Filters

**Endpoint:**
```
GET /api/list-doctor-with-filter
```

**Query Parameters:**

| Parameter    | Description                                  | Example                  |
|--------------|----------------------------------------------|--------------------------|
| page         | Page number for pagination (default: 1)     | `1`                      |
| limit        | Number of doctors per page (default: 8)     | `8`                      |
| consultMode  | Filter by consultation mode (comma separated)| `online,offline`         |
| experience   | Filter by years of experience (comma separated)| `5,10`                 |
| fees         | Filter by fees range (comma separated)       | `100,200`                |
| languages    | Filter by languages spoken (comma separated) | `English,Hindi`           |
| facilities   | Filter by facilities available (comma separated)| `X-ray,Pharmacy`       |

**Sample Request using curl:**

```bash
curl "http://localhost:3000/api/list-doctor-with-filter?page=1&limit=8&consultMode=online&experience=5&fees=100&languages=English&facilities=X-ray"
```

**Sample Request using Postman:**

1. Open Postman.
2. Create a new GET request.
3. Enter the URL:
   ```
   http://localhost:3000/api/list-doctor-with-filter
   ```
4. In the "Params" tab, add the following key-value pairs as query parameters:
   - `page`: `1`
   - `limit`: `8`
   - `consultMode`: `online`
   - `experience`: `5`
   - `fees`: `100`
   - `languages`: `English`
   - `facilities`: `X-ray`
5. Click "Send" to make the request.
6. You should see a JSON response with the list of doctors matching the filters.

**Sample Response:**

```json
{
  "doctors": [
    {
      "_id": "1234567890abcdef",
      "name": "Dr. John Doe",
      "speciality": "General Physician",
      "experience": 5,
      "consultMode": "online",
      "fees": 100,
      "languages": ["English", "Hindi"],
      "facilities": ["X-ray", "Pharmacy"]
    }
    // more doctor objects
  ],
  "totalPages": 5
}
```

## Testing the API

You can test the API endpoint using tools like curl, Postman, or your browser by sending GET requests with appropriate query parameters as shown above.

## Notes

- Ensure your backend server is running before making API requests.
- The frontend uses the API to fetch and display doctors with filters applied.
- For any issues or contributions, please open an issue or pull request.

---
Apollo Clone Project © 2024

# Setup Instructions

## Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd project-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `project-backend` directory with:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/podcast-project
   ```

   Or if using MongoDB Atlas:

   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/podcast-project?retryWrites=true&w=majority
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

## Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Issues Fixed

1. **API Endpoint Mismatch**: Fixed proxy configuration from port 8000 to 5000
2. **CreateProjectModal Error**: Updated to use proper API calls instead of local storage
3. **Undefined User Email**: Added validation to prevent API calls with undefined parameters
4. **Better Error Handling**: Enhanced backend error responses for debugging

## Database Requirements

Make sure MongoDB is running locally on port 27017, or update the `MONGO_URI` in your `.env` file to point to your MongoDB instance.

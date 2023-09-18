# Contact Management Application

This is a Contact Management Application that allows you to manage and interact with your contacts. It provides both a backend server built with Express.js for handling API requests and a frontend application built with React for user interaction.

## Features

- Display a list of contacts with their names, phone numbers, and email addresses.
- Create a new contact with name, phone number, and email address.
- Update an existing contact.
- Delete a contact.
- Search for contacts by name.
- Sort contacts by name or other relevant criteria.
- Export contacts in csv format
- Utilizes MongoDB for database storage.
- Utilizes Redis for caching to improve performance.

## Technologies Used

- Backend:

  - Express.js - A Node.js web application framework for building the server.
  - MongoDB - A NoSQL database for storing contact information.
  - Mongoose - An ODM (Object Data Modeling) library for MongoDB.
  - Redis - An in-memory data store used for caching contact data.

- Frontend:
  - React - A JavaScript library for building user interfaces.
  - Axios - A promise-based HTTP client for making API requests.
  - React Router - For handling routing in the React application.
  - Tailwind CSS - A utility-first CSS framework for styling.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB server running locally or on a remote server.
- Redis server running locally or on a remote server.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Sanjeev85/contact-manager.git
   ```

2. Navigate to the project directory:

   ```bash
   cd contact-management-app
   ```

3. Install the backend and frontend dependencies:

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

4. Start the MongoDB and Redis servers if they're not running.

5. Start the backend and frontend:

   ```bash
   # Start the backend server
   cd ../backend
   npm start

   # Start the frontend development server
   cd ../frontend
   npm dev
   ```

6. Open your browser and access the application at http://localhost:5173/.

## API Endpoints

- GET `/api/contacts` - Retrieve all contacts (Cached using Redis).
- GET `/api/contacts/:id` - Retrieve a specific contact by ID (Cached using Redis).
- POST `/api/contacts` - Create a new contact.
- PUT `/api/contacts/:id` - Update an existing contact.
- DELETE `/api/contacts/:id` - Delete a contact.

## Database Storage with MongoDB

- This application uses MongoDB as the database for storing contact information. You can configure the MongoDB connection in the backend/server.js file.

## Caching with Redis

- This application utilizes Redis for caching contact data to improve performance. Contact data retrieved from the backend API is cached in Redis, and subsequent requests for the same data are served from the cache, reducing the load on the MongoDB database.

## Usage

1. Launch the application and navigate to the home page.

2. You can view your list of contacts, add new contacts, edit existing contacts, and delete contacts.

3. Use the search bar to search for contacts by name.

4. Sort contacts using the sorting options provided.

5. Export all contacts in csv format

---

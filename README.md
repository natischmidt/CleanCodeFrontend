# Clean Code Project - Frontend

Welcome to the Clean Code Project - Frontend! 
This TypeScript-based frontend is designed to seamlessly integrate with the Clean Code backend,
providing a user-friendly interface for customers, employees, and admins. 
This project utilizes modern web technologies to deliver an efficient and responsive user experience.

## Features

- **User-Friendly Interface:** Intuitive and responsive design for easy navigation.
- **Booking Management:** Convenient tools for managing bookings.
- **Integration with Backend:** Connects seamlessly with the Clean Code backend for a complete solution.

## Prerequisites

Before running the Clean Code frontend, make sure you have the following installed:

- Node.js and npm (Node Package Manager)

## Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/clean-code-frontend.git
   ```

2. **Install Dependencies:**
   ```bash
   cd clean-code-frontend
   npm install
   ```

3. **Configure Backend Connection:**
   Update the `src/environments/environment.ts` file with the appropriate backend API URL.

   ```typescript
   // environment.ts

   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8080/api', // Update with your backend API URL
   };
   ```

4. **Run the Application:**
   ```bash
   npm start
   ```

## Configuration

Update the `environment.ts` file to configure the backend connection and other environment-specific settings.

```typescript
// environment.ts

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api', // Update with your backend API URL
};
```

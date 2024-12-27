User Registration Form - React App
This is a simple User Registration Form built with React that allows users to create an account. The form validates the user input, ensures the email is from a valid domain, and the password meets minimum security standards. After a successful registration, users are redirected to the login page.

Features
Email Validation: Ensures that the user enters an email from @gmail.com or @yahoo.com.
Password Validation: Ensures that the password is at least 8 characters long.
Loading State: Displays a loading spinner when the registration request is being processed.
Error Handling: Displays specific error messages for invalid inputs or API errors.
Success Message: Displays a success message and redirects the user to the login page after successful registration.
Responsive Design: The form is responsive and adjusts to both mobile and desktop views.
Technologies Used
Frontend: React, CSS
Backend (Assumed): Node.js, Express (or any backend of your choice)
API Communication: Axios for making HTTP requests
State Management: React hooks (useState, useEffect)
Installation
1. Clone the Repository
Clone the repository to your local machine:

bash
Copy code

2. Install Frontend Dependencies
Navigate to the frontend project directory and install the necessary dependencies:

bash
Copy code
cd registration-form-react
npm install
3. Run the React App
Start the React development server:

bash
Copy code
npm start
The app should now be running on http://localhost:3000.

4. Backend Setup (Optional)
This project assumes there is a backend running at http://localhost:8000.
 .

Book Search Engine



Description



The Book Search Engine application is a full-stack MERN application that allows users to search for books using the Google Books API and save their favorite searches. This project was originally built with a RESTful API, and has now been refactored to utilize a GraphQL API built with Apollo Server. The back-end is implemented with Node.js, Express.js, MongoDB, and the front-end is powered by React.



With Apollo Server and GraphQL, this application provides efficient data fetching and enables a more flexible and scalable API structure. Authentication is handled via JSON Web Tokens, and the app connects to a MongoDB database to save user data.



Table of Contents



	•	Installation

	•	Usage

	•	Features

	•	Technologies Used

	•	Screenshots

	•	Deployment

	•	License



Installation



	1.	Clone the repository:



git clone <repository-url>





	2.	Navigate to the project directory:



cd <project-directory>





	3.	Install dependencies for both the server and client:



npm install

cd client

npm install

cd ..





	4.	Set up environment variables in a .env file, including MongoDB connection URI and any API keys if required.

	5.	Start the development server:



npm run develop







Usage



	•	Book Search: Enter a book title in the search bar to retrieve data from the Google Books API.

	•	Save Books: Logged-in users can save their favorite books to their account.

	•	View Saved Books: Access a personalized list of saved books, with options to remove books.

	•	Authentication: Users can sign up, log in, and manage their saved books after authentication.



Features



	•	GraphQL API: Replaced RESTful API with Apollo Server, enabling efficient data fetching through GraphQL queries and mutations.

	•	Apollo Client Integration: The front-end is connected to the Apollo Server using Apollo Client, allowing real-time GraphQL requests.

	•	Authentication Middleware: Updated middleware to support authentication with GraphQL, enabling secure user sessions.

	•	MongoDB Database: Utilizes MongoDB to store user accounts and saved book information.

	•	Responsive UI: User-friendly interface with intuitive navigation.



Technologies Used



	•	Front-End: React, Apollo Client

	•	Back-End: Node.js, Express.js, Apollo Server, GraphQL

	•	Database: MongoDB (MongoDB Atlas)

	•	Authentication: JSON Web Tokens (JWT)

	•	Deployment: Render



Screenshots



Include screenshots of the application here to showcase the UI and functionality.



Deployment



The application is live and can be accessed at the following link:



	•	Render Deployment: Book Search Engine on Render



License



This project is licensed under the MIT License.



Instructions for Submission



When submitting this assignment, make sure to include:



	•	The GitHub repository URL with the application code and README file.

	•	The live Render deployment link.



This README template provides clear documentation for users and meets professional standards. Just replace <repository-url> with the URL of your GitHub repository and <Render Deployment Link> with the live link after deployment. Let me know if you’d like more specific sections or additional details!
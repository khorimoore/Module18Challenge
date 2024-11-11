import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import './App.css';
// GraphQL query to get the current user
const GET_USER = gql`
  query Me {
    me {
      username
      email
      savedBooks {
        title
        author
      }
    }
  }
`;

const App: React.FC = () => {
  // Execute the GET_USER query to get user data
  const { loading, error, data } = useQuery(GET_USER);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="app-container">
      <header>
        <h1>Welcome to the Book Search App, {data.me.username}!</h1>
        <nav>
          {/* Navigation Links */}
          <Link to="/" style={{ marginRight: '10px' }}>Search Books</Link>
          <Link to="/saved">Saved Books</Link>
        </nav>
      </header>

      <main>
        <h2>Your Profile</h2>
        <p>Email: {data.me.email}</p>

        <h3>Your Saved Books</h3>
        <ul>
          {/* Render saved books */}
          {data.me.savedBooks.length > 0 ? (
            data.me.savedBooks.map((book: any, index: number) => (
              <li key={index}>
                <strong>{book.title}</strong> by {book.author}
              </li>
            ))
          ) : (
            <p>No saved books yet.</p>
          )}
        </ul>

        {/* Outlet for child routes */}
        <Outlet />
      </main>

      <footer>
        <p>&copy; 2023 Book Search App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
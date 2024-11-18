import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.js'
import Home from './pages/Home.js'
import Error from './pages/Error.js'
import Landing from './pages/Landing.js'
import Login from './pages/Login.js'
import SignUp from './pages/SignUp.js'
import DiscussionPage from './pages/DiscussionPage.js'
import ClubPage from './pages/ClubPage.js'
import BookPage from './pages/Book.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: "/profile",
      //   element: <Profile />,
      // },
      {
        path: "/discussion/:id",
        element: <DiscussionPage />
      },
      {
        path: "/club/:id",
        element: <ClubPage />
      },
      {
        path: "/book/:id",
        element: <BookPage />
      }
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import Post from "./pages/Post.jsx";
import { AuthLayer } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayer authentication>
            <Home />
          </AuthLayer>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayer authentication={false}>
            <Login />
          </AuthLayer>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayer authentication={false}>
            <Register />
          </AuthLayer>
        ),
      },
      {
        path: "/create-post",
        element: (
          <AuthLayer authentication>
            <AddPost />
          </AuthLayer>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayer authentication>
            <AllPosts />
          </AuthLayer>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayer authentication>
            <EditPost />
          </AuthLayer>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <AuthLayer authentication>
            <Post />
          </AuthLayer>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

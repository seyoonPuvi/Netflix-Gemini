import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./loginPage/Login";
import Browse from "./browsePage/Browse";
import MovieDetails from "./movieDetailsPage/MovieDetails";
import NotFound from "./NotFound";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/movie/:movieId",
      element: <MovieDetails />,
    },
    {
      path: "*", // This will match all unmatched routes
      element: <NotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

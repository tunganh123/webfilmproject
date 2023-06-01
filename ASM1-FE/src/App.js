import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Browse /> },
    { path: "/search", element: <Search /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

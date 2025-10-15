import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./store/store";
import { Provider } from "react-redux";

import App from "./App";
import Home from "./routes/Home"; 
import MangaDetail from "./routes/MangaDetail"; 
import SeasonalManga from "./routes/SeasonalManga";
import Favorites from "./routes/Favorites"; 
import About from "./routes/About"; 


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> }, 
      { path: "manga/:id", element: <MangaDetail /> }, 
      { path: "seasonal", element: <SeasonalManga /> },
      { path: "favorites", element: <Favorites /> }, 
      { path: "about", element: <About /> }, 
      
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

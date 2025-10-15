// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// ไฟล์ CSS หลักของโปรเจกต์
import "./styles/index.css";

// React Router สำหรับจัดการ route
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Redux store และ Provider
import { store } from "./store/store";
import { Provider } from "react-redux";

// Component หลักและหน้าในแอป
import App from "./App";
import Home from "./routes/Home"; // หน้าแรก
import MangaDetail from "./routes/MangaDetail"; // หน้ารายละเอียดมังงะ
import Favorites from "./routes/Favorites"; // หน้ามังงะโปรด
import About from "./routes/About"; // หน้าเกี่ยวกับ

// สร้าง Router สำหรับกำหนดเส้นทาง
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> }, // หน้า Home
      { path: "manga/:id", element: <MangaDetail /> }, // รายละเอียดมังงะ :id คือ parameter
      { path: "favorites", element: <Favorites /> }, // หน้ามังงะโปรด
      { path: "about", element: <About /> }, // หน้าเกี่ยวกับ
    ],
  },
]);

// Render แอปลงใน root element
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

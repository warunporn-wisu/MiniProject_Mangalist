import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"; 

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 container mx-auto">
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-center p-4 mt-4">
        © 2025 My Manga App
      </footer>
    </div>
  );
}

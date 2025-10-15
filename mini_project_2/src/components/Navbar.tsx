// Import Link และ NavLink จาก react-router-dom
// NavLink เป็นเวอร์ชันพิเศษของ Link ที่สามารถจัดสไตล์ตามสถานะ active (หน้าปัจจุบัน) ได้
import { Link, NavLink } from "react-router-dom";

// Component สำหรับแสดงผลแถบเมนู (Navbar)
export default function Navbar() {
  return (
    // ใช้ navbar component จาก DaisyUI
    // sticky top-0 z-50 ทำให้ navbar ติดอยู่ด้านบนสุดของจอเสมอเมื่อ scroll
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      {/* ส่วนด้านซ้ายของ Navbar (flex-1 จะดันส่วนที่เหลือไปทางขวา) */}
      <div className="flex-1">
        {/* Link ไปยังหน้าแรก แสดงเป็นชื่อเว็บ */}
        <Link to="/" className="btn btn-ghost text-xl">Mangalist</Link>
      </div>
      {/* ส่วนด้านขวาของ Navbar */}
      <div className="flex-none gap-2">
        {/* NavLink จะเพิ่ม class "active" อัตโนมัติเมื่อ URL ตรงกับ to prop */}
        <NavLink to="/" className="btn btn-ghost">Home</NavLink>
        <NavLink to="/favorites" className="btn btn-ghost">Favorites</NavLink>
        <NavLink to="/about" className="btn btn-ghost">About</NavLink>
      </div>
    </div>
  );
}
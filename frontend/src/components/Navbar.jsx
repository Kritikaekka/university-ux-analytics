import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="flex justify-between items-center">
        
        <h1 className="text-2xl font-bold">
          UX Analytics
        </h1>

        <div className="flex gap-6">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>

          <Link to="/feedback" className="hover:text-gray-200">
            Feedback
          </Link>

          <Link to="/dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">

      <div className="w-64 bg-gray-900 text-white p-6">

        <h1 className="text-2xl font-bold mb-8">
          Designer Portal
        </h1>

        <div className="flex flex-col gap-4">

          <Link to="/admin/dashboard">
            Dashboard
          </Link>

          <Link to="/admin/reviews">
            Reviews
          </Link>

          <Link to="/admin/analytics">
            Analytics
          </Link>

        </div>

      </div>

      <div className="flex-1 bg-gray-100 p-8">

        <Outlet />

      </div>

    </div>
  );
}

export default AdminLayout;
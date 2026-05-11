import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div>

      <nav className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">
          University Feedback Portal
        </h1>
      </nav>

      <Outlet />

    </div>
  );
}

export default UserLayout;
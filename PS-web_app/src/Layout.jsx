import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |
        <Link to="/booking"> Booking</Link>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

export default Layout
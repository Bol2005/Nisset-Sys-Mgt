import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-dark bg-gradient"
      style={{ backgroundColor: "#0d6efd" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          Student System Management
        </Link>
      </div>
    </nav>
  );
}

import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const { users, setUsers } = useContext(UserContext);
  const navigate = useNavigate();

  // generate a stable preview id: next number after highest existing id
  const [previewId] = useState(() => {
    const maxId =
      users && users.length ? Math.max(...users.map((u) => Number(u.id))) : 0;
    return maxId + 1;
  });

  const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });
  const [error, setError] = useState("");

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  const submit = (e) => {
    e.preventDefault();
    if (!user.firstName || !user.lastName || !user.email) {
      setError("All fields are required!");
      return;
    }
    setUsers([...users, { ...user, id: previewId }]);
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">Add New Nisset</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label">ID</label>
                  <input
                    className="form-control"
                    value={previewId}
                    readOnly
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    name="firstName"
                    value={user.firstName}
                    className="form-control"
                    placeholder="Enter first name"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    name="lastName"
                    value={user.lastName}
                    className="form-control"
                    placeholder="Enter last name"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={user.email}
                    className="form-control"
                    placeholder="Enter email"
                    onChange={onChange}
                  />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success flex-grow-1">
                    Add Nisset
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

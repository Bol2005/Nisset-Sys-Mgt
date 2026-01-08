import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, setUsers } = useContext(UserContext);

  const [user, setUser] = useState(users.find((u) => u.id === Number(id)));

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h3>Edit Nisset</h3>
      <form onSubmit={submit}>
        <input
          name="firstName"
          value={user.firstName}
          className="form-control mb-2"
          onChange={onChange}
        />
        <input
          name="lastName"
          value={user.lastName}
          className="form-control mb-2"
          onChange={onChange}
        />
        <input
          name="email"
          value={user.email}
          className="form-control mb-2"
          onChange={onChange}
        />
        <button className="btn btn-primary">Update Nisset</button>
      </form>
    </div>
  );
}

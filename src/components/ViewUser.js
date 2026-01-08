import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function ViewUser() {
  const { id } = useParams();
  const { users } = useContext(UserContext);
  const user = users.find((u) => u.id === Number(id));

  return (
    <div className="container mt-4">
      <h3>Nisset Details</h3>
      <p>
        <b>ID:</b> {user.id}
      </p>
      <p>
        <b>First Name:</b> {user.firstName}
      </p>
      <p>
        <b>Last Name:</b> {user.lastName}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

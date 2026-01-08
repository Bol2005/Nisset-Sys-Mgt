import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { users, setUsers } = useContext(UserContext);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const openViewModal = (user) => {
    setSelectedUser(user);
    setViewModal(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    setEditModal(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    setUsers(
      users.map((u) =>
        u.id === selectedUser.id ? { ...u, ...editFormData } : u
      )
    );
    setEditModal(false);
  };

  const handleDeleteConfirm = () => {
    // remove selected user then renumber remaining IDs sequentially
    const remaining = users.filter((u) => u.id !== selectedUser.id);
    const renumbered = remaining.map((u, idx) => ({ ...u, id: idx + 1 }));
    setUsers(renumbered);
    setDeleteModal(false);
  };

  return (
    <div className="container mt-5">
      <style>{`
        .glass-btn {
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .glass-btn:hover {
          backdrop-filter: blur(20px);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
      `}</style>
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="fw-bold text-primary">Nisset Management</h2>
        </div>
        <div className="col-md-4 text-end">
          <Link className="btn btn-success glass-btn" to="/add">
            + Add New Nisset
          </Link>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-info text-center py-5">
          <h5>
            No Nissets found. <Link to="/add">Add one now!</Link>
          </h5>
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover mb-0">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id}>
                  <td>{i + 1}</td>
                  <td>
                    <span className="badge bg-secondary">{u.id}</span>
                  </td>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>{u.email}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-light btn-sm me-2 glass-btn"
                      onClick={() => openViewModal(u)}
                      style={{ color: "#000" }}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-primary btn-sm me-2 glass-btn"
                      onClick={() => openEditModal(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm glass-btn"
                      onClick={() => openDeleteModal(u)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      {viewModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-info">
                <h5 className="modal-title text-white">Nisset Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {selectedUser && (
                  <>
                    <p>
                      <strong>ID:</strong> {selectedUser.id}
                    </p>
                    <p>
                      <strong>First Name:</strong> {selectedUser.firstName}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {selectedUser.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedUser.email}
                    </p>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setViewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-warning">
                <h5 className="modal-title">Edit Nisset</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  name="firstName"
                  value={editFormData.firstName}
                  className="form-control mb-3"
                  placeholder="First Name"
                  onChange={handleEditChange}
                />
                <input
                  name="lastName"
                  value={editFormData.lastName}
                  className="form-control mb-3"
                  placeholder="Last Name"
                  onChange={handleEditChange}
                />
                <input
                  name="email"
                  value={editFormData.email}
                  className="form-control mb-3"
                  placeholder="Email"
                  onChange={handleEditChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={handleEditSubmit}
                >
                  Update Nisset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger">
                <h5 className="modal-title text-white">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete{" "}
                  <strong>
                    {selectedUser?.firstName} {selectedUser?.lastName}
                  </strong>
                  ?
                </p>
                <p className="text-muted">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

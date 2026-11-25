import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function AdminUsersPage() {
  const { users, setUserStatus, notify } = useApp();
  const [query, setQuery] = useState('');
  const [detailsId, setDetailsId] = useState('');
  const filteredUsers = useMemo(() => users.filter((user) => (
    `${user.name} ${user.username} ${user.email}`.toLowerCase().includes(query.trim().toLowerCase())
  )), [users, query]);
  const detailsUser = filteredUsers.find((user) => user.id === detailsId);

  function toggleStatus(user) {
    const nextStatus = user.status === 'disabled' ? 'active' : 'disabled';
    if (setUserStatus(user.id, nextStatus)) {
      notify(`Account ${nextStatus === 'active' ? 'activated' : 'deactivated'}.`);
    }
  }

  return (
    <section className="container admin-section">
      <div className="section-page-header">
        <div>
          <span className="section-tag">Account Administration</span>
          <h1 className="section-title">User Management</h1>
          <p className="section-subtitle">Search user accounts, inspect account details, and manage access.</p>
        </div>
      </div>
      <div className="admin-table-toolbar">
        <input
          className="form-control"
          aria-label="Search users"
          placeholder="Search by name, username, or email..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="table-responsive-wrapper">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Username</th><th>Email</th><th>Status</th><th>Details</th><th>Account</th></tr></thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.status === 'disabled' ? 'Disabled' : 'Active'}</td>
                <td><button className="btn btn-outline-dark btn-sm" onClick={() => setDetailsId(detailsId === user.id ? '' : user.id)}>{detailsId === user.id ? 'Hide' : 'View'}</button></td>
                <td>
                  <button
                    className={`btn ${user.status === 'disabled' ? 'btn-primary-green' : 'btn-outline-danger'} btn-sm`}
                    onClick={() => toggleStatus(user)}
                  >
                    {user.status === 'disabled' ? 'Activate' : 'Deactivate'}
                  </button>
                </td>
              </tr>
            ))}
            {detailsUser && (
              <tr className="user-details-row">
                <td colSpan="6">
                  <div><strong>{detailsUser.name}</strong><p>Email: {detailsUser.email}</p><p>Username: {detailsUser.username}</p><p>Account created: {detailsUser.createdAt || 'Date unavailable'}</p><p>Account status: {detailsUser.status === 'disabled' ? 'Disabled' : 'Active'}</p></div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!filteredUsers.length && <div className="empty-state-box">No users match your search.</div>}
    </section>
  );
}

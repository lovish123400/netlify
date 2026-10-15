
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      <h2>My Application Dashboard</h2>

      {currentUser && (
        <div>
          <p>Welcome, {currentUser.email}!</p>

          {currentUser.photoURL && (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              width="100"
            />
          )}

          <p>{currentUser.displayName}</p>
          <p>UID: {currentUser.uid}</p>
          <p>
            Provider: {currentUser.providerData[0]?.providerId}
          </p>
        </div>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
}

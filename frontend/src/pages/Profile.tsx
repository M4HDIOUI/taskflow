import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/user";
import type { User } from "../api/user";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
        setMessage("");
      } catch {
        setMessage("Failed to fetch user. Are you logged in?");
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  };

  if (message) return <p>{message}</p>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

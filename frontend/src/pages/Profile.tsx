import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/user";
import type { User } from "../api/user";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch {
        setError("Failed to fetch user. Are you logged in?");
      }
    };
    fetchUser();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

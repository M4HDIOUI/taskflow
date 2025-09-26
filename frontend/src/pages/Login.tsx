import { useState } from "react";
import { loginUser } from "../api/user"; // make sure path is correct
import { useNavigate } from "react-router-dom"; // import useNavigate
import "./AuthForm.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // initialize navigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
        const data = await loginUser(username, password);

        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        navigate("/profile");
    } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
    else setError("Login failed. Try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

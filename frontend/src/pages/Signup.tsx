import { useState } from "react";
import { signup } from "../api/user";
import type { SignupData } from "../api/user";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const data: SignupData = { username, email, password };

    try {
      await signup(data);
      setMessage("Signup successful! You can now login.");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data) {
          setError(JSON.stringify(err.response.data));
        } else {
          setError(err.message);
        }
      } else {
        setError("Signup failed. Try again.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

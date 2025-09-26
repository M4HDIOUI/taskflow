import { useState } from "react";
import { login } from "../api/user";
import type { LoginData } from "../api/user";
import type { Tokens } from "../api/user";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const data: LoginData = { email, password };

    try {
      const res = await login(data);
      const tokens: Tokens = res.data;

      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);

      setEmail("");
      setPassword("");
      alert("Login successful!");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data) {
          setError(JSON.stringify(err.response.data));
        } else {
          setError(err.message);
        }
      } else {
        setError("Login failed. Try again.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

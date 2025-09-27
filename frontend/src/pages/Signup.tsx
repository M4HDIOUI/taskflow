import { useState } from "react";
import { registerUser } from "../api/user";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      console.log("Attempting to register user:", { username, email, password });
      const result = await registerUser(username, email, password);
      console.log("Registration successful:", result);
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: unknown) {
      console.error("Registration error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required 
          disabled={loading}
        />
        <input 
          placeholder="Email" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          disabled={loading}
        />
        <input 
          placeholder="Password" 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Signup"}
        </button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

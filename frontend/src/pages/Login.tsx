import { useState } from "react";
import { loginUser } from "../api/user";
import GoogleButton from "../components/GoogleButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Attempting to login with:", { email, password });
      const result = await loginUser(email, password);
      console.log("Login successful:", result);
      localStorage.setItem("access_token", result.access);
      localStorage.setItem("refresh_token", result.refresh);
      console.log("Tokens stored in localStorage");
      // Redirect to profile or show success message
      window.location.href = "/profile";
    } catch (err: unknown) {
      console.error("Login error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          {loading ? "Logging in..." : "Login"}
        </button>
        <div style={{ marginTop: 12 }}>
          <GoogleButton onSuccessRedirect="/profile" />
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}
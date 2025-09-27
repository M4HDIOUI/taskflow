import { useState } from "react";
import axios from "axios";

export default function TestAPI() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setResult("Testing...");
    
    try {
      console.log("Testing API connection...");
      
      // Test 1: Simple GET request
      const response = await axios.get("http://localhost:8000/api/auth/register/");
      console.log("GET response:", response.data);
      setResult("GET request successful: " + JSON.stringify(response.data));
    } catch (error: any) {
      console.error("API Error:", error);
      setResult("Error: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const testRegistration = async () => {
    setLoading(true);
    setResult("Testing registration...");
    
    try {
      console.log("Testing registration...");
      
      const response = await axios.post("http://localhost:8000/api/auth/register/", {
        username: "testuser",
        email: "test@example.com",
        password: "testpass123"
      });
      
      console.log("Registration response:", response.data);
      setResult("Registration successful: " + JSON.stringify(response.data));
    } catch (error: any) {
      console.error("Registration Error:", error);
      setResult("Registration Error: " + (error.response?.data?.error || error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>API Test Page</h2>
      <button onClick={testAPI} disabled={loading}>
        Test API Connection
      </button>
      <button onClick={testRegistration} disabled={loading} style={{ marginLeft: "10px" }}>
        Test Registration
      </button>
      <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
        <strong>Result:</strong>
        <pre>{result}</pre>
      </div>
    </div>
  );
}

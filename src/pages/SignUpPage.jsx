import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUpCustomer } from "../api/api";

export default function RegisterPage({ setCustomer }) {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(null);
    try {
      const response = await signUpCustomer(name, email, password);
      setCustomer(response.customer);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  const inputWrapStyle = {
    position: "relative",
    marginBottom: "14px"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px 12px 40px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "50px",
    fontSize: "14px",
    color: "white",
    outline: "none",
    boxSizing: "border-box",
    WebkitTextFillColor: "white"
  };

  const iconStyle = {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "16px",
    color: "rgba(255,255,255,0.5)"
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a237e 0%, #3949ab 40%, #7b1fa2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "16px",
        padding: "36px 32px",
        width: "100%",
        maxWidth: "340px"
      }}>

        {/* Title */}
        <h2 style={{
          color: "white", fontSize: "22px",
          fontWeight: "600", textAlign: "center",
          marginBottom: "6px"
        }}>
          Create Account
        </h2>
        <p style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "13px", textAlign: "center",
          marginBottom: "28px"
        }}>
          Join BookMyShow today
        </p>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(255,0,0,0.2)",
            color: "white", fontSize: "13px",
            padding: "10px 14px", borderRadius: "50px",
            marginBottom: "14px", textAlign: "center"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Name */}
        <div style={inputWrapStyle}>
          <span style={iconStyle}>👤</span>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Email */}
        <div style={inputWrapStyle}>
          <span style={iconStyle}>✉</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Password */}
        <div style={inputWrapStyle}>
          <span style={iconStyle}>🔒</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleRegister}
          style={{
            width: "100%", padding: "12px",
            background: "linear-gradient(90deg, #ff6f00, #ffa000)",
            border: "none", borderRadius: "50px",
            color: "white", fontSize: "14px",
            fontWeight: "700", letterSpacing: "1px",
            textTransform: "uppercase", cursor: "pointer",
            marginTop: "6px", marginBottom: "14px"
          }}
        >
          Sign Up
        </button>

        {/* Divider */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: "10px", marginBottom: "16px"
        }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.2)" }} />
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Login Link */}
        <p style={{ textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
          Already a member?{" "}
          <Link to="/login" style={{
            color: "#ffa000", fontWeight: "600", textDecoration: "none"
          }}>
            Login now
          </Link>
        </p>

      </div>
    </div>
  );
}
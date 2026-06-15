import { Link, useNavigate } from "react-router-dom";
import { logoutCustomer } from "../api/api";

export default function Navbar({ customer, setCustomer }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutCustomer();
      setCustomer(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getInitial = (email) => email?.charAt(0).toUpperCase();

  return (
    <nav style={{
      background: "#cc0000",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "56px",
      fontFamily: "sans-serif"
    }}>
      <Link to="/" style={{
        fontSize: "20px",
        fontWeight: "500",
        color: "white",
        textDecoration: "none"
      }}>
        BookMyShow
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Link to="/" style={{
          color: "rgba(255,255,255,0.9)",
          textDecoration: "none",
          fontSize: "14px",
          padding: "6px 12px",
          borderRadius: "6px"
        }}>
          Movies
        </Link>

        {customer ? (
          <>
            <Link to="/bookings" style={{
              color: "rgba(255,255,255,0.9)",
              textDecoration: "none",
              fontSize: "14px",
              padding: "6px 12px",
              borderRadius: "6px"
            }}>
              My Bookings
            </Link>

            <div style={{
              width: "1px", height: "20px",
              background: "rgba(255,255,255,0.3)",
              margin: "0 4px"
            }} />

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "30px", height: "30px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.25)",
                display: "flex", alignItems: "center",
                justifyContent: "center",
                fontSize: "13px", fontWeight: "500",
                color: "white"
              }}>
                {getInitial(customer.email)}
              </div>
              <span style={{ color: "white", fontSize: "14px" }}>
                {customer.email.split("@")[0]}
              </span>
            </div>

            <button onClick={handleLogout} style={{
              background: "transparent",
              color: "white",
              border: "1.5px solid rgba(255,255,255,0.7)",
              padding: "5px 14px",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer"
            }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <div style={{
              width: "1px", height: "20px",
              background: "rgba(255,255,255,0.3)",
              margin: "0 4px"
            }} />
            <Link to="/login" style={{
              background: "transparent",
              color: "white",
              border: "1.5px solid rgba(255,255,255,0.7)",
              padding: "5px 14px",
              borderRadius: "6px",
              fontSize: "14px",
              textDecoration: "none"
            }}>
              Login
            </Link>
            <Link to="/register" style={{
              background: "white",
              color: "#cc0000",
              padding: "6px 16px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              textDecoration: "none"
            }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
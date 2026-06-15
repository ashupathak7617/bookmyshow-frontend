import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getBookings } from "../api/api";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get("booking_id");

  const [status, setStatus] = useState("pending");
  const [booking, setBooking] = useState(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (!bookingId) return;

    const interval = setInterval(async () => {
      try {
        const data = await getBookings();
        const found = data.find(b => b.id === parseInt(bookingId));

        if (found) {
          setBooking(found);
          setStatus(found.status);

          if (found.status === "confirmed" || found.status === "paid") {
            clearInterval(interval);
          }
        }

        setAttempts(prev => {
          if (prev >= 10) {
            clearInterval(interval);
          }
          return prev + 1;
        });
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [bookingId]);

  // Loading State
  if (status === "pending" && attempts < 10) {
    return (
      <div style={{
        minHeight: "100vh", background: "#f2f2f2",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}>
        <div style={{
          background: "white", borderRadius: "8px",
          padding: "48px 40px", textAlign: "center",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)", maxWidth: "400px", width: "90%"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#222", marginBottom: "8px" }}>
            Payment Confirm Ho Raha Hai...
          </h2>
          <p style={{ fontSize: "13px", color: "#999" }}>
            Please wait, yeh kuch seconds mein ho jayega
          </p>
          <div style={{
            marginTop: "24px", height: "4px", background: "#f2f2f2",
            borderRadius: "2px", overflow: "hidden"
          }}>
            <div style={{
              height: "100%", background: "#cc0000",
              width: `${(attempts / 10) * 100}%`,
              transition: "width 0.5s ease"
            }} />
          </div>
        </div>
      </div>
    );
  }

  // Success State
  if (status === "confirmed" || status === "paid") {
    return (
      <div style={{
        minHeight: "100vh", background: "#f2f2f2",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}>
        <div style={{
          background: "white", borderRadius: "8px",
          padding: "48px 40px", textAlign: "center",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)", maxWidth: "440px", width: "90%"
        }}>
          {/* Success Icon */}
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            background: "#e8f5e9", display: "flex",
            alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px", fontSize: "36px"
          }}>
            ✅
          </div>

          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#222", marginBottom: "6px" }}>
            Booking Confirmed!
          </h1>
          <p style={{ fontSize: "13px", color: "#999", marginBottom: "28px" }}>
            Tumhari payment successful rahi 🎉
          </p>

          {/* Booking Details */}
          {booking && (
            <div style={{
              background: "#f9f9f9", borderRadius: "8px",
              padding: "20px", textAlign: "left", marginBottom: "24px"
            }}>
              {/* Red Header */}
              <div style={{
                background: "#cc0000", borderRadius: "6px",
                padding: "12px 16px", marginBottom: "16px"
              }}>
                <div style={{ fontSize: "16px", fontWeight: "700", color: "white" }}>
                  {booking.show?.movie?.name}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "2px" }}>
                  Booking #{booking.id}
                </div>
              </div>

              {/* Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: "#999" }}>Show Time</span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#222" }}>
                    {new Date(booking.show?.show_time).toLocaleString("en-IN", {
                      month: "short", day: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    })}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: "#999" }}>Seats</span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#222" }}>
                    {booking.seats?.map(s => s.seat_no).join(", ")}
                  </span>
                </div>

                <div style={{
                  display: "flex", justifyContent: "space-between",
                  borderTop: "1px dashed #eee", paddingTop: "10px", marginTop: "4px"
                }}>
                  <span style={{ fontSize: "12px", color: "#999" }}>Total Paid</span>
                  <span style={{ fontSize: "18px", fontWeight: "700", color: "#cc0000" }}>
                    ₹{booking.seats?.reduce((sum, s) => sum + s.price, 0)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => navigate("/bookings")}
              style={{
                flex: 1, padding: "12px",
                background: "#cc0000", color: "white",
                border: "none", borderRadius: "4px",
                fontSize: "14px", fontWeight: "700",
                cursor: "pointer"
              }}
            >
              My Bookings
            </button>
            <button
              onClick={() => navigate("/")}
              style={{
                flex: 1, padding: "12px",
                background: "white", color: "#333",
                border: "1px solid #ddd", borderRadius: "4px",
                fontSize: "14px", fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Timeout / Failed State
  return (
    <div style={{
      minHeight: "100vh", background: "#f2f2f2",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <div style={{
        background: "white", borderRadius: "8px",
        padding: "48px 40px", textAlign: "center",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)", maxWidth: "400px", width: "90%"
      }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#222", marginBottom: "8px" }}>
          Status Check Failed
        </h2>
        <p style={{ fontSize: "13px", color: "#999", marginBottom: "24px" }}>
          Payment hua hoga — My Bookings mein check karo
        </p>
        <button
          onClick={() => navigate("/bookings")}
          style={{
            width: "100%", padding: "12px",
            background: "#cc0000", color: "white",
            border: "none", borderRadius: "4px",
            fontSize: "14px", fontWeight: "700", cursor: "pointer"
          }}
        >
          My Bookings Dekho
        </button>
      </div>
    </div>
  );
}
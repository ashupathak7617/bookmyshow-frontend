import { useEffect, useState } from "react";
import { getBookings } from "../api/api";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings().then((data) => {
      setBookings(data);
    });
  }, []);

  const statusColor = (status) => {
    if (status === "paid") return { bg: "#e8f5e9", color: "#2e7d32", border: "#a5d6a7" };
    if (status === "cancelled") return { bg: "#fff0f0", color: "#cc0000", border: "#ffcccc" };
    return { bg: "#fff8e1", color: "#f57f17", border: "#ffe082" };
  };

  return (
    <div style={{
      background: "#f2f2f2",
      minHeight: "100vh",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      paddingBottom: "40px"
    }}>

      {/* Header */}
      <div style={{
        background: "white",
        padding: "16px 32px",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "18px", fontWeight: "700", color: "#222" }}>
            My Bookings
          </h1>
          <p style={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>
            Your movie booking history
          </p>
        </div>
        <div style={{
          background: "#f2f2f2",
          padding: "6px 14px",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "600",
          color: "#555"
        }}>
          {bookings.length} Bookings
        </div>
      </div>

      {/* Booking Cards */}
      <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {bookings.length === 0 && (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            color: "#999", fontSize: "15px"
          }}>
            No bookings found.
          </div>
        )}

        {bookings.map((booking) => {
          const totalPrice = booking.seats.reduce((sum, seat) => sum + seat.price, 0);
          const seatNos = booking.seats.map(seat => seat.seat_no).join(", ");
          const showTime = new Date(booking.show.show_time).toLocaleString("en-IN", {
            month: "short", day: "numeric",
            hour: "2-digit", minute: "2-digit"
          });
          const status = booking.status || "pending";
          const sc = statusColor(status);

          return (
            <div key={booking.id} style={{
              background: "white",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
            }}>

              {/* Card Header — Red Bar */}
              <div style={{
                background: "#cc0000",
                padding: "14px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <div style={{ fontSize: "17px", fontWeight: "700", color: "white" }}>
                    {booking.show.movie.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "2px" }}>
                    Booking #{booking.id}
                  </div>
                </div>
                <div style={{
                  background: "white",
                  color: sc.color,
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "capitalize"
                }}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: "16px 20px" }}>

                {/* Info Row */}
                <div style={{
                  display: "flex", gap: "32px",
                  flexWrap: "wrap",
                  borderBottom: "1px dashed #eee",
                  paddingBottom: "14px", marginBottom: "14px"
                }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Date & Time
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#222", marginTop: "4px" }}>
                      {showTime}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Show ID
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#222", marginTop: "4px" }}>
                      #{booking.show_id}
                    </div>
                  </div>
                </div>

                {/* Seats + Price Row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                      Seats
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {booking.seats.map(seat => (
                        <span key={seat.id} style={{
                          background: "#f5f5f5",
                          border: "1px solid #e0e0e0",
                          padding: "3px 10px",
                          borderRadius: "4px",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#333"
                        }}>
                          {seat.seat_no}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: "700", color: "#cc0000" }}>
                    ₹{totalPrice}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
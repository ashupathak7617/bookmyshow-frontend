import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeats, createBooking } from "../api/api";

export default function SeatsPage() {
  const { movieId, showId } = useParams();
  const [seats, setSeats]               = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [screenId, setScreenId]         = useState(null);
  const [bookedSeats, setBookedSeats]   = useState([]);
  const [error, setError]               = useState(null);

  useEffect(() => {
    getSeats(movieId, showId).then((data) => {
      setSeats(data.seats);
      setScreenId(data.show.screen_id);
      setBookedSeats(data.booked_seat_ids);
    });
  }, [movieId, showId]);

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const totalPrice = seats
    .filter(seat => selectedSeats.includes(seat.id))
    .reduce((sum, seat) => sum + seat.price, 0);

  const selectedSeatNos = seats
    .filter(seat => selectedSeats.includes(seat.id))
    .map(seat => seat.seat_no)
    .join(", ");

  const handleBooking = async () => {
    setError(null);
    try {
      const response = await createBooking({
        show_id: showId,
        seat_ids: selectedSeats
      });
      if (response.stripe_url) {
        window.location.href = response.stripe_url;
      }
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  const seatStyle = (isBooked, isSelected) => ({
    width: "38px", height: "34px",
    borderRadius: "6px 6px 3px 3px",
    border: isBooked
      ? "1px solid #e0e0e0"
      : isSelected
      ? "1px solid #cc0000"
      : "1px solid #a5d6a7",
    background: isBooked
      ? "#f5f5f5"
      : isSelected
      ? "#cc0000"
      : "#e8f5e9",
    color: isBooked
      ? "#bbb"
      : isSelected
      ? "white"
      : "#2e7d32",
    fontSize: "10px", fontWeight: "600",
    cursor: isBooked ? "not-allowed" : "pointer",
    display: "flex", alignItems: "center",
    justifyContent: "center"
  });

  return (
    <div style={{
      background: "#f2f2f2", minHeight: "100vh",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      paddingBottom: "80px"
    }}>

      {/* Header */}
      <div style={{
        background: "white", padding: "14px 32px",
        borderBottom: "1px solid #eee"
      }}>
        <h1 style={{ fontSize: "16px", fontWeight: "700", color: "#222" }}>
          Select Seats
        </h1>
        <p style={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>
          Choose your preferred seats
        </p>
      </div>

      {/* Screen */}
      <div style={{ padding: "24px 32px 8px", textAlign: "center" }}>
        <div style={{
          background: "linear-gradient(to bottom, #bbb, #eee)",
          height: "8px", borderRadius: "4px",
          maxWidth: "400px", margin: "0 auto 8px"
        }} />
        <div style={{
          fontSize: "11px", color: "#999",
          letterSpacing: "2px", textTransform: "uppercase"
        }}>
          Screen this way
        </div>
      </div>

      {/* Seats Grid */}
      {/* Seats Grid */}
      <div style={{ padding: "16px 32px" }}>
        {Array.from({ length: Math.ceil(seats.length / 16) }, (_, rowIndex) => {
          const rowSeats = seats.slice(rowIndex * 16, rowIndex * 16 + 16);
          const leftSeats  = rowSeats.slice(0, 8);
          const rightSeats = rowSeats.slice(8, 16);

          return (
            <div key={rowIndex} style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
              marginBottom: "6px"
            }}>

              {/* Left 8 Seats */}
              <div style={{ display: "flex", gap: "6px" }}>
                {leftSeats.map((seat) => {
                  const isBooked   = bookedSeats.includes(seat.id);
                  const isSelected = selectedSeats.includes(seat.id);
                  return (
                    <button
                      key={seat.id}
                      onClick={() => !isBooked && toggleSeat(seat.id)}
                      disabled={isBooked}
                      style={seatStyle(isBooked, isSelected)}
                    >
                      {seat.seat_no}
                    </button>
                  );
                })}
              </div>

              {/* Middle Space (Aisle) */}
              <div style={{ width: "32px" }} />

              {/* Right 8 Seats */}
              <div style={{ display: "flex", gap: "6px" }}>
                {rightSeats.map((seat) => {
                  const isBooked   = bookedSeats.includes(seat.id);
                  const isSelected = selectedSeats.includes(seat.id);
                  return (
                    <button
                      key={seat.id}
                      onClick={() => !isBooked && toggleSeat(seat.id)}
                      disabled={isBooked}
                      style={seatStyle(isBooked, isSelected)}
                    >
                      {seat.seat_no}
                    </button>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{
        display: "flex", justifyContent: "center",
        gap: "20px", padding: "8px 32px 16px", flexWrap: "wrap"
      }}>
        {[
          { bg: "#e8f5e9", border: "#a5d6a7", label: "Available" },
          { bg: "#cc0000", border: "#cc0000", label: "Selected"  },
          { bg: "#f5f5f5", border: "#e0e0e0", label: "Booked"    },
        ].map(item => (
          <div key={item.label} style={{
            display: "flex", alignItems: "center",
            gap: "6px", fontSize: "12px", color: "#555"
          }}>
            <div style={{
              width: "20px", height: "18px",
              borderRadius: "4px 4px 2px 2px",
              background: item.bg,
              border: `1px solid ${item.border}`
            }} />
            {item.label}
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div style={{
          margin: "0 32px 16px",
          background: "#fff0f0", color: "#cc0000",
          padding: "10px 14px", borderRadius: "4px",
          fontSize: "13px", border: "1px solid #ffcccc"
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Summary Bar */}
      <div style={{
        position: "sticky", bottom: 0,
        background: "white", borderTop: "1px solid #eee",
        padding: "14px 32px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: "12px"
      }}>
        <div style={{ display: "flex", gap: "24px" }}>
          <div>
            <div style={{ fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Selected
            </div>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "#222" }}>
              {selectedSeats.length} Seats
            </div>
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Total
            </div>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "#222" }}>
              ₹{totalPrice}
            </div>
          </div>
          {selectedSeatNos && (
            <div>
              <div style={{ fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Seats
              </div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#222" }}>
                {selectedSeatNos}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleBooking}
          disabled={selectedSeats.length === 0}
          style={{
            background: selectedSeats.length === 0 ? "#ccc" : "#cc0000",
            color: "white", border: "none",
            padding: "12px 32px", borderRadius: "4px",
            fontSize: "14px", fontWeight: "700",
            cursor: selectedSeats.length === 0 ? "not-allowed" : "pointer",
            textTransform: "uppercase", letterSpacing: "0.8px"
          }}
        >
          Proceed to Pay
        </button>
      </div>

    </div>
  );
}
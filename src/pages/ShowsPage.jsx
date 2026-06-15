import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getShows } from "../api/api";

export default function ShowsPage() {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading]   = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    getShows(movieId)
      .then(data => setTheaters(data.theaters))
      .catch(error => console.log("Shows API Error:", error))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) {
    return (
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "center", height: "60vh",
        fontSize: "16px", color: "#999",
        fontFamily: "sans-serif"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      background: "#f2f2f2", minHeight: "100vh",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>

      {/* Header */}
      <div style={{
        background: "white", padding: "16px 32px",
        borderBottom: "1px solid #eee"
      }}>
        <h1 style={{ fontSize: "18px", fontWeight: "700", color: "#222" }}>
          Select Show
        </h1>
        <p style={{ fontSize: "13px", color: "#999", marginTop: "2px" }}>
          Choose your preferred theater and time
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 32px" }}>

        {/* Legend */}
        <div style={{
          display: "flex", gap: "16px",
          marginBottom: "16px"
        }}>
          {[
            { color: "#2e7d32", label: "Available" },
            { color: "#e65100", label: "Fast Filling" },
            { color: "#bbb",    label: "Housefull" },
          ].map(item => (
            <div key={item.label} style={{
              display: "flex", alignItems: "center",
              gap: "6px", fontSize: "12px", color: "#666"
            }}>
              <div style={{
                width: "10px", height: "10px",
                borderRadius: "50%", background: item.color
              }} />
              {item.label}
            </div>
          ))}
        </div>

        {/* Theater Cards */}
        {theaters.map((theater) => (
          <div key={theater.id} style={{
            background: "white", borderRadius: "8px",
            marginBottom: "16px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            overflow: "hidden"
          }}>

            {/* Theater Header */}
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid #f5f5f5",
              display: "flex", alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{
                  fontSize: "15px", fontWeight: "700", color: "#222"
                }}>
                  {theater.name}
                </div>
                <div style={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>
                  {theater.address || "Indore"}
                </div>
              </div>
              <span style={{
                fontSize: "11px", background: "#e8f5e9",
                color: "#2e7d32", padding: "3px 10px",
                borderRadius: "4px", fontWeight: "600"
              }}>
                M-Ticket
              </span>
            </div>

            {/* Show Times */}
            <div style={{
              padding: "16px 20px",
              display: "flex", gap: "10px", flexWrap: "wrap"
            }}>
              {theater.shows.map((show) => (
                <Link
                  key={show.id}
                  to={`/movies/${movieId}/shows/${show.id}/seats`}
                  style={{ textDecoration: "none" }}
                >
                  <div style={{ textAlign: "center" }}>
                    <button style={{
                      padding: "8px 16px",
                      border: "1px solid #cc0000",
                      borderRadius: "4px",
                      color: "#cc0000",
                      fontSize: "13px", fontWeight: "600",
                      cursor: "pointer", background: "white"
                    }}>
                      {new Date(show.show_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </button>
                    <div style={{
                      fontSize: "11px", color: "#2e7d32", marginTop: "3px"
                    }}>
                      Available
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        ))}

        {/* No Shows */}
        {theaters.length === 0 && (
          <div style={{
            textAlign: "center", padding: "60px 0",
            color: "#999", fontSize: "15px"
          }}>
            No shows available
          </div>
        )}

      </div>
    </div>
  );
}
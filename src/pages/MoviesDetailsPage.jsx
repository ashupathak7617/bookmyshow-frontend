import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie } from "../api/api";

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovie(movieId)
      .then(data => setMovie(data))
      .catch(error => console.log("API Error:", error));
  }, [movieId]);

  if (!movie) {
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

  const colors = [
    "linear-gradient(135deg, #1a237e, #3949ab)",
    "linear-gradient(135deg, #b71c1c, #e53935)",
    "linear-gradient(135deg, #1b5e20, #43a047)",
    "linear-gradient(135deg, #4a148c, #8e24aa)",
  ];

  const bgColor = colors[movieId % colors.length];

  return (
    <div style={{
      background: "#f2f2f2", minHeight: "100vh",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>

      {/* Hero Section */}
      <div style={{
        background: bgColor,
        padding: "40px 32px",
        display: "flex",
        gap: "32px",
        alignItems: "flex-start",
        flexWrap: "wrap"
      }}>

        {/* Poster */}
        <div
          style={{
            width: "180px",
            minWidth: "180px",
            height: "260px",
            borderRadius: "8px",
            overflow: "hidden"
          }}
        >
          <img
            src={movie.image_url}
            alt={movie.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: "200px" }}>

          {/* Title */}
          <h1 style={{
            color: "white", fontSize: "28px",
            fontWeight: "700", marginBottom: "10px"
          }}>
            {movie.name}
          </h1>

          {/* Badges */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
            {["UA", "Hindi", "Action", "Drama"].map(tag => (
              <span key={tag} style={{
                padding: "4px 12px", borderRadius: "4px",
                fontSize: "12px", fontWeight: "600",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "rgba(255,255,255,0.9)"
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div style={{
            display: "flex", alignItems: "center",
            gap: "6px", marginBottom: "16px"
          }}>
            <span style={{ color: "#ffa000", fontSize: "16px" }}>★★★★☆</span>
            <span style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>8.2/10</span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>(2.4K votes)</span>
          </div>

          {/* Description */}
          <p style={{
            color: "rgba(255,255,255,0.8)", fontSize: "14px",
            lineHeight: "1.6", marginBottom: "24px", maxWidth: "500px"
          }}>
            An epic action drama that follows the journey of a fearless warrior
            who fights against all odds to protect his people and land.
          </p>

          {/* Book Button */}
          <Link
            to={`/movies/${movieId}/shows`}
            style={{
              background: "#cc0000", color: "white",
              border: "none", padding: "12px 32px",
              borderRadius: "4px", fontSize: "14px",
              fontWeight: "700", cursor: "pointer",
              textTransform: "uppercase", letterSpacing: "0.8px",
              textDecoration: "none", display: "inline-block"
            }}
          >
            Book Tickets
          </Link>
        </div>
      </div>

      {/* Details Section */}
      <div style={{ padding: "24px 32px" }}>
        <div style={{
          fontSize: "16px", fontWeight: "700", color: "#222",
          marginBottom: "16px", paddingBottom: "8px",
          borderBottom: "2px solid #cc0000",
          display: "inline-block"
        }}>
          Movie Details
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "16px", marginTop: "16px"
        }}>
          {[
            { label: "Language", value: "Hindi" },
            { label: "Genre", value: "Action, Drama" },
            { label: "Duration", value: "2h 35m" },
            { label: "Release Date", value: "Jun 2025" },
          ].map(item => (
            <div key={item.label} style={{
              background: "white", borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
            }}>
              <div style={{
                fontSize: "11px", color: "#999",
                textTransform: "uppercase",
                letterSpacing: "0.5px", marginBottom: "6px"
              }}>
                {item.label}
              </div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#222" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
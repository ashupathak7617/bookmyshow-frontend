import { useEffect, useState } from "react";
import { getMovies } from "../api/api";
import { Link } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMovies(search).then(data => setMovies(data));
  }, [search]);

  const colors = [
    "linear-gradient(135deg, #1a237e, #3949ab)",
    "linear-gradient(135deg, #b71c1c, #e53935)",
    "linear-gradient(135deg, #1b5e20, #43a047)",
    "linear-gradient(135deg, #4a148c, #8e24aa)",
    "linear-gradient(135deg, #e65100, #fb8c00)",
    "linear-gradient(135deg, #006064, #00acc1)",
  ];

  return (
    <div style={{ background: "#f2f2f2", minHeight: "100vh",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Search Hero */}
      <div style={{ background: "#cc0000", padding: "24px 32px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", position: "relative" }}>
          <span style={{
            position: "absolute", left: "16px", top: "50%",
            transform: "translateY(-50%)", fontSize: "18px", color: "#999"
          }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search for Movies, Events, Plays..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "13px 16px 13px 46px",
              border: "none", borderRadius: "6px",
              fontSize: "15px", color: "#222",
              background: "white", outline: "none",
              boxSizing: "border-box"
            }}
          />
        </div>
      </div>

      {/* Movies Grid */}
      <div style={{ padding: "24px 32px" }}>

        {/* Section Title */}
        <div style={{
          fontSize: "18px", fontWeight: "600", color: "#222",
          marginBottom: "16px", paddingBottom: "10px",
          borderBottom: "2px solid #cc0000",
          display: "inline-block"
        }}>
          Now Showing
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "20px",
          marginTop: "16px"
        }}>
          {movies.map((movie, index) => (
            <div key={movie.id} style={{
              background: "white",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              cursor: "pointer"
            }}>

              {/* Poster */}
              <div style={{
                width: "100%", height: "200px",
                background: colors[index % colors.length],
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "48px"
              }}>
                🎬
              </div>

              {/* Info */}
              <div style={{ padding: "10px 12px 4px" }}>
                <div style={{
                  fontSize: "13px", fontWeight: "600", color: "#222",
                  marginBottom: "4px",
                  whiteSpace: "nowrap", overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  {movie.name}
                </div>
                <div style={{ fontSize: "11px", color: "#888" }}>
                  Action, Drama
                </div>
                <div style={{
                  display: "inline-block",
                  background: "#fff3e0", color: "#e65100",
                  fontSize: "10px", fontWeight: "600",
                  padding: "2px 8px", borderRadius: "4px",
                  marginTop: "6px"
                }}>
                  Hindi
                </div>
              </div>

              {/* Book Button */}
              <Link
                to={`/movies/${movie.id}`}
                style={{
                  display: "block",
                  margin: "8px 12px 12px",
                  background: "#cc0000",
                  color: "white", border: "none",
                  borderRadius: "4px", padding: "7px",
                  fontSize: "12px", fontWeight: "600",
                  textAlign: "center", cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  textDecoration: "none"
                }}
              >
                Book Tickets
              </Link>

            </div>
          ))}
        </div>

        {/* No Results */}
        {movies.length === 0 && (
          <div style={{
            textAlign: "center", padding: "60px 0",
            color: "#999", fontSize: "15px"
          }}>
            No movies found
          </div>
        )}

      </div>
    </div>
  );
}
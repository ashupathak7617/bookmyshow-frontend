import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage";
import SeatsPage from "./pages/SeatsPage";
import MoviesDetailsPage from "./pages/MoviesDetailsPage";
import ShowsPage from "./pages/ShowsPage";
import LoginPage from "./pages/LoginPage";
import SuccessPage from "./pages/SuccessPage";
import BookingsPage from "./pages/BookingsPage"
import Navbar from "./components/Navbar";
import SignUpPage from "./pages/SignUpPage"
import { getCurrentCustomer } from "./api/api";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    getCurrentCustomer()
      .then((data) => {
        setCustomer(data.customer);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        customer={customer}
        setCustomer={setCustomer}
      />
      <Routes>
        <Route
          path="/"
          element={<MoviesPage />}
        />

        <Route
          path="/movies/:movieId"
          element={<MoviesDetailsPage />}
        />

        <Route
          path="/movies/:movieId/shows"
          element={
            <ProtectedRoute customer={customer}>
              <ShowsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movies/:movieId/shows/:showId/seats"
          element={<SeatsPage />}
        />

        <Route
          path="/login"
          element={<LoginPage setCustomer={setCustomer}/>}
        />

        <Route
          path="/register"
          element={<SignUpPage setCustomer={setCustomer}/>}
        />

        <Route
          path="/payment/success"
          element={<SuccessPage />}
        />

        <Route
          path="/bookings"
          element={<BookingsPage />}
        />
        <Route
          path="/movies/:movieId/shows/:showId/seats"
          element={
            <ProtectedRoute customer={customer}>
              <SeatsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
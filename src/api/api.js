import axios from "axios";

const api = axios.create({ baseURL: "https://bookmyshow-16pn.onrender.com", withCredentials: true,});

export const getMovies = (search = "") =>
  api.get(`/movies?search=${search}`)
     .then(res => res.data);

export const getMovie = (movieId) =>
  api.get(`/movies/${movieId}`).then(res => res.data);

export const getShows = (movieId) =>
  api.get(`/movies/${movieId}/shows`)
     .then(res => res.data);

export const getSeats = (movieId, showId) =>
  api.get(`/movies/${movieId}/shows/${showId}/seats`)
     .then(res => res.data);

export const createBooking = (data) =>
  api.post("/bookings", { booking: data }).then(res => res.data);

export const signIn = (email, password) =>
  api.post("/customers/sign_in", { customer: { email, password }}).then(r => r.data);

export const signUp = (name, email, password, password_confirmation) =>
  api.post("/customers", {customer: { name, email, password, password_confirmation }
  }).then(r => r.data);

export const loginCustomer = (email, password) =>
  api.post(
    "/customers/sign_in",
    {
      customer: {
        email,
        password
      }
    }
  ).then(r => r.data);

  export const logoutCustomer = () =>
  api.delete("/customers/sign_out");

  export const signUpCustomer = (name, email, password) =>
  api.post("/customers", {customer: { name, email, password }})

  export const getBookings = () =>
    api.get("/bookings").then(r => r.data);

  export const getCurrentCustomer =() =>
    api.get("/current_customer").then(r => r.data)

export default api;
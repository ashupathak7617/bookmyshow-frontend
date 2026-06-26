import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMovies = (search = "") =>
  api.get(`/movies?search=${search}`)
     .then(res => res.data);

export const getMovie = (movieId) =>
  api.get(`/movies/${movieId}`)
     .then(res => res.data);

export const getShows = (movieId) =>
  api.get(`/movies/${movieId}/shows`)
     .then(res => res.data);

export const getSeats = (movieId, showId) =>
  api.get(`/movies/${movieId}/shows/${showId}/seats`)
     .then(res => res.data);

export const createBooking = (data) =>
  api.post("/bookings", { booking: data })
     .then(res => res.data);

export const getBookings = () =>
  api.get("/bookings")
     .then(res => res.data);

export const loginCustomer = async (email, password) => {
  const response = await api.post("/customers/sign_in", {
    customer: { email, password }
  });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const signUpCustomer = async (name, email, password) => {
  const response = await api.post("/customers", {
    customer: {
      name,
      email,
      password,
      password_confirmation: password
    }
  });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const logoutCustomer = async () => {
  await api.delete("/customers/sign_out");
  localStorage.removeItem('token');
};

export const getCurrentCustomer = () =>
  api.get("/current_customer")
     .then(res => res.data);

export default api;
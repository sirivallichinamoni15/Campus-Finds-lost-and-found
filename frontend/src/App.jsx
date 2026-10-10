import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import LostItem from "./components/LostItem";
import FoundItem from "./components/FoundItem";
import SearchItems from "./components/SearchItems";
import Claims from "./components/Claims";
import AdminDashboard from "./components/AdminDashboard";
import Matches from "./components/Matches";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/report-lost" element={<LostItem />} />

        <Route path="/report-found" element={<FoundItem />} />

        <Route path="/search" element={<SearchItems />} />

        <Route path="/claims" element={<Claims />} />

        <Route path="/matches" element={<Matches />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
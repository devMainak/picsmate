import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/LoginPage";
import Photos from "./pages/PhotoView";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SidebarLayout from "./components/sidebar/SidebarLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<SidebarLayout />}>
              <Route path="/photos" element={<Photos />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

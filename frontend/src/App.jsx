import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/LoginPage";
import Photos from "./pages/photos/PhotoView";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SidebarLayout from "./components/sidebar/SidebarLayout";
import AlbumView from "./pages/albums/AlbumView";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<SidebarLayout />}>
              <Route path="/photos" element={<Photos />} />
              <Route path="/albums" element={<AlbumView />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/LoginPage";
import Photos from "./pages/photos/PhotoView";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SidebarLayout from "./components/sidebar/SidebarLayout";
import AlbumView from "./pages/albums/AlbumView";
import AlbumDetails from "./pages/albums/AlbumDetails";
import ImageViewer from "./features/images/ImageViewer";
import FavouritesView from "./pages/favourites/FavouritesView";
import GoogleCallbackHandler from "./pages/auth/GoogleCallbackHandler"; // ⬅️ import the callback handler

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Add the route for Google OAuth redirect handler */}
        <Route path="/google/callback" element={<GoogleCallbackHandler />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<SidebarLayout />}>
            <Route path="/photos" element={<Photos />} />
            <Route path="/albums" element={<AlbumView />} />
            <Route path="/albums/:albumId" element={<AlbumDetails />} />
            <Route path="/photos/:imageId" element={<ImageViewer />} />
            <Route path="/favourites" element={<FavouritesView />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import { NotFound, Register, Profile, Login, Home } from './components';
import { useAuth } from './context/AuthContext';
function PrivateRoute({ children }) {
  const { token } = useAuth();
  if (localStorage.getItem('error') !== null) {
    const message = localStorage.getItem('key');
    return token ? children : <Navigate to="/login" state={{ error: message }} />;
  }
  return token ? children : <Navigate to="/login" state={{ error: "You must be logged in to access the profile page" }} />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App; 

import { RequireAuth } from 'react-auth-kit'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/login';
import LobbyPage from './pages/lobby';

export default function RoutesComponent() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/lobby" element={<LobbyPage />} />
        </Routes>
      </BrowserRouter>
    );
}
import type { ReactNode } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';
import { SearchPage } from './pages/SearchPage';

const theme = extendTheme({});

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

import AppRoute from "@components/AppRoute";
import PrivateLayout from "@components/layout/PrivateLayout";
import PublicLayout from "@components/layout/public/PublicLayout";
import { AuthProvider } from "@contexts/AuthContext";
import Dashboard from "@pages/Dashboard";
import Login from "@pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <AppRoute requireAuth={false}>
                <PublicLayout>
                  <Login />
                </PublicLayout>
              </AppRoute>
            }
          />

          {/* Private Routes */}
          <Route
            path="/"
            element={
              <AppRoute requireAuth={true}>
                <PrivateLayout />
              </AppRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="properties" element={<div>Properties</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

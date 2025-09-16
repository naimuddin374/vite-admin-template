import AppRoute from "@/app/AppRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import { store } from "@/stores/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <AppRoute />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

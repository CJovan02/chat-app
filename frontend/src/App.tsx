import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import { useApplyTheme } from './hooks/useApplyTheme';

const queryClient = new QueryClient();

const App = () => {
  useApplyTheme();
  return (
    <HashRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Navigate
              to='/login'
              replace
            />
          }
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/dashboard'
          element={<Dashboard />}
        />
      </Routes>
    </HashRouter>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer />
  </QueryClientProvider>,
);

export default App;

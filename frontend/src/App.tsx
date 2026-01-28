import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

const App = () => {
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
      </Routes>
    </HashRouter>
  );
};

const root = createRoot(document.getElementById('app')!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export default App;

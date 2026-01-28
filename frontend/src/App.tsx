import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return <div>App</div>;
};

const root = createRoot(document.getElementById('app')!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export default App;

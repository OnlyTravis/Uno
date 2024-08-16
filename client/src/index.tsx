import { FC } from 'react';
import ReactDOM from 'react-dom/client';

import RoutesComponent from './routes';
import { AuthProvider } from 'react-auth-kit'

import "./index.css"

const App:FC = () => {
  return (
    <AuthProvider authName='_auth' authType='cookie' cookieDomain={window.location.hostname} cookieSecure={window.location.protocol === 'https:'}>
      <RoutesComponent />
    </AuthProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')??document.createElement("div"));
root.render(<App />);
import { FC } from 'react';
import ReactDOM from 'react-dom/client';

import RoutesComponent from './routes';

import "./index.css"

const App:FC = () => {
  return (
    <RoutesComponent />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')??document.createElement("div"));
root.render(<App />);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Or wherever your Tailwind CSS file is

// function startReactApp() {
//   const rootEl = document.getElementById('react-hairs-root');
//   if (rootEl) {
//     ReactDOM.createRoot(rootEl).render(
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     );
//   } else {
//     console.error("React root not found: #react-hairs-root");
//   }
// }

// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', startReactApp);
// } else {
//   startReactApp();
// }
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import {Provider} from "react-redux"
import { store } from './store/store.ts'


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
          toastClassName="text-sm font-medium text-gray-800 bg-white rounded-lg shadow-lg"
          progressClassName="bg-blue-500"
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);

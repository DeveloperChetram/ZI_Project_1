import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify';
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux"
import {store} from "./redux/store/store"
 
createRoot(document.getElementById('root')).render(
      

   
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    <ToastContainer  />
    </BrowserRouter>
       </Provider>
  </StrictMode>,
)

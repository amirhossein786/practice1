import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import App from "./App";
import 'react-confirm-alert/src/react-confirm-alert.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <App/>
            <ToastContainer/>
        </React.StrictMode>
    </BrowserRouter>
);

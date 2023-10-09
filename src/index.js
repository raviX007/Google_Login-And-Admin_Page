import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import { UserList } from './admin.component';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  
    <GoogleOAuthProvider clientId="588178887550-8kb68jtu4gq60rn8pn06ni6329sqrtpu.apps.googleusercontent.com">
        <React.StrictMode>
        <div className="container mt-3">
        <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<UserList/>} /> 
          <Route path="/" element={<App/>} />
        </Routes>
        </BrowserRouter>
        </div>
        </React.StrictMode>
    </GoogleOAuthProvider>,
    document.getElementById('root')
    
);

reportWebVitals();
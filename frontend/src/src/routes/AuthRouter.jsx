import {  Routes, Route,  } from "react-router-dom";

import { Login } from "pages/auth/login/Login";
import { Register } from "pages/auth/register/Register";
import { Forgot } from "pages/auth/forgot/Forgot";
import { Recovery } from "pages/auth/recovery/Recovery";
import { Activate } from "pages/auth/activate/Activate";

import  "pages/auth/auth.css";

export const AuthRouter = () => {
  return (
    <main>
      <Routes>
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot" element={<Forgot/>} />
          <Route path="/recovery" element={<Recovery/>} />
          <Route path="/activate" element={<Activate/>} />
          <Route path="/*" element={<Login/>} />
      </Routes>
    </main>
  );
};
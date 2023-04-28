
import {  Routes, Route } from "react-router-dom";

import { Home } from "pages/dashboard/home/Home";
import { Navbar } from "components/navbar/Navbar";

export const DashboardRouter = () => {
  return (
    <div className="animate__animated animate__fadeIn">
      <Navbar />
      <section className="dashboard">
        <Routes>
            <Route path="/home" element={ <Home /> } />
            <Route path="/" element={ <Home /> } />
        </Routes>
      </section>
    </div>
  );
};
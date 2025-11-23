import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <section className="hero">
        <div className="hero-text">
          <h1>Nilgiri College Transport Office</h1>
          <p>Connecting students and staff with reliable, safe and modern bus services. Check routes, timings, and request help directly through our digital platform.</p>
          <div className="hero-buttons">
            <Link to="/fees" className="btn primary">View Fee Structure</Link>
            <Link to="/lost-found" className="btn secondary">Lost & Found</Link>
          </div>
        </div>

        <div className="bus-scene" aria-hidden="true">
          <div className="bus-3d" role="img" aria-label="3D stylized college bus">
            <div className="shadow"></div>
            <div className="bus-body">
              <div className="taillight"></div>
              <div className="windows">
                <div className="win"></div>
                <div className="win"></div>
                <div className="win"></div>
                <div className="door">NCAS</div>
              </div>
              <div className="headlight"></div>
            </div>
            <div className="base"></div>
            <div className="rack"></div>
            <div className="wheel left">
              <div className="rim">N</div>
            </div>
            <div className="wheel right">
              <div className="rim">C</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="features">
        <div className="card">
          <h3>Student Bus Pass</h3>
          <p>Apply online for your transport pass. Quick, secure, and verified with your college ID.</p>
        </div>
        <div className="card">
          <h3>Live Timings</h3>
          <p>Stay updated with daily bus timings, changes, and instant notifications.</p>
        </div>
        <div className="card">
          <h3>Lost & Found</h3>
          <p>Report or search items lost on campus buses directly through the portal.</p>
        </div>
        <div className="card">
          <h3>Contact Office</h3>
          <p>Get in touch with the transport office for any queries or assistance.</p>
        </div>
      </section>

      <section id="rules" className="rules">
        <h2>Bus Rules & Regulations</h2>
        <ul>
          <li>All students must carry their valid bus pass during travel. The pass must be shown upon request.</li>
          <li>Students must be present at their respective stops at least 5 minutes before the scheduled departure time.</li>
          <li>Ragging, loud behavior, or damage to bus property will result in strict disciplinary action.</li>
          <li>Seats are available on a first-come, first-served basis. Do not reserve seats for others.</li>
          <li>Keep the bus clean — do not litter or stick posters on the bus walls or windows.</li>
          <li>Respect the driver, staff, and fellow passengers at all times.</li>
          <li>Report any issues or lost items immediately to the Transport Office.</li>
          <li>Playing loud music or causing disturbance inside the bus is prohibited.</li>
          <li>Use of intoxicants, smoking, or any illegal activity inside the bus is strictly banned.</li>
          <li>College rules regarding discipline and conduct apply during transit as well.</li>
        </ul>
      </section>

      <Footer />
    </div>
  );
};

export default Home;


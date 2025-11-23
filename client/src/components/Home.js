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
          <p>Connecting students and staff with reliable, safe and modern transport facilities. Access fee details, report issues, or manage lost and found items easily through our digital portal.</p>
          <div className="hero-buttons">
            <Link to="/fees" className="btn primary">View Fee Structure</Link>
            <Link to="/helpdesk" className="btn secondary">Helpdesk</Link>
          </div>
        </div>

        <div className="bus-scene">
          <div className="bus-3d">
            <div className="bus-body">
              <div className="windows">
                <div className="win"></div>
                <div className="win"></div>
                <div className="door">NCAS</div>
              </div>
            </div>
            <div className="wheel left">
              <div className="rim">N</div>
            </div>
            <div className="wheel right">
              <div className="rim">C</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="card">
          <h3>🚌 Fee Structure</h3>
          <p>Check the latest bus route-wise transport fees, timings, and driver details.</p>
          <Link to="/fees">Open Fee Structure →</Link>
        </div>
        <div className="card">
          <h3>💬 Helpdesk</h3>
          <p>Need support with your transport pass or service issues? Contact our helpdesk.</p>
          <Link to="/helpdesk">Go to Helpdesk →</Link>
        </div>
        <div className="card">
          <h3>🎒 Lost & Found</h3>
          <p>Report lost or found items from buses or campus and track their status.</p>
          <Link to="/lost-found">Open Lost & Found →</Link>
        </div>
      </section>

      <section className="transport-rules">
        <div className="rules-container">
          <h2>Transport Rules & Regulations</h2>
          <p className="rules-intro">All students and staff using the college transport service must adhere to the following rules:</p>
          <div className="rules-grid">
            <div className="rule-item">
              <div className="rule-icon">⏰</div>
              <h4>Punctuality</h4>
              <p>Students must arrive at the bus stop at least 5 minutes before the scheduled departure time. Buses will not wait for latecomers.</p>
            </div>
            <div className="rule-item">
              <div className="rule-icon">🎫</div>
              <h4>Valid Pass Required</h4>
              <p>All passengers must carry a valid transport pass and show it to the driver upon request. Unauthorized travel is strictly prohibited.</p>
            </div>
            <div className="rule-item">
              <div className="rule-icon">🪑</div>
              <h4>Seating Arrangement</h4>
              <p>Seats are allocated on a first-come-first-served basis. Reserved seats for staff and differently-abled students must be respected.</p>
            </div>
            <div className="rule-item">
              <div className="rule-icon">🔇</div>
              <h4>Conduct & Behavior</h4>
              <p>Maintain discipline and decorum. No loud music, eating, or causing disturbance to fellow passengers. Respect the driver and conductor.</p>
            </div>
            <div className="rule-item">
              <div className="rule-icon">🚭</div>
              <h4>No Smoking/Alcohol</h4>
              <p>Smoking, consumption of alcohol, or any intoxicating substances is strictly prohibited on buses. Violators will face strict action.</p>
            </div>
            <div className="rule-item">
              <div className="rule-icon">📱</div>
              <h4>Mobile Usage</h4>
              <p>Use mobile phones responsibly. Keep volume low and avoid disturbing others. No phone calls during class hours.</p>
            </div>
            <div className="rule-item">
              <div className="rule-icon">🧳</div>
              <h4>Luggage Policy</h4>
              <p>Carry only essential items. Large luggage or items that obstruct passage are not allowed. Keep belongings secure.</p>
            </div>
            <div className="rule-item">
              <div className="rule-icon">🛡️</div>
              <h4>Safety First</h4>
              <p>Remain seated while the bus is in motion. Do not lean out of windows. Follow all safety instructions from the driver.</p>
            </div>
            <div className="rule-item">
              <div className="rule-icon">💰</div>
              <h4>Fee Payment</h4>
              <p>Transport fees must be paid on time as per the schedule. Late payments may result in suspension of transport services.</p>
            </div>
            <div className="rule-item">
              <div className="rule-icon">📞</div>
              <h4>Reporting Issues</h4>
              <p>Report any issues, complaints, or emergencies immediately through the helpdesk or contact the transport office directly.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;


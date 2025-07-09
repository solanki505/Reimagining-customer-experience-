import React from "react";
import "./HomePage.css";
import ThreeDViewer from './ThreeDViewer';

const features = [
  {
    title: "AI Assistant",
    desc: "Get product recommendations, compare prices, and shop smarter with our AI-powered assistant.",
  },
  {
    title: "AR/VR Try-On",
    desc: "Visualize clothes on your body in real-time using AR. Pick colors matching your skin tone and style.",
  },
  {
    title: "Smart Checkout",
    desc: "Experience frictionless, cashier-less checkout using face, phone, or QR.",
  },
  {
    title: "Customer Insights",
    desc: "Real-time dashboards to analyze preferences, feedback, and predict trends.",
  },
  {
    title: "Voice Shopping",
    desc: "Browse and purchase products hands-free using natural voice commands and AI speech recognition.",
  },
  {
    title: "Smart Inventory",
    desc: "IoT-powered inventory management with real-time stock tracking and automated restocking alerts.",
  },
];

const HomePage = () => {
  return (
    <div className="home">
      <header className="hero">
        <h1>Retail Reimagined</h1>
        <p>Innovating the Future of Customer Experience</p>
        <a href="/3d" style={{
          display: 'inline-block',
          marginTop: 16,
          padding: '12px 28px',
          background: 'linear-gradient(90deg, #3a8dde, #6e40c9)',
          color: '#fff',
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '1.2em',
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>Explore 3D Models</a>
      </header>

      <section className="cards-section">
        {features.map((item, index) => (
          <div key={index} className="feature-card">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="scroll-section">
        <h2>Live Customer Insights</h2>
        <div className="scrolling-content">
          <div className="scroll-box">Top Trending: Smart Watches</div>
          <div className="scroll-box">70% prefer AR try-on over static images</div>
          <div className="scroll-box">Peak shopping: 7PM-9PM daily</div>
          <div className="scroll-box">Feedback score: 4.8/5 on AI Assist</div>
        </div>
      </section>

      <section className="contact-team">
        <div className="contact-box">
          <h2>Get in Touch</h2>
          <p>support@retailfuture.tech</p>
          <p>+1 (555) 123-4567</p>
          <p style={{marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem'}}>
            Ready to transform your retail experience? Contact us for a demo or consultation.
          </p>
        </div>

        <div className="team-box">
          <h2>Meet Our Team</h2>
          <ul>
            <li>Solanki Sarkar - Frontend Developer & UI/UX Designer</li>
            <li>Tirthankar Pal - Backend Developer & Database Engineer</li>
            <li>Samridhha Haldar - Voice Assistant Developer</li>
            <li>Ritik Maurya - AR/VR Developer</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import "./main.css";
import GradientText from "./GradientText";
import CardSwap, { Card } from "./CardSwap";
import stepconeImg from "../assets/stepcone.jpg";
import workshopImg from "../assets/workshop.jpeg";
import hackathonImg from "../assets/hackathon.jpeg";



const Main = () => {
  return (
    <section className="main">
      
      <div className="main-content two-column">

        <div className="main-left">
          
         
          <h1 className="main-title">
            Discover, Register & <br />
            <span style={{ color: "#1811ac" }}>Participate in </span>
            <GradientText>GMRIT</GradientText>
            <span style={{ color: "#1811ac" }}> Events</span>
          </h1>

          {/* Description */}
          <p className="main-desc">
            Your one-stop platform to explore technical workshops,
            cultural fests, hackathons, and more from 16+ clubs.
          </p>

          {/* Button */}
          <div className="main-actions">
            <button className="animated-button">
              <svg className="arr-1" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <svg className="arr-2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span className="text">Browse Events</span>
              <div className="circle" aria-hidden="true"></div>
            </button>
          </div>

          {/* Stats */}
          <div className="main-stats">
            <div className="stat-box">
              <h2>16+</h2>
              <p>Active Clubs</p>
            </div>
            <div className="stat-box">
              <h2>120+</h2>
              <p>Events / Year</p>
            </div>
            <div className="stat-box">
              <h2>5000+</h2>
              <p>Students</p>
            </div>
            <div className="stat-box">
              <h2>95%</h2>
              <p>Satisfaction</p>
            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="main-right">
          {/* Animated CardSwap */}
          <CardSwap
              width={320}
              height={220}
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
            >
                <Card customClass="card-blue">
                  <img className="card-photo" src={hackathonImg} alt="Hackathon" />
                  <h3>Hackathons</h3>
                  <p>Build & Compete</p>
                </Card>

                <Card customClass="card-orange">
                  <img className="card-photo" src={workshopImg} alt="Workshop" />
                  <h3>Workshops</h3>
                  <p>Learn from Experts</p>
                </Card>

                <Card customClass="card-red">
                  <img className="card-photo" src={stepconeImg} alt="Cultural" />
                  <h3>Cultural Events</h3>
                  <p>Show Your Talent</p>
                </Card>
            </CardSwap>

        </div>

      </div>
    </section>
  );
};

export default Main;

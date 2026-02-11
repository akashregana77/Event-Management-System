import acm from '../../assets/acm.png';
import iste from '../../assets/iste.jpg';
import csi from '../../assets/csi.jpg';
import filmClub from '../../assets/film_club.jpg';
import musicClub from '../../assets/music_club.jpg';
import roboClub from '../../assets/robo_club.jpg';
import './clubs.css';

function Clubs() {
  return (
    <div className="clubs-section">

      <div className="bodies">
        <div className="header">
          <h1>Professional Bodies</h1>
          <p>Explore our technical professional associations.</p>
        </div>

        <div className="logos">
          <div className="club-card">
            <img src={acm} alt="ACM" />
            <h3>ACM</h3>
            <p>Association for Computing Machinery</p>
          </div>

          <div className="club-card">
            <img src={iste} alt="ISTE" />
            <h3>ISTE</h3>
            <p>Indian Society for Technical Education</p>
          </div>

          <div className="club-card">
            <img src={csi} alt="CSI" />
            <h3>CSI</h3>
            <p>Computer Society of India</p>
          </div>
        </div>
      </div>

      <div className="bodies">
        <div className="header">
          <h1>Clubs</h1>
          <p>Discover creative and innovation-driven communities.</p>
        </div>

        <div className="logos">
          <div className="club-card">
            <img src={filmClub} alt="Film Club" />
            <h3>Film Club</h3>
            <p>Exploring cinema & creativity</p>
          </div>

          <div className="club-card">
            <img src={roboClub} alt="Robotics Club" />
            <h3>Robotics Club</h3>
            <p>Building intelligent machines</p>
          </div>

          <div className="club-card">
            <img src={musicClub} alt="Music Club" />
            <h3>Music Club</h3>
            <p>Express through rhythm</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Clubs;

import acm from '../assets/acm.jpg';
import iste from '../assets/iste.jpg';
import csi from '../assets/csi.jpg';
import film_club from '../assets/film_club.jpg';
import music_club from '../assets/music_club.webp';
import radio_club from '../assets/robo_club.jpg';
import './clubs.css'

function Clubs() {
  return (
    <div className='main'>
      <div className='bodies'>
        <div className='header'>
            <h1>Proffesional Bodies</h1>
        </div>
        <div className='logos'>
            <img src={acm} alt="acm" />
            <img src={iste} alt="acm" />
            <img src={csi} alt="acm" />
        </div>
      </div>
      <div className='bodies'>
        <div className='header'>
            <h1>Clubs</h1>
        </div>
        <div className='logos'>
            <img src={film_club} alt="acm" />
            <img src={radio_club} alt="acm" />
            <img src={music_club} alt="acm" />
        </div>
      </div>
    </div>
  )
}

export default Clubs

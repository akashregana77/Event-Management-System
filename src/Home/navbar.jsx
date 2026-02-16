import './navbarStyles.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginModal from '../components/LoginModal'

function Navbar() {
    const [loginOpen, setLoginOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-left">
                    <i className="fa-solid fa-graduation-cap logo"></i>
                    <p className="brand">GMRIT<span>Events</span></p>
                </div>

                <div className="nav-center">
                    <button className="nav-btn" onClick={() => navigate('/') }>
                        <span className='icon'><ion-icon name="home"></ion-icon></span>
                        <span className='text'>Home</span>
                    </button>
                    <button className="nav-btn" onClick={() => navigate('/events') }>
                        <span className='icon'><i className="fa-solid fa-bullhorn"></i></span>
                        <span className='text'>Events</span>
                    </button>
                    <button className="nav-btn">
                        <span className='icon'><i className="fa-solid fa-handshake"></i></span>
                        <span className='text'>Clubs</span>
                    </button>
                </div>

                <div className="nav-right">
                    <button type="button" className="login-btn" onClick={() => setLoginOpen(true)}>
                        <i className="fa-solid fa-right-to-bracket"></i>
                        <p>login</p>
                    </button>

                    <button className="cta" onClick={() => setLoginOpen(true)}>Get Started</button>
                </div>
            </nav>

            <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        </>
    )
}

export default Navbar
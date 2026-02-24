import './navbarStyles.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginModal from '../components/LoginModal'

function Navbar() {
    const [loginOpen, setLoginOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const { isAuthenticated, logout } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close menu on route change
    const handleNav = (path) => {
        navigate(path)
        setMenuOpen(false)
    }

    const handleLogout = () => {
        logout()
        navigate('/')
        setMenuOpen(false)
    }

    return (
        <>
            <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-left">
                    {/* Hamburger button — mobile only */}
                    <button
                        className="hamburger-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
                        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
                        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
                    </button>

                    <div className="logo-icon">
                        <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <p className="brand">GMRIT<span>Events</span></p>
                </div>

                <div className="nav-center">
                    <button className="nav-btn" onClick={() => navigate('/')}>
                        <span className='icon'><ion-icon name="home"></ion-icon></span>
                        <span className='text'>Home</span>
                    </button>
                    <button className="nav-btn" onClick={() => navigate('/events')}>
                        <span className='icon'><i className="fa-solid fa-bullhorn"></i></span>
                        <span className='text'>Events</span>
                    </button>
                    <button className="nav-btn" onClick={() => navigate('/clubs')}>
                        <span className='icon'><i className="fa-solid fa-handshake"></i></span>
                        <span className='text'>Clubs</span>
                    </button>
                </div>

                <div className="nav-right">
                    {isAuthenticated ? (
                        <button type="button" className="login-btn logout-btn" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <p>logout</p>
                        </button>
                    ) : (
                        <button type="button" className="login-btn" onClick={() => setLoginOpen(true)}>
                            <i className="fa-solid fa-right-to-bracket"></i>
                            <p>login</p>
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile drawer overlay */}
            <div
                className={`mobile-overlay ${menuOpen ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
            />

            {/* Mobile slide-out drawer */}
            <div className={`mobile-drawer ${menuOpen ? 'active' : ''}`}>
                <div className="mobile-drawer-header">
                    <div className="logo-icon">
                        <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <p className="brand">GMRIT<span>Events</span></p>
                </div>

                <div className="mobile-nav-links">
                    <button className="mobile-nav-item" onClick={() => handleNav('/')}>
                        <ion-icon name="home"></ion-icon>
                        <span>Home</span>
                    </button>
                    <button className="mobile-nav-item" onClick={() => handleNav('/events')}>
                        <i className="fa-solid fa-bullhorn"></i>
                        <span>Events</span>
                    </button>
                    <button className="mobile-nav-item" onClick={() => handleNav('/clubs')}>
                        <i className="fa-solid fa-handshake"></i>
                        <span>Clubs</span>
                    </button>
                </div>
            </div>

            <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        </>
    )
}

export default Navbar

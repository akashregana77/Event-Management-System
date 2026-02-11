import './navbarStyles.css'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const loginRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleStudentLogin = () => {
        setOpen(false)
        window.location.href = '/student-login'
    }

    const handleAdminLogin = () => {
        setOpen(false)
        window.location.href = '/admin-login'
    }

    const handleSuperAdmin = () => {
        setOpen(false)
        window.location.href = '/super-admin'
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (loginRef.current && !loginRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
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
                <div className="login" ref={loginRef}>
                    <button type="button" className="login-btn" onClick={() => setOpen(!open)}>
                        <i className="fa-solid fa-right-to-bracket"></i>
                        Login
                        <i className={`fa-solid fa-chevron-down ${open ? 'rotate' : ''}`}></i>
                    </button>

                    <div className={`drop ${open ? 'show' : ''}`}>
                        <div className="item" onClick={handleStudentLogin}>
                            <i className="fa-solid fa-user"></i> 
                            <span>Student Login</span>
                        </div>
                        <div className="item" onClick={handleAdminLogin}>
                            <i className="fa-solid fa-calendar"></i> 
                            <span>Admin Login</span>
                        </div>
                        <div className="item" onClick={handleSuperAdmin}>
                            <i className="fa-solid fa-graduation-cap"></i> 
                            <span>Super Admin</span>
                        </div>
                    </div>
                </div>

                <button className="cta">Get Started</button>
            </div>
        </nav>
    )
}

export default Navbar
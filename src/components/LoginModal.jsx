import { useState, useEffect, useRef } from 'react';
import { X, User, Shield, Crown, Eye, EyeOff, ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';
import './LoginModal.css';

const roles = [
  {
    id: 'student',
    title: 'Student',
    description: 'Access your events and registrations',
    icon: User,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  },
  {
    id: 'admin',
    title: 'Admin',
    description: 'Manage events and approvals',
    icon: Shield,
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
  },
  {
    id: 'superadmin',
    title: 'Super Admin',
    description: 'Full system administration',
    icon: Crown,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  }
];

export default function LoginModal({ isOpen, onClose }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedRole(null);
        setFormData({ email: '', password: '' });
        setErrors({});
        setTouched({});
        setShowPassword(false);
      }, 300);
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      if (field === 'email') {
        if (!value) setErrors(prev => ({ ...prev, email: 'Email is required' }));
        else if (!validateEmail(value)) setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
        else setErrors(prev => ({ ...prev, email: '' }));
      }
      if (field === 'password') {
        if (!value) setErrors(prev => ({ ...prev, password: 'Password is required' }));
        else if (value.length < 6) setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
        else setErrors(prev => ({ ...prev, password: '' }));
      }
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'email') {
      if (!formData.email) setErrors(prev => ({ ...prev, email: 'Email is required' }));
      else if (!validateEmail(formData.email)) setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
    }
    if (field === 'password') {
      if (!formData.password) setErrors(prev => ({ ...prev, password: 'Password is required' }));
      else if (formData.password.length < 6) setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const routes = {
      student: '/student/dashboard',
      admin: '/admin',
      superadmin: '/superadmin'
    };
    
    setIsLoading(false);
    onClose();
    window.location.href = routes[selectedRole];
  };

  const currentRole = roles.find(r => r.id === selectedRole);

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={handleBackdropClick}>
      <div className={`login-modal ${selectedRole ? 'has-role' : ''}`} ref={modalRef}>
        <button className="login-modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className={`login-modal-content ${selectedRole ? 'slide-left' : ''}`}>
          <div className="login-modal-header">
            <div className="login-modal-logo">
              <div className="logo-icon">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <span className="logo-text">GMRIT<span>Events</span></span>
            </div>
            <h2>Welcome Back</h2>
            <p>Select your role to continue</p>
          </div>

          <div className="role-selection">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  className="role-card"
                  onClick={() => setSelectedRole(role.id)}
                  style={{ 
                    '--role-color': role.color,
                    '--role-gradient': role.gradient,
                    '--delay': `${index * 0.1}s`
                  }}
                >
                  <div className="role-icon">
                    <Icon size={28} />
                  </div>
                  <div className="role-info">
                    <h3>{role.title}</h3>
                    <p>{role.description}</p>
                  </div>
                  <div className="role-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`login-form-container ${selectedRole ? 'visible' : ''}`}>
          <button className="back-button" onClick={() => setSelectedRole(null)}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          {currentRole && (
            <div className="form-header" style={{ '--role-color': currentRole.color, '--role-gradient': currentRole.gradient }}>
              <div className="form-role-badge">
                <currentRole.icon size={20} />
                <span>{currentRole.title} Login</span>
              </div>
              <h2>Sign in to your account</h2>
              <p>Enter your credentials to continue</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className={`form-group ${errors.email && touched.email ? 'has-error' : ''} ${formData.email && !errors.email ? 'valid' : ''}`}>
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  autoComplete="email"
                />
                {formData.email && !errors.email && (
                  <div className="valid-check">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
              {errors.email && touched.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className={`form-group ${errors.password && touched.password ? 'has-error' : ''} ${formData.password && !errors.password ? 'valid' : ''}`}>
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && touched.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkmark"></span>
                <span>Remember me</span>
              </label>
              <a href="/forgot-password" className="forgot-link">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
              style={{ '--role-gradient': currentRole?.gradient }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="spinner" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          <div className="form-footer">
            <p>Don't have an account? <a href="/register">Sign up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

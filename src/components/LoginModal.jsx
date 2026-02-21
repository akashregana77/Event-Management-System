import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, User, Shield, Crown, ArrowLeft, Mail, Loader2, KeyRound, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './LoginModal.css';

const API_URL = 'http://localhost:5000/api';

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
  const auth = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  // OTP state
  const [step, setStep] = useState('email'); // 'email' | 'otp'
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const modalRef = useRef(null);
  const otpRefs = useRef([]);

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

  // Reset all state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedRole(null);
        setEmail('');
        setEmailError('');
        setEmailTouched(false);
        setStep('email');
        setOtp(['', '', '', '', '', '']);
        setOtpError('');
        setOtpSent(false);
        setResendTimer(0);
        setSuccessMessage('');
      }, 300);
    }
  }, [isOpen]);

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const validateEmail = (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (emailTouched) {
      if (!value) setEmailError('Email is required');
      else if (!validateEmail(value)) setEmailError('Please enter a valid email');
      else setEmailError('');
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    if (!email) setEmailError('Email is required');
    else if (!validateEmail(email)) setEmailError('Please enter a valid email');
    else setEmailError('');
  };

  // ── Send OTP ────────────────────────────────────────────────────
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setEmailTouched(true);

    if (!email) { setEmailError('Email is required'); return; }
    if (!validateEmail(email)) { setEmailError('Please enter a valid email'); return; }

    setIsLoading(true);
    setOtpError('');

    try {
      const res = await fetch(`${API_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role: selectedRole }),
      });
      const data = await res.json();

      if (data.success) {
        setStep('otp');
        setOtpSent(true);
        setResendTimer(30);
        setSuccessMessage('OTP sent to your email!');
        setTimeout(() => setSuccessMessage(''), 3000);
        // Focus first OTP input after transition
        setTimeout(() => otpRefs.current[0]?.focus(), 400);
      } else {
        setOtpError(data.message || 'Failed to send OTP');
      }
    } catch {
      setOtpError('Server error. Please make sure the OTP server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Resend OTP ──────────────────────────────────────────────────
  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setIsLoading(true);
    setOtpError('');
    setOtp(['', '', '', '', '', '']);

    try {
      const res = await fetch(`${API_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role: selectedRole }),
      });
      const data = await res.json();

      if (data.success) {
        setResendTimer(30);
        setSuccessMessage('New OTP sent!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } else {
        setOtpError(data.message || 'Failed to resend OTP');
      }
    } catch {
      setOtpError('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── OTP Input Handling ──────────────────────────────────────────
  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');

    // Auto-advance to next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      otpRefs.current[5]?.focus();
    }
  };

  // ── Verify OTP ──────────────────────────────────────────────────
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setOtpError('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setOtpError('');

    try {
      const res = await fetch(`${API_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString, role: selectedRole }),
      });
      const data = await res.json();

      if (data.success) {
        auth.login(email, selectedRole);
        setSuccessMessage('Verified! Redirecting...');
        setTimeout(() => {
          setIsLoading(false);
          onClose();
          navigate(data.redirectTo);
        }, 1000);
        return;
      } else {
        setOtpError(data.message || 'Invalid OTP');
        setOtp(['', '', '', '', '', '']);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      }
    } catch {
      setOtpError('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Go back from OTP step to email step ─────────────────────────
  const handleBackToEmail = () => {
    setStep('email');
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    setSuccessMessage('');
  };

  const currentRole = roles.find(r => r.id === selectedRole);

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={handleBackdropClick}>
      <div className={`login-modal ${selectedRole ? 'has-role' : ''}`} ref={modalRef}>
        <button className="login-modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* ── Role Selection Screen ─────────────────────────────── */}
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

        {/* ── Login Form (Email → OTP) ─────────────────────────── */}
        <div className={`login-form-container ${selectedRole ? 'visible' : ''}`}>
          <button className="back-button" onClick={() => {
            if (step === 'otp') {
              handleBackToEmail();
            } else {
              setSelectedRole(null);
              setStep('email');
              setOtp(['', '', '', '', '', '']);
              setOtpError('');
              setEmail('');
              setEmailError('');
              setEmailTouched(false);
              setSuccessMessage('');
            }
          }}>
            <ArrowLeft size={18} />
            <span>{step === 'otp' ? 'Change Email' : 'Back'}</span>
          </button>

          {currentRole && (
            <div className="form-header" style={{ '--role-color': currentRole.color, '--role-gradient': currentRole.gradient }}>
              <div className="form-role-badge">
                <currentRole.icon size={20} />
                <span>{currentRole.title} Login</span>
              </div>
              <h2>{step === 'email' ? 'Enter your email' : 'Verify OTP'}</h2>
              <p>
                {step === 'email'
                  ? "We'll send a one-time password to your email"
                  : (<>Enter the 6-digit code sent to <strong>{email}</strong></>)
                }
              </p>
            </div>
          )}

          {/* Success toast */}
          {successMessage && (
            <div className="otp-success-toast">
              <CheckCircle2 size={16} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ── Step 1: Email ──────────────────────────────────── */}
          {step === 'email' && (
            <form onSubmit={handleSendOTP} className="login-form">
              <div className={`form-group ${emailError && emailTouched ? 'has-error' : ''} ${email && !emailError ? 'valid' : ''}`}>
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={handleEmailBlur}
                    autoComplete="email"
                  />
                  {email && !emailError && (
                    <div className="valid-check">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </div>
                {emailError && emailTouched && <span className="error-message">{emailError}</span>}
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
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <Mail size={20} />
                    <span>Send OTP</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* ── Step 2: OTP Verification ──────────────────────── */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="login-form">
              <div className="otp-input-group">
                <label>
                  <KeyRound size={16} />
                  <span>One-Time Password</span>
                </label>
                <div className="otp-inputs" onPaste={handleOtpPaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={`otp-digit ${digit ? 'filled' : ''} ${otpError ? 'error' : ''}`}
                      autoComplete="one-time-code"
                    />
                  ))}
                </div>
                {otpError && (
                  <span className="error-message otp-error-message">
                    {otpError}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isLoading || otp.join('').length !== 6}
                style={{ '--role-gradient': currentRole?.gradient }}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="spinner" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    <span>Verify & Sign In</span>
                  </>
                )}
              </button>

              <div className="resend-section">
                <p className="resend-text">Didn't receive the code?</p>
                <button
                  type="button"
                  className={`resend-button ${resendTimer > 0 ? 'disabled' : ''}`}
                  onClick={handleResendOTP}
                  disabled={resendTimer > 0 || isLoading}
                >
                  <RefreshCw size={14} className={isLoading ? 'spinner' : ''} />
                  <span>
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useCallback } from 'react';
import axios from 'axios';
import '../App.css';
import logo from '../logo.png';
import SignupField from '../components/SignupField';

/* ─── Password strength helper ─────────────────────────────── */
function getStrength(pw) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8)               score++;
  if (/[A-Z]/.test(pw))             score++;
  if (/[0-9]/.test(pw))             score++;
  if (/[^A-Za-z0-9]/.test(pw))      score++;
  return score;
}

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_CLASSES = ['', 'weak', 'fair', 'good', 'strong'];

function StrengthBar({ password }) {
  const score = getStrength(password);
  return (
    <div style={{ display: 'grid', gap: '4px', marginTop: '-4px' }}>
      <div className="strength-bar">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={`strength-seg${score >= i ? ` ${STRENGTH_CLASSES[score]}` : ''}`}
          />
        ))}
      </div>
      {password && (
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Password strength: <strong style={{ color: score <= 1 ? 'var(--error)' : score === 2 ? 'var(--warning)' : 'var(--success)' }}>{STRENGTH_LABELS[score]}</strong>
        </span>
      )}
    </div>
  );
}

/* ─── Role options ─────────────────────────────────────────── */
const ROLES = [
  { value: 'candidate',  label: 'Candidate',  icon: '🎯' },
  { value: 'recruiter',  label: 'Recruiter',   icon: '🏢' },
  { value: 'hr_manager', label: 'HR Manager',  icon: '📋' },
  { value: 'interviewer',label: 'Interviewer', icon: '💼' },
];

/* ─── SVG Icons ─────────────────────────────────────────────── */
const IconUser     = () => <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>;
const IconMail     = () => <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>;
const IconLock     = () => <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>;
const IconPhone    = () => <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>;
const IconBuilding = () => <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/></svg>;
const IconChevron  = () => <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15" style={{position:'absolute',right:13,top:'50%',transform:'translateY(-50%)',pointerEvents:'none',color:'var(--text-muted)'}}><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>;

const IconGoogle   = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.2 0 5.9 1.1 8.1 2.9l6-6C34.5 3.2 29.6 1 24 1 14.9 1 7.1 6.6 3.7 14.5l7 5.4C12.4 13.6 17.7 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8C43.7 37.6 46.5 31.5 46.5 24.5z"/>
    <path fill="#FBBC05" d="M10.7 28.6A14.5 14.5 0 019.5 24c0-1.6.3-3.2.8-4.7L3.3 14C1.2 17.5 0 21.6 0 26c0 4.4 1.2 8.5 3.3 12l7.4-5.7-.0-.7z"/>
    <path fill="#34A853" d="M24 47c5.7 0 10.5-1.9 14-5.1l-7.5-5.8c-2 1.3-4.5 2-6.5 2-6.3 0-11.6-4.2-13.5-10l-7.4 5.7C7.1 41.4 14.9 47 24 47z"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   SignupPage
═══════════════════════════════════════════════════════════════ */
function SignupPage() {
  const [formData, setFormData] = useState({
    firstName:       '',
    lastName:        '',
    email:           '',
    phone:           '',
    organization:    '',
    role:            'candidate',
    password:        '',
    confirmPassword: '',
    agreeTerms:      false,
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [statusType,    setStatusType]    = useState('');
  const [loading,       setLoading]       = useState(false);

  /* ── Change handler ─────────────────────────────────────── */
  const handleChange = useCallback(event => {
    const { name, value, type, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const setRole = useCallback(r => {
    setFormData(prev => ({ ...prev, role: r }));
  }, []);

  /* ── Submit ─────────────────────────────────────────────── */
  const handleSubmit = async event => {
    event.preventDefault();
    setStatusMessage('');
    setStatusType('');

    if (!formData.agreeTerms) {
      setStatusType('error');
      setStatusMessage('Please agree to the Terms & Conditions to continue.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setStatusType('error');
      setStatusMessage('Passwords do not match. Please check and try again.');
      return;
    }

    if (getStrength(formData.password) < 2) {
      setStatusType('error');
      setStatusMessage('Password is too weak. Add uppercase letters, numbers, or symbols.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/auth/create-account', {
        firstName:    formData.firstName,
        lastName:     formData.lastName,
        email:        formData.email,
        phone:        formData.phone,
        organization: formData.organization,
        role:         formData.role,
        password:        formData.password,
        confirmPassword: formData.confirmPassword,
      });

      setStatusType('success');
      setStatusMessage(
        response.data?.message ||
        '🎉 Account created successfully! Please check your email to verify.'
      );
      setFormData({
        firstName: '', lastName: '', email: '', phone: '',
        organization: '', role: 'candidate',
        password: '', confirmPassword: '', agreeTerms: false,
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to create account. Please try again.';
      setStatusType('error');
      setStatusMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const pwMismatch =
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div className="signup-shell">
      {/* ── Top Bar ────────────────────────────────────────── */}
      <header className="topbar" aria-label="IntelliHire navigation">
        <a href="/" className="topbar-brand">
          <div className="brand-logo-wrap">
            <img src={logo} alt="IntelliHire" className="brand-logo" />
          </div>
        </a>
        <span className="topbar-badge">Smart Recruitment Platform</span>
      </header>

      {/* ── Main ───────────────────────────────────────────── */}
      <main className="signup-main">
        <section className="signup-card" aria-labelledby="signup-title">

          {/* Card Header */}
          <div className="card-header">
            <div className="card-header-logo-wrap">
              <img src={logo} alt="IntelliHire" className="card-header-logo" />
            </div>
            <h1 id="signup-title">Create Your Account</h1>
            <p className="card-subtitle">
              Join thousands of recruiters &amp; candidates on IntelliHire
            </p>
          </div>

          {/* Role Selector */}
          <div className="role-selector" role="group" aria-label="Select your role">
            {ROLES.map(r => (
              <button
                key={r.value}
                type="button"
                className={`role-btn${formData.role === r.value ? ' active' : ''}`}
                onClick={() => setRole(r.value)}
                aria-pressed={formData.role === r.value}
              >
                <span className="role-btn-icon">{r.icon}</span>
                <span className="role-btn-label">{r.label}</span>
              </button>
            ))}
          </div>

          {/* Form */}
          <form className="signup-form" onSubmit={handleSubmit} noValidate>

            {/* Name row */}
            <div className="form-row">
              <SignupField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Jane"
                autoComplete="given-name"
                icon={<IconUser />}
                required
              />
              <SignupField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Smith"
                autoComplete="family-name"
                icon={<IconUser />}
                required
              />
            </div>

            {/* Email */}
            <SignupField
              label="Work Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane.smith@company.com"
              helperText="Must be a valid email address"
              autoComplete="email"
              icon={<IconMail />}
              required
            />

            {/* Phone + Org row */}
            <div className="form-row">
              <SignupField
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                autoComplete="tel"
                icon={<IconPhone />}
              />
              <SignupField
                label="Organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Acme Corp"
                autoComplete="organization"
                icon={<IconBuilding />}
              />
            </div>

            {/* Password */}
            <SignupField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              autoComplete="new-password"
              icon={<IconLock />}
              required
            >
              <StrengthBar password={formData.password} />
            </SignupField>

            {/* Confirm Password */}
            <SignupField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              autoComplete="new-password"
              icon={<IconLock />}
              helperText={pwMismatch ? 'Passwords do not match' : undefined}
              helperType={pwMismatch ? 'error' : undefined}
              required
            />

            {/* Terms */}
            <label className="terms">
              <input
                type="checkbox"
                name="agreeTerms"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <span>
                I agree to the{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms &amp; Conditions
                </a>{' '}
                and{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </span>
            </label>
            <p className="terms-note">
              By clicking this, you accept our data privacy &amp; cookie policy.
            </p>

            {/* Status Message */}
            {statusMessage && (
              <p
                className={`form-status ${statusType}`}
                role="status"
                aria-live="polite"
              >
                {statusMessage}
              </p>
            )}

            {/* Submit */}
            <button
              id="signup-submit-btn"
              className="primary-button"
              type="submit"
              disabled={loading}
            >
              {loading && <span className="btn-spinner" aria-hidden="true" />}
              {loading ? 'Creating Account…' : 'Create Account'}
            </button>

            {/* Login link */}
            <p className="auth-switch">
              Already have an account?{' '}
              <a href="/login">Log In</a>
            </p>

            {/* Divider */}
            <div className="divider"><span>or</span></div>

            {/* Social */}
            <div className="social-row">
              <button
                id="signup-google-btn"
                className="social-button"
                type="button"
                aria-label="Continue with Google"
              >
                <span className="social-icon google">
                  <IconGoogle />
                </span>
                Google
              </button>

              <button
                id="signup-linkedin-btn"
                className="social-button"
                type="button"
                aria-label="Continue with LinkedIn"
              >
                <span className="social-icon linkedin">
                  <IconLinkedIn />
                </span>
                LinkedIn
              </button>
            </div>

            {/* Trust badges */}
            <div className="trust-row">
              <span className="trust-badge">
                <span className="trust-badge-icon">🔒</span>
                256-bit SSL
              </span>
              <span className="trust-badge">
                <span className="trust-badge-icon">🛡️</span>
                GDPR Compliant
              </span>
              <span className="trust-badge">
                <span className="trust-badge-icon">✅</span>
                SOC 2 Certified
              </span>
            </div>
          </form>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="footer">
        <p>© 2026 IntelliHire · Smart Recruitment Management System. All rights reserved.</p>
        <nav aria-label="Footer links">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/cookies">Cookie Policy</a>
          <a href="/support">Support</a>
        </nav>
      </footer>
    </div>
  );
}

export default SignupPage;
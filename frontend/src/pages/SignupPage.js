import { useState } from 'react';
import axios from 'axios';
import '../App.css';
import logo from '../logo.png';
import SignupField from '../components/SignupField';

function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  const handleChange = event => {
    const { name, value, type, checked } = event.target;

    setFormData(current => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setStatusMessage('');
    setStatusType('');

    if (!formData.agreeTerms) {
      setStatusType('error');
      setStatusMessage('You must agree to the terms before creating an account.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/create-account', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      setStatusType('success');
      setStatusMessage(response.data?.message || 'Account created successfully.');
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to create account.';
      setStatusType('error');
      setStatusMessage(message);
    }
  };

  return (
    <div className="signup-shell">
      <header className="topbar" aria-label="IntelliHire brand">
        <img className="brand-logo" src={logo} alt="IntelliHire" />
      </header>

      <main className="signup-main">
        <section className="signup-card" aria-labelledby="signup-title">
          <h1 id="signup-title">Create Your Account</h1>

          <form className="signup-form" onSubmit={handleSubmit}>
            <SignupField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              autoComplete="name"
              icon="👤"
              required
            />

            <SignupField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              helperText="Must be a valid email address"
              autoComplete="email"
              icon="✉"
              required
            />

            <SignupField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              helperText="Min 8 characters, include a number"
              autoComplete="new-password"
              icon="🔒"
              required
            />

            <SignupField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              icon="🔒"
              required
            />

            <label className="terms">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <span>
                I agree to the <a href="/">Terms &amp; Conditions</a>
              </span>
            </label>
            <p className="terms-note">By clicking this, you accept our data privacy policy.</p>

            {statusMessage ? (
              <p className={`form-status ${statusType}`} role="status" aria-live="polite">
                {statusMessage}
              </p>
            ) : null}

            <button className="primary-button" type="submit">
              Create Account
            </button>

            <p className="auth-switch">
              Already have an account? <a href="/">Log In</a>
            </p>

            <div className="divider"><span>OR</span></div>

            <button className="social-button" type="button">
              <span className="social-icon google">◎</span>
              Continue with Google
            </button>

            <button className="social-button" type="button">
              <span className="social-icon linkedin">in</span>
              Continue with LinkedIn
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Applicant Gateway. All rights reserved.</p>
        <nav aria-label="Footer links">
          <a href="/">Terms of Service</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Cookie Policy</a>
        </nav>
      </footer>
    </div>
  );
}

export default SignupPage;
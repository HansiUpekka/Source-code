import '../App.css';
import logo from '../logo.png';
import SignupField from '../components/SignupField';

function SignupPage() {
  return (
    <div className="signup-shell">
      <header className="topbar" aria-label="IntelliHire brand">
        <img className="brand-logo" src={logo} alt="IntelliHire" />
      </header>

      <main className="signup-main">
        <section className="signup-card" aria-labelledby="signup-title">
          <h1 id="signup-title">Create Your Account</h1>

          <form className="signup-form">
            <SignupField
              label="Full Name"
              placeholder="John Doe"
              autoComplete="name"
              icon="👤"
            />

            <SignupField
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              helperText="Must be a valid email address"
              autoComplete="email"
              icon="✉"
            />

            <SignupField
              label="Password"
              type="password"
              placeholder="••••••••"
              helperText="Min 8 characters, include a number"
              autoComplete="new-password"
              icon="🔒"
            />

            <SignupField
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              icon="🔒"
            />

            <label className="terms">
              <input type="checkbox" />
              <span>
                I agree to the <a href="/">Terms &amp; Conditions</a>
              </span>
            </label>
            <p className="terms-note">By clicking this, you accept our data privacy policy.</p>

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
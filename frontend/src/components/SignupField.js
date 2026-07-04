function SignupField({ label, type = 'text', placeholder, helperText, icon, autoComplete }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <span className="field-inputWrap">
        <span className="field-icon" aria-hidden="true">
          {icon}
        </span>
        <input
          className="field-input"
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      </span>
      {helperText ? <span className="field-helper">{helperText}</span> : null}
    </label>
  );
}

export default SignupField;
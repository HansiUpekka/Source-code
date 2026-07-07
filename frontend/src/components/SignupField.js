function SignupField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  helperText,
  icon,
  autoComplete,
  required = false,
}) {
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
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
        />
      </span>
      {helperText ? <span className="field-helper">{helperText}</span> : null}
    </label>
  );
}

export default SignupField;
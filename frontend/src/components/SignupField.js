import { useState } from 'react';

function SignupField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  helperText,
  helperType,   // 'error' | undefined
  icon,
  autoComplete,
  required = false,
  children,     // optional: extra content below input (e.g. strength bar)
}) {
  const [showPass, setShowPass] = useState(false);

  const isPassword = type === 'password';
  const resolvedType = isPassword && showPass ? 'text' : type;

  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <span className="field-inputWrap">
        {icon && (
          <span className="field-icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <input
          className={[
            'field-input',
            isPassword ? 'has-eye' : '',
            helperType === 'error' ? 'has-error' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          type={resolvedType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
        />
        {isPassword && (
          <button
            type="button"
            className="field-eye"
            aria-label={showPass ? 'Hide password' : 'Show password'}
            onClick={() => setShowPass(s => !s)}
            tabIndex={-1}
          >
            {showPass ? '🙈' : '👁️'}
          </button>
        )}
      </span>
      {helperText ? (
        <span className={`field-helper${helperType ? ` ${helperType}` : ''}`}>
          {helperText}
        </span>
      ) : null}
      {children}
    </label>
  );
}

export default SignupField;
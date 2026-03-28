import React, { useState } from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, error, name, required }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="input-group">
      {label && <label className="input-label" htmlFor={name}>{label}{required && <span className="req">*</span>}</label>}
      <div style={{ position: 'relative' }}>
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`premium-input ${error ? 'input-error' : ''}`}
          style={{ paddingRight: isPassword ? '3.5rem' : '1rem' }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Input;

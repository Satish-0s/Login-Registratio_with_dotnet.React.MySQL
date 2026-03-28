import React from 'react';

const Button = ({ children, type = 'button', onClick, disabled, loading, variant = 'primary', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`premium-btn btn-${variant} ${className}`}
    >
      {loading ? <span className="btn-loader"></span> : children}
    </button>
  );
};

export default Button;

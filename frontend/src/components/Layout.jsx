import React from 'react';

const Layout = ({ children, title, subtitle }) => {
  return (
    <div className="layout-container">
      <div className="glass-panel">
        {title && <h1 className="panel-title">{title}</h1>}
        {subtitle && <p className="panel-subtitle">{subtitle}</p>}
        <div className="panel-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

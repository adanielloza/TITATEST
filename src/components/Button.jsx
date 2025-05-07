import React from "react";
import "../styles/Button.css";

function Button({ label, icon, onClick, variant = "primary", className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`button button--${variant} ${className}`}
    >
      {icon && <img src={icon} alt="icon" className="button__icon" />}
      <span>{label}</span>
    </button>
  );
}

export default Button;

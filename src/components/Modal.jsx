import React from "react";
import "../styles/Modal.css";

function Modal({ isOpen, onClose, title, subtitle, children, footer }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose}></div>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>

        {title && <h2 className="modal__title">{title}</h2>}
        {subtitle && <p className="modal__subtitle">{subtitle}</p>}

        <div className="modal__body">{children}</div>

        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;

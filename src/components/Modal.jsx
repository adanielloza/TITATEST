import React from "react";
import "../styles/Modal.css";
import useEscapeToClose from "../hooks/useEscapeToClose";
import Button from "./Button";

function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  onCancel,
  onConfirm,
}) {
  useEscapeToClose(isOpen, onClose);

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

        <div className="modal__footer">
          <Button
            label="Cancelar"
            variant="secondary"
            onClick={onCancel || onClose}
          />
          <Button label="Guardar" variant="primary" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
}

export default Modal;

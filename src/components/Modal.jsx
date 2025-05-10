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
  isConfirmDisabled,
  cancelLabel = "Cancelar",
  confirmLabel = "Guardar",
  cancelVariant = "secondary",
  confirmVariant = "primary",
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
            label={cancelLabel}
            variant={cancelVariant}
            onClick={onCancel || onClose}
          />
          <Button
            label={confirmLabel}
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={isConfirmDisabled}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;

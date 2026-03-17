import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";

export const CommonModal = (props) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .modal-content {
        border: none !important;
        box-shadow: none !important;
        background: transparent !important;
      }
      .modal-dialog {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        min-height: 100vh !important;
        margin: 0 auto !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Modal {...props} centered size="lg">
      <Modal.Body
        className={props.bodyClasses}
        style={{
          border: "none",
          boxShadow: "none",
          background: "transparent",
          padding: "0"
        }}
      >
        {props.children}
      </Modal.Body>
    </Modal>
  );
};
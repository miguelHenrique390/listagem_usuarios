import React from "react";
import Modal from "./Modal";

function ErrorMessage({ isOpen, onClose, mensagem, titulo }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="error-message">
                <div className="error-icon">✕</div>
                <h2>{titulo || "Erro!"}</h2>
                <p>{mensagem}</p>
                <button className="error-button" onClick={onClose}>
                    Fechar
                </button>
            </div>
        </Modal>
    );
}

export default ErrorMessage;

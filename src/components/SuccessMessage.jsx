import React from "react";
import Modal from "./Modal";

function SuccessMessage({ isOpen, onClose, mensagem, titulo }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="success-message">
                <div className="success-icon">✓</div>
                <h2>{titulo || "Sucesso!"}</h2>
                <p>{mensagem}</p>
                <button className="success-button" onClick={onClose}>
                    Fechar
                </button>
            </div>
        </Modal>
    );
}

export default SuccessMessage;

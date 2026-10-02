function SuccessMessage({ mensagem }) {
    return (
        <p className="success-snackbar" role="status" aria-alive="polite">
            {mensagem}
        </p>
    )
}

export default SuccessMessage;
function UserCardComponent({
    usuario,
    onSelecionarUsuario,
    onExcluirUsuario,
    excluindo,
}) {
    return (
        <li className="card-usuario">

            <div className="avatar">
                {usuario.name.charAt(0)}
            </div>

            <h2 className="nome-usuario">
                {usuario.name}
            </h2>

            <p className="username">
                @{usuario.username}
            </p>

            <p className="email">
                {usuario.email}
            </p>

            <div className="acoes-usuario">
                <button
                    type="button"
                    onClick={() => onSelecionarUsuario(usuario.id)}
                >
                    Ver detalhes
                </button>

                <button
                    className="botao-excluir-usuario"
                    type="button"
                    disabled={excluindo}
                    onClick={() => onExcluirUsuario(usuario.id)}
                >
                    {excluindo ? "Excluindo..." : "Excluir"}
                </button>
            </div>

        </li>
    );
}

export default UserCardComponent; 
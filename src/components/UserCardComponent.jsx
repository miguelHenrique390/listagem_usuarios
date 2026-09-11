function UserCardComponent(props) {
    const usuario = props.usuario;
    const onSelecionarUsuario = props.onSelecionarUsuario;

    return (
        <li className="user-card">

            <div className="user-avatar">
                {usuario.name.charAt(0)}
            </div>

            <div className="user-info">

                <h2>{usuario.name}</h2>

                <p className="username">
                    @{usuario.username}
                </p>

                <p>
                    ✉️ {usuario.email}
                </p>

                <p>
                    📞 {usuario.phone}
                </p>

                <p>
                    🌐 {usuario.website}
                </p>

                <p>
                    📍 {usuario.address.city}
                </p>

                <button
                onClick={() => {
                    onSelecionarUsuario(usuario.id)
                }}
                >Ver Detalhes
                </button>

            </div>

        </li>
    );
}

export default UserCardComponent;
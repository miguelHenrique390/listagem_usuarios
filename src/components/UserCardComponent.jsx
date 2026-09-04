function UserCardComponent(props) {
    const usuario = props.usuario;

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

            </div>

        </li>
    );
}

export default UserCardComponent;
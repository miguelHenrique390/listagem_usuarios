import UserCardComponent from "./UserCardComponent";

function UserListComponent(props) {
    return (
        <ul>
            {props.usuarios.map(usuario => (
                <UserCardComponent
                    key={usuario.id}
                    usuario={usuario}
                    onSelecionarUsuario={props.onSelecionarUsuario}

                />
            ))}
        </ul>
    )
}

export default UserListComponent;
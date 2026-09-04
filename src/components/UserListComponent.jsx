import UserCardComponent from "./UserCardComponent";

function UserListComponent(props) {
    return (
        <ul>
            {props.usuarios.map(usuario => (
                <UserCardComponent
                    key={usuario.id}
                    usuario={usuario}
                />
            ))}
        </ul>
    )
}

export default UserListComponent;
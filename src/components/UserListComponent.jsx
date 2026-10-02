import UserCardComponent from "./UserCardComponent";

function UserListComponent({ usuarios, onSelecionarUsuario }) {
    return (
        <ul className="lista-usuarios">

            {usuarios.map((usuario) => (
                <UserCardComponent
                    key={usuario.id}
                    usuario={usuario}
                    onSelecionarUsuario={onSelecionarUsuario}
                />
            ))}

        </ul>
    );
}

export default UserListComponent;
import UserCardComponent from "./UserCardComponent";

function UserListComponent({
    usuarios,
    onSelecionarUsuario,
    onExcluirUsuario,
    usuariosExcluindo,
}) {
    return (
        <ul className="lista-usuarios">

            {usuarios.map((usuario) => (
                <UserCardComponent
                    key={usuario.id}
                    usuario={usuario}
                    onSelecionarUsuario={onSelecionarUsuario}
                    onExcluirUsuario={onExcluirUsuario}
                    excluindo={usuariosExcluindo.includes(usuario.id)}
                />
            ))}

        </ul>
    );
}

export default UserListComponent;
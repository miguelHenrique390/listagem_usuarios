function NovoUsuarioComponent({ novoUsuario }){
return(
    <div>
        <h2>Novo usuario cadastrado</h2>

        <p>
        <strong>Nome: </strong>{novoUsuario.name}
        </p>

        <p>
            <strong>Usuario: </strong>{novoUsuario.username}
        </p>

        <p>
            <strong>E-mail: </strong>{novoUsuario.email}
        </p>

    </div>
)

}
export default NovoUsuarioComponent
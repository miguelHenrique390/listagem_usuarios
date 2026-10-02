import { useState } from "react";

function UserFormComponent({ onCadastrar }) {
    const [nome, setNome] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")

    function handleSubmit(evento) {
        evento.preventDefault()
        const novoUsuario = {
            name: nome,
            username: username,
            email: email,
            phone: telefone,
        }
        onCadastrar(novoUsuario)
        limparFormulario()
    }

    function limparFormulario() {
        setNome("")
        setUsername("")
        setEmail("")
        setTelefone("")
    }

    return (
        <form className="formulario-usuario" onSubmit={handleSubmit}>
            <header className="formulario-usuario__cabecalho">
                <p>Cadastro</p>
                <p>Novo Usuario</p>
            </header>

            <div className="campo-formulario">
                <label htmlFor="novo-usuario-nome">Nome</label>
                <input
                    type="text"
                    id="novo-usuario-nome"
                    autoComplete="name"
                    value={nome}
                    onChange={(evento) => setNome(evento.target.value)}
                />
            </div>

            <div className="campo-formulario">
                <label htmlFor="novo-usuario-username">Usuario</label>
                <input
                    type="text"
                    id="novo-usuario-username"
                    autoComplete="username"
                    value={username}
                    onChange={(evento) => setUsername(evento.target.value)}
                />
            </div>

            <div className="campo-formulario">
                <label htmlFor="novo-usuario-email">Email</label>
                <input
                    type="email"
                    id="novo-usuario-email"
                    autoComplete="email"
                    value={email}
                    onChange={(evento) => setEmail(evento.target.value)}
                />
            </div>

            <div className="campo-formulario">
                <label htmlFor="novo-usuario-telefone">Telefone</label>
                <input
                    type="tel"
                    id="novo-usuario-telefone"
                    autoComplete="tel"
                    value={telefone}
                    onChange={(evento) => setTelefone(evento.target.value)}
                />
            </div>

            <button className="botao-cadastrar" type="submit">
                Cadastrar
            </button>
        </form>
    )
}

export default UserFormComponent;
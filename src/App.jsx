import { useEffect, useState } from "react";
import axios from "axios";

import HeaderComponent from "./components/HeaderComponent";
import LoadingComponent from "./components/LoadingComponent";
import UserListComponent from "./components/UserListComponent";
import SuccessMessage from "./components/SuccessMensage";

import "./App.css";
import UserDetailsComponent from "./components/UserDetailsComponent";
import NovoUsuarioComponent from "./components/NovoUsuarioComponent";
import ModalComponent from "./components/ModalComponent";
import UserFormComponent from "./components/UserFormComponent";



const filtrarUsuarioPorTermo = (termo) => (usuario) => {
    const termoLower = termo.toLowerCase();
    return (
        usuario.name.toLowerCase().includes(termoLower) ||
        usuario.username.toLowerCase().includes(termoLower) ||
        usuario.email.toLowerCase().includes(termoLower)
    );
};


function App() {
    const url = "https://jsonplaceholder.typicode.com";

    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [busca, setBusca] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null)
    const [novoUsuario, setNovoUsuario] = useState(null)
    const [modalNovoUsuarioAberto, setModalNovoUsuarioAberto] = useState(false)
    const [mensagem, setMensagem] = useState(null)
    const [erroExclusao, setErroExclusao] = useState(null)
    const [usuariosExcluindo, setUsuariosExcluindo] = useState([])


    const usuariosFiltrados = usuarios
        .filter(filtrarUsuarioPorTermo(busca));

    async function buscarUsuario(id) {
        try {
            const response = await axios.get(
                `${url}/users/${id}`
            )
            const data = response.data
            setUsuarioSelecionado(data)
        } catch (error) {
            console.log("Erro ao buscar usuário: ", error)
        }
    }


    async function buscarUsuarios() {
        try {
            setCarregando(true);
            const response = await axios.get(
                `${url}/users`
            );

            const data = response.data;

            setUsuarios(data);
        } catch (error) {
            console.log(
                "Erro ao buscar usuários: ",
                error
            );
            setErro(
                `Não foi possível carregar os usuários. Código: ${error.message}`
            );
            setUsuarios([]);
        } finally {
            setCarregando(false);
        }
    }

    function limparDetalhesUsuario() {
        setUsuarioSelecionado(null)
    }

    async function cadastrarUsuario(usuario) {
        try {
            const response = await axios.post(
                `${url}/users`, usuario
            )
            const data = response.data
            setNovoUsuario(data)
            setUsuarios([...usuarios, data])
            setMensagem("Usuário cadastrado com sucesso!")
            setModalNovoUsuarioAberto(false)
        } catch (error) {
            console.log("Erro ao cadastrar usuário: ", error)
        }
    }

    async function excluirUsuario(id) {
        const usuario = usuarios.find((item) => item.id === id)
        if (!usuario || !window.confirm(`Deseja excluir o usuário ${usuario.name}?`)) {
            return
        }

        setErroExclusao(null)
        setUsuariosExcluindo((ids) => [...ids, id])

        try {
            await axios.delete(`${url}/users/${id}`)
            setUsuarios((usuariosAtuais) =>
                usuariosAtuais.filter((item) => item.id !== id)
            )

            if (usuarioSelecionado?.id === id) {
                limparDetalhesUsuario()
            }
            if (novoUsuario?.id === id) {
                setNovoUsuario(null)
            }

            setMensagem("Usuário excluído com sucesso!")
        } catch (error) {
            console.error("Erro ao excluir usuário:", error)
            setErroExclusao(
                `Não foi possível excluir o usuário. Código: ${error.message}`
            )
        } finally {
            setUsuariosExcluindo((ids) => ids.filter((item) => item !== id))
        }
    }

    useEffect(() => {
        buscarUsuarios();
    }, []);

    useEffect(() => {
        if (!mensagem) {
            return undefined
        }

        const timer = window.setTimeout(() => {
            setMensagem(null)
        }, 4000)

        return () => window.clearTimeout(timer)
    }, [mensagem])


    return (
        <div className="app">
            <HeaderComponent
                busca={busca}
                setBusca={setBusca}
            />

            <button
            className="botao-novo-usuario"
            type="button"
            onClick={() => setModalNovoUsuarioAberto(true)}
            >Novo Usuario</button>


            {carregando && (
                <LoadingComponent />
            )}

            <p className="informacao">
                Usuários encontrados: {usuarios.length}
            </p>

            {erro && (
                <p className="erro">
                    {erro}
                </p>
            )}

            {erroExclusao && (
                <p className="erro" role="alert">
                    {erroExclusao}
                </p>
            )}


            {!carregando && !erro && (
                <>
                    <p className="informacao">
                        {usuariosFiltrados.length} usuário(s) encontrado(s)
                    </p>

                    {usuariosFiltrados.length > 0 ? (
                        <UserListComponent
                            usuarios={usuariosFiltrados}
                            onSelecionarUsuario={buscarUsuario}
                            onExcluirUsuario={excluirUsuario}
                            usuariosExcluindo={usuariosExcluindo}
                        />
                    ) : (
                        <p className="sem-resultados">
                            Nenhum usuário encontrado.
                        </p>
                    )}

                    {usuarioSelecionado && (
                        <ModalComponent onFechar={limparDetalhesUsuario}>
                            <UserDetailsComponent
                                usuario={usuarioSelecionado}
                                onFecharDetalhes={limparDetalhesUsuario}
                            />
                        </ModalComponent>
                    )}

                    {novoUsuario && (
                        <NovoUsuarioComponent novoUsuario={novoUsuario} />
                    )}                    
                </>
            )}

            {mensagem && (
                <SuccessMessage mensagem={mensagem} />
            )}


            {modalNovoUsuarioAberto && (
                <ModalComponent
                    titulo="Novo Usuario"
                    onFechar={() => setModalNovoUsuarioAberto(false)}
                >
                    <UserFormComponent onCadastrar={cadastrarUsuario} />
                </ModalComponent>
            )}

            

        </div>
    );
}

export default App;
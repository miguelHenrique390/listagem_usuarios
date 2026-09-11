import { useEffect, useState } from "react"
import axios from "axios";
import "./app.css";

import HeaderComponent from "./components/HeaderComponent";
import LoadingComponent from "./components/LoadingComponent";
import UserCardComponent from "./components/UserCardComponent";
import UserDetailsComponents from "./components/UserDetailsComponents";
import UserForm from "./components/UserForm";
import NovoUsuarioComponent from "./components/NovoUsuarioComponent";
import Modal from "./components/Modal";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";

const filtrarUsuariosPorTermo = (termo) => (usuario) => {
    const termoLower = termo.toLowerCase()
    return (
        usuario.name.toLowerCase().includes(termoLower) ||
        usuario.username.toLowerCase().includes(termoLower) ||
        usuario.email.toLowerCase().includes(termoLower)
    );
}

function App() {
    const url = "https://jsonplaceholder.typicode.com";
    const [usuarios, setUsuarios] = useState([])
    const [erro, setErro] = useState(null)
    const [carregando, setCarregando] = useState(true)
    const [busca, setBusca] = useState('')
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null) 
    const [novoUsuario, setNovoUsuario] = useState(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [mensagemModal, setMensagemModal] = useState("")
    const [tituloModal, setTituloModal] = useState("")
    // define o inicial da variavel


const usuariosFiltrados = usuarios.filter(filtrarUsuariosPorTermo(busca));

async function buscarUsuario(id){
    try {
        const response = await axios.get(
            `${url}/users/${id}`
        )
        const data = response.data
        setUsuarioSelecionado(data)
    
    } catch (error) {
        console.log("Erro ao buscar usuario", error)
    }
    
}



    /*espera exec a funcao e dps roda o codigo*/

    async function buscarUsuarios() {
        try {
            setCarregando(true)
            const response = await axios.get(`${url}/users`)
            const data = response.data
            console.log(data)

            setUsuarios(data)

        } catch (error) {

            console.log('Erro ao buscar usuario', error)
            setTituloModal("Erro ao Buscar Usuários")
            setMensagemModal(`Não foi possível buscar os usuários. Código: ${error.message}`)
            setShowErrorModal(true)
            setUsuarios([]) // limpa a lista de usuarios

        } finally {
            setCarregando(false)
        }



    }


    function limparDetalhesUsuario() {
        setUsuarioSelecionado(null)
    }


async function cadastrarUsuario(usuario) {
    try{
        const response = await axios.post(
            `${url}/users`, usuario
        )
        const data = response.data
        setNovoUsuario(data)
        setTituloModal("Usuário Cadastrado com Sucesso!")
        setMensagemModal(`O usuário ${data.name} foi cadastrado com sucesso no sistema.`)
        setShowSuccessModal(true)
    } catch (error) {
        console.log("Erro ao cadastrar usuario: ", error)
        setTituloModal("Erro ao Cadastrar Usuário")
        setMensagemModal(`Não foi possível cadastrar o usuário. Por favor, tente novamente.`)
        setShowErrorModal(true)
    }
}




    useEffect(() => {
        buscarUsuarios()
    }, []) // array de dependencias vazio, executa apenas uma vez



    return (
        <div>

            <HeaderComponent
                busca={busca}
                setBusca={setBusca}
            />

        {carregando && (
            <LoadingComponent />
        )}

            <p>
                Usuarios encontrados {usuarios.length}
            </p>
            
            {!carregando && (
                <>
                    <p>
                        {usuariosFiltrados.length} usuario(s) encontrado(s)
                    </p>

                    {usuariosFiltrados.length > 0 ? (
                        <ul>
                            {usuariosFiltrados.map(usuario => (
                                <UserCardComponent
                                    key={usuario.id}
                                    usuario={usuario}
                                    onSelecionarUsuario={buscarUsuario}
                                />
                            ))}
                        </ul>
                    ) : (<p>nenhum usuario encontrado</p>)}

                    {usuarioSelecionado && <UserDetailsComponents
                    usuario={usuarioSelecionado} onFecharDetalhes={limparDetalhesUsuario}
                    />}

                    {novoUsuario && (
                      <NovoUsuarioComponent novoUsuario={novoUsuario}/>
                    )}

                </>
            )}

            <UserForm onCadastrar={cadastrarUsuario} />

            <SuccessMessage 
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                titulo={tituloModal}
                mensagem={mensagemModal}
            />

            <ErrorMessage 
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                titulo={tituloModal}
                mensagem={mensagemModal}
            />

        </div>
    );
}





export default App;
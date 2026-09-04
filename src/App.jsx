import { useEffect, useState } from "react"
import axios from "axios";
import "./app.css";

import HeaderComponent from "./components/HeaderComponent";
import LoadingComponent from "./components/LoadingComponent";
import UserCardComponent from "./components/UserCardComponent";


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
    const usuariosFiltrados = usuarios.filter(filtrarUsuariosPorTermo(busca))
    // define o inicial da variavel




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
            setErro(`Não foi possivel buscar os usuarios. Codigo: ${error.message}`)

            setUsuarios([]) // limpa a lista de usuarios

        } finally {
            setCarregando(false)
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

            {erro && (
                <p>{erro}</p>
            )}
            {!carregando && !erro && (
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
                                />
                            ))}
                        </ul>
                    ) : (<p>nenhum usuarios encontrado</p>)
                
                }


                </>



            )}

        </div>
    );
}





export default App;
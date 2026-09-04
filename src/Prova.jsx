import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import "./prova.css"

export default function Prova() {
    
    const { id } = useParams()
    const [questao, setQuestao] = useState(null)
    const [questaoIndex, setQuestaoIndex] = useState(1)

    async function buscarQuestao() {
        const respostaQuestao = await fetch (
            `https://api.enem.dev/v1/exams/${id}/questions/${questaoIndex}`
        )
        const dadosQuestao = await respostaQuestao.json()
        setQuestao(dadosQuestao)
    }

    function avancar() {
        if (questaoIndex === 180) {
            alert('Não é possível avançar 😒')
        } else {
            setQuestaoIndex(questaoIndex + 1)
        }
    }

    function voltar() {
        if (questaoIndex === 1) {
            alert('Não é possível voltar 😒')
        } else {
            setQuestaoIndex(questaoIndex - 1)
        }
    }

    function verResposta(questao) {
        alert(`Resposta Correta: ${questao.correctAlternative}`)
    }

    useEffect(() => {
        buscarQuestao()
    }, [questaoIndex])

    return (
        questao ? 
            <div>
                <h1>{questao.title}</h1>
                <p>{questao.context}</p>
                <p>
                    <b>
                        {questao.alternativesIntroduction}
                    </b>
                </p>

                <ul style={{ listStyleType: 'upper-alpha'}}>
                    {questao.alternatives.map((alt, i) => {
                        return (
                            <li key={i}>
                                {alt.text}
                            </li>
                        )
                    })}
                </ul>

                <button onClick={() => verResposta(questao)}>
                    Ver Resposta
                </button>

                <button onClick={avancar}>
                    Avançar Questão
                </button>

                <button onClick={voltar}>
                    Voltar Questão
                </button>
            </div> 
        : null
    )
}
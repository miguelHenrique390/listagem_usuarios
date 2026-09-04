

function HeaderComponent(props) {
    return (
    
        <header className="app-header">
            <div className="header-content">

            <h1>
                Catalogo de usuarios
            </h1>

                <span>Veja os usuarios presentes no sistema!</span>


            <input
                type="text"
                placeholder="filtrar usuarios..."
                value={props.busca}
                onChange={(evento) => { props.setBusca(evento.target.value) }}
            />

            </div>
        </header>
    );
}

export default HeaderComponent;

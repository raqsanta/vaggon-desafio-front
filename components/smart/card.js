
export default function SmartCard(props) {

    if (!props.currentCard) {
        return (
            <div className="card w-100">
                <div className="card-body d-flex justify-content-center">
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="card w-100">
            <div className="card-body">
                <h5 className="card-title">Visitar parentes</h5>
                <h6 className="card-subtitle mb-2 text-muted">Iniciado em 02/02/2022</h6>
                <h6 className="card-subtitle mb-2 text-muted">Encerrado em 08/02/2022</h6>
                <p className="card-text">Nessa semana eu irei visitar meus pais, que não vejo faz muito tempo.</p>
                <a href="#" className="card-link">Editar</a>
            </div>
        </div>
    )

}
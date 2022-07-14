
export default function SmartCard(props) {

    if (!props.currentCard.name) {
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
                <h5 className="card-title">{props.currentCard.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Iniciado em {props.currentCard.beginsdate}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Encerrado em {props.currentCard.expiresdate}</h6>
                <p className="card-text">{props.currentCard.description}</p>
                <a href="#" className="card-link">Editar</a>
            </div>
        </div>
    )

}
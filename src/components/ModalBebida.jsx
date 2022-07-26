import { Modal, Image, Button } from 'react-bootstrap'
import useBebidas from '../hooks/useBebidas'

const ModalBebida = () => {
    const { handleModalClick, modal, receta, cargando, agregarFavoritos } = useBebidas()
    const { strDrink, strDrinkThumb, strInstructions } = receta

    const mostrarIngredientes = () => {
        let ingredientes = []

        for(let i=1; i < 16; i++) {
            if(receta[`strIngredient${i}`]) {
                ingredientes.push(
                    <li>
                        {receta[`strMeasure${i}`]} {' - '}
                        {receta[`strIngredient${i}`]} 
                    </li>
                )
            }
        }

        return ingredientes
    }

    return (
        !cargando && (
            <Modal show={modal} onHide={handleModalClick}>
                <Image 
                    src={strDrinkThumb}
                    alt={`Imagen receta ${strDrink}`}
                />
                <Modal.Header>
                    <Modal.Title>{strDrink}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-3">
                        <h2>Instrucciones</h2>
                        {strInstructions}
                        <h2>Ingredientes y Cantidad</h2>
                        {mostrarIngredientes()}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant='danger'
                        onClick={agregarFavoritos}
                    >
                        Agregar a Favoritos
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    )
}

export default ModalBebida
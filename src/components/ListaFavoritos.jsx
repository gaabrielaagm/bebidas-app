import { Modal, Image, Button, ListGroup, Row, Col } from 'react-bootstrap'
import useBebidas from '../hooks/useBebidas'

const ListaFavoritos = () => {
    const { modalFavoritos, handleModalFavoritosClick, listaFavoritos, removerFavoritos } = useBebidas()
    
    return (
        <Modal show={modalFavoritos} onHide={handleModalFavoritosClick}>
            <Modal.Header className='justify-content-center'>
                <h2>Tus Favoritos</h2>
            </Modal.Header>
            <Modal.Body>
                {listaFavoritos && listaFavoritos.length > 0 
                    ? (
                        <ListGroup variant='flush'>
                            {listaFavoritos.map(favorito => (
                                <ListGroup.Item 
                                    key={favorito.idDrink}
                                    className='justify-items-center'
                                >
                                    <Row className='m-3'>
                                        <Col md={6}>
                                            <Image 
                                                width={120}
                                                height={130}
                                                src={favorito.strDrinkThumb}
                                                alt={`Imagen Bebida ${favorito.strDrink}`}
                                            />
                                        </Col>
                                        <Col md={6} className='mt-4'>
                                            <h5>{favorito.strDrink}</h5>
                                            <Button
                                                variant='danger'
                                                onClick={() => removerFavoritos(favorito.idDrink)}
                                            >
                                                Remover
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <h5 className='mt-5'>No hay bebidas agregadas a Favoritos :(</h5>
                    )
                }
            </Modal.Body>
        </Modal>
    )
}

export default ListaFavoritos
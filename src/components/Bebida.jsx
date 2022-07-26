import { Card, Col, Button } from 'react-bootstrap'
import useBebidas from '../hooks/useBebidas'

const Bebida = ({bebida}) => {
    const { handleModalClick, handleBebidaIdClick } = useBebidas()
    const { idDrink, strDrink, strDrinkThumb} = bebida

    return (
        <Col md={2} lg={3}>
            <Card className='mb-4'>
                <Card.Img
                    variant='top'
                    src={strDrinkThumb}
                    alt={`Imagen de ${strDrink}`}
                />
                <Card.Body>
                    <Card.Title>
                        {strDrink}
                    </Card.Title>
                    <Card.Text>
                        Ver más
                    </Card.Text>
                    <Button
                        variant='warning'
                        className='w-100 text-uppercase mt-3'
                        onClick={() => {
                            handleModalClick()
                            handleBebidaIdClick(idDrink)
                        }}
                    >
                        Ver Receta
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Bebida
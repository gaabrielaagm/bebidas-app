import { useState } from 'react'
import { Button, Form, Row, Col, Alert } from 'react-bootstrap'
import useCategorias from '../hooks/useCategorias'
import useBebidas from '../hooks/useBebidas'

const Formulario = () => {
    const { categorias } = useCategorias()
    const { consultarBebida, handleModalFavoritosClick } = useBebidas()

    const [busqueda, setBusqueda] = useState({
        nombre: 'Wine',
        categoria: 'Cocktail'
    })
    const [alerta, setAlerta] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        if(Object.values(busqueda).includes('')) {
            setAlerta('Todos los campos son Obligatorios')
            return
        }

        setAlerta('')
        consultarBebida(busqueda)
    }

    return (
        <Form onSubmit={handleSubmit}>
            {alerta && 
                <Alert
                    variant='danger'
                    className='text-center'
                >
                    {alerta}
                </Alert>
            }
            <Row className="justify-content-end">
                <Col md={3}>
                    <Button
                        variant='warning'
                        className='text-uppercase w-100'
                        onClick={() => handleModalFavoritosClick()}
                    >
                        Ver Favoritos
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor='nombre'>Nombre Bebida</Form.Label>
                        <Form.Control 
                            id="nombre"
                            type="text"
                            placeholder="Nombre en Ingles: Tequila, Beer, Wine, etc"
                            name="nombre"
                            value={busqueda.nombre}
                            onChange={e => setBusqueda({
                                ...busqueda,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor='categoria'>Categoría</Form.Label>
                        <Form.Select
                            id="categoria"
                            name="categoria"
                            value={busqueda.categoria}
                            onChange={e => setBusqueda({
                                ...busqueda,
                                [e.target.name]: e.target.value
                            })}
                        >
                            <option>Selecciona Categoría</option>
                            {categorias.map(categoria => (
                                <option
                                    key={categoria.strCategory}
                                    value={categoria.strCategory}
                                >
                                    {categoria.strCategory}
                                </option>
                            ))}
                        </Form.Select> 
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-end">
                <Col md={3}>
                    <Button
                        type="submit"
                        variant='danger'
                        className='text-uppercase w-100'
                    >
                        Buscar bebidas
                    </Button>
                </Col>
            </Row>
        </Form>
    ) 
}

export default Formulario
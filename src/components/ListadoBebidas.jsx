import useBebidas from '../hooks/useBebidas'
import { Row } from 'react-bootstrap'
import Bebida from './Bebida'

const ListadoBebidas = () => {
    const { bebidas } = useBebidas()
    
    return (
        bebidas && (
            <Row className='mt-5'>
                {bebidas.map((bebida, index) => (
                    <Bebida
                        key={index}
                        bebida={bebida}
                    />
                ))}
            </Row>
        )
    )
}

export default ListadoBebidas
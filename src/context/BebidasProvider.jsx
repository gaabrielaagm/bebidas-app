import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const BebidasContext = createContext()

const BebidasProvider = ({children}) => {
    const [bebidas, setBebidas] = useState([])
    const [modal, setModal] = useState(false)
    const [modalFavoritos, setModalFavoritos] = useState(false)
    const [bebidaId, setBebidaId] = useState(null)
    const [receta, setReceta] = useState({})
    const [cargando, setCargando] = useState(false)
    const [listaFavoritos, setListaFavoritos] = useState([])

    useEffect(() => {
        const favoritosLS = JSON.parse(localStorage.getItem('favoritos')) ?? []
        setListaFavoritos(favoritosLS)
    }, [])
    
    useEffect(() => {
        localStorage.setItem('favoritos', JSON.stringify(listaFavoritos))
    }, [listaFavoritos])

    useEffect(() => {
        setCargando(true)
        if (!bebidaId) return 
        
        const consultarRecetaBebida = async () => {
            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
                const { data: { drinks } } = await axios(url)

                setReceta(drinks[0])
            } catch (error) {
                console.error(error)            
            } finally {
                setCargando(false)
            }
        }
        consultarRecetaBebida()
        
    }, [bebidaId])

    const handleModalClick = () => {
        setModal(!modal)
        setReceta({})
    }

    const handleModalFavoritosClick = () => {
        setModalFavoritos(!modalFavoritos)
    }

    const handleBebidaIdClick = id => {
        setBebidaId(id)
    }

    const consultarBebida = async datos => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`
            const { data: { drinks} } = await axios(url)
            setBebidas(drinks)
        } catch (error) {
            console.error(error)
        }
    }

    const agregarFavoritos = () => {
        const existe = listaFavoritos.some(fav => fav.idDrink === receta.idDrink)
        if(existe) return 
        
        setListaFavoritos([
            ...listaFavoritos,
            {
                strDrink: receta.strDrink,
                idDrink: receta.idDrink,
                strDrinkThumb: receta.strDrinkThumb
            }
        ])
    }

    const removerFavoritos = (id) => {
        console.log(id)
        const listaFavorActualizada = listaFavoritos.filter(favorito => favorito.idDrink !== id)
        console.log(listaFavorActualizada)
        setListaFavoritos(listaFavorActualizada)
    }

    return (
        <BebidasContext.Provider
            value={{
                consultarBebida,
                bebidas,
                handleModalClick,
                modal,
                handleBebidaIdClick,
                receta,
                cargando,
                listaFavoritos,
                agregarFavoritos,
                handleModalFavoritosClick,
                modalFavoritos,
                removerFavoritos
            }}
        >
            {children}
        </BebidasContext.Provider>
    )
}

export {
    BebidasProvider
}

export default BebidasContext
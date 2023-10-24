import axios from "axios"
import { useState, useEffect, createContext } from "react"
import useNoticias from "../hooks/useNoticias"

const NoticiasContext = createContext()

const NoticiasProvider = ({children}) => {

    const [categoria,setCategoria] = useState("general")
    const [noticias,setNoticias] = useState([])
    const [pagina,setPagina] = useState(1)
    const [totalNoticias,setTotalNoticias] = useState(0)

    //useEffect que traer noticias cada que cambia categoria
    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`

            const { data } = await axios(url)
            setNoticias(data.articles)
            setTotalNoticias(data.totalResults)
            setPagina(1)
        }
        consultarAPI()
    }, [categoria])

    //useEffect paginación
    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=us&page=${pagina}&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`

            const { data } = await axios(url)
            setNoticias(data.articles)
            setTotalNoticias(data.totalResults)
        }
        consultarAPI()
    }, [pagina])
    

    const handleChangeCategoria = e => {
        setCategoria(e.target.value)
    }
    
    const handleChangePagina = (e,valor) => {
        setPagina(valor)
        window.scrollTo(0, 0); // desplazar hacia arriba
        //Al debugear con este log, vemos que los nums son btns sin value, por lo que en vez de value usaremos textContent. Aun asi, al clickear en las flechas, estas no tienen textContent, por lo que pasaremos un segundo argumento llamado, valor, que nos retorna el valor actual
        // console.log(valor)
    }

  return (
   <NoticiasContext.Provider
        value={{
            categoria,
            handleChangeCategoria,
            noticias,
            totalNoticias,
            handleChangePagina,
            pagina
        }}
   >
        {children}
   </NoticiasContext.Provider>
  )
}

export {
    NoticiasProvider
}

export default NoticiasContext
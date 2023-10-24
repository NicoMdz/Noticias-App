import { Button, Grid, Typography } from "@mui/material"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import useNoticias from "../hooks/useNoticias"
import Noticia from "./Noticia"

const ListadoNoticias = () => {

    const { noticias,totalNoticias,handleChangePagina,pagina } = useNoticias()
    
    //Lógica Paginación (Math.ceil redondea siempre hacia arriba)

    const totalPaginas = Math.ceil(totalNoticias / 20)  //entre 20 pq eso retorna la API, puede modificarse pero no lo haremos
 
  return (
    <>
        <Typography
            textAlign={"center"}
            marginY={5}
            variant="h3"
            component={"h2"}
        >
            Últimas Noticias
        </Typography>
        <Button
            sx={{
                marginBottom: 1,
            }}
            onClick={ e => {
                window.scrollTo(0, 10000);
            }}
        >
            Ir al fondo
        </Button>
        
        <Grid
            container
            spacing={2}
        >
            {noticias.map(noticia => (
                <Noticia 
                    key={noticia.url}
                    noticia={noticia}
                />
            ))}
        </Grid>
        <Stack
            sx={{
                marginY: 5
            }}
            spacing={2}
            direction={"row"}
            justifyContent="center"
            alignItems={"center"}
        >
            <Pagination 
                count={totalPaginas} 
                color="primary" 
                onChange={handleChangePagina}
                page={pagina}    
            />
        </Stack>

    </>
  )
}

export default ListadoNoticias
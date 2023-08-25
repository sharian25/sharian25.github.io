import React from 'react'
import { useState } from 'react';
import {Container,Typography,Box, TextField, getNativeSelectUtilityClasses} from "@mui/material"
import { LoadingButton } from '@mui/lab';

const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=`
const urlApi2 =  `&lang=es&units=metric&appid=55fed173dbbbae45d6acd4f1a920d2f1`

function PlaceWheather() {
const [city, setCity] = useState("");
const [loading, setLoading] = useState(false)
const [error, setError] = useState({
  error:false,
  message:"",
})
const [weather, setWeather] = useState({
city:"",
country:"",
temp:"",
conditión:"",
icon: "",
description:"",

})


  const onSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);
    setError({
      error: false,
      menssage: "",
    })
    try {
      if (!city.trim()) throw {message:"Este Campo es Obligatorio"};
      const response = await fetch(`${urlApi}${city}${urlApi2}`) //Consume los datos del Api y a
      const data = await response.json(); //promesa devuelta por el fetch

      if (data.error) throw {message:data.error.menssage}; //gatilla el cath y vuelva a mostrar el mensaje
      //si es correcto nos devolverá el objeto desde el estado y cargamos los valores
        setWeather({
       city: data.name,
       temp: data.main.temp,
       description: data.weather[0].description,
       icon: data.weather[0].icon,
       country: data.sys.country,
        /*   
          
          conditión: data.main,
          ,
           */
        })


      console.log(data);
    } catch (error) {
      setError({
        error: true,
        message: error.message,
      });
    } finally{
      setLoading(false);
    }
  }


  return (
    <Container
    maxWidth="sm"
    sx={{mt:2}}
    >
      <Typography
      variant='h3'
      component="h1"
      align='center'
      gutterBottom
      >
        Wheather app
    </Typography>
    <Box
    sx={{display:"grid", gap: 2}}
    component="form"
    autoComplete='off'
    onSubmit={onSubmit}
    >
      <TextField
      id='city'
      label='Ciudad'
      variant='outlined'
      size='small'
      required
      value={city}
      onChange={(e) => setCity (e.target.value)}
      error={error.error}
      helperText={error.message
      }
      />

      <LoadingButton
      type="submit"
      variant="contained"
      loading={loading}
      loadingIndicator="Buscando Ciudad"
      >
      Buscar
      </LoadingButton>
    </Box>
        {weather.city && (
          <Box
          sx = {{
            mt:2,
            display:"grid",
            gap: 2,
            textAlign: "center"
          }}
          >
            <Typography variant='h4' component="h2">
            {weather.city},{weather.country}
            </Typography>
            <Box
            /* component="img"
            alt={weather.description}
            src={weather.icon}
            sx={{margin: "0 auto"}} */
            >
              <Typography variant='h5' component="h3">
                {weather.temp} °C
              </Typography>
              <Typography variant='h6' component="h4">
                {weather.description} °C
              </Typography>
            </Box>
          </Box>


        )}

    <Typography
        textAlign="center"
        sx={{ mt: 2, fontSize: "10px" }}
      >
        Powered by:{" "}
        <a
          href="https://api.openweathermap.org/"
          title="Weather API"
          target='_blank'
        >
          WeatherAPI.com
        </a>
      </Typography>

    </Container>
  )
}

export default PlaceWheather
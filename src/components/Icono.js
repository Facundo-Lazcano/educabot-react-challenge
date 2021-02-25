import React from 'react'
import { Grid } from '@material-ui/core'
import IconoLectura from './iconos/IconoLectura'
import IconoPreguntas from './iconos/IconoPreguntas'

const Icono = ({ lectura }) => {
  const renderIcon = () => {
    if (lectura) {
      return (
        <Grid item xs='auto' className='icono-lectura'>
          <IconoLectura />
        </Grid>
      )
    } else {
      return (
        <Grid item xs='auto' className='icono-preguntas'>
          <IconoPreguntas />
        </Grid>
      )
    }
  }
  return (
    renderIcon()
  )
}

export default Icono

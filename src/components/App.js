import React from 'react'
import { Grid } from '@material-ui/core'
import Cuadros from './Cuadros'
import { data as lecturasData } from '../data/lecturasData'
import { data as preguntasData } from '../data/preguntasData'

const App = () => {
  const renderLecturas = () => {
    return lecturasData.map((lectura) => {
      const { id, isLectura, demorada, subtitulo, nueva, entregada, fechaEntrega, progreso } = lectura
      return <Cuadros key={id} lectura={isLectura} demorada={demorada} subtitulo={subtitulo} nueva={nueva} entregada={entregada} fechaEntrega={fechaEntrega} progreso={progreso} />
    })
  }
  const renderPreguntas = () => {
    return preguntasData.map((pregunta) => {
      const { id, isLectura, demorada, subtitulo, nueva, entregada, fechaEntrega, progreso, esperandoCorreccion } = pregunta
      return <Cuadros key={id} lectura={isLectura} demorada={demorada} subtitulo={subtitulo} nueva={nueva} entregada={entregada} fechaEntrega={fechaEntrega} progreso={progreso} esperandoCorreccion={esperandoCorreccion} />
    })
  }

  return (
    <div className='contenedor'>
      <h4 className='titulo container'>Listones Tareas (Perfil Alumno)</h4>
      <Grid style={{ fontSize: 14, fontWeight: '700', marginBottom: 24, marginTop: 24 }}>LECTURAS</Grid>
      {renderLecturas()}
      <Grid style={{ fontSize: 14, fontWeight: '700', marginBottom: 24, marginTop: 24 }}>PREGUNTAS</Grid>.
      {renderPreguntas()}
    </div>
  )
}

export default App

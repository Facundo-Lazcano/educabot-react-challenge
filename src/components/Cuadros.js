import React from 'react'
import './style.css'
import { withStyles } from '@material-ui/styles'
import { Button, Grid, CircularProgress, useMediaQuery } from '@material-ui/core'
import { CalendarTodayOutlined, ChatBubble, Check, CheckCircle } from '@material-ui/icons'
import Icono from './Icono'
import IconoCorreccion from './iconos/IconoCorreccion'

const Cuadros = ({ nueva, progreso, lectura, demorada, entregada, esperandoCorreccion, subtitulo }) => {
  const tablet = useMediaQuery('(min-width: 768px) and (max-width:1023px)')
  const computadora = useMediaQuery('(min-width: 1024px)')
  const posicionBoton = () => {
    if (tablet) {
      return { top: 12, right: 12 }
    } if (computadora) {
      return { top: 24, right: 16 }
    } else {
      return { bottom: 12, right: 12 }
    }
  }

  const renderNuevaODemorada = () => {
    if (nueva) {
      return <Grid style={{ width: 55, margin: 8, color: '#ffffff', backgroundColor: '#27A8FF', paddingTop: 2, paddingBottom: 2, paddingRight: 4, paddingLeft: 4, borderRadius: 3, fontSize: 12, fontWeight: '700' }}>¡NUEVA!</Grid>
    } if (demorada) {
      return <Grid style={{ width: 115, margin: 8, color: '#F45C3A', backgroundColor: '#feefeb', paddingTop: 2, paddingBottom: 2, paddingRight: 4, paddingLeft: 4, borderRadius: 3, fontSize: 12, fontWeight: '700' }}>¡Estás demorad@!</Grid>
    } else {
      return null
    }
  }

  const renderBackground = () => {
    if (nueva) {
      return 'tarea-nueva'
    } if (entregada) {
      return 'tarea-entregada'
    } else {
      return 'cuadro-arriba'
    }
  }

  const renderFontWeightSubtitulo = () => {
    if (computadora && lectura && entregada) { return 'bold' }
    if ((computadora && !lectura) || (!computadora)) { return 'normal' }
  }

  const renderProgreso = () => {
    if (entregada) {
      return (
        <Grid className='progreso' style={{ padding: 0 }}>
          <Grid style={{ position: 'relative', marginRight: computadora ? 16 : 4 }}>
            <CheckCircle style={{ color: '#50D174', fontSize: computadora ? 24 : 16 }} />
          </Grid>
          <Grid className='detalle-progreso'>
            <Grid style={{ color: '#000000', width: computadora ? 84 : 'auto', fontWeight: 'bold', fontSize: 14 }}>
              Actividad Completada
            </Grid>
          </Grid>
        </Grid>
      )
    } if (esperandoCorreccion) {
      return (
        (
          <Grid className='progreso' style={{ padding: 0 }}>
            <Grid style={{ marginRight: computadora ? 16 : 4 }}>
              <IconoCorreccion color='#000000' size={24} />
            </Grid>
            <Grid className='detalle-progreso'>
              <Grid style={{ color: '#000000', width: computadora ? 84 : 'auto', fontWeight: 'bold', fontSize: 14 }}>
                Esperando correccion
              </Grid>
            </Grid>
          </Grid>
        )
      )
    } else {
      return (
        <Grid className='progreso'>
          <Grid style={{ position: 'relative', paddingTop: 5, marginRight: computadora ? 18 : -4.5 }}>
            <CircularProgress thickness={10} variant='determinate' size={computadora ? 25 : 16} style={{ color: progreso > 0 ? '#50D174' : '#DFDFDA', position: 'absolute', left: 0 }} value={progreso} />
            <CircularProgress thickness={10} variant='determinate' size={computadora ? 25 : 16} style={{ color: progreso > 0 ? 'rgba(80,209,116,0.2)' : '#DFDFDA', marginRight: 11 }} value={100} />
          </Grid>
          <Grid className='detalle-progreso'>
            <Grid style={{ color: '#6D7878' }}>
              Progreso
            </Grid>
            <Grid style={{ fontWeight: 'bold', marginLeft: computadora ? 0 : 4 }}> {progreso > 0 ? `${progreso}%` : '-'}</Grid>
          </Grid>
        </Grid>
      )
    }
  }

  return (
    <Grid style={{ marginBottom: 24 }}>
      <Grid container item className={renderBackground()} direction='row' justify='flex-start' style={{ position: 'relative', height: 'auto' }}>
        <Icono lectura={lectura} />
        <Grid
          item
          xs={10}
          container
          direction={computadora ? 'row' : 'column'}
          justify={computadora ? 'space-between' : 'flex-start'}
          alignItems={computadora ? 'center' : 'flex-start'}
        >
          <Grid>
            <Grid style={{ fontWeight: 'bold', textAlign: 'left', marginLeft: 8, fontSize: 12, textTransform: 'uppercase' }}>{lectura ? 'Lectura' : 'Actividad con Preguntas'}</Grid>
            <Grid className='descripcion' style={{ fontWeight: renderFontWeightSubtitulo() }}>{subtitulo}</Grid>

            {renderNuevaODemorada()}
          </Grid>
          <Grid className='calendario'>
            <Grid style={{ marginLeft: 8, marginRight: 5 }}>
              {
                entregada
                  ? (
                    <Grid style={{ position: 'relative' }}>
                      <CalendarTodayOutlined style={{ marginRight: 8, fontSize: computadora ? 24 : 16 }} />
                      <Check style={{ position: 'absolute', left: 5, top: computadora ? 11 : 12, fontSize: computadora ? 12 : 7, color: '#000000' }} />
                    </Grid>
                    )
                  : <CalendarTodayOutlined style={{ marginRight: 8, fontSize: computadora ? 24 : 16 }} />
              }
            </Grid>
            <Grid className='fecha-entrega'>
              <Grid style={{ color: '#6D7878', marginRight: 6 }}>
                Fecha de Entrega
              </Grid>
              <Grid style={{ fontWeight: 'bold', color: demorada ? '#F45C3A' : '#000000' }}> 15 de Abril</Grid>
            </Grid>
          </Grid>
          {renderProgreso()}
          {
          entregada
            ? null
            : <StyledButton style={posicionBoton()}>Continuar</StyledButton>
          }
        </Grid>

      </Grid>
      <Grid container direction='row' justify='space-between' className='cuadro-abajo'>
        <Grid className='materia'>
          <Grid style={{ height: 8, width: 8, borderRadius: 50, backgroundColor: '#01CEAA', marginRight: 4 }} />
          Lengua
        </Grid>
        <Grid item>
          <ChatBubble color={entregada ? 'disabled' : 'inherit'} />
        </Grid>
      </Grid>
    </Grid>

  )
}

const StyledButton = withStyles({
  root: {
    backgroundColor: '#2f2565',
    color: '#ffffff',
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: '700',
    paddingInline: 16,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 'auto',
    position: 'absolute'
  }
})(Button)

export default Cuadros

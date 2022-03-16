import 'auto-libs/build/scripts/flexible.js'
import 'auto-libs/build/styles/reset.css'
import React from 'react'
import ReactDOM from 'react-dom'
import VConsole from 'vconsole'
import './assets/style/app.scss'
import Router from './router'

const App = () => {
  return (
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-new
  new VConsole()
}

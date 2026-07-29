import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { installChunkRecovery, clearChunkRecoveryGuard } from './lib/chunkRecovery'

// Must install before the first lazy() route can possibly fail to load.
installChunkRecovery()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// The app mounted without needing the recovery reload — clear the guard so a
// later, unrelated chunk failure this same tab session gets its own retry.
clearChunkRecoveryGuard()

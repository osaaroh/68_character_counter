import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CharacterContextProvider } from './contextAPI/context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CharacterContextProvider>
      <App />
    </CharacterContextProvider>
    
  </StrictMode>,
)

import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import NotesPage from './pages/NotesPage'
import SyncPage from './pages/SyncPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/syncPage" element={<SyncPage />} />
    </Routes>
)
}

export default App

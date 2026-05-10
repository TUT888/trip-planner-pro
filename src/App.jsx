import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { TripDashboard } from './pages/TripDashboard'
import { Itinerary } from './pages/Itinerary'
import { PackingChecklist } from './pages/PackingChecklist'
import { TravelBudget } from './pages/TravelBudget'
import { AppLayout } from './components/layout/AppLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route index element={<TripDashboard />}/>
      <Route path='/dashboard' element={<TripDashboard />}/>
      <Route path='/itinerary' element={< Itinerary/>}/>
      <Route path='/packing' element={<PackingChecklist />}/>
      <Route path='/budget' element={<TravelBudget />}/>
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

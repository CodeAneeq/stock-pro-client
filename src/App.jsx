import { RouterProvider } from "react-router-dom"
import { publicRoutes } from "./routes/route.jsx"

function App() {

  return (
    <>
      <RouterProvider router={publicRoutes}></RouterProvider>
    </>
  )
}

export default App

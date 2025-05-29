import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar/Navbar"
import Providers from "../components/Providers"
import { Footer } from "../components/Footer"
import './RootLayout.css'

function RootLayout() {
  return (
    <Providers>
        <Navbar />
          <Outlet />
      <Footer />
    </Providers>
  )
}
export default RootLayout
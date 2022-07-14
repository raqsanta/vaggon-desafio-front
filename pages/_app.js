import '../styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Footer from '../components/footer'
import AuthContext from '../context'
import { useEffect, useState } from 'react'
import axios from 'axios'

function MyApp({ Component, pageProps }) {

  const [token, setToken] = useState()

  useEffect(() => {

    if(token){
      localStorage.setItem("token", token)
    }else{
      const foundToken = localStorage.getItem("token", token)
      setToken(foundToken)
    }

  }, [token])

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Component {...pageProps} />
      <Footer />
    </AuthContext.Provider>
  )
}

export default MyApp

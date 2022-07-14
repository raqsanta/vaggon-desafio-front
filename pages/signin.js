import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import axios from 'axios'
import AuthContext from '../context'
import Router from 'next/router'

export default function SignIn() {

    const {token, setToken} = useContext(AuthContext)

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    function submitAuth(e){
        e.preventDefault()
        axios.post('http://localhost:8000/auth', loginData)
        .then((response)=>{
            const data = response.data

            if(data.auth == true){
                setToken(data.token)
            }else{
                alert('Alguns de seus dados podem estar incorretos. Tente novamente.')
            }
        })

    }

    if(token){
        Router.push('/')
    }

    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: 0 }}
            className={styles.container}>
            <Head>
                <title>Calendário MC2</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href='http://fonts.googleapis.com/css?family=Roboto'
                    rel='stylesheet'
                />
            </Head>

            <main className={styles.main}>
                <h5>Login</h5>
                <br />
                <form className="mt-3">
                    <div className="form-floating mb-3">
                        <input type="username" onChange={(username)=>setLoginData({...loginData, username: username.target.value})} className="form-control" id="username" placeholder="name@example.com" />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" onChange={(password)=>setLoginData({...loginData, password: password.target.value})} className="form-control" id="password" placeholder="Password" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button onClick={submitAuth} className="btn btn-primary w-100 mt-3">
                        Entrar
                    </button>
                    <Link href="/signup">
                        <button className="btn w-100 mt-3">
                            Criar uma conta
                        </button>
                    </Link>
                </form>
            </main>

        </motion.div>
    )

}
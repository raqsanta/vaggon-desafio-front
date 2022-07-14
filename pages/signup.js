import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import axios from 'axios'
import AuthContext from '../context'
import Router from 'next/router'

export default function SignIn() {

    const { token, setToken } = useContext(AuthContext)

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    function submitRegister(e) {
        e.preventDefault()
        axios.post('http://localhost:8000/main/register', loginData)
            .then((response) => {

                Router.push('/signin')
                alert('Insira os dados do registro na área de login para entrar em sua conta.')

            })

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
                <h5>Registrar</h5>
                <br />
                <form className="mt-3">
                    <div className="form-floating mb-3">
                        <input onChange={(username)=>setLoginData({...loginData, username: username.target.value})} type="username" className="form-control" id="username" placeholder="name@example.com" />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating">
                        <input onChange={(password)=>setLoginData({...loginData, password: password.target.value})} type="password" className="form-control" id="password" placeholder="Password" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button onClick={submitRegister} className="btn btn-primary w-100 mt-3">
                        Registrar
                    </button>
                    <Link href="/signin">
                        <button className="btn w-100 mt-3">
                            Entrar em uma conta
                        </button>
                    </Link>
                </form>
            </main>

        </motion.div>
    )

}
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SignIn() {

    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: 0 }}
            classNameName={styles.container}>
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
                        <input type="username" className="form-control" id="username" placeholder="name@example.com" />
                        <label for="username">Username</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" placeholder="Password" />
                        <label for="password">Password</label>
                    </div>
                    <button className="btn btn-primary w-100 mt-3">
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
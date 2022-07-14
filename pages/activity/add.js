
import { motion } from 'framer-motion'
import Head from 'next/head'
import DatePicker from 'react-datepicker'
import styles from '../../styles/Home.module.css'
import "react-datepicker/dist/react-datepicker.css"
import { useContext, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context'
import Link from 'next/link'

export default function Add() {

    const { token } = useContext(AuthContext)
    const [status, setStatus] = useState("Pending");

    const [event, setEvent] = useState({
        name: "",
        description: "",
        beginsdate: "",
        expiresdate: "",
    })

    function submitForm() {

        console.log(event)

        axios.post('http://localhost:8000/main/create-activity', {...event, status}, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        }).then((response) => {
            if (response.data.auth == false) {
                return
            }

        }).catch((err) => {
            console.log(err)
        })

    }

    function changeStatus(e) {
        setStatus(e.target.value);
    }

    if (!token) {
        return (
            <div className="container d-flex justify-content-center">
                <span className="mt-5 mb-5">Você precisa <Link href="/signin">se autenticar</Link> para acessar essa página</span>
            </div>
        )
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

                <center>
                    <h5>Add a new date</h5>
                    <br />
                    <div className="form-floating mb-3 2-">
                        <input id="title" className="form-control" type="text" placeholder="Add title" onChange={(name) => setEvent({ ...event, name: name.target.value })} />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input id="description" className="form-control" type="text" placeholder="Add desc" onChange={(description) => setEvent({ ...event, description: description.target.value })} />
                        <label htmlFor="description">Description</label>
                    </div>
                    <DatePicker className="form-control mb-3" placeholderText="Start date" selected={event.beginsdate} onChange={(beginsdate) => setEvent({ ...event, beginsdate })} />
                    <br />
                    <DatePicker className="form-control mb-3" placeholderText="End date" selected={event.expiresdate} onChange={(expiresdate) => setEvent({ ...event, expiresdate })} />
                    <br />
                    <div className="form-floating mb-3">
                        <select value={status} onChange={changeStatus} className="form-select" id="status" aria-label="Floating select">
                            <option value="Pending">Pending</option>
                            <option value="Published">Published</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <label htmlFor="status">Status</label>
                    </div>
                    <button onClick={submitForm} className="btn btn-primary w-100 mt-3">Finalizar</button>
                </center>

            </main>

        </motion.div>

    )

}
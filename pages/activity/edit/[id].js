
import { motion } from 'framer-motion'
import Head from 'next/head'
import DatePicker from 'react-datepicker'
import styles from '../../../styles/Home.module.css'
import "react-datepicker/dist/react-datepicker.css"
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../../context'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Edit() {

    const router = useRouter()
    const { id } = router.query

    const { token } = useContext(AuthContext)
    const [status, setStatus] = useState("Pending");

    const [event, setEvent] = useState({
        name: "",
        description: "",
        beginsdate: "",
        expiresdate: "",
        id: id
    })

    useEffect(() => {

        if(!id) return

        axios.get('http://localhost:8000/main/get-activity/'+id, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        }).then((response) => {

            console.log(response)

            if (response.data.auth == false) {
                return
            }

            setEvent(
                {
                    id: id,
                    name: response.data.data.name,
                    description: response.data.data.description,
                    beginsdate: new Date(response.data.data.beginsdate),
                    expiresdate: new Date(response.data.data.expiresdate),
                }
            )

            setStatus(response.data.data.status)

            document.getElementById('title').value = response.data.data.name
            document.getElementById('description').value = response.data.data.description
            document.getElementById('date-01').value = new Date(response.data.data.beginsdate)
            document.getElementById('date-02').value = new Date(response.data.data.expiresdate)
            document.getElementById('status').value = response.data.data.status

        }).catch((err) => {
            console.log(err)
        })

    }, [id])

    function submitForm() {

        console.log(status)

         axios.post('http://localhost:8000/main/edit-activity', {...event,status}, {
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
                    <h5>Edit a date</h5>
                    <h6>{id}</h6>
                    <br />
                    <div className="form-floating mb-3 2-">
                        <input id="title" className="form-control" type="text" placeholder="Add title" onChange={(name) => setEvent({ ...event, name: name.target.value })} />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input id="description" className="form-control" type="text" placeholder="Add desc" onChange={(description) => setEvent({ ...event, description: description.target.value })} />
                        <label htmlFor="description">Description</label>
                    </div>
                    <DatePicker id="date-01" className="form-control mb-3" placeholderText="Start date" selected={event.beginsdate} onChange={(beginsdate) => setEvent({ ...event, beginsdate })} />
                    <br />
                    <DatePicker id="date-02" className="form-control mb-3" placeholderText="End date" selected={event.expiresdate} onChange={(expiresdate) => setEvent({ ...event, expiresdate })} />
                    <br />
                    <div className="form-floating mb-3">
                        <select value={status} onChange={changeStatus} className="form-select" id="status" aria-label="Floating select">
                            <option selected value="Pending">Pending</option>
                            <option value="Published">Published</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <label htmlFor="status">Status</label>
                    </div>
                    <button onClick={submitForm} className="btn btn-primary w-100 mt-3">Editar</button>
                </center>

            </main>

        </motion.div>

    )

}
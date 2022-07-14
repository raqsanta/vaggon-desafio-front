import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useContext, useEffect, useState } from 'react'
import SmartCard from '../components/smart/card'
import Router from 'next/router'
import AuthContext from '../context'
import Link from 'next/link'
import axios from 'axios'

const locales = {
  "pt-BR": require("date-fns/locale/pt-BR")
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events = [
  {
    name: "Assistir filme",
    description: "Vou assistir vários filmes nesses dias",
    beginsdate: new Date(2022, 6, 31),
    expiresdate: new Date(2022, 6, 31),
    status: "Published"
  },
  {
    name: "Casa Piu",
    description: "Vou comprar muitos sapato",
    beginsdate: new Date(2022, 6, 1),
    expiresdate: new Date(2022, 6, 5),
    status: "Published"
  },
]

export default function Home() {

  const [allEvents, setAllEvents] = useState([])
  const { token, setToken } = useContext(AuthContext)

  useEffect(() => {

    axios.get('http://localhost:8000/main/my-activities', {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    }).then(async (response) => {
      if (response.data.auth == false) {
        return
      }

      const allActivities = response.data.data

      const result = []

      await allActivities.forEach((element) => {
        element.beginsdate = new Date(element.beginsdate)
        element.expiresdate = new Date(element.expiresdate)
        result.push(element)
      })

      setAllEvents(result)

    })

  }, [token])


  const [currentCard, setCurrentCard] = useState({
    name: "",
    description: "",
    beginsdate: "",
    expiresdate: "",
    status: ""
  })

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
        <SmartCard currentCard={currentCard} />
        <br />
        <Calendar onSelectEvent={(e) => {

          setCurrentCard({
            name: e.name,
            description: e.description,
            beginsdate: e.beginsdate.toDateString(),
            expiresdate: e.expiresdate.toDateString(),
            status: e.status,
            id: e.id
          })

        }} localizer={localizer} events={allEvents}
          startAccessor="beginsdate" endAccessor="expiresdate"
          titleAccessor="name"
          style={{ height: 500, width: "100%", margin: "50px" }}
        />
        <br />
        <Link href="/activity/add" className="link">Criar nova atividade</Link>
        <a className="link" onClick={() => {
          localStorage.removeItem('token')
          setToken()
        }}>Deslogar</a>
      </main>

    </motion.div>
  )
}

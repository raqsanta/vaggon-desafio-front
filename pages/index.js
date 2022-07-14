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
import { useEffect, useState } from 'react'
import SmartCard from '../components/smart/card'

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
    title: "Teste",
    allDay: true,
    start: new Date(2022, 6, 31),
    end: new Date(2022, 6, 31)
  },
  {
    title: "Casa Piu",
    allDay: true,
    start: new Date(2022, 7, 1),
    end: new Date(2022, 7, 3)
  },
]

export default function Home() {
  //talvez vc precise se autenticar

  useEffect(() => {
    console.log('something happens')
  }, [])

  const [allEvents, setAllEvents] = useState(events)

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent])
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
        <SmartCard currentCard="" />
        <br />
        <Calendar onSelectEvent={(e) => console.log(e)} localizer={localizer} events={allEvents}
          startAccessor="start" endAccessor="end"
          style={{ height: 500, width: "100%", margin: "50px" }}
        />
      </main>

    </motion.div>
  )
}

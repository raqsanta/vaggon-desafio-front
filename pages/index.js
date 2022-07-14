import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion'

export default function Home() {

  //talvez vc precise se autenticar

  const [value, onChange] = useState(new Date());

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
        <Calendar selectRange={true} className={styles.main_calendar + " shadow"} locale="pt-BR" onChange={onChange} onClickDay={(e)=>{console.log(e)}} />
      </main>

    </motion.div>
  )
}

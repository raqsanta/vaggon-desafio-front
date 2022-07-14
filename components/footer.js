import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Footer() {

    return (
        <footer className={styles.footer}>

            <div className={styles.grow}>
                <a className={styles.text_dark} rel="noreferrer" href="https://github.com/raqsanta" target="_blank">
                    <span className='mx-2'>Powered by</span>
                    <Image className='btn' src="/raqsanta.png" alt="Github Profile" width={32} height={32} />
                </a>
            </div>

        </footer>
    )

}
import Link from 'next/link'
import styles from '../styles/Header/Header.module.css'

export default function Header () {
  return (
    <header>
      <div className={styles.container_logo}>
        <Link href='/' className={styles.text_logo}>Podcaster</Link>
      </div>
    </header>
  )
}

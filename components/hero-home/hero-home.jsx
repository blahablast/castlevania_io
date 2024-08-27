import Image from 'next/image'
import styles from './hero-home.module.css'

export default function HeroHome() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.logoWrapper}>
        <Image
          src="/images/assets/CV-logo-1.webp"
          alt="Castlevania.io Logo"
          layout="responsive"
          width={800}
          height={400}
          className={styles.logo}
        />
      </div>
    </div>
  )
}

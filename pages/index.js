import Image from 'next/image'
import styles from '../styles/HomePage.module.css'
import PageLayout from '../components/PageLayout'
import Link from 'next/link'
import { useState } from 'react'

const HomePage = ({ data }) => {
  const [search, setSearch] = useState()

  function handleChange (e) {
    setSearch(e.target.value)
  }

  return (
    <PageLayout>
      <div className={styles.header_tool}>
        <p className={styles.total_podcast}>{data.feed.entry.length}</p>
        <input
          name='search'
          value={search}
          onChange={handleChange}
          placeholder='Filter podcast...'
          className={styles.input_search}
        />
      </div>
      <div className={styles.container_podcast}>
        {data.feed.entry.filter((podcast, index) => {
          if (search === undefined) {
            return podcast
          } else {
            return podcast['im:name'].label.toUpperCase().includes(search.toUpperCase()) || podcast['im:artist'].label.toUpperCase().includes(search.toUpperCase())
          }
        }).map((podcast, index) => (
          <div key={index} className={styles.card_podcast}>
            <Link href={`/podcast/${podcast.id.attributes['im:id']}`}>
              <div className={styles.image_container_podcast}>
                <Image
                  src={podcast['im:image'][2].label}
                  alt={podcast['im:name'].label}
                  className={styles.image_podcast}
                  width={120}
                  height={120}
                  quality={100}
                  priority={index < 2}
                />
              </div>
              <div className={styles.info_podcast}>
                <p className={styles.title_podcast}>{podcast['im:name'].label}</p>
                <p className={styles.author_podcast}>Author: {podcast['im:artist'].label}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}

export async function getServerSideProps () {
  const url = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
  const res = await fetch(url)
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}

export default HomePage

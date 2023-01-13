import PageLayout from '../../components/PageLayout'
import styles from '../../styles/Podcast_Page/PodcastPage.module.css'
import Image from 'next/image'
import Parser from 'rss-parser'
import Link from 'next/link'

export default function Podcast ({ data, parseDataDescription, Parsefeed }) {
  const ParserDate = (date) => {
    return (new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }))
  }

  return (
    <PageLayout title='Podcaster - Podcast'>
      <div className={styles.container}>
        <div className={styles.info_artist_container}>
          <div className={styles.image_artist_container}>
            <Image
              src={data.results[0].artworkUrl600}
              alt={data.results[0].artistName}
              className={styles.image_artist}
              width={250}
              height={250}
            />
          </div>
          <div className={styles.info_artist_name}>
            <p className={styles.title_track}>{data.results[0].trackName}</p>
            <p className={styles.title_artist}>by {data.results[0].artistName}</p>
          </div>
          <div className={styles.info_description_description}>
            <p className={styles.description_title}>Description:</p>
            <p className={styles.description_text}>{parseDataDescription[0].summary.label}</p>
          </div>
        </div>
        <div className={styles.info_episode_container}>
          <div className={styles.counter_episode}>
            <p className={styles.counter_text}>Episodes: {data.results[0].trackCount}</p>
          </div>
          <div className={styles.episodes_container}>
            <table>
              <tbody>
                <tr>
                  <th className={styles.headers_table}>Title</th>
                  <th className={styles.headers_table}>Date</th>
                  <th className={styles.headers_table}>Duration</th>
                </tr>
                {Parsefeed.items.map((episode, index) => (
                  <tr key={index} className={styles.table_row}>
                    <td>
                      <Link href={`/podcast/${data.results[0].collectionId}/episode/${episode.guid}`}>
                        {episode.title}
                      </Link>
                    </td>
                    <td>{ParserDate(episode.pubDate)}</td>
                    <td className={styles.center}>{episode.itunes.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>

  )
}

export async function getServerSideProps (context) {
  const id = context.query.id_podcast
  const url = `https://itunes.apple.com/lookup?id=${id}`
  const res = await fetch(url)
  const data = await res.json()

  const urlDescription = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
  const resDescription = await fetch(urlDescription)
  const dataDesciption = await resDescription.json()
  const parseDataDescription = dataDesciption.feed.entry.filter(podcast => podcast.id.attributes['im:id'] === '788236947')

  const urlFeedEpisodes = data.results[0].feedUrl
  const parser = new Parser()
  const Parsefeed = await parser.parseURL(urlFeedEpisodes)

  return {
    props: {
      data,
      parseDataDescription,
      Parsefeed
    }
  }
}

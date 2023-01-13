import PageLayout from '../../../../components/PageLayout'
import styles from '../../../../styles/Episode_Page/EpisodePage.module.css'
import Image from 'next/image'
import Parser from 'rss-parser'
import ParseHTML from 'html-react-parser'

export default function Episode ({ data, parseDataDescription, selectedPodcast }) {
  return (
    <PageLayout title='Podcaster - Episode'>
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
        <div className={styles.info_podcast_container}>
          <div className={styles.podcast_container}>
            <div className={styles.info_podcast}>
              <p className={styles.title_podcast}>{selectedPodcast[0].title}</p>
              <div className={styles.description_podcast}>{ParseHTML(selectedPodcast[0].content)}</div>
            </div>
            <div className={styles.info_podcast_player}>
              <audio controls className={styles.audio_controller}>
                <source src={selectedPodcast[0].enclosure.url} type='audio/mpeg' />
              </audio>
            </div>
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
  const selectedPodcast = Parsefeed.items.filter(episode => episode.guid === context.query.episode_id)
  return {
    props: {
      data,
      parseDataDescription,
      selectedPodcast
    }
  }
}

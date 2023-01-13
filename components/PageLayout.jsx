import Head from 'next/head'
import Header from './header'

export default function PageLayout ({ children, title = 'Podcaster' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Podcast App - los mejores podcast' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Header />
        {children}
      </main>
    </>
  )
}

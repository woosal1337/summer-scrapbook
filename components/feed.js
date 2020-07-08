import useSWR from 'swr'
import Footer from '../components/footer'
import Message from '../components/message'
import Posts from '../components/posts'
import { orderBy } from 'lodash'

const fetcher = url => fetch(url).then(r => r.json())

const Feed = ({ src = '/api/posts', initialData, children, ...props }) => {
  const { data, error } = useSWR(src, fetcher, {
    initialData,
    refreshInterval: 5000
  })

  if (error) {
    return (
      <main className="container">
        {children}
        <Posts posts={orderBy([initialData, data], a => a.length)[0]} />
      </main>
    )
  }

  if (!data) {
    return <Message text="Loading…" />
  }

  return (
    <main>
      <style jsx global>{`
        @media (prefers-color-scheme: dark) {
          :root {
            --colors-text: var(--colors-snow);
          }
        }
      `}</style>
      {children}
      <Posts posts={data} />
      <Footer />
    </main>
  )
}

export default Feed
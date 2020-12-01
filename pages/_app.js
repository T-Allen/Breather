import '../styles/globals.css'
import 'typeface-cabin'

export async function fetchHelper (url, params, extras) {
  const query = new URLSearchParams();
  for (const [name, value] of Object.entries(params)) {
    query.append(name, value)
  }
  if (extras) {
    query.append('data', JSON.stringify(extras))
  }
  const res = await fetch(url, {
    method: 'POST',
    body: query
  })

  if (!res.ok) {
    const message = `An error has occured ${res.status}: ${res.message}`
    throw new Error(message)
  }
  return res.json()
}


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

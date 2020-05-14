import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { config as faConfig } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import ky from 'ky-universal'
import '../styles/style.scss'
import store from '../store'
import Wrapper from '../components/Wrapper'

faConfig.autoAddCss = false

const logEvent = async ({ href, origin, pathname, search }) => {
  await ky.post('https://api.logflare.app/logs', {
    headers: {
      'X-API-KEY': 'ToSHcLy5TSdo',
    },
    json: {
      source: '106b5aec-1dc9-43ed-af0e-1c2f9040fc43',
      log_entry: `action: page visit | env: ${process.env.NODE_ENV} | path: ${pathname}`,
      metadata: {
        request_method: 'GET',
        href,
        origin,
        pathname,
        search,
      },
    },
  })
}

const isBrowser = typeof window !== 'undefined'

if (isBrowser) {
  // For the first page load
  logEvent(window.location)

  // Subsequent route changes
  Router.events.on('routeChangeComplete', () => logEvent(window.location))
}

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.any.isRequired,
}

export default App

import { AppRegistry } from 'react-native'
import App from './src'
import { MiniAppsEnginesProvider } from '@htyf-mp/engines'

const Root = () => {
  return <MiniAppsEnginesProvider>
    <App />
  </MiniAppsEnginesProvider>
}

AppRegistry.registerComponent('apps', () => Root)

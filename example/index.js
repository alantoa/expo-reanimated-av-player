import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['[react-native-gesture-handler]', 'Overwriting fontFamily']); // Ignore log notification by message

import App from './src/App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

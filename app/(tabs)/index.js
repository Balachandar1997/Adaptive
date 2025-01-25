import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './screens/Home';
import Cart from './screens/Cart';

export default function HomeScreen() {
  const Stack = createStackNavigator();
  
  return (
    <Provider store={store}>
    
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}  options={{ title: 'Home' }} />
        <Stack.Screen name="Cart" component={Cart} options={{ title: 'My Cart' }} />
      </Stack.Navigator>
    
  </Provider>
  );
}


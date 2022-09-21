
import { StyleSheet, Text, View, Pressable, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import ForgotPassword from './src/screens/ForgotPassword';
import { AuthProvider } from './src/utils/useAuth';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={({navigation}) => ({
                title: '',
                headerLeft: () => (
                  <Pressable className="flex flex-row" onPress={() => navigation.navigate('Login')}>
                    <MaterialIcons
                      name='arrow-back-ios'
                      size={25}
                      backgroundColor='#f9fafd'
                      color={'rgb(37,99,235)'}
                    />
                    <Text className="text-lg text-blue-600">Login</Text>
                  </Pressable>
                )
              })}
            />
          <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
            />
        </Stack.Navigator>
      </NavigationContainer>
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

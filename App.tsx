
import { StyleSheet, Text, View, Pressable, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import ForgotPassword from './src/screens/ForgotPassword';
import Profile from './src/screens/Profile';
import Dashboard from './src/screens/Dashboard';
import Hangouts from './src/screens/Hangouts';
import Chatroom from './src/screens/Chatroom';
import EditProfile from './src/screens/EditProfile';
import PreviewProfile from './src/screens/PreviewProfile';
import Logout from './src/screens/Logout';
import { AuthProvider } from './src/utils/useAuth';
import AccountSettings from './src/screens/AccountSettings';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
            {/* <Stack.Screen
              name="Login"
              component={Login}
            />
            <Stack.Screen
              name="Logout"
              component={Logout}
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
            /> */}
          <Stack.Screen
              name="Profile"
              component={Profile}
            />
          <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options= {() => ({
                headerBackVisible:false,
              })}
            />
          <Stack.Screen
            name="Hangouts"
            component={Hangouts}
            options= {() => ({
              headerBackVisible:false,
            })}
          />
          <Stack.Screen
            name="Chatroom"
            component={Chatroom}
            options= {() => ({
              headerBackVisible:false,
            })}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options= {() => ({
              title:"",
            })}
          />
           <Stack.Screen
            name="PreviewProfile"
            component={PreviewProfile}
          />
          <Stack.Screen
            name="AccountSettings"
            component={AccountSettings}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
   
  },
});

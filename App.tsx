// @type-nocheck
import { LogBox, Text, Pressable } from 'react-native';
import React from 'react';
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
import UserDetails from './src/screens/UserDetails';
import UserChat from './src/screens/UserChat';
import { AuthProvider } from './src/utils/useAuth';
import { LocationProvider } from './src/utils/useLocation';
import AccountSettings from './src/screens/AccountSettings';
import { ChatProvider } from './src/utils/chatService';

const Stack = createNativeStackNavigator();

export default function App() {
  // suppress warning for now - to check these later
  LogBox.ignoreAllLogs();

  return (
    <>
    <LocationProvider>
     <AuthProvider>
      <ChatProvider>
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
            name="UserDetails"
            component={UserDetails}
            options= {() => ({
              title:"User Details",
            })}
          />
          <Stack.Screen
            name="UserChat"
            component={UserChat}
            options= {({route}) => ({title: route.params?.chatUserName})}
          />
          <Stack.Screen
            name="Chatroom"
            component={Chatroom}
            options= {() => ({
              headerBackVisible:false,
              title:"Chats",
            })}
          />
          <Stack.Screen
              name="Profile"
              component={Profile}
            />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options= {() => ({
              title:"Edit Profile",
            })}
          />
           <Stack.Screen
            name="PreviewProfile"
            component={PreviewProfile}
            options= {() => ({
              title:"Preview Profile",
            })}
          />
          <Stack.Screen
            name="AccountSettings"
            component={AccountSettings}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ChatProvider>
      </AuthProvider>
      </LocationProvider>
    </>
  );
}

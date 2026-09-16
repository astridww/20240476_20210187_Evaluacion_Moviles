import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from './src/hooks/useAuth';
import { COLORS } from './src/constants/theme';
import Login from './src/screens/Login';
import Registrar from './src/screens/Registrar';
import Home from './src/screens/Home';

const Stack = createNativeStackNavigator();

function AuthGuard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return user ? <HomeStack /> : <AuthStack />;
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Iniciar sesión' }}
      />
      <Stack.Screen
        name="Registrar"
        component={Registrar}
        options={{ title: 'Crear cuenta' }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Mi perfil' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthGuard />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

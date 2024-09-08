import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingScreen from "./screens/Onboarding";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "./screens/Splash";
import Home from "./screens/Home";
import SignUp from "./screens/Signup";
import SignIn from "./screens/Signin";

import { useFonts } from "expo-font";

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    Poppins_Medium: require("./assets/fonts/Poppins-Medium.ttf"),
    Poppins_Bold: require("./assets/fonts/Poppins-Bold.ttf"),
    Inter_Bold: require("./assets/fonts/Inter-Bold.ttf"),
  });

  const [isOnboardingCompleted, setIsOnboardingCompleted] =
    React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const loadedPref = await AsyncStorage.getItem("isOnboardingCompleted");
        setIsOnboardingCompleted(loadedPref !== null);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    })();
  }, []);

  return isLoading ? (
    <Splash />
  ) : (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isOnboardingCompleted ? (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
          </>
        ) : (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

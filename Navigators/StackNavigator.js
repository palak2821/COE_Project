import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import Forgotps from "../screens/Forgotps";
import AsyncStorage from "@react-native-community/async-storage";
import { userContext } from "../screens/userContext";
import DrawerNavigator from "./DrawerNavigator";
const Stack = createStackNavigator();

export default function StackNavigator() {
  console.log("StacNavigator Visited");

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SIGNIN":
          return {
            user: action.user,
            avatar: action.user.profilePic,
          };
        case "SIGNOUT":
          return {
            user: null,
            avatar: null,
          };
        case "AVATAR":
          return {
            ...prevState,
            avatar: action.avatar,
          };
      }
    },
    {
      user: null,
      avatar: null,
    }
  );
  React.useEffect(() => {
    console.log(state);
  }, [state]);
  React.useLayoutEffect(() => {
    const fetchdata = async () => {
      try {
        let userFetched = await AsyncStorage.getItem("user");
        if (userFetched) {
          userFetched = JSON.parse(userFetched);
          dispatch({ type: "SIGNIN", user: userFetched });
        }
      } catch (err) {
        console.log("Async Error", err);
      }
    };
    fetchdata();
  }, []);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "red",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          {state.user ? (
            <>
              <Stack.Screen
                name="DrawerNavigator"
                component={DrawerNavigator}
                options={{
                  title: "Department of Computer Science",
                  headerShown: false,
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                  title: "SignIn",
                  headerRight: false,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: "Registeration form", headerRight: false }}
              />
              <Stack.Screen
                name="Forgotps"
                component={Forgotps}
                options={{ title: "Forgot password", headerRight: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </userContext.Provider>
  );
}

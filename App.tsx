import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./stacks/MainStack";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

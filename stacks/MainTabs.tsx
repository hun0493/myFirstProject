import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Home from "../screens/Home";

//하단 Tab 을 위한 TabNAvigator 컴포넌트생성
const Tab = createBottomTabNavigator();

export default () => {
  // Tabnabigator 로 내가 원하는 하단 Tab들을 감싸준다
  return (
    <Tab.Navigator>
      {/*1번쨰 Main Tab    */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      {/*2번쨰 Main Tab    */}
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

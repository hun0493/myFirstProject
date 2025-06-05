// 📦 네이티브 스택 네비게이터 import
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
// 📄 로그인 화면 import
import LoginScreen from "../screens/Login/LoginScreen";
import SignupScreen from "../screens/Login/SignupScreen";

//  로그인 전에 사용할 수 있는 페이지들을 타입으로 정의
// 형태: '스크린 이름': '전달할 Params 타입'

export type AuthStackScreenList = {
  Login: undefined; // 로그인 화면
  Signup: undefined; //회원가입 화면
};

// createNativeStackNavigator에 타입 적용
const Stack = createNativeStackNavigator<AuthStackScreenList>();

//Page 이동 시 필요한, Navtigation Props 타입 생성
export type AuthNaviProp = NativeStackNavigationProp<AuthStackScreenList>;

//  실제 Navigator 구성
export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"Login"} component={LoginScreen} />
      <Stack.Screen name={"Signup"} component={SignupScreen} />
    </Stack.Navigator>
  );
};

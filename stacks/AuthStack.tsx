// 📦 네이티브 스택 네비게이터 import
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// 📄 로그인 화면 import
import LoginScreen from "../screens/Login/LoginScreen";

//  로그인 전에 사용할 수 있는 페이지들을 타입으로 정의
// 형태: '스크린 이름': '전달할 Params 타입'
export type AuthStackScreenList = {
  Login: undefined; // 로그인 화면
};

// createNativeStackNavigator에 타입 적용
const Stack = createNativeStackNavigator<AuthStackScreenList>();

//  실제 Navigator 구성
export default () => {
  return (
    <Stack.Navigator>
      {/* 로그인 스크린 등록 */}
      <Stack.Screen
        name={"Login"}
        component={LoginScreen}
        options={{ headerShown: false }} // 상단 헤더 제거
      />
    </Stack.Navigator>
  );
};

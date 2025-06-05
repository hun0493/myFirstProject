import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./stacks/MainStack";

import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./stacks/AuthStack";
import { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { User } from "firebase/auth";
import { FlatList } from "react-native-gesture-handler";
import LoadingScreen from "./screens/LoadingScreen";

const Stack = createStackNavigator();

export default function App() {
  //  유저 정보 State
  const [user, setUser] = useState<User | null>(null);
  //로딩
  const [loading, setLoading] = useState(true);

  //로그인 여부를 파악(with server , 비동기처리)
  const getAuth = () => {
    try {
      //1. Server와 소통해서 로그인 여부 확인할대 까지 기다리기
      auth.authStateReady();
      // -- 로그인 여부 파악이 끝났으면 , 로딩 종료
      setLoading(false);
      //2. 로그인 여부에 따른 현재 접속 유저의 상태변화 체크
      auth.onAuthStateChanged((authState) => {
        //3. 상태변화에 따라 Login 여부 판단
        //3-a 로그인 성공 => user 에 값 할당
        if (authState) setUser(authState);
        //3-b 로그인 실패 = user 에 값 reset
        else setUser(null);
      });
    } catch (e) {
      console.warn(e);
    }
  };

  // App.tsx 즉, 앱 실행 시 최초 1회 실행
  useEffect(() => {
    getAuth();
  }, []);

  const MainStream = user ? <MainStack /> : <AuthStack />;

  return (
    <NavigationContainer>
      {/*로그인 여부에 따른 다른 stack 등록*/}
      {/*로그인 0  : Mainstack, 로그인 x :*/}
      {/*ser안의 값이 있따면 로그인O, 없다면 로그인 x*/}
      {loading ? <LoadingScreen /> : MainStream}
    </NavigationContainer>
  );
}

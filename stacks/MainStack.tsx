import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import CreatePost, { DummyDataType } from "../screens/Createpost"; // DummyDataType: 이미지 또는 업로드용 데이터 타입
import MainTabs from "./MainTabs";
import UploadPost from "../screens/UploadPost";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// 📌 MainStack에 등록될 모든 화면과 그에 대응하는 파라미터 타입 정의
// 화면 이동 시 타입 오류를 방지하고, props의 타입 자동 완성을 도와줌
export type MainStackScreenList = {
  MainTabs: undefined; // 하단 탭 화면 (MainTabs)에는 별도 데이터 전달 없음
  CreatePost: undefined; // 게시물 작성 화면도 파라미터 없음
  UploadPost: {
    assets: DummyDataType[]; // 이미지나 미디어 데이터 배열을 전달
  };
};

// 📌 네비게이션 훅 (useNavigation 등)에서 사용할 수 있도록 타입 지정
export type NaviProps = NativeStackNavigationProp<MainStackScreenList>;

// 📌 Stack Navigator 인스턴스 생성
const Stack = createStackNavigator<MainStackScreenList>();

// 📌 Stack Navigator 정의 (화면 목록과 순서 설정)
export default () => {
  return (
    <Stack.Navigator>
      {/* 메인 홈화면: 하단 탭으로 구성된 복합 화면 */}
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }} // 헤더를 숨겨서 UI를 깔끔하게
      />

      {/* 게시물 작성 화면: 사용자 입력 또는 카메라 기능 등 포함 */}
      <Stack.Screen 
        name="CreatePost" 
        component={CreatePost} 
        // options={{ title: '게시물 작성' }} // 필요 시 커스텀 타이틀 설정
      />

      {/* 업로드 화면: 이미지 선택 후 넘어오는 화면
          - DummyDataType[] 형태의 assets 배열을 받아서 처리 */}
      <Stack.Screen 
        name="UploadPost" 
        component={UploadPost} 
        // options={{ title: '업로드' }} // 선택적으로 타이틀 설정
      />
    </Stack.Navigator>
  );
};

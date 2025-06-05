// 네비게이션 훅과 UI 컴포넌트 import
import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";

// MainStack에 등록된 화면 타입 정의
import { MainStackScreenList } from "../stacks/MainStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from "../firebaseConfig";

export default function Home() {
  // 0. Initialized
  // 📌 네비게이션 기능을 사용하기 위한 hook (현재 Stack 기준)
  const navi = useNavigation<NativeStackNavigationProp<MainStackScreenList>>();

  // A. Logic process
  // 📌 CREATE 버튼을 눌렀을 때 CreatePost 페이지로 이동
  const goToPage = () => {
    // Alert.alert("페이지 이동"); ← 알림창 테스트용
    navi.navigate("CreatePost");
  };
  const signOut = async () => {
    await auth.signOut();
  };
  // B. page UI Rendering
  // 📌 기본 홈 화면 UI (상단 바만 있는 상태)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>InstaDaelim</Text>
        {/* 게시물 작성 화면으로 이동하는 버튼 */}
        <Button onPress={goToPage} title={"CREATE"} />
      </View>
      {/*테스트용 로그아웃버튼튼 */}
      <Button title="Log out" onPress={signOut} />
    </View>
  );
}

// CSS 부분 (StyleSheet)
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", // 배경색
    flex: 1, // 화면 전체 채움
    justifyContent: "flex-start", // 상단 정렬
  },

  header: {
    backgroundColor: "tomato", // 헤더 배경색
    height: 80, // 헤더 높이
    flexDirection: "row", // 가로 정렬
    alignItems: "center", // 수직 가운데 정렬
    justifyContent: "space-between", // 양쪽 정렬 (텍스트 / 버튼)
    paddingHorizontal: 20, // 좌우 패딩
  },
});

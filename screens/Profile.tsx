// React Native에서 기본적으로 사용하는 View, Text 컴포넌트 import
import { View, Text } from "react-native";

// Profile 화면을 구성하는 기본 컴포넌트
// 특별한 props나 state 없이 정적인 텍스트만 표시
export default () => {
  return (
    // View는 전체 레이아웃 컨테이너 역할
    <View>
      {/* Text는 "Profile Screen"이라는 글자를 화면에 보여줌 */}
      <Text>Profile Screen</Text>
    </View>
  );
};

// 로딩 인디케이터와 레이아웃 컴포넌트를 React Native에서 가져옴
import { ActivityIndicator, View } from "react-native";

// styled-components를 이용해 스타일 적용
import styled from "styled-components";

// 전체 화면을 감싸는 컨테이너
const Container = styled(View)`
  flex: 1;                      // 전체 화면 채우기
  background-color: white;     // 배경색 흰색
  justify-content: center;     // 세로 중앙 정렬
  align-items: center;         // 가로 중앙 정렬
`;

// 기본 내보내기 컴포넌트 (로딩 화면)
// 로딩 상태일 때 이 화면을 보여주면 사용자가 기다리는 걸 인식할 수 있음
export default () => {
  return (
    <Container>
      {/* ActivityIndicator: 로딩 애니메이션 (회전하는 원) */}
      <ActivityIndicator size={"large"} />
    </Container>
  );
};

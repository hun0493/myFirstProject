// React Native 기본 컴포넌트 import
import { Text, TextInput, View, Image } from "react-native";

// styled-components를 사용한 스타일 정의
import styled from "styled-components/native";

// 네비게이션 관련 타입 정의 import
import { MainStackScreenList } from "../stacks/MainStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// 아이콘 사용 (사진 변경 버튼 등)
import { AntDesign } from "@expo/vector-icons";

// 기본 컨테이너 (전체 레이아웃을 감쌈)
const Container = styled(View)``;

// 타이틀 텍스트
const Title = styled(Text)``;

// 업로드 박스: 사진과 캡션 영역을 담는 상위 Row
const UploadBox = styled(View)`
  flex-direction: row;         // 가로 정렬
  background-color: tomato;    // 배경색 (테스트용)
`;

// 캡션 입력 영역
const Caption = styled(View)`
  flex: 1;                     // 남은 공간 모두 사용
  background-color: yellowgreen; // 배경색 (테스트용)
`;

// 캡션 입력을 위한 텍스트 입력창
const Input = styled(TextInput)``;

// 사진 박스를 감싸는 뷰
const PhotoBox = styled(View)`
  width: 200px;
  height: 200px;
`;

// 실제 이미지 표시
const Photo = styled(Image)`
  width: 200px;
  height: 200px;
  border-radius: 10px;         // 모서리 둥글게
`;

// 사진 위에 어둡게 덮는 반투명 검정 오버레이 (현재 사용 X)
const PhotoBlack = styled(View)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: black;
  opacity: 0.3;
  position: absolute;
`;

// UploadPost 컴포넌트 정의
export default ({
  route: { params },
}: NativeStackScreenProps<MainStackScreenList, "UploadPost">) => {
  // 전달받은 assets 배열이 null이면 빈 배열로 초기화 (예외 방지)
  const assets = params.assets ?? [];

  return (
    <Container>
      {/* 페이지 타이틀 */}
      <Title>upload post page</Title>

      {/* 업로드 박스: 이미지 + 캡션 영역 */}
      <UploadBox>
        {/* 이미지 영역 */}
        <PhotoBox>
          {/* 선택한 첫 번째 이미지 미리보기 */}
          <Photo source={{ uri: assets[0]?.uri }} />

          {/* 우측 상단의 이미지 전환 버튼 (예: 다른 이미지로 교체) */}
          <AntDesign
            style={{ position: "absolute", right: 0, margin: 7 }}
            name="switcher"
            size={25}
            color={"white"}
          />
        </PhotoBox>
      </UploadBox>

      {/* 캡션 입력 영역 */}
      <Caption>
        <Input placeholder="Write a caption..." />
      </Caption>
    </Container>
  );
};

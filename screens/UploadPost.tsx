// React Native 기본 컴포넌트 import
import {
  Text,
  TextInput,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";

// styled-components를 사용한 스타일 정의
import styled from "styled-components/native";

// 네비게이션 관련 타입 정의 import
import { MainStackScreenList } from "../stacks/MainStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// 아이콘 사용 (사진 변경 버튼 등)
import { AntDesign } from "@expo/vector-icons";
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import HeaderBtn from "../components/HeaderBtn";

// 컨테이너 (전체 레이아웃을 감쌈)
const Container = styled(View)`
  background-color: black;
  flex: 1;
  padding: 20px;
`;

// 타이틀 텍스트
const Title = styled(Text)`
  color: white;
  font-size: 24px;
  margin-bottom: 20px;
`;

// 업로드 박스 (사진 + 캡션 입력 영역)
const UploadBox = styled(View)`
  flex-direction: row;
`;

// 캡션 입력 영역
const Caption = styled(View)`
  flex: 1;
`;

// 입력창
const Input = styled(TextInput)`
  color: white;
  font-size: 20px;
  padding: 10px;
`;

// 사진 영역
const PhotoBox = styled(View)`
  width: 200px;
  height: 200px;
`;

const Photo = styled(Image)`
  width: 200px;
  height: 200px;
  border-radius: 10px;
`;

const PhotoBlack = styled(View)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: black;
  opacity: 0.3;
  position: absolute;
`;

// 로딩 박스 (업로드 중 표시)
const LoadingBox = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: #000000b8;
`;

const LoadingText = styled(Text)`
  color: white;
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

// UploadPost 컴포넌트 정의
export default ({
  route: { params },
}: NativeStackScreenProps<MainStackScreenList, "UploadPost">) => {
  const assets = params.assets ?? [];
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navi = useNavigation();

  const onChangeCaption = (text: string) => {
    setCaption(text);
  };

  const onUpload = () => {
    if (caption === "") {
      Alert.alert("업로드 오류", "글을 작성한 경우에만 업로드 가능합니다");
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      // 업로드 처리 로직 (여기에 서버 업로드 코드 작성 가능)
      setTimeout(() => {
        setLoading(false);
        Alert.alert("업로드 완료", "업로드가 성공적으로 완료되었습니다.");
        navi.goBack();
      }, 2000); // 테스트용 업로드 시뮬레이션 (2초 후 완료)
    } catch (error) {
      setLoading(false);
      Alert.alert("업로드 실패", "업로드 중 오류가 발생했습니다.");
    }
  };

  useLayoutEffect(() => {
    navi.setOptions({
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "white",
      headerRight: () => <HeaderBtn title="Upload" onPress={onUpload} />,
    });
  }, [caption, loading]);

  return (
    <Container>
      <Title>upload post page</Title>

      <UploadBox>
        <PhotoBox>
          <Photo source={{ uri: assets[0]?.uri }} />
          <PhotoBlack />
          {assets.length >= 2 && (
            <AntDesign
              style={{ position: "absolute", right: 0, margin: 7 }}
              name="switcher"
              size={25}
              color={"white"}
            />
          )}
        </PhotoBox>

        <Caption>
          <Input
            multiline={true}
            value={caption}
            placeholder="글을 작성하세요"
            placeholderTextColor={"#383838"}
            onChangeText={onChangeCaption}
          />
        </Caption>
      </UploadBox>

      {loading && (
        <LoadingBox>
          <ActivityIndicator size="large" color="white" />
          <LoadingText>업로드 중...</LoadingText>
        </LoadingBox>
      )}
    </Container>
  );
};

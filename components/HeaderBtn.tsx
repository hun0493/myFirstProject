import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

const BtnContainer = styled(TouchableOpacity)`
  padding: 10px 15px;
`;
const Title = styled(Text)`
  font-size: 18px;
  color: tomato;
`;

//전달 받을 props 타입 정의
type Props = {
  title: string /** 버튼 의 타이틀 */;
  onPress: () => void /** 버튼눌렀을때  의 타이틀 */;
};

export default ({ title, onPress }: Props) => {
  return (
    <BtnContainer onPress={onPress}>
      <Title>{title}</Title>
    </BtnContainer>
  );
};

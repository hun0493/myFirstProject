import { useEffect, useLayoutEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Linking,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import LoadingScreen from "./LoadingScreen";
import * as MediaLibrary from "expo-media-library";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackScreenList } from "../stacks/MainStack";

// legacy css
const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
});

const Container = styled(View)`
  flex: 1;
`;
const PageTitle = styled(Text)`
  font-size: 30px;
  text-align: center;
`;
//My Gallery Photo Compoent
const PhotoBtn = styled(TouchableOpacity)`
  width: 100px;
  height: 100px;
`;

const PhotoImg = styled(Image)`
  width: 100%;
  height: 100%;
  background-color: yellowgreen;
`;

//Select Photo
const SelectedPhoto = styled(View)`
  width: 200px;
  height: 200px;
`;

const SelectedPhotoimage = styled(Image)`
  width: 100%;
  height: 100%;
`;
//select Icon
const InnerCircle = styled(View)`
  width: 25px;
  height: 25px;
  background-color: #0055ff;
  position: absolute;
  border-radius: 50%;
  margin: 5px;
  right: 0px;
  justify-content: center;
  align-items: center;
`;
// const SelectIcon = styled(Image)`
//   width: 100%;
//   height: 100%;
// `;

const AlbumMenuTitle = styled(Text)`
  font-weight: 600;
  font-size: 25px;
  color: black;
  margin: 15px 20px;
`;

const NextHeaderBtn = styled(TouchableOpacity)`
  padding: 5px 15px;
`;

const NextHeaderTitle = styled(Text)`
  font-size: 18px;
  color: dodgerblue;
`;

// 한 줄에 띄울 갤러리 사진 수
const numColumns = 3;

export default () => {
  // state 는 'userState'라는 Hook을 이용해 만듦
  //A. lodingState : 로딩여부
  const [loading, setLoding] = useState<boolean>(true);

  //B. 갤러리에서 불러온 사진들
  const [myPhotos, setMyPhotos] = useState<IDummyData[]>([]);
  //C. 불러온 사진중에서 선택한 사진들
  const [selectedphotos, setSelectedPhotos] = useState<IDummyData[]>([]);

  //hook : 스마트폰 화면의 넓이를 가져오는 기능
  const { width: WIDTH } = useWindowDimensions();

  //Hook : 페이지 이동을 하기위한 네비게이션 훅
  const navi = useNavigation<NativeStackNavigationProp<MainStackScreenList>>();

  //갤러리 포토 사이즈 (inFlatlist)
  const itemSize = WIDTH / numColumns;

  //selected Photo Size (in ScrollView)
  const photoSize = WIDTH * 0.75;
  const PhotoPadding = (WIDTH - photoSize) / 2;

  //내가 선택한 사진인지 아닌지 확인
  const isSelect = (photo: DummyDataType): boolean => {
    const findPhotoIndex = selectedphotos.findIndex(
      (asset) => asset.id === photo.id
    );
    //findPhoto : 0보다 작으면 내가 선택 안한거
    //0보다 크면 내가 고른거
    return findPhotoIndex < 0 ? false : true;
  };

  //불러온 사진 선택하기
  const onSelectPhoto = (photo: DummyDataType) => {
    //1.선택한 사진인지 아닌지
    //=> photo 가 selectedPhotos안에 존재하는지 확인
    const findPhotoIndex = selectedphotos.findIndex(
      (asset) => asset.id === photo.id
    );
    // let isSelected = false;
    // for (let i = 0; i < selectedphotos.length; i++) {
    //   if (selectedphotos[i].id == photo.id) {
    //     isSelected = true;
    //     break;
    //   }
    // }

    //A.내가 한번도 선택하지 않은 사진 => 선택한 사진 리스트(SelectedPhotos)에 추가
    if (findPhotoIndex < 0) {
      //선택한 사진이 추가된 새로운 리스트 생성
      //선택사진 리스트에 추가
      //...?? * Spread문법 배열/리스트에 요소를 모두 꺼냄
      const newPhotos = [...selectedphotos, photo];
      //selectedPhoto State에 내가 선택한 사진을 추가
      setSelectedPhotos(newPhotos);
    }
    //B.이미 선택했던 사진 => 선택한 사진 리스트(SelectedPhotos)에서 삭제
    else {
      //1. 지우고 싶은 사진의 index 번호 알아오기 -> findPhotoIndex
      //2. 선택사진 리스트에서 해당 index 번호의 item(사진)지우기
      const removedPhotos = selectedphotos.concat();
      const deleteCount = 1;
      removedPhotos.splice(findPhotoIndex, deleteCount);
      //3. 해당 사진이 지워진 새로운 선택사진 리스트를 갱신 (update)
      setSelectedPhotos([...removedPhotos]);
    }
  };

  //갤러리에서 사진'들' 불러오기(비동기 처리)
  const getMyPhotos = async () => {
    //1. 나의 사진첩에 권한 요청 | 아직 결정 못했을때 + 비동기 (Async)
    const { status } = await MediaLibrary.requestPermissionsAsync();
    //방어코드 1-1.거절한경우
    if (status === MediaLibrary.PermissionStatus.DENIED) {
      Alert.alert(
        "사진 접근 권한",
        "기능을 사용하시려면 사진 접근 권한을 허용해주세요",
        [
          {
            onPress: async () => await Linking.openSettings(),
          },
        ]
      );
      //접근 권한을 변경할 수 있도록 권한 수정 설정창으로 이동
      //함수 더이상 실행하지 않고 종료
      return;
    }
    //2. 사진첩에서 사진들 불러오기
    const { assets } = await MediaLibrary.getAssetsAsync();
    //3. 불러온 사진들을 myPhotos State에 저장/할당
    setMyPhotos(dummyPhotoDatas);
    //Final : 로딩 종료
    setLoding(false);
  };

  //현재 페이지 접속 시, 1번 실행되는 Hook
  useEffect(() => {
    //3초 후에, getMyphotoes실행
    setTimeout(() => {
      getMyPhotos();
    }, 3000);
  }, []);

  //Header의 스타일을 변경하기 위해 사용하는 훅
  useLayoutEffect(() => {
    //페이지 이동을 위한 함수 + 데이터 전달
    //[*문제발생]: 페이지 생성시, 비어있는 selectedPhotos를 1번 집어넣고,
    // 끝나기 때문에 나중에 사진을 선택하더라도 goto-selectedphotoes 값이
    // 갱신이 되지 않는다.. > 의존성배열 [selectedPhotos]넣어서
    // selectedPhotos 안의 값이, 사진을 선택할떄만다 useEffect가 새로 실행되어
    // 갱신되로록 코드를 수정한다.
    const goTo = () => {
      // 선택할 사진이 없으면 이동하지 않고, 알림!
      if (selectedphotos.length < 1) {
        Alert.alert("알림", "선택하신 사진이 없습니다. 사진을 선택해주세요");
        return;
      }
      //페이지 이동동
      navi.navigate("UploadPost", {
        assets: selectedphotos,
      });
    };

    //네비게이션 훅을 사용해 헤더 접근
    navi.setOptions({
      headerRight: () => (
        <NextHeaderBtn onPress={goTo}>
          <NextHeaderTitle>Next</NextHeaderTitle>
        </NextHeaderBtn>
      ),
    });
  }, [selectedphotos]);

  // Page UI Rendering
  // > loading인 경우 LoadingScreen, 로딩 끝나면 현재page
  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
      {/* A.내가 선택한 사진 보여줄 가로 스크롤 뷰 */}
      {/* selectedPhotos가 가지고 있는 데이터 만큼 반복 */}
      <ScrollView
        style={{ width: WIDTH, height: WIDTH }}
        contentContainerStyle={{
          // paddingLeft: PhotoPadding,
          // paddingRight: PhotoPadding,
          paddingHorizontal: PhotoPadding,
          alignItems: "center",
          gap: 10,
        }}
        snapToInterval={photoSize + 7}
        decelerationRate={"fast"}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {selectedphotos.map((photo, index) => {
          return (
            <SelectedPhoto
              key={index}
              style={{
                width: photoSize,
                height: photoSize,
              }}
            >
              <SelectedPhotoimage source={{ uri: photo.uri }} />
            </SelectedPhoto>
          );
        })}
      </ScrollView>

      <AlbumMenuTitle>최근 순 ▽</AlbumMenuTitle>
      {/* B.내 갤러리의 사진들 보여줄 세로 플렛 리스트 */}
      <FlatList
        //keyExtractor={(item) => item.id}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns} /**한줄에 띄울 아이템 수 */
        data={myPhotos} /**스크롤 할 데이터 */
        /**렌더 아이템 : 데이터를 어떻게 보여줄지 */
        renderItem={({ item }) => {
          return (
            <PhotoBtn
              onPress={() => onSelectPhoto(item)}
              style={{ width: itemSize, height: itemSize }}
            >
              <PhotoImg source={{ uri: item.uri }} />
              {isSelect(item) && (
                <InnerCircle>
                  <AntDesign name="checkcircle" size={24} color="black" />
                </InnerCircle>
              )}
            </PhotoBtn>
          );
        }}
      />
    </Container>
  );
};

//더미 데이터 타입
export type DummyDataType = {
  id: string;
  uri: string;
};

//TYPE = Union (값을 제한함)
type AlignitemsType = "center" | "flex-end" | "flex-start";
const style: AlignitemsType = "center";

// //DummyData Type 2
interface IDummyData {
  id: string;
  uri: string;
}

//dummydata
const dummyPhotoDatas: IDummyData[] = [
  {
    id: "1",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfBAxq4CUjm-2l4t0WVTXVPYO2rwUrxx797Q&s",
  },
  {
    id: "2",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfBAxq4CUjm-2l4t0WVTXVPYO2rwUrxx797Q&s",
  },
  {
    id: "3",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfBAxq4CUjm-2l4t0WVTXVPYO2rwUrxx797Q&s",
  },
  {
    id: "4",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfBAxq4CUjm-2l4t0WVTXVPYO2rwUrxx797Q&s",
  },
  {
    id: "5",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfBAxq4CUjm-2l4t0WVTXVPYO2rwUrxx797Q&s",
  },
  {
    id: "6",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfBAxq4CUjm-2l4t0WVTXVPYO2rwUrxx797Q&s",
  },
  {
    id: "7",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfBAxq4CUjm-2l4t0WVTXVPYO2rwUrxx797Q&s",
  },
  {
    id: "8",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfBAxq4CUjm-2l4t0WVTXVPYO2rwUrxx797Q&s",
  },
  {
    id: "9",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfBAxq4CUjm-2l4t0WVTXVPYO2rwUrxx797Q&s",
  },
];

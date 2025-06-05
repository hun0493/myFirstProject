##Expo serbver 시작

expo icon 설치

firebase 설치하기
1.firebase console 에서 프로젝트 생성
2.<web앱> 추가
3.firebase sdk 추가 : npm install firebase --force
4.firebase sdk console

## Firebase RN 용으로 변경하기 위한 AsyncStorage 설치

1. npm i @react-native-async-storage/async-storage --force
2. firebaseConfig 에 1번으로 설치된 설정값 추가 / 수정
3. tsConfig.ts 에 'paths:["@firebase/auth":...]추가
   - 2번을 하기 위해서 올바른 사용 경로를 인식할 수 있게 ts 한테 알려줌.
   -

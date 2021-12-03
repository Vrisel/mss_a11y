# 접근성 향상에 초점을 맞춘 **[무신사 스토어](https://store.musinsa.com) 클론**

> 해당 사이트를 이용하며 경험한 [불편함을 해소](#해소한-불편함)해보고자 시작한 프로젝트

## 개요

- 경험한 불편함은 대체로 스크린리더 접근성과 관련이 있음
- 로직이 간결하지 않을 수 있으나, [다양한 컴포넌트를 구현](#특별히-구현한-컴포넌트)해보고자 함
- 프론트엔드 위주로 구현했기 때문에 데이터를 동적으로 받아오지는 않음
  - 다만 렌더링(`<template>`)은 가능한 한 동적으로 구현함
- 외관은 Bootstrap을 이용하여 가능한 한 원본과 비슷하게 구현하고자 노력함
  - 목적상 수정이 필요한 부분이나, 개인적으로 구현이 어려운 부분은 임의로 변경
- <u>width=1600px인 Chrome browser 환경에서 개발</u>
  (bootstrap으로 구현했지만 반응형은 고려하지 않았습니다)

## 해소한 불편함

- [x] 각 랜드마크에 `role` 속성 및 레이블 적용
- [x] 레이블이 필요한 요소에 레이블 적용
  - [x] 품목 리스트의 숫자가 항목 개수임을 ARIA로 명시
  - [x] 표시된 할인 전후 가격 ARIA로 명시 (취소선이 )
- [x] 헤더 navbar의 확장메뉴가 마우스오버가 아니라 클릭 시에 열리도록 변경
  - [ ] 확장 가능한 메뉴라는 가이드 필요
    - [ ] 시각적 가이드
    - [x] `aria-haspopup="true"` (bootstrap component에서 제공)
- [x] 로그인 전에는 필요 없는 링크들을 조건부로 표시되도록 함
- [x] 링크 텍스트에 해당 링크의 기능이 드러나도록 함
  - "자세히보기", "CLICK" 등의 링크 텍스트 사용 지양
- [x] modal 창이 떴을 때 배경에 있는 요소들에 접근할 수 없도록 함 (bootstrap component에서 제공)

## 특별히 구현한 컴포넌트

- 여닫을 수 있는 사이드바
  - 토글 버튼 click 시 발생하는 `$event`를 상위 레이아웃에서 캐치
- 키보드 탐색이 가능한 아코디언 (사이드바 "품목" 탭 내 위치)
  - 위, 아래, 홈, 엔드 버튼의 키보드 이벤트에 따라 header index 이동
  - 버튼 동작을 위해 스페이스 키를 눌렀을 때 화면이 스크롤 되지 않도록 `.prevent` 적용
- 일정 시간마다 내용을 랜덤으로 바꾸는 컴포넌트
  - `mouseenter`시에는 멈추고 `mouseleave`시에 재개

## 활용한 기술

- 기본: [Nuxt.js](https://nuxtjs.org/)
- State 관리: [Vuex](https://vuex.vuejs.org/kr/)
- CSS Library: [Bootstrap-Vue](https://bootstrap-vue.org/)
- Linter: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- 단위테스트: [Jest](https://jestjs.io/)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

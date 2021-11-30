# 접근성 향상에 초점을 맞춘 **[무신사 스토어](https://store.musinsa.com) 클론**

> 해당 사이트를 이용하며 경험한 불편함을 해소해보고자 시작한 프로젝트

## 개요

- 로직이 간결하지 않을 수 있으나, 다양한 컴포넌트를 구현해보고자 함
- 프론트엔드 위주로 구현했기 때문에 데이터를 동적으로 받아오지는 않음
  - 다만 렌더링(<template\>)은 가능한 한 동적으로 구현함
- 외관은 Bootstrap을 이용하여 가능한 한 원본과 비슷하게 구현하고자 노력함
  - 목적상 수정이 필요한 부분이나, 개인적으로 구현이 어려운 부분은 임의로 변경
- Chrome browser 환경에서 개발

## 활용한 기술

- 기본: [Nuxt.js](https://nuxtjs.org/)
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

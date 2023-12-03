## 📝 프로젝트 소개

<br/>
<br/>  

## 🙋‍♂️ 팀원 소개

| [이진천](https://github.com/LeeJincheon)      | [김남혁](https://github.com/knh9612)      | [김지관](https://github.com/zc149)      | [김유은](https://github.com/YueunKim)      |
| --------------------------------------------- | ----------------------------------------- | --------------------------------------- | ------------------------------------------ |
| ![이진천](https://github.com/LeeJincheon.png) | ![김남혁](https://github.com/knh9612.png) | ![김지관](https://github.com/zc149.png) | ![김유은](https://github.com/YueunKim.png) |

<br/>
<br/>

## 🛠 기술 스택

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Development

<img alt=""  src ="https://img.shields.io/badge/html5-E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/> <img alt=""  src ="https://img.shields.io/badge/css3-1572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/> <img alt=""  src ="https://img.shields.io/badge/javascript-F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=white"/> <img alt=""  src ="https://img.shields.io/badge/node.js-339933.svg?&style=for-the-badge&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

### Communication

![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)

<br/>
<br/>

## 💻 협업 방식

<br/>
<br/>

## ⚙ 기능 시연

<br/>
<br/>

## 📲 도메인 용어 정의

<br/>
<br/>

## ✔ 핵심 기능

<br/>
<br/>

## 🎯 트러블 슈팅

### 1. 뉴스 요약 기능 개선

- 문제 상황 : 네이버 뉴스 검색 API를 사용하여 기사를 검색했을 때 기사 내용을 요약하는 description 요소의 정보가 충분하지 않다는 의견이 있었습니다.

- 해결 방안 : 요약 API를 추가로 활용하여 기사 내용을 더욱 세밀하게 요약하였습니다.

<br/>

### 2. 뉴스 본문 크롤링

- 문제 상황 : 뉴스 페이지 본문을 추출하려고 fetch API와 브라우저 내장 객체인 DOMParser를 사용하려 했습니다. 하지만 CORS 정책 이슈로 인해 데이터 추출에 제한이 있었습니다.

- 해결 방안 : 서버 사이드에서 웹 크롤링을 수행할 수 있는 Puppeteer 라이브러리를 Express에 적용하였습니다. Puppeteer는 브라우저 환경에서 동작하는 JavaScript 코드를 서버 측에서 실행할 수 있게 하여 CORS 문제를 우회할 수 있었습니다.

<br/>

### 3. 뉴스 본문 태그 일관성 부족

- 문제 상황 : 각 언론사의 웹페이지 구조가 달랐습니다.
  네이버 기사는 뉴스 본문이 주로 'article' 태그 안에 위치해 있었으나 다른 기사에서는 'p' 또는 'div' 태그에 담겨있는 등 뉴스 본문을 포함하고 있는 HTML 태그가 일관성이 없었습니다.
  이로 인해 기사 내용을 추출하는 데 어려움이 있었습니다.

- 해결 전략 : 웹페이지 URL에 'naver' 문자열이 포함된 경우에만 데이터를 수집하도록 설정하여 네이버 뉴스만을 대상으로 크롤링하였습니다.

  <br/>
  <br/>

## 🔎 ESLint 규칙 및 적용 후기

<br/>
<br/>

## 😀 느낀 점

# 이한형 - 식스샵 프론트개발자 채용 과제

- [과제 안내 링크](https://www.notion.so/sixshop/af7f8a9586b648e6ba92a8c24ff0ef66)
- 과제 제출 기한은 과제 메일 발송일로부터 7일 후 자정 12시까지 입니다. 기한을 꼭 지켜주세요.

# 실행 방법
<hr/>

```angular2html
yarn install
or
npm install

yarn dev
or 
npm run dev
```

# 요구 사항
<hr/>

### 1) 페이지 렌더링
  - Products
    - 제품 상세 페이지는 getServerSideProps를 사용해요 SSR 방식을 채택하였습니다. 
  - pagination, infinite-scroll
    - 리스트 페이지이기 때문에 클라이언트 사이드에서 data fetch 방법을 채택하였습니다.

### 2) 시맨틱 마크업
기본적인 뼈대는 header, main을 이용했습니다.
pagination, infinite-scroll 페이지 같은 경우 리스트이기 때문에 ul, li 태그를 활용했습니다.


### 3) 의문점
- msw
  - msw라는 API 모킹 라이브러리를 이용하여 데이터를 가져오는 방식을 과제에서는 사용하고 있습니다. client 환경에서는 사용에 문제가 없지만 server 환경에서는 절대 경로를 사용하여야 합니다. products 페이지에서 getServerSideProps를 사용하는데 문제가 발생하여 api 요청 시 에러가 발생하면 api/data/products.json 파일을 이용하여 렌더링 하였습니다.

### 4) 로그인 페이지
- 유효성 검사
  - 정규 표현식을 이용하여 유효성을 검사하는 함수들을 이용하여 검사를 하였습니다.
- 로그인 유지
  - session storage를 이용하여 로그인 정보가 있을 시 유저 정보 조회 api를 통해 검증 후 통과한다면 로그인이 유지되도록 구현하였습니다.
- 로그인 페이지 홈 화면 리다이렉트
  - 유저 정보를 저장하는 전역변수에 값이 저장되어 있는지 검사 후 저장되어 있다면 홈 화면으로 리다이렉트 하는 방식으로 구현하였습니다.

### 5) 페이지네이션
- usePagination
  - total page갯수를 parameter로 받아서 page range와 페이지 이동을 담당하는 함수, 그리고 이전으로 이동이 가능한지, 다음으로 이동이 가능한지 여부를 저장하고 있는 state를 return 하였습니다.
- 상품 가격 세 자리마다 콤마
  - javaScript의 내장 함수인 toLocaleString을 이용하였습니다.

### 6) 무한 스크롤
- 무한 스크롤 구현
  - intersection Observer API를 이용하는 useInfiniteScroll 커스텀 훅을 구현하여서 사용했습니다.
- 가져올 데이터 없는 경우 요청 금지
  - 매 요청 시 현재 데이의 갯수와 요청 시 받아오는 데이터의 총 갯수를 비교하여 둘의 갯수가 같다면 더이상 요청할 수 없도록 구현하였습니다.
- 상품 상세 이동 후 이전 페이지로 돌아올 시 기존의 위치로 이동
  - next js의 router.beforePopState를 이용하여 구현하였습니다.
  - 데이터는 전역변수로 관리하여 상품상세페이지에서 무한 스크롤 페이지로 이동시 전역 상태 관리를 통해 복원하도록 하였습니다.

### 7) etc
- SEO 최적화
  - lighthouse를 이용하여 SEO 최적화 작업을 진행하였습니다.
- SSR styled components 깜빡임
  - _documents.tsx 와 bable plugin 을 이용하여 해결


# Blog_Client

기술 스택

- Frontend: Next.js 15 (App Router), React Query, Froala Editor
- Backend: NestJS (Docker EC2 배포), RDS (PostgreSQL)
- Editor: react-froala-wysiwyg
- Storage: EC2 내부 디렉토리 (/uploads/images) 사용

## 작업한 영역

- 전체 게시글 조회 및 카테고리 sorting 추가
- 게시글 공개여부 설정
- form -> react-hook-form 변경
- kakao login 처리
- 댓글 생성/읽기 기능
- DB 마이그레이션

- https 로 변경

## 다음주까지 FE 작업 예정인 기능

- (new) zustand 로그인 전역 상태 관리하기
- (new) kakao login 에 따른 user 분기처리

- 신규 업데이트 될 게시글 추가
- 카테고리 id 없으면 만들기
- 이미지 저장 S3 추가
- 글 수정/ 삭제
- (차차) 질의응답 챗봇


# login process

https://velog.io/@roum02/JWT-%ED%86%A0%ED%81%B0%EC%9D%B4%EB%9E%91-%EC%8B%B8%EC%9A%B0%EA%B8%B0 

- connectionless: HTTP는 연결을 유지하지 않는다.
- stateless: HTTP는 상태를 유지하지 않는다.

## 1) session

![session](https://velog.velcdn.com/images%2Fjunghyeonsu%2Fpost%2F7f05d33e-520c-4617-9776-183a0d9611d5%2Fimage.png)

## 2) JWT token

![secret_key](https://velog.velcdn.com/images%2Fjunghyeonsu%2Fpost%2Ff651801b-8494-4913-82c6-ff89f8bbd59f%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-15%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%208.45.47.png)

: 향상된 보안

### 2-1) Only "Access Token"

![access-token](https://velog.velcdn.com/images%2Fjunghyeonsu%2Fpost%2Faf0fc689-e01a-484e-9519-267cba590864%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-09-14%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209.02.17.png)

### 2-2) with refresh token

## HttpOnly

: HttpOnly 쿠키 속성을 사용하면 JavaScript를 통해 쿠키에 접근할 수 없게 되어, 악성 스크립트를 통해 쿠키 값에 접근하는 것을 막아준다.

## 이슈

- 새로고침 이후 cookie 사라지는 이슈..

- 의심되는 원인 1) http or https

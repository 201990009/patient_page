# Patient Registration Page

환자등록 화면을 Vite 기반 단일 페이지 앱으로 만든 프로젝트입니다. 화면에서 환자 정보를 입력하고 Supabase REST API를 통해 `patients` 테이블에 저장, 검색, 삭제할 수 있습니다.

## 작업 내용

- `src/app.js`에 환자등록 화면 UI와 입력 상태 관리를 구현했습니다.
- 필수 항목은 성, 이름, 생년월일, 연락처입니다.
- 생년월일을 입력하면 나이가 자동 계산됩니다.
- 환자번호가 없으면 저장 시 `P`로 시작하는 번호를 자동 생성합니다.
- Supabase REST API로 환자 저장, 검색, 삭제, 샘플 환자 20명 생성을 처리합니다.
- `supabase-schema.sql`에 `patients` 테이블 생성 SQL과 데모용 RLS 정책을 작성했습니다.
- 제공받은 Supabase project URL과 anon public key를 기본 연결값으로 반영했습니다.
- `/rest/v1/`이 포함된 URL과 포함되지 않은 URL을 모두 처리하도록 URL 정규화를 추가했습니다.
- `npm run build`로 `dist/` 빌드 결과를 생성했습니다.

## 실행 방법

의존성이 이미 설치되어 있으면 아래 명령으로 개발 서버를 실행합니다.

```bash
npm run dev
```

브라우저에서 아래 주소를 엽니다.

```text
http://localhost:5173/
```

빌드 파일을 새로 만들려면 아래 명령을 실행합니다.

```bash
npm run build
```

## Supabase 준비

Supabase SQL Editor에서 `supabase-schema.sql` 내용을 먼저 실행해야 합니다.

이 파일은 다음을 만듭니다.

- `public.patients` 테이블
- `patient_no` unique 제약
- anon role이 select, insert, update, delete 할 수 있는 데모용 RLS policy

화면 상단의 `Supabase 연결` 영역에는 기본값이 들어가 있습니다.

- Project URL: `https://cslnxukmvaevuzfiqofl.supabase.co/rest/v1/`
- anon public key: `src/app.js`와 빌드 파일에 기본값으로 포함됨

다시 사용할 Supabase 값과 GitHub 주소는 `SETUP_VALUES.md`에 따로 정리했습니다.

## 조심해야 할 점

- 현재 RLS 정책은 데모용입니다. anon 사용자가 환자 데이터를 조회, 저장, 수정, 삭제할 수 있으므로 실제 운영 환경이나 실제 환자 개인정보에는 그대로 사용하면 안 됩니다.
- anon public key는 브라우저에 노출되는 공개 키입니다. 공개 키 자체보다 RLS 정책과 테이블 권한을 엄격하게 제한하는 것이 중요합니다.
- 실제 운영에서는 로그인, 사용자별 권한, 최소 권한 RLS 정책, 서버 측 API, 감사 로그를 추가해야 합니다.
- 환자 이름, 생년월일, 연락처, 개인 ID 번호는 개인정보입니다. 테스트할 때도 실제 환자 정보를 입력하지 않는 것이 안전합니다.
- GitHub에 올라간 `dist/` 빌드 파일에도 Supabase 기본 연결값이 포함됩니다.
- `node_modules/`는 저장소에 올리지 않도록 `.gitignore`에 제외했습니다. 새 환경에서는 `npm install` 후 실행해야 합니다.
- 프로젝트 폴더 안의 `.git` 디렉터리는 현재 환경에서 읽기 전용으로 잡혀 있어, 이번 커밋은 `/tmp/patient_page.git`을 git metadata로 사용해 푸시했습니다.

## GitHub

원격 저장소:

```text
git@github.com:201990009/patient_page.git
```

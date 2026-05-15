# 다시 사용할 설정값

이 프로젝트를 다시 설정하거나 다른 컴퓨터에서 실행할 때 필요한 값입니다.

## Supabase

### Project URL

```text
https://cslnxukmvaevuzfiqofl.supabase.co/rest/v1/
```

### anon public key

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbG54dWttdmFldnV6Zmlxb2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1Njk1NjgsImV4cCI6MjA5NDE0NTU2OH0.NJw9uP9euU40paPzJSoUYZ4CG3oJxsmzBKOyvZw8pbE
```

## GitHub

### 저장소 SSH 주소

```text
git@github.com:201990009/patient_page.git
```

### 저장소 HTTPS 주소

```text
https://github.com/201990009/patient_page
```

## 주의

- Supabase anon public key는 브라우저에서 쓰는 공개 키입니다.
- 그래도 현재 `supabase-schema.sql`의 RLS 정책은 데모용이라 anon 사용자가 환자 데이터를 조회, 저장, 수정, 삭제할 수 있습니다.
- 실제 환자 정보나 운영 환경에 쓰기 전에는 RLS 정책을 반드시 강화해야 합니다.
- 나중에 운영용으로 바꿀 때는 이 값들을 소스 코드에 직접 넣지 말고 `.env` 환경변수로 분리하는 것이 좋습니다.

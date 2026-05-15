# patient_pc

PowerBuilder로 간단한 환자등록 프로그램을 만들기 위한 초안입니다.

이 폴더는 바로 실행되는 `.pbl` 바이너리 프로젝트가 아니라, PowerBuilder IDE에서 가져다 만들 수 있는 설계/스크립트/SQL 샘플입니다.

## 구성

- `sql/patients_table.sql`: 환자 테이블 생성 SQL
- `pb_source/w_patient_register.powerscript`: 환자등록 Window 이벤트 스크립트 예시
- `pb_source/dw_patient_detail.sql`: 상세 입력용 DataWindow SQL
- `pb_source/dw_patient_list.sql`: 환자 목록용 DataWindow SQL
- `docs/build_steps.md`: PowerBuilder IDE에서 만드는 순서

## 화면 구성

간단한 환자등록 화면은 아래처럼 구성합니다.

- 상단 버튼: 신규, 조회, 저장, 삭제, 닫기
- 좌측 또는 하단 목록: 등록된 환자 목록
- 상세 입력 영역: 환자번호, 이름, 생년월일, 성별, 연락처, 이메일, 주소, 비고

## 기본 객체 이름

- Application: `patient_pc`
- Window: `w_patient_register`
- DataWindow 상세: `dw_patient_detail`
- DataWindow 목록: `dw_patient_list`
- Table: `patients`

## 주의

- 실제 `.pbl` 파일은 PowerBuilder IDE에서 생성해야 합니다.
- DB 종류에 따라 SQL 문법과 연결 설정은 조금 바뀔 수 있습니다.
- 실제 환자 개인정보를 넣기 전에는 권한, 접근 로그, 백업, 암호화 정책을 먼저 정해야 합니다.

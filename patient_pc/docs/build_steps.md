# PowerBuilder에서 만드는 순서

## 1. Workspace와 Target 생성

1. PowerBuilder를 실행합니다.
2. 새 Workspace를 만듭니다.
3. Application Target을 만들고 이름을 `patient_pc`로 지정합니다.
4. PBL 이름은 예를 들어 `patient_pc.pbl`로 만듭니다.

## 2. DB 연결

1. DB Profile을 만듭니다.
2. 사용하는 DB에 `sql/patients_table.sql`을 실행합니다.
3. Application Open 이벤트에서 `SQLCA` 연결 정보를 설정합니다.

예시:

```powerscript
SQLCA.DBMS = "ODBC"
SQLCA.AutoCommit = False
SQLCA.DBParm = "ConnectString='DSN=patient_pc;UID=사용자;PWD=비밀번호'"

CONNECT USING SQLCA;

IF SQLCA.SQLCode <> 0 THEN
    MessageBox("DB 연결 실패", SQLCA.SQLErrText)
    RETURN
END IF

Open(w_patient_register)
```

Application Close 이벤트:

```powerscript
DISCONNECT USING SQLCA;
```

## 3. DataWindow 생성

### dw_patient_detail

1. New > DataWindow > Freeform을 선택합니다.
2. SQL Select에서 `pb_source/dw_patient_detail.sql` 내용을 기준으로 만듭니다.
3. Update Properties에서 table은 `patients`, key는 `patient_no`로 설정합니다.
4. 저장 이름은 `dw_patient_detail`로 합니다.

### dw_patient_list

1. New > DataWindow > Grid를 선택합니다.
2. SQL Select에서 `pb_source/dw_patient_list.sql` 내용을 기준으로 만듭니다.
3. 저장 이름은 `dw_patient_list`로 합니다.

DB가 MSSQL이 아니면 문자열 결합 문법이 다를 수 있습니다.

- MSSQL: `last_name + ' ' + first_name`
- Oracle/PostgreSQL: `last_name || ' ' || first_name`

## 4. Window 생성

Window 이름은 `w_patient_register`로 만듭니다.

필요한 컨트롤:

- `dw_detail`: DataWindow control, DataObject는 `dw_patient_detail`
- `dw_list`: DataWindow control, DataObject는 `dw_patient_list`
- `sle_keyword`: 검색어 입력용 SingleLineEdit
- `cb_new`: 신규 버튼
- `cb_search`: 조회 버튼
- `cb_save`: 저장 버튼
- `cb_delete`: 삭제 버튼
- `cb_close`: 닫기 버튼

각 이벤트에는 `pb_source/w_patient_register.powerscript`의 해당 구간을 복사해 넣습니다.

## 5. 최소 테스트

1. 프로그램 실행
2. 신규 버튼 클릭
3. 성, 이름, 연락처 입력
4. 저장 클릭
5. 조회 클릭
6. 목록에서 더블클릭해서 상세 정보가 다시 불러와지는지 확인
7. 삭제 클릭 후 목록에서 없어지는지 확인

## 6. 다음에 보강할 점

- 환자번호 중복 방지 로직 강화
- 필수값 검증 확대
- 생년월일 기준 나이 자동 계산
- 성별/혈액형 등을 DropDownDataWindow 또는 코드 테이블로 분리
- 로그인과 사용자 권한 추가
- 실제 환자 개인정보 저장 전 보안 정책 확정

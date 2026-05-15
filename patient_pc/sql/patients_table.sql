-- 간단한 환자등록 프로그램용 테이블 예시입니다.
-- DB에 맞게 identity/autoincrement 문법은 조정해야 할 수 있습니다.

create table patients (
  patient_no varchar(30) not null primary key,
  last_name varchar(80) not null,
  first_name varchar(80) not null,
  birth_date date,
  gender varchar(10),
  mobile varchar(40),
  email varchar(120),
  address varchar(300),
  remarks varchar(1000),
  created_at timestamp,
  updated_at timestamp
);

create index ix_patients_name on patients (last_name, first_name);
create index ix_patients_mobile on patients (mobile);

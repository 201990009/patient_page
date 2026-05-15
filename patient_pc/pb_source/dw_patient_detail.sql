-- DataWindow: dw_patient_detail
-- Style: Freeform
-- Update table: patients
-- Key column: patient_no

select
  patient_no,
  last_name,
  first_name,
  birth_date,
  gender,
  mobile,
  email,
  address,
  remarks,
  created_at,
  updated_at
from patients
where patient_no = :as_patient_no;

-- DataWindow: dw_patient_list
-- Style: Grid

select
  patient_no,
  last_name + ' ' + first_name as full_name,
  birth_date,
  gender,
  mobile
from patients
where (:as_keyword is null or :as_keyword = '')
   or patient_no like '%' + :as_keyword + '%'
   or last_name like '%' + :as_keyword + '%'
   or first_name like '%' + :as_keyword + '%'
   or mobile like '%' + :as_keyword + '%'
order by patient_no desc;

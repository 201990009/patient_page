import "./styles.css";

// 오늘 날짜를 yyyy-mm-dd 형식으로 만들어 첫 방문일 기본값으로 사용합니다.
const today = new Date().toISOString().slice(0, 10);

// Supabase REST API가 접근할 테이블 이름입니다.
const TABLE_NAME = "patients";
const DEFAULT_SUPABASE_CONFIG = {
  url: "https://cslnxukmvaevuzfiqofl.supabase.co/rest/v1/",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbG54dWttdmFldnV6Zmlxb2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1Njk1NjgsImV4cCI6MjA5NDE0NTU2OH0.NJw9uP9euU40paPzJSoUYZ4CG3oJxsmzBKOyvZw8pbE",
};

// 환자등록 화면의 기본 입력값입니다.
const defaultPatient = {
  registerType: "new",
  newPatientNo: "",
  existingPatientNo: "",
  unknownPatient: "N",
  firstVisitDate: today,
  prefix: "없음",
  lastName: "",
  firstName: "",
  middleName: "",
  middlePrefix: "없음",
  personalIdType: "national",
  personalId: "",
  birthDate: "",
  birthPlace: "",
  bloodType: "선택",
  gender: "male",
  civilStatus: "선택",
  maidenLastName: "",
  maidenMiddleName: "",
  nationality: "선택",
  ethnicGroup: "선택",
  country: "Uzbekistan",
  region: "Tashkent",
  district: "선택",
  city: "선택",
  street: "선택",
  addressDetail: "",
  education: "선택",
  landline: "",
  motherLastName: "",
  motherFirstName: "",
  motherMiddleName: "",
  motherBirthDate: "",
  seniorNumber: "",
  mobile: "",
  email: "",
  vip: "N",
  pcb: "N",
  remarks: "",
};

// Supabase 연결 정보는 기본값을 제공하고, 브라우저 localStorage 값이 있으면 우선 사용합니다.
const storedSupabaseConfig = JSON.parse(localStorage.getItem("supabaseConfig") || "{}");
let supabaseConfig = {
  url: storedSupabaseConfig.url || DEFAULT_SUPABASE_CONFIG.url,
  anonKey: storedSupabaseConfig.anonKey || DEFAULT_SUPABASE_CONFIG.anonKey,
};

// 화면 폼 데이터와 검색 결과 목록을 메모리에 보관합니다.
let patientForm = { ...defaultPatient };
let patientRows = [];

// AI 도우미가 제공할 힌트 데이터입니다.
const hints = {
  default: "입력 필드를 선택하면 AI가 도움을 드릴게요.",
  registerType: "새로운 환자인지, 기존 환자인지 선택해 주세요.",
  newPatientNo: "신규 환자에게 부여할 고유 번호를 입력하거나 자동 생성을 기다리세요.",
  existingPatientNo: "기존 환자의 번호를 입력하여 정보를 불러올 수 있습니다.",
  firstVisitDate: "병원을 처음 방문한 날짜를 기록합니다.",
  prefix: "환자를 부를 적절한 호칭을 선택해 주세요.",
  lastName: "환자의 성(Last Name)을 입력하세요. 여권 영문 성명을 권장합니다.",
  firstName: "환자의 이름(First Name)을 입력하세요.",
  middleName: "해당하는 경우 중간 이름을 입력해 주세요.",
  personalId: "국가 신분증 번호(ID) 또는 여권 번호를 입력해 주세요.",
  birthDate: "환자의 생년월일을 선택하면 나이가 자동으로 계산됩니다.",
  bloodType: "환자의 혈액형 정보를 선택해 주세요.",
  gender: "환자의 성별을 선택해 주세요.",
  nationality: "환자의 국적을 선택해 주세요.",
  country: "현재 거주 중인 국가를 선택해 주세요.",
  mobile: "긴급 연락이 가능한 휴대폰 번호를 숫자만 입력해 주세요.",
  email: "진료 안내 등을 받을 수 있는 이메일 주소를 입력해 주세요.",
  remarks: "기타 특이사항이나 참고할 내용을 자유롭게 적어 주세요.",
};

let currentHint = hints.default;

// 선택 박스 옵션은 데이터와 UI를 분리하기 위해 한곳에 모았습니다.
const options = {
  prefix: ["없음", "Mr.", "Ms.", "Mrs.", "Dr."],
  middlePrefix: ["없음", "의 아들", "의 딸"],
  bloodType: ["선택", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  civilStatus: ["선택", "미혼", "기혼", "이혼", "사별"],
  nationality: ["선택", "Uzbekistan", "Korea", "Kazakhstan", "Kyrgyzstan", "Tajikistan"],
  ethnicGroup: ["선택", "Uzbek", "Korean", "Russian", "Tajik", "Kazakh"],
  country: ["Uzbekistan", "Korea", "Kazakhstan"],
  region: ["Tashkent", "Samarkand", "Bukhara", "Andijan"],
  district: ["선택", "Yunusabad", "Mirabad", "Chilanzar", "Sergeli"],
  city: ["선택", "Tashkent", "Samarkand", "Bukhara"],
  street: ["선택", "Amir Temur", "Navoi", "Mustaqillik", "Furqat"],
  education: ["선택", "초등", "중등", "고등", "대학교", "대학원"],
};

// 폼 섹션 정의입니다. 이 배열을 바꾸면 화면 필드 구성이 바뀝니다.
const sections = [
  {
    title: "기본 정보",
    fields: [
      { type: "select", label: "호칭", name: "prefix" },
      { label: "성 *", name: "lastName" },
      { label: "이름 *", name: "firstName" },
      { label: "중간 이름", name: "middleName" },
      { type: "select", label: "중간 이름 접두어", name: "middlePrefix" },
      { label: "전체 이름", name: "fullName", readonly: true },
    ],
  },
  {
    title: "식별 및 생년월일",
    fields: [
      { label: "개인 ID 번호", name: "personalId" },
      { type: "radio", label: "ID 유형", name: "personalIdType", items: [["여권번호", "passport"], ["식별번호", "national"]] },
      { type: "date", label: "생년월일 *", name: "birthDate" },
      { label: "나이 자동계산", name: "age", readonly: true },
      { label: "출생지", name: "birthPlace" },
      { type: "select", label: "혈액형", name: "bloodType" },
      { type: "radio", label: "성별", name: "gender", items: [["남성", "male"], ["여성", "female"]] },
      { type: "select", label: "혼인상태", name: "civilStatus" },
    ],
  },
  {
    title: "국적 및 주소",
    fields: [
      { label: "결혼 전 성", name: "maidenLastName" },
      { label: "결혼 전 중간 이름", name: "maidenMiddleName" },
      { type: "select", label: "국적", name: "nationality" },
      { type: "select", label: "민족", name: "ethnicGroup" },
      { type: "select", label: "국가", name: "country" },
      { type: "select", label: "지역", name: "region" },
      { type: "select", label: "구역", name: "district" },
      { type: "select", label: "도시", name: "city" },
      { type: "select", label: "도로명", name: "street" },
      { label: "상세주소", name: "addressDetail", wide: true },
      { type: "select", label: "학력", name: "education" },
      { label: "집 전화번호", name: "landline" },
    ],
  },
  {
    title: "가족 및 연락처",
    fields: [
      { label: "모친의 성", name: "motherLastName" },
      { label: "모친의 이름", name: "motherFirstName" },
      { label: "모친의 중간 이름", name: "motherMiddleName" },
      { type: "date", label: "모친의 생년월일", name: "motherBirthDate" },
      { label: "노인 등록 번호", name: "seniorNumber" },
      { label: "연락처 *", name: "mobile" },
      { type: "email", label: "Email", name: "email" },
      { type: "radio", label: "VIP", name: "vip", items: [["Y", "Y"], ["N", "N"]] },
      { type: "radio", label: "PCB", name: "pcb", items: [["Y", "Y"], ["N", "N"]] },
      { type: "textarea", label: "비고", name: "remarks", wide: true },
    ],
  },
];

// 외부 아이콘 라이브러리 없이 사용할 SVG path입니다.
const icons = {
  plus: "M12 5v14M5 12h14",
  save: "M6 3h10l3 3v15H5V3h1Zm3 0v6h6V3M8 21v-7h8v7",
  search: "M10.5 18a7.5 7.5 0 1 1 5.3-12.8 7.5 7.5 0 0 1-5.3 12.8Zm5.3-2.2L21 21",
  reset: "M4 7v5h5M5 12a7 7 0 1 0 2-5",
  trash: "M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14",
  database: "M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Zm0 0v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6",
};

// SVG 아이콘을 문자열로 반환합니다.
function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name]}"></path></svg>`;
}

// HTML 출력에 사용할 값을 안전하게 이스케이프합니다.
function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  }[char]));
}

// Supabase 요청에 필요한 URL과 헤더를 만듭니다.
function getSupabaseRequest(path, init = {}) {
  const url = (supabaseConfig.url || "").replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
  const key = supabaseConfig.anonKey || "";

  if (!url || !key) {
    throw new Error("Supabase URL과 anon key를 먼저 저장해 주세요.");
  }

  return [
    `${url}/rest/v1/${path}`,
    {
      ...init,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
        ...(init.headers || {}),
      },
    },
  ];
}

// Supabase REST API를 호출하고 오류 메시지를 사람이 읽기 좋게 정리합니다.
async function supabaseFetch(path, init = {}) {
  const [url, requestInit] = getSupabaseRequest(path, init);
  const response = await fetch(url, requestInit);
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || data?.hint || `Supabase 요청 실패: ${response.status}`);
  }

  return data;
}

// 생년월일 기준으로 만 나이를 계산합니다.
function calculateAge(birthDate) {
  if (!birthDate) return "";
  const birth = new Date(birthDate);
  const now = new Date();
  if (Number.isNaN(birth.getTime())) return "";

  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  const dayDiff = now.getDate() - birth.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age -= 1;
  return age >= 0 ? String(age) : "";
}

// 성, 이름, 중간 이름을 합쳐 전체 이름을 만듭니다.
function buildFullName(data = patientForm) {
  return [data.prefix !== "없음" ? data.prefix : "", data.lastName, data.firstName, data.middleName]
    .filter(Boolean)
    .join(" ")
    .trim();
}

// DB 컬럼 형태를 화면 폼 형태로 바꿉니다.
function rowToForm(row) {
  return {
    ...defaultPatient,
    registerType: "existing",
    newPatientNo: row.patient_no || "",
    existingPatientNo: row.patient_no || "",
    unknownPatient: row.unknown_patient || "N",
    firstVisitDate: row.first_visit_date || today,
    prefix: row.prefix || "없음",
    lastName: row.last_name || "",
    firstName: row.first_name || "",
    middleName: row.middle_name || "",
    middlePrefix: row.middle_prefix || "없음",
    personalIdType: row.personal_id_type || "national",
    personalId: row.personal_id || "",
    birthDate: row.birth_date || "",
    birthPlace: row.birth_place || "",
    bloodType: row.blood_type || "선택",
    gender: row.gender || "male",
    civilStatus: row.civil_status || "선택",
    maidenLastName: row.maiden_last_name || "",
    maidenMiddleName: row.maiden_middle_name || "",
    nationality: row.nationality || "선택",
    ethnicGroup: row.ethnic_group || "선택",
    country: row.country || "Uzbekistan",
    region: row.region || "Tashkent",
    district: row.district || "선택",
    city: row.city || "선택",
    street: row.street || "선택",
    addressDetail: row.address_detail || "",
    education: row.education || "선택",
    landline: row.landline || "",
    motherLastName: row.mother_last_name || "",
    motherFirstName: row.mother_first_name || "",
    motherMiddleName: row.mother_middle_name || "",
    motherBirthDate: row.mother_birth_date || "",
    seniorNumber: row.senior_number || "",
    mobile: row.mobile || "",
    email: row.email || "",
    vip: row.vip || "N",
    pcb: row.pcb || "N",
    remarks: row.remarks || "",
  };
}

// 화면 폼 데이터를 DB 컬럼 형태로 변환합니다.
function formToRow() {
  const patientNo = patientForm.newPatientNo || patientForm.existingPatientNo || `P${Date.now().toString().slice(-8)}`;

  return {
    patient_no: patientNo,
    unknown_patient: patientForm.unknownPatient,
    first_visit_date: patientForm.firstVisitDate || null,
    prefix: patientForm.prefix,
    last_name: patientForm.lastName,
    first_name: patientForm.firstName,
    middle_name: patientForm.middleName,
    middle_prefix: patientForm.middlePrefix,
    full_name: buildFullName(),
    personal_id_type: patientForm.personalIdType,
    personal_id: patientForm.personalId,
    birth_date: patientForm.birthDate || null,
    age: Number(calculateAge(patientForm.birthDate)) || null,
    birth_place: patientForm.birthPlace,
    blood_type: patientForm.bloodType,
    gender: patientForm.gender,
    civil_status: patientForm.civilStatus,
    maiden_last_name: patientForm.maidenLastName,
    maiden_middle_name: patientForm.maidenMiddleName,
    nationality: patientForm.nationality,
    ethnic_group: patientForm.ethnicGroup,
    country: patientForm.country,
    region: patientForm.region,
    district: patientForm.district,
    city: patientForm.city,
    street: patientForm.street,
    address_detail: patientForm.addressDetail,
    education: patientForm.education,
    landline: patientForm.landline,
    mother_last_name: patientForm.motherLastName,
    mother_first_name: patientForm.motherFirstName,
    mother_middle_name: patientForm.motherMiddleName,
    mother_birth_date: patientForm.motherBirthDate || null,
    senior_number: patientForm.seniorNumber,
    mobile: patientForm.mobile,
    email: patientForm.email,
    vip: patientForm.vip,
    pcb: patientForm.pcb,
    remarks: patientForm.remarks,
  };
}

// 입력 필드 HTML을 생성합니다.
function renderField(field) {
  const value = field.name === "fullName"
    ? buildFullName()
    : field.name === "age"
      ? calculateAge(patientForm.birthDate)
      : patientForm[field.name] || "";
  const wideClass = field.wide ? " wide" : "";

  if (field.type === "select") {
    return `
      <label class="field${wideClass}">
        <span>${field.label}</span>
        <select name="${field.name}">
          ${options[field.name].map((item) => `<option value="${escapeHtml(item)}" ${value === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}
        </select>
      </label>
    `;
  }

  if (field.type === "radio") {
    return `
      <fieldset class="radio-group${wideClass}">
        <legend>${field.label}</legend>
        <div>
          ${field.items.map(([label, itemValue]) => `
            <label>
              <input type="radio" name="${field.name}" value="${itemValue}" ${value === itemValue ? "checked" : ""} />
              <span>${label}</span>
            </label>
          `).join("")}
        </div>
      </fieldset>
    `;
  }

  if (field.type === "textarea") {
    return `
      <label class="field${wideClass} textarea-field">
        <span>${field.label}</span>
        <textarea name="${field.name}" rows="4">${escapeHtml(value)}</textarea>
      </label>
    `;
  }

  return `
    <label class="field${wideClass}">
      <span>${field.label}</span>
      <input type="${field.type || "text"}" name="${field.name}" value="${escapeHtml(value)}" ${field.readonly ? "readonly" : ""} />
    </label>
  `;
}

// 화면 상단의 Supabase 설정 영역을 렌더링합니다.
function renderSupabasePanel() {
  const connectedText = supabaseConfig.url && supabaseConfig.anonKey ? "연결 정보 저장됨" : "연결 정보 필요";

  return `
    <section class="db-panel">
      <div class="db-title">
        ${icon("database")}
        <strong>Supabase 연결</strong>
        <span>${connectedText}</span>
      </div>
      <label class="field">
        <span>Project URL</span>
        <input name="supabaseUrl" value="${escapeHtml(supabaseConfig.url || "")}" placeholder="https://xxxx.supabase.co" />
      </label>
      <label class="field">
        <span>anon public key</span>
        <input name="supabaseAnonKey" value="${escapeHtml(supabaseConfig.anonKey || "")}" placeholder="eyJhbGci..." />
      </label>
      <div class="db-actions">
        <button type="button" class="tool-button primary" data-action="save-config">연결 저장</button>
        <button type="button" class="tool-button" data-action="test-config">연결 테스트</button>
        <button type="button" class="tool-button" data-action="seed">가짜 환자 20명 생성</button>
      </div>
    </section>
  `;
}

// 저장 또는 검색 결과 목록을 렌더링합니다.
function renderRows() {
  if (patientRows.length === 0) return "<p>검색된 환자가 없습니다. Supabase 연결 후 검색하거나 가짜 환자를 생성해 주세요.</p>";

  return `
    <ul>
      ${patientRows.map((row) => `
        <li>
          <button type="button" class="row-button" data-patient-no="${escapeHtml(row.patient_no)}">
            <strong>${escapeHtml(row.patient_no)}</strong>
            <span>${escapeHtml(row.full_name || "")}</span>
            <small>${escapeHtml(row.mobile || "")}</small>
          </button>
        </li>
      `).join("")}
    </ul>
  `;
}

// 전체 화면을 렌더링합니다.
function render(message = "Supabase 정보를 입력하고 연결 저장을 누르세요.") {
  document.getElementById("root").innerHTML = `
    <div class="app-container">
      <main class="page-shell">
        <header class="top-bar">
          <div>
            <p class="eyebrow">EN Hospital Manual Reference</p>
            <h1>환자등록</h1>
          </div>
          <div class="toolbar" aria-label="환자등록 작업 버튼">
            <button type="button" class="tool-button" data-action="new">${icon("plus")}<span>신규</span></button>
            <button type="submit" form="patient-form" class="tool-button primary">${icon("save")}<span>저장</span></button>
            <button type="button" class="tool-button danger" data-action="delete">${icon("trash")}<span>삭제</span></button>
            <button type="button" class="tool-button" data-action="new">${icon("reset")}<span>초기화</span></button>
          </div>
        </header>

        ${renderSupabasePanel()}

        <section class="search-strip" aria-label="환자 검색 영역">
          ${renderField({ type: "radio", label: "등록 구분", name: "registerType", items: [["신규", "new"], ["기존", "existing"]] })}
          ${renderField({ label: "환자등록번호(신규)", name: "newPatientNo" })}
          ${renderField({ label: "환자등록번호(기존)", name: "existingPatientNo" })}
          <button type="button" class="search-button" data-action="search">${icon("search")}<span>검색</span></button>
          ${renderField({ type: "radio", label: "미확인", name: "unknownPatient", items: [["Y", "Y"], ["N", "N"]] })}
          ${renderField({ type: "date", label: "첫방문 날", name: "firstVisitDate" })}
        </section>

        <p class="notice" role="status">${escapeHtml(message)}</p>

        <form id="patient-form" class="content-grid">
          ${sections.map((section) => `
            <section class="panel">
              <h2>${section.title}</h2>
              <div class="form-grid">${section.fields.map(renderField).join("")}</div>
            </section>
          `).join("")}
        </form>

        <aside class="saved-panel" aria-label="Supabase 환자 목록">
          <h2>Supabase 환자 목록</h2>
          ${renderRows()}
        </aside>
      </main>

      <aside class="ai-assistant">
        <div class="ai-header">
          <div class="ai-avatar">AI</div>
          <div>
            <h3>AI 도우미</h3>
            <p>실시간 입력 가이드</p>
          </div>
        </div>
        <div class="ai-content">
          <div class="ai-bubble">
            <p id="ai-hint-text">${escapeHtml(currentHint)}</p>
          </div>
          <div class="ai-suggestion">
            <h4>Tip:</h4>
            <p>별표(*)가 표시된 항목은 필수 입력 사항입니다.</p>
          </div>
        </div>
      </aside>
    </div>
  `;
}

// 입력값을 메모리의 폼 상태에 반영합니다.
function syncFormValue(target) {
  if (!target.name || target.readOnly) return;

  if (target.name === "supabaseUrl") supabaseConfig.url = target.value.trim();
  else if (target.name === "supabaseAnonKey") supabaseConfig.anonKey = target.value.trim();
  else patientForm[target.name] = target.value;
}

// 전체 이름과 나이 자동계산 필드만 즉시 갱신합니다.
function updateComputedFields() {
  const fullNameInput = document.querySelector('input[name="fullName"]');
  const ageInput = document.querySelector('input[name="age"]');

  if (fullNameInput) fullNameInput.value = buildFullName();
  if (ageInput) ageInput.value = calculateAge(patientForm.birthDate);
}

// Supabase 연결 정보를 저장합니다.
function saveConfig() {
  localStorage.setItem("supabaseConfig", JSON.stringify(supabaseConfig));
  render("Supabase 연결 정보를 저장했습니다. 테이블이 준비되어 있으면 검색/저장/삭제가 가능합니다.");
}

// 현재 Supabase 설정으로 patients 테이블 조회가 되는지 확인합니다.
async function testConfig() {
  try {
    await supabaseFetch(`${TABLE_NAME}?select=patient_no&limit=1`);
    render("Supabase 연결 테스트 성공. patients 테이블 접근이 가능합니다.");
  } catch (error) {
    render(`Supabase 연결 테스트 실패: ${error.message}`);
  }
}

// 신규 입력 화면으로 초기화합니다.
function newPatient() {
  patientForm = { ...defaultPatient, firstVisitDate: today };
  currentHint = hints.default;
  render("신규 환자 입력 화면으로 초기화했습니다.");
}

// Supabase에 환자 정보를 upsert 방식으로 저장합니다.
async function savePatient(event) {
  event.preventDefault();

  if (!patientForm.lastName || !patientForm.firstName || !patientForm.birthDate || !patientForm.mobile) {
    render("필수 항목(성, 이름, 생년월일, 연락처)을 입력해야 저장할 수 있습니다.");
    return;
  }

  try {
    const row = formToRow();
    const result = await supabaseFetch(`${TABLE_NAME}?on_conflict=patient_no`, {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(row),
    });

    patientForm = rowToForm(result[0]);
    await searchPatient(`저장 완료: ${result[0].patient_no} / ${result[0].full_name}`);
  } catch (error) {
    render(`저장 실패: ${error.message}`);
  }
}

// 환자번호 또는 전체 이름 기준으로 Supabase에서 검색합니다.
async function searchPatient(successMessage) {
  const keyword = (patientForm.registerType === "new" ? patientForm.newPatientNo : patientForm.existingPatientNo).trim();

  try {
    const path = keyword
      ? `${TABLE_NAME}?select=*&or=(patient_no.eq.${encodeURIComponent(keyword)},full_name.ilike.*${encodeURIComponent(keyword)}*)&order=created_at.desc`
      : `${TABLE_NAME}?select=*&order=created_at.desc&limit=20`;
    patientRows = await supabaseFetch(path);

    if (patientRows.length === 1) patientForm = rowToForm(patientRows[0]);
    render(successMessage || `${patientRows.length}건을 조회했습니다.`);
  } catch (error) {
    render(`검색 실패: ${error.message}`);
  }
}

// 현재 환자번호에 해당하는 DB 행을 삭제합니다.
async function deletePatient() {
  const patientNo = patientForm.newPatientNo || patientForm.existingPatientNo;

  if (!patientNo) {
    render("삭제할 환자번호가 없습니다.");
    return;
  }

  try {
    await supabaseFetch(`${TABLE_NAME}?patient_no=eq.${encodeURIComponent(patientNo)}`, { method: "DELETE" });
    patientRows = patientRows.filter((row) => row.patient_no !== patientNo);
    patientForm = { ...defaultPatient, firstVisitDate: today };
    render(`${patientNo} 환자 정보를 Supabase에서 삭제했습니다.`);
  } catch (error) {
    render(`삭제 실패: ${error.message}`);
  }
}

// 가짜 환자 데이터를 만들어 Supabase에 한번에 입력합니다.
async function seedPatients() {
  const lastNames = ["Karimov", "Lee", "Kim", "Park", "Tursunov", "Abdullayev", "Choi", "Yusupova", "Rustamov", "Jung"];
  const firstNames = ["Aziz", "Minji", "Sardor", "Nodira", "Jisoo", "Dilshod", "Seoyeon", "Malika", "Bekzod", "Hana"];
  const rows = Array.from({ length: 20 }, (_, index) => {
    const birthYear = 1965 + (index * 3) % 42;
    const gender = index % 2 === 0 ? "male" : "female";
    const lastName = lastNames[index % lastNames.length];
    const firstName = firstNames[index % firstNames.length];

    return {
      ...formToRow(),
      patient_no: `P${String(index + 1).padStart(5, "0")}`,
      first_visit_date: today,
      last_name: lastName,
      first_name: firstName,
      middle_name: index % 3 === 0 ? "Ali" : "",
      full_name: `${lastName} ${firstName}`,
      personal_id_type: index % 4 === 0 ? "passport" : "national",
      personal_id: `ID${String(260000 + index).padStart(6, "0")}`,
      birth_date: `${birthYear}-${String((index % 12) + 1).padStart(2, "0")}-${String((index % 27) + 1).padStart(2, "0")}`,
      age: new Date().getFullYear() - birthYear,
      gender,
      blood_type: options.bloodType[(index % 8) + 1],
      civil_status: index % 2 === 0 ? "기혼" : "미혼",
      nationality: "Uzbekistan",
      ethnic_group: index % 3 === 0 ? "Korean" : "Uzbek",
      country: "Uzbekistan",
      region: options.region[index % options.region.length],
      district: options.district[(index % 4) + 1],
      city: options.city[(index % 3) + 1],
      street: options.street[(index % 4) + 1],
      address_detail: `${index + 10}-uy`,
      mobile: `+99890${String(1000000 + index * 137).slice(0, 7)}`,
      email: `patient${index + 1}@example.com`,
      vip: index % 9 === 0 ? "Y" : "N",
      pcb: index % 7 === 0 ? "Y" : "N",
      remarks: "가짜 환자 데이터",
    };
  });

  try {
    await supabaseFetch(`${TABLE_NAME}?on_conflict=patient_no`, {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(rows),
    });
    await searchPatient("가짜 환자 20명을 Supabase에 생성했습니다.");
  } catch (error) {
    render(`가짜 데이터 생성 실패: ${error.message}`);
  }
}

// 검색 결과에서 환자를 클릭하면 해당 환자를 폼에 불러옵니다.
function loadPatientFromList(patientNo) {
  const row = patientRows.find((item) => item.patient_no === patientNo);
  if (!row) return;

  patientForm = rowToForm(row);
  currentHint = hints.default;
  render(`${row.patient_no} / ${row.full_name || ""} 정보를 불러왔습니다.`);
}

// AI 힌트 텍스트만 실시간으로 업데이트합니다.
function updateHint(fieldName) {
  currentHint = hints[fieldName] || hints.default;
  const hintElement = document.getElementById("ai-hint-text");
  if (hintElement) {
    hintElement.textContent = currentHint;
  }
}

// 입력 필드에 포커스가 갈 때 힌트를 변경합니다.
document.addEventListener("focusin", (event) => {
  if (event.target.name) {
    updateHint(event.target.name);
  }
});

// 포커스를 잃으면 기본 힌트로 되돌립니다.
document.addEventListener("focusout", (event) => {
  // 약간의 지연을 주어 다른 필드로 바로 포커스가 이동하는 경우를 처리합니다.
  setTimeout(() => {
    if (!document.activeElement || document.activeElement === document.body) {
      updateHint("default");
    }
  }, 100);
});

// 입력값은 화면 재렌더링 없이 상태와 자동계산 값만 갱신합니다.
document.addEventListener("input", (event) => {
  syncFormValue(event.target);
  updateComputedFields();
});

// select/radio/date 변경도 같은 방식으로 처리합니다.
document.addEventListener("change", (event) => {
  syncFormValue(event.target);
  updateComputedFields();
});

// 버튼 클릭 이벤트를 data-action 기준으로 분기합니다.
document.addEventListener("click", (event) => {
  const rowButton = event.target.closest("[data-patient-no]");
  const actionButton = event.target.closest("[data-action]");

  if (rowButton) loadPatientFromList(rowButton.dataset.patientNo);
  if (!actionButton) return;

  const action = actionButton.dataset.action;
  if (action === "new") newPatient();
  if (action === "save-config") saveConfig();
  if (action === "test-config") testConfig();
  if (action === "search") searchPatient();
  if (action === "delete") deletePatient();
  if (action === "seed") seedPatients();
});

// 폼 제출은 Supabase 저장으로 연결합니다.
document.addEventListener("submit", (event) => {
  if (event.target.id === "patient-form") savePatient(event);
});

// 최초 화면을 렌더링합니다.
render();

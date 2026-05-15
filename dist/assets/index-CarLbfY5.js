(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&s(m)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();const y=new Date().toISOString().slice(0,10),f="patients",k={url:"https://cslnxukmvaevuzfiqofl.supabase.co/rest/v1/",anonKey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbG54dWttdmFldnV6Zmlxb2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1Njk1NjgsImV4cCI6MjA5NDE0NTU2OH0.NJw9uP9euU40paPzJSoUYZ4CG3oJxsmzBKOyvZw8pbE"},g={registerType:"new",newPatientNo:"",existingPatientNo:"",unknownPatient:"N",firstVisitDate:y,prefix:"없음",lastName:"",firstName:"",middleName:"",middlePrefix:"없음",personalIdType:"national",personalId:"",birthDate:"",birthPlace:"",bloodType:"선택",gender:"male",civilStatus:"선택",maidenLastName:"",maidenMiddleName:"",nationality:"선택",ethnicGroup:"선택",country:"Uzbekistan",region:"Tashkent",district:"선택",city:"선택",street:"선택",addressDetail:"",education:"선택",landline:"",motherLastName:"",motherFirstName:"",motherMiddleName:"",motherBirthDate:"",seniorNumber:"",mobile:"",email:"",vip:"N",pcb:"N",remarks:""},D=JSON.parse(localStorage.getItem("supabaseConfig")||"{}");let c={url:D.url||k.url,anonKey:D.anonKey||k.anonKey},t={...g},u=[];const p={prefix:["없음","Mr.","Ms.","Mrs.","Dr."],middlePrefix:["없음","의 아들","의 딸"],bloodType:["선택","A+","A-","B+","B-","AB+","AB-","O+","O-"],civilStatus:["선택","미혼","기혼","이혼","사별"],nationality:["선택","Uzbekistan","Korea","Kazakhstan","Kyrgyzstan","Tajikistan"],ethnicGroup:["선택","Uzbek","Korean","Russian","Tajik","Kazakh"],country:["Uzbekistan","Korea","Kazakhstan"],region:["Tashkent","Samarkand","Bukhara","Andijan"],district:["선택","Yunusabad","Mirabad","Chilanzar","Sergeli"],city:["선택","Tashkent","Samarkand","Bukhara"],street:["선택","Amir Temur","Navoi","Mustaqillik","Furqat"],education:["선택","초등","중등","고등","대학교","대학원"]},L=[{title:"기본 정보",fields:[{type:"select",label:"호칭",name:"prefix"},{label:"성 *",name:"lastName"},{label:"이름 *",name:"firstName"},{label:"중간 이름",name:"middleName"},{type:"select",label:"중간 이름 접두어",name:"middlePrefix"},{label:"전체 이름",name:"fullName",readonly:!0}]},{title:"식별 및 생년월일",fields:[{label:"개인 ID 번호",name:"personalId"},{type:"radio",label:"ID 유형",name:"personalIdType",items:[["여권번호","passport"],["식별번호","national"]]},{type:"date",label:"생년월일 *",name:"birthDate"},{label:"나이 자동계산",name:"age",readonly:!0},{label:"출생지",name:"birthPlace"},{type:"select",label:"혈액형",name:"bloodType"},{type:"radio",label:"성별",name:"gender",items:[["남성","male"],["여성","female"]]},{type:"select",label:"혼인상태",name:"civilStatus"}]},{title:"국적 및 주소",fields:[{label:"결혼 전 성",name:"maidenLastName"},{label:"결혼 전 중간 이름",name:"maidenMiddleName"},{type:"select",label:"국적",name:"nationality"},{type:"select",label:"민족",name:"ethnicGroup"},{type:"select",label:"국가",name:"country"},{type:"select",label:"지역",name:"region"},{type:"select",label:"구역",name:"district"},{type:"select",label:"도시",name:"city"},{type:"select",label:"도로명",name:"street"},{label:"상세주소",name:"addressDetail",wide:!0},{type:"select",label:"학력",name:"education"},{label:"집 전화번호",name:"landline"}]},{title:"가족 및 연락처",fields:[{label:"모친의 성",name:"motherLastName"},{label:"모친의 이름",name:"motherFirstName"},{label:"모친의 중간 이름",name:"motherMiddleName"},{type:"date",label:"모친의 생년월일",name:"motherBirthDate"},{label:"노인 등록 번호",name:"seniorNumber"},{label:"연락처 *",name:"mobile"},{type:"email",label:"Email",name:"email"},{type:"radio",label:"VIP",name:"vip",items:[["Y","Y"],["N","N"]]},{type:"radio",label:"PCB",name:"pcb",items:[["Y","Y"],["N","N"]]},{type:"textarea",label:"비고",name:"remarks",wide:!0}]}],z={plus:"M12 5v14M5 12h14",save:"M6 3h10l3 3v15H5V3h1Zm3 0v6h6V3M8 21v-7h8v7",search:"M10.5 18a7.5 7.5 0 1 1 5.3-12.8 7.5 7.5 0 0 1-5.3 12.8Zm5.3-2.2L21 21",reset:"M4 7v5h5M5 12a7 7 0 1 0 2-5",trash:"M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14",database:"M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Zm0 0v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"};function b(e){return`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${z[e]}"></path></svg>`}function o(e=""){return String(e).replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[a])}function O(e,a={}){const i=(c.url||"").replace(/\/rest\/v1\/?$/,"").replace(/\/$/,""),s=c.anonKey||"";if(!i||!s)throw new Error("Supabase URL과 anon key를 먼저 저장해 주세요.");return[`${i}/rest/v1/${e}`,{...a,headers:{apikey:s,Authorization:`Bearer ${s}`,"Content-Type":"application/json",Prefer:"return=representation",...a.headers||{}}}]}async function h(e,a={}){const[i,s]=O(e,a),n=await fetch(i,s),r=await n.text(),m=r?JSON.parse(r):null;if(!n.ok)throw new Error(m?.message||m?.hint||`Supabase 요청 실패: ${n.status}`);return m}function N(e){if(!e)return"";const a=new Date(e),i=new Date;if(Number.isNaN(a.getTime()))return"";let s=i.getFullYear()-a.getFullYear();const n=i.getMonth()-a.getMonth(),r=i.getDate()-a.getDate();return(n<0||n===0&&r<0)&&(s-=1),s>=0?String(s):""}function _(e=t){return[e.prefix!=="없음"?e.prefix:"",e.lastName,e.firstName,e.middleName].filter(Boolean).join(" ").trim()}function $(e){return{...g,registerType:"existing",newPatientNo:e.patient_no||"",existingPatientNo:e.patient_no||"",unknownPatient:e.unknown_patient||"N",firstVisitDate:e.first_visit_date||y,prefix:e.prefix||"없음",lastName:e.last_name||"",firstName:e.first_name||"",middleName:e.middle_name||"",middlePrefix:e.middle_prefix||"없음",personalIdType:e.personal_id_type||"national",personalId:e.personal_id||"",birthDate:e.birth_date||"",birthPlace:e.birth_place||"",bloodType:e.blood_type||"선택",gender:e.gender||"male",civilStatus:e.civil_status||"선택",maidenLastName:e.maiden_last_name||"",maidenMiddleName:e.maiden_middle_name||"",nationality:e.nationality||"선택",ethnicGroup:e.ethnic_group||"선택",country:e.country||"Uzbekistan",region:e.region||"Tashkent",district:e.district||"선택",city:e.city||"선택",street:e.street||"선택",addressDetail:e.address_detail||"",education:e.education||"선택",landline:e.landline||"",motherLastName:e.mother_last_name||"",motherFirstName:e.mother_first_name||"",motherMiddleName:e.mother_middle_name||"",motherBirthDate:e.mother_birth_date||"",seniorNumber:e.senior_number||"",mobile:e.mobile||"",email:e.email||"",vip:e.vip||"N",pcb:e.pcb||"N",remarks:e.remarks||""}}function I(){return{patient_no:t.newPatientNo||t.existingPatientNo||`P${Date.now().toString().slice(-8)}`,unknown_patient:t.unknownPatient,first_visit_date:t.firstVisitDate||null,prefix:t.prefix,last_name:t.lastName,first_name:t.firstName,middle_name:t.middleName,middle_prefix:t.middlePrefix,full_name:_(),personal_id_type:t.personalIdType,personal_id:t.personalId,birth_date:t.birthDate||null,age:Number(N(t.birthDate))||null,birth_place:t.birthPlace,blood_type:t.bloodType,gender:t.gender,civil_status:t.civilStatus,maiden_last_name:t.maidenLastName,maiden_middle_name:t.maidenMiddleName,nationality:t.nationality,ethnic_group:t.ethnicGroup,country:t.country,region:t.region,district:t.district,city:t.city,street:t.street,address_detail:t.addressDetail,education:t.education,landline:t.landline,mother_last_name:t.motherLastName,mother_first_name:t.motherFirstName,mother_middle_name:t.motherMiddleName,mother_birth_date:t.motherBirthDate||null,senior_number:t.seniorNumber,mobile:t.mobile,email:t.email,vip:t.vip,pcb:t.pcb,remarks:t.remarks}}function d(e){const a=e.name==="fullName"?_():e.name==="age"?N(t.birthDate):t[e.name]||"",i=e.wide?" wide":"";return e.type==="select"?`
      <label class="field${i}">
        <span>${e.label}</span>
        <select name="${e.name}">
          ${p[e.name].map(s=>`<option value="${o(s)}" ${a===s?"selected":""}>${o(s)}</option>`).join("")}
        </select>
      </label>
    `:e.type==="radio"?`
      <fieldset class="radio-group${i}">
        <legend>${e.label}</legend>
        <div>
          ${e.items.map(([s,n])=>`
            <label>
              <input type="radio" name="${e.name}" value="${n}" ${a===n?"checked":""} />
              <span>${s}</span>
            </label>
          `).join("")}
        </div>
      </fieldset>
    `:e.type==="textarea"?`
      <label class="field${i} textarea-field">
        <span>${e.label}</span>
        <textarea name="${e.name}" rows="4">${o(a)}</textarea>
      </label>
    `:`
    <label class="field${i}">
      <span>${e.label}</span>
      <input type="${e.type||"text"}" name="${e.name}" value="${o(a)}" ${e.readonly?"readonly":""} />
    </label>
  `}function B(){const e=c.url&&c.anonKey?"연결 정보 저장됨":"연결 정보 필요";return`
    <section class="db-panel">
      <div class="db-title">
        ${b("database")}
        <strong>Supabase 연결</strong>
        <span>${e}</span>
      </div>
      <label class="field">
        <span>Project URL</span>
        <input name="supabaseUrl" value="${o(c.url||"")}" placeholder="https://xxxx.supabase.co" />
      </label>
      <label class="field">
        <span>anon public key</span>
        <input name="supabaseAnonKey" value="${o(c.anonKey||"")}" placeholder="eyJhbGci..." />
      </label>
      <div class="db-actions">
        <button type="button" class="tool-button primary" data-action="save-config">연결 저장</button>
        <button type="button" class="tool-button" data-action="test-config">연결 테스트</button>
        <button type="button" class="tool-button" data-action="seed">가짜 환자 20명 생성</button>
      </div>
    </section>
  `}function F(){return u.length===0?"<p>검색된 환자가 없습니다. Supabase 연결 후 검색하거나 가짜 환자를 생성해 주세요.</p>":`
    <ul>
      ${u.map(e=>`
        <li>
          <button type="button" class="row-button" data-patient-no="${o(e.patient_no)}">
            <strong>${o(e.patient_no)}</strong>
            <span>${o(e.full_name||"")}</span>
            <small>${o(e.mobile||"")}</small>
          </button>
        </li>
      `).join("")}
    </ul>
  `}function l(e="Supabase 정보를 입력하고 연결 저장을 누르세요."){document.getElementById("root").innerHTML=`
    <main class="page-shell">
      <header class="top-bar">
        <div>
          <p class="eyebrow">EN Hospital Manual Reference</p>
          <h1>환자등록</h1>
        </div>
        <div class="toolbar" aria-label="환자등록 작업 버튼">
          <button type="button" class="tool-button" data-action="new">${b("plus")}<span>신규</span></button>
          <button type="submit" form="patient-form" class="tool-button primary">${b("save")}<span>저장</span></button>
          <button type="button" class="tool-button danger" data-action="delete">${b("trash")}<span>삭제</span></button>
          <button type="button" class="tool-button" data-action="new">${b("reset")}<span>초기화</span></button>
        </div>
      </header>

      ${B()}

      <section class="search-strip" aria-label="환자 검색 영역">
        ${d({type:"radio",label:"등록 구분",name:"registerType",items:[["신규","new"],["기존","existing"]]})}
        ${d({label:"환자등록번호(신규)",name:"newPatientNo"})}
        ${d({label:"환자등록번호(기존)",name:"existingPatientNo"})}
        <button type="button" class="search-button" data-action="search">${b("search")}<span>검색</span></button>
        ${d({type:"radio",label:"미확인",name:"unknownPatient",items:[["Y","Y"],["N","N"]]})}
        ${d({type:"date",label:"첫방문 날",name:"firstVisitDate"})}
      </section>

      <p class="notice" role="status">${o(e)}</p>

      <form id="patient-form" class="content-grid">
        ${L.map(a=>`
          <section class="panel">
            <h2>${a.title}</h2>
            <div class="form-grid">${a.fields.map(d).join("")}</div>
          </section>
        `).join("")}
      </form>

      <aside class="saved-panel" aria-label="Supabase 환자 목록">
        <h2>Supabase 환자 목록</h2>
        ${F()}
      </aside>
    </main>
  `}function M(e){!e.name||e.readOnly||(e.name==="supabaseUrl"?c.url=e.value.trim():e.name==="supabaseAnonKey"?c.anonKey=e.value.trim():t[e.name]=e.value)}function T(){const e=document.querySelector('input[name="fullName"]'),a=document.querySelector('input[name="age"]');e&&(e.value=_()),a&&(a.value=N(t.birthDate))}function K(){localStorage.setItem("supabaseConfig",JSON.stringify(c)),l("Supabase 연결 정보를 저장했습니다. 테이블이 준비되어 있으면 검색/저장/삭제가 가능합니다.")}async function x(){try{await h(`${f}?select=patient_no&limit=1`),l("Supabase 연결 테스트 성공. patients 테이블 접근이 가능합니다.")}catch(e){l(`Supabase 연결 테스트 실패: ${e.message}`)}}function A(){t={...g,firstVisitDate:y},l("신규 환자 입력 화면으로 초기화했습니다.")}async function C(e){if(e.preventDefault(),!t.lastName||!t.firstName||!t.birthDate||!t.mobile){l("필수 항목(성, 이름, 생년월일, 연락처)을 입력해야 저장할 수 있습니다.");return}try{const a=I(),i=await h(`${f}?on_conflict=patient_no`,{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify(a)});t=$(i[0]),await v(`저장 완료: ${i[0].patient_no} / ${i[0].full_name}`)}catch(a){l(`저장 실패: ${a.message}`)}}async function v(e){const a=(t.registerType==="new"?t.newPatientNo:t.existingPatientNo).trim();try{const i=a?`${f}?select=*&or=(patient_no.eq.${encodeURIComponent(a)},full_name.ilike.*${encodeURIComponent(a)}*)&order=created_at.desc`:`${f}?select=*&order=created_at.desc&limit=20`;u=await h(i),u.length===1&&(t=$(u[0])),l(e||`${u.length}건을 조회했습니다.`)}catch(i){l(`검색 실패: ${i.message}`)}}async function U(){const e=t.newPatientNo||t.existingPatientNo;if(!e){l("삭제할 환자번호가 없습니다.");return}try{await h(`${f}?patient_no=eq.${encodeURIComponent(e)}`,{method:"DELETE"}),u=u.filter(a=>a.patient_no!==e),t={...g,firstVisitDate:y},l(`${e} 환자 정보를 Supabase에서 삭제했습니다.`)}catch(a){l(`삭제 실패: ${a.message}`)}}async function w(){const e=["Karimov","Lee","Kim","Park","Tursunov","Abdullayev","Choi","Yusupova","Rustamov","Jung"],a=["Aziz","Minji","Sardor","Nodira","Jisoo","Dilshod","Seoyeon","Malika","Bekzod","Hana"],i=Array.from({length:20},(s,n)=>{const r=1965+n*3%42,m=n%2===0?"male":"female",S=e[n%e.length],P=a[n%a.length];return{...I(),patient_no:`P${String(n+1).padStart(5,"0")}`,first_visit_date:y,last_name:S,first_name:P,middle_name:n%3===0?"Ali":"",full_name:`${S} ${P}`,personal_id_type:n%4===0?"passport":"national",personal_id:`ID${String(26e4+n).padStart(6,"0")}`,birth_date:`${r}-${String(n%12+1).padStart(2,"0")}-${String(n%27+1).padStart(2,"0")}`,age:new Date().getFullYear()-r,gender:m,blood_type:p.bloodType[n%8+1],civil_status:n%2===0?"기혼":"미혼",nationality:"Uzbekistan",ethnic_group:n%3===0?"Korean":"Uzbek",country:"Uzbekistan",region:p.region[n%p.region.length],district:p.district[n%4+1],city:p.city[n%3+1],street:p.street[n%4+1],address_detail:`${n+10}-uy`,mobile:`+99890${String(1e6+n*137).slice(0,7)}`,email:`patient${n+1}@example.com`,vip:n%9===0?"Y":"N",pcb:n%7===0?"Y":"N",remarks:"가짜 환자 데이터"}});try{await h(`${f}?on_conflict=patient_no`,{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify(i)}),await v("가짜 환자 20명을 Supabase에 생성했습니다.")}catch(s){l(`가짜 데이터 생성 실패: ${s.message}`)}}function E(e){const a=u.find(i=>i.patient_no===e);a&&(t=$(a),l(`${a.patient_no} / ${a.full_name||""} 정보를 불러왔습니다.`))}document.addEventListener("input",e=>{M(e.target),T()});document.addEventListener("change",e=>{M(e.target),T()});document.addEventListener("click",e=>{const a=e.target.closest("[data-patient-no]"),i=e.target.closest("[data-action]");if(a&&E(a.dataset.patientNo),!i)return;const s=i.dataset.action;s==="new"&&A(),s==="save-config"&&K(),s==="test-config"&&x(),s==="search"&&v(),s==="delete"&&U(),s==="seed"&&w()});document.addEventListener("submit",e=>{e.target.id==="patient-form"&&C(e)});l();

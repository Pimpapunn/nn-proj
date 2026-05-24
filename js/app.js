/**
 * Chiang Mai University - Faculty of Social Sciences
 * Research Administration Portal Main Application Controller (app.js)
 * 
 * พัฒนาการมีปฏิสัมพันธ์ (Interactive Mechanics), การสลับ Theme, 
 * การค้นหาแบบเรียลไทม์, ระบบกรอกเอกสารโต้ตอบ และแชทบอทแนะนำอัจฉริยะ
 */

// รักษาสถานะระบบ (Global States)
let currentCategory = 'all';
let searchQuery = '';
let activeService = null;
let activeModalTab = 'workflow';
let chatHistory = [];
let currentChatStep = 'start';

// โหลดระบบเมื่อหน้าเว็บพร้อม
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderCategories();
  renderServices();
  renderStaff();
  initSearch();
  initModalEvents();
  initChatBot();
});

/* ==========================================================================
   1. THEME MANAGEMENT (LIGHT/DARK MODE)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // ตรวจสอบข้อมูลจาก localStorage หรือค่าเริ่มต้นของระบบ
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = 'light_mode';
  } else {
    document.body.classList.remove('dark-mode');
    themeIcon.textContent = 'dark_mode';
  }
  
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
    
    // เอฟเฟกต์หมุนไอคอน
    themeIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeIcon.style.transform = '';
    }, 300);
  });
}

/* ==========================================================================
   2. CATEGORY TABS RENDERING
   ========================================================================== */
function renderCategories() {
  const categoryTabs = document.getElementById('categoryTabs');
  if (!categoryTabs) return;
  
  categoryTabs.innerHTML = RESEARCH_DATA.categories.map(cat => `
    <button class="tab-btn ${cat.id === currentCategory ? 'active' : ''}" 
            onclick="filterCategory('${cat.id}')" 
            id="tab-${cat.id}">
      <span class="material-icons">${cat.icon}</span>
      <span>${cat.title}</span>
    </button>
  `).join('');
}

function filterCategory(catId) {
  currentCategory = catId;
  
  // อัปเดตสถานะปุ่ม Active
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`tab-${catId}`);
  if (activeBtn) activeBtn.classList.add('active');
  
  renderServices();
}

/* ==========================================================================
   3. SERVICES GRID RENDERING
   ========================================================================== */
function renderServices() {
  const servicesGrid = document.getElementById('servicesGrid');
  if (!servicesGrid) return;
  
  // กรองตามหมวดหมู่และคำค้นหา
  const filteredServices = RESEARCH_DATA.services.filter(service => {
    const matchesCategory = currentCategory === 'all' || service.category === currentCategory;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || 
      service.title.toLowerCase().includes(query) || 
      service.summary.toLowerCase().includes(query) || 
      service.objective.toLowerCase().includes(query) ||
      service.tips.toLowerCase().includes(query) ||
      (service.documents && service.documents.some(d => d.name.toLowerCase().includes(query)));
      
    return matchesCategory && matchesSearch;
  });
  
  // แสดงหน้าจอว่างหากไม่พบคู่ข้อมูลที่ค้นหา
  if (filteredServices.length === 0) {
    servicesGrid.innerHTML = `
      <div class="empty-results glass-panel">
        <span class="material-icons">search_off</span>
        <h4>ไม่พบข้อมูลการให้บริการที่ตรงกับคำค้นหาของคุณ</h4>
        <p>ลองค้นหาด้วยคำอื่น เช่น "เปิดบัญชี", "เบิกเงินงวด", "Page Charge", "ยุทธศาสตร์" เป็นต้น</p>
      </div>
    `;
    return;
  }
  
  servicesGrid.innerHTML = filteredServices.map(service => {
    const catObj = RESEARCH_DATA.categories.find(c => c.id === service.category);
    return `
      <article class="service-card glass-panel" onclick="openServiceDetail(${service.id})">
        <div class="card-top">
          <div class="card-header-row">
            <div class="card-icon-box">
              <span class="material-icons">${service.icon}</span>
            </div>
            <div class="service-badge-num">${service.number}</div>
          </div>
          <h3>${service.title}</h3>
          <p>${service.summary}</p>
        </div>
        <div class="card-footer-row">
          <span class="service-cat-tag">${catObj ? catObj.title.replace(/^\d+\.\s*/, '') : ''}</span>
          <span class="learn-more-btn">
            <span>อ่านคู่มือ</span>
            <span class="material-icons">chevron_right</span>
          </span>
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   4. SEARCH HUB LOGIC
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    
    if (searchQuery.trim().length > 0) {
      clearSearchBtn.style.display = 'flex';
    } else {
      clearSearchBtn.style.display = 'none';
    }
    
    renderServices();
  });
  
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    searchInput.focus();
    renderServices();
  });
}

/* ==========================================================================
   5. DETAIL MODAL & DYNAMIC WORKFLOW timeline
   ========================================================================== */
function initModalEvents() {
  const modalOverlay = document.getElementById('detailModalOverlay');
  const closeModalBtn = document.getElementById('closeModalBtn');
  
  const tabWorkflow = document.getElementById('btnTabWorkflow');
  const tabDocs = document.getElementById('btnTabDocs');
  const tabGenerator = document.getElementById('btnTabGenerator');
  
  // ปิด Modal
  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // คืนค่าสกอร์ลหลัก
  };
  
  closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  
  // ปิดด้วยแป้นพิมพ์ Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });
  
  // การเปลี่ยน Tab ภายใน Modal
  const switchModalTab = (tabName) => {
    activeModalTab = tabName;
    
    // อัปเดตปุ่มแท็บ
    [tabWorkflow, tabDocs, tabGenerator].forEach(btn => btn.classList.remove('active'));
    document.getElementById(`panelWorkflow`).classList.remove('active');
    document.getElementById(`panelDocs`).classList.remove('active');
    document.getElementById(`panelGenerator`).classList.remove('active');
    
    if (tabName === 'workflow') {
      tabWorkflow.classList.add('active');
      document.getElementById('panelWorkflow').classList.add('active');
    } else if (tabName === 'docs') {
      tabDocs.classList.add('active');
      document.getElementById('panelDocs').classList.add('active');
    } else if (tabName === 'generator') {
      tabGenerator.classList.add('active');
      document.getElementById('panelGenerator').classList.add('active');
      renderDocumentGenerator(); // เรนเดอร์ฟอร์มและตัวอย่างเอกสาร
    }
  };
  
  tabWorkflow.addEventListener('click', () => switchModalTab('workflow'));
  tabDocs.addEventListener('click', () => switchModalTab('docs'));
  tabGenerator.addEventListener('click', () => switchModalTab('generator'));
}

function openServiceDetail(serviceId) {
  const service = RESEARCH_DATA.services.find(s => s.id === serviceId);
  if (!service) return;
  
  activeService = service;
  activeModalTab = 'workflow'; // ตั้งค่าเริ่มต้นที่หน้าขั้นตอน
  
  // อัปเดตข้อมูลพอร์ทัล Modal
  document.getElementById('modalServiceTitle').textContent = service.title;
  
  const catObj = RESEARCH_DATA.categories.find(c => c.id === service.category);
  document.getElementById('modalServiceCat').textContent = catObj ? catObj.title : '';
  document.getElementById('modalServiceSummary').textContent = service.summary;
  document.getElementById('modalTitleIcon').textContent = service.icon;
  document.getElementById('modalObjectiveText').textContent = service.objective;
  document.getElementById('modalTipsText').textContent = service.tips;
  
  // สลับการแสดงแท็บร่างเอกสาร (แสดงเฉพาะบริการที่มีเทมเพลต)
  const tabGenerator = document.getElementById('btnTabGenerator');
  if (service.hasTemplate) {
    tabGenerator.style.display = 'flex';
  } else {
    tabGenerator.style.display = 'none';
  }
  
  // ตั้งค่าปุ่มแท็บให้เป็นหน้าแรกเริ่มต้น
  document.getElementById('btnTabWorkflow').classList.add('active');
  document.getElementById('btnTabDocs').classList.remove('active');
  document.getElementById('btnTabGenerator').classList.remove('active');
  
  document.getElementById('panelWorkflow').classList.add('active');
  document.getElementById('panelDocs').classList.remove('active');
  document.getElementById('panelGenerator').classList.remove('active');
  
  // เรนเดอร์ Workflow Timeline (ผู้รับบริการ vs เจ้าหน้าที่คณะ)
  renderWorkflowTimelines(service);
  
  // เรนเดอร์ข้อมูลรายการเอกสารที่เกี่ยวข้อง
  renderRequiredDocs(service);
  
  // เรนเดอร์ลิงก์ระบบของมหาวิทยาลัย
  renderSystemsList(service);
  
  // แสดง Modal
  const modalOverlay = document.getElementById('detailModalOverlay');
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // ล็อคสกอร์ลของหน้าจอหลัง
}

function renderWorkflowTimelines(service) {
  const researcherTimeline = document.getElementById('researcherWorkflowTimeline');
  const staffTimeline = document.getElementById('staffWorkflowTimeline');
  
  researcherTimeline.innerHTML = `
    <div class="timeline-role-header researcher">
      <span class="material-icons">person</span>
      <span>ขั้นตอนผู้วิจัยและคณาจารย์ดำเนินการ</span>
    </div>
    ${service.researcherSteps.map(s => `
      <div class="timeline-node">
        <div class="timeline-badge">${s.step}</div>
        <div class="timeline-card glass-panel">
          <p>${s.desc}</p>
        </div>
      </div>
    `).join('')}
  `;
  
  staffTimeline.innerHTML = `
    <div class="timeline-role-header staff">
      <span class="material-icons">engineering</span>
      <span>ขั้นตอนงานบริหารงานวิจัย คณะสังคมศาสตร์ ดำเนินการ</span>
    </div>
    ${service.staffSteps.map(s => `
      <div class="timeline-node">
        <div class="timeline-badge">${s.step}</div>
        <div class="timeline-card glass-panel">
          <p>${s.desc}</p>
        </div>
      </div>
    `).join('')}
  `;
}

function renderRequiredDocs(service) {
  const docsListContainer = document.getElementById('modalRequiredDocsList');
  if (service.documents.length === 0) {
    docsListContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 24px;">ไม่มีเอกสารระบุจำเพาะสำหรับบริการนี้</p>';
    return;
  }
  
  docsListContainer.innerHTML = service.documents.map(doc => {
    let icon = 'description';
    let fileClass = 'doc';
    if (doc.type === 'pdf') { icon = 'picture_as_pdf'; fileClass = 'pdf'; }
    if (doc.type === 'excel') { icon = 'grid_on'; fileClass = 'excel'; }
    
    const isRequired = doc.status === 'จำเป็น' || doc.status === 'จำเป็นตอนสิ้นสุดโครงการ' || doc.status === 'จำเป็นถ้าขอค่าตีพิมพ์';
    const badgeClass = isRequired ? 'required' : 'optional';
    
    return `
      <div class="document-item glass-panel">
        <div class="doc-info">
          <div class="doc-file-icon ${fileClass}" aria-hidden="true">
            <span class="material-icons">${icon}</span>
          </div>
          <div class="doc-details">
            <h4>${doc.name}</h4>
            <span>ประเภทรูปแบบ: ${doc.type.toUpperCase()}</span>
          </div>
        </div>
        <span class="doc-badge ${badgeClass}">${doc.status}</span>
      </div>
    `;
  }).join('');
}

function renderSystemsList(service) {
  const listContainer = document.getElementById('modalSystemsList');
  if (!service.systems || service.systems.length === 0) {
    listContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 13px;">ไม่มีระบบเฉพาะเจาะจงใช้งานสำหรับกระบวนการนี้</p>';
    return;
  }
  
  listContainer.innerHTML = service.systems.map(sys => `
    <a href="${sys.url}" target="_blank" rel="noopener noreferrer" class="system-link-card glass-panel">
      <div class="system-link-info">
        <h4>${sys.name}</h4>
        <p>${sys.usage}</p>
      </div>
      <div class="system-link-go" aria-label="เปิดหน้าต่างระบบ">
        <span class="material-icons">chevron_right</span>
      </div>
    </a>
  `).join('');
}

/* ==========================================================================
   6. SMART DOCUMENT GENERATOR (WIZARD SYSTEM)
   ========================================================================== */
function renderDocumentGenerator() {
  const service = activeService;
  if (!service || !service.hasTemplate) return;
  
  const formContainer = document.getElementById('docGeneratorForm');
  const memoOutputArea = document.getElementById('memoOutputArea');
  const copyBtn = document.getElementById('copyDraftBtn');
  
  // 1. สร้าง Form Inputs
  formContainer.innerHTML = service.templateFields.map(field => {
    if (field.type === 'textarea') {
      return `
        <div class="form-group">
          <label for="input-${field.name}">${field.label}</label>
          <textarea id="input-${field.name}" placeholder="${field.placeholder}" rows="4"></textarea>
        </div>
      `;
    }
    return `
      <div class="form-group">
        <label for="input-${field.name}">${field.label}</label>
        <input type="${field.type}" id="input-${field.name}" placeholder="${field.placeholder}">
      </div>
    `;
  }).join('');
  
  // 2. ผูกอีเวนต์อินพุตอัปเดตแบบเรียลไทม์
  service.templateFields.forEach(field => {
    const inputElement = document.getElementById(`input-${field.name}`);
    if (inputElement) {
      inputElement.addEventListener('input', updateMemoPreview);
    }
  });
  
  // 3. กำหนดพฤติกรรมการคลิกคัดลอกร่างบันทึกข้อความ
  copyBtn.onclick = () => {
    const textToCopy = memoOutputArea.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      const copyBtnText = document.getElementById('copyBtnText');
      copyBtn.style.background = 'var(--success)';
      copyBtnText.textContent = 'คัดลอกสำเร็จแล้ว!';
      
      setTimeout(() => {
        copyBtn.style.background = '';
        copyBtnText.textContent = 'คัดลอกร่างเอกสาร';
      }, 2000);
    }).catch(err => {
      alert('ไม่สามารถคัดลอกอัตโนมัติได้ กรุณาใช้การคลุมดำคัดลอกด้วยตนเอง');
    });
  };
  
  // โหลดพรีวิวเริ่มแรก
  updateMemoPreview();
}

function updateMemoPreview() {
  const service = activeService;
  if (!service || !service.hasTemplate) return;
  
  // โหลดค่าต่างๆ จาก Input ฟอร์ม หรือใช้ตัวอย่าง Placeholder หากนักวิจัยยังไม่พิมพ์
  const data = {};
  service.templateFields.forEach(field => {
    const inputEl = document.getElementById(`input-${field.name}`);
    data[field.name] = (inputEl && inputEl.value.trim() !== '') ? inputEl.value.trim() : field.placeholder;
  });
  
  const memoOutputArea = document.getElementById('memoOutputArea');
  
  // ประมวลผลเทมเพลตจดหมาย (แบ่งตามประเภทเอกสาร)
  let memoHTML = '';
  
  if (service.templateType === 'proposal_memo') {
    memoHTML = `
      <div class="memo-title-block">บันทึกข้อความ</div>
      <div class="memo-meta-row"><span class="memo-meta-label">ส่วนงาน:</span><span class="memo-meta-value">${data.department} คณะสังคมศาสตร์ โทร. 053-943528</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">ที่:</span><span class="memo-meta-value">อว 8393(15.2)/ -</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">วันที่:</span><span class="memo-meta-value">${getCurrentThaiDate()}</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรื่อง:</span><span class="memo-meta-value">ขออนุมัติเสนอข้อเสนอโครงการวิจัยเพื่อสมัครรับทุนอุดหนุนการวิจัย</span></div>
      <div class="memo-divider"></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรียน:</span><span class="memo-meta-value">คณบดีคณะสังคมศาสตร์</span></div>
      <div class="memo-content">
        ด้วยข้าพเจ้า ${data.researcherName} สังกัด ${data.department} คณะสังคมศาสตร์ มหาวิทยาลัยเชียงใหม่ มีความประสงค์จะขออนุมัติยื่นข้อเสนอโครงการวิจัย เรื่อง “${data.projectTitle}” เพื่อเสนอขอรับทุนอุดหนุนการวิจัยประจำปีงบประมาณจาก ${data.fundingSource} โดยมีกรอบงบประมาณโครงการทั้งสิ้นจำนวน ${Number(data.budget).toLocaleString()} บาท (เงินสุทธิหลังตรวจสอบสัดส่วนเงินสมทบสถาบันเรียบร้อยแล้ว)
      </div>
      <div class="memo-content">
        ในการนี้ ข้าพเจ้าจึงใคร่ขอความอนุเคราะห์จากคณะสังคมศาสตร์ในการพิจารณาให้ความเห็นชอบ และเสนอข้อเสนอโครงการวิจัยดังกล่าวไปยังมหาวิทยาลัยเชียงใหม่และแหล่งทุน เพื่อประกอบการขอรับการอนุมัติทุนอย่างเป็นทางการต่อไป เอกสารข้อเสนอโครงการได้แนบมาพร้อมบันทึกนี้แล้ว
      </div>
      <div class="memo-content">จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ</div>
      <div class="memo-signatures">
        <p style="margin-bottom: 24px;">(ลงชื่อ)...................................................</p>
        <p>( ${data.researcherName} )</p>
        <p>หัวหน้าโครงการวิจัย</p>
      </div>
    `;
  } 
  
  else if (service.templateType === 'power_of_attorney_memo') {
    memoHTML = `
      <div class="memo-title-block">บันทึกข้อความ</div>
      <div class="memo-meta-row"><span class="memo-meta-label">ส่วนงาน:</span><span class="memo-meta-value">${data.department} คณะสังคมศาสตร์ โทร. 053-943528</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">ที่:</span><span class="memo-meta-value">อว 8393(15.2)/ -</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">วันที่:</span><span class="memo-meta-value">${getCurrentThaiDate()}</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรื่อง:</span><span class="memo-meta-value">ขอเสนอเรื่องมอบอำนาจลงนามในสัญญารับทุนอุดหนุนการวิจัยจากแหล่งทุนภายนอก</span></div>
      <div class="memo-divider"></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรียน:</span><span class="memo-meta-value">อธิการบดีมหาวิทยาลัยเชียงใหม่ (ผ่านคณบดีคณะสังคมศาสตร์)</span></div>
      <div class="memo-content">
        ตามที่โครงการวิจัย เรื่อง “${data.projectTitle}” ซึ่งได้รับงบประมาณสนับสนุนจากแหล่งทุนภายนอก คือ ${data.fundingSource} โดยมีตัวเงินทุนสนับสนุนรวมทั้งสิ้นจำนวน ${Number(data.budget).toLocaleString()} บาท มีความจำเป็นต้องทำการลงนามและทำสัญญาผูกพันทางนิติกรรมกับทางแหล่งทุนภายนอก เพื่อให้สอดรับกับระยะเวลาโครงการคือ ${data.contractPeriod}
      </div>
      <div class="memo-content">
        เพื่อให้การลงนามและทำสัญญาเป็นไปด้วยความรวดเร็วและเป็นประโยชน์ต่อทางราชการ ข้าพเจ้า ${data.researcherName} ในฐานะหัวหน้าโครงการวิจัย จึงใคร่ขอเสนอขอรับมอบอำนาจจากอธิการบดีมหาวิทยาลัยเชียงใหม่ ในการลงนามสัญญาโครงการวิจัยดังกล่าวในนามตัวแทนมหาวิทยาลัย และเป็นคู่สัญญาที่ถูกต้องตามข้อกำหนด
      </div>
      <div class="memo-content">จึงเรียนมาเพื่อโปรดพิจารณาดำเนินการนำเสนอต่อมหาวิทยาลัยเชียงใหม่เพื่ออนุมัติต่อไป</div>
      <div class="memo-signatures">
        <p style="margin-bottom: 24px;">(ลงชื่อ)...................................................</p>
        <p>( ${data.researcherName} )</p>
        <p>หัวหน้าโครงการวิจัย</p>
      </div>
    `;
  }
  
  else if (service.templateType === 'open_account_memo') {
    memoHTML = `
      <div class="memo-title-block">บันทึกข้อความ</div>
      <div class="memo-meta-row"><span class="memo-meta-label">ส่วนงาน:</span><span class="memo-meta-value">${data.department} คณะสังคมศาสตร์ โทร. 053-943502</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">ที่:</span><span class="memo-meta-value">อว 8393(15.2)/ -</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">วันที่:</span><span class="memo-meta-value">${getCurrentThaiDate()}</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรื่อง:</span><span class="memo-meta-value">ขออนุมัติมอบอำนาจเปิดบัญชีธนาคารสำหรับโครงการวิจัยภายนอก</span></div>
      <div class="memo-divider"></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรียน:</span><span class="memo-meta-value">อธิการบดีมหาวิทยาลัยเชียงใหม่ (ผ่านงานวิจัยคณะสังคมศาสตร์)</span></div>
      <div class="memo-content">
        ด้วยข้าพเจ้า ${data.researcherName} ได้รับทุนวิจัยภายนอกจาก ${data.fundingSource} เพื่อดำเนินงานวิจัยโครงการ “${data.projectTitle}” ซึ่งสัญญาได้ลงนามเรียบร้อยแล้ว ในการนี้ตามระเบียบแหล่งทุนและมหาวิทยาลัยเชียงใหม่มีความจำเป็นต้องขออนุมัติเปิดบัญชีออมทรัพย์สำหรับใช้จ่ายเฉพาะเจาะจงในงานวิจัยดังกล่าว ณ ${data.bankBranch}
      </div>
      <div class="memo-content">
        ข้าพเจ้าจึงขออนุมัติมอบอำนาจทำธุรกรรมสั่งจ่ายให้กับบุคคลต่อไปนี้:
        <br><pre style="font-family: inherit; font-size: 13px; margin: 12px 0 12px 30px; line-height: 1.6; border-left: 2px solid var(--primary); padding-left: 12px;">${data.signatories}</pre>
      </div>
      <div class="memo-content">จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติให้เปิดบัญชีเงินฝากออมทรัพย์ในชื่อโครงการดังกล่าว</div>
      <div class="memo-signatures">
        <p style="margin-bottom: 24px;">(ลงชื่อ)...................................................</p>
        <p>( ${data.researcherName} )</p>
        <p>หัวหน้าโครงการวิจัย</p>
      </div>
    `;
  }

  else if (service.templateType === 'bank_letter_draft') {
    memoHTML = `
      <div style="text-align: right; margin-bottom: 20px;">
        <p>ที่ ${data.letterNo || 'อว 8393(15.2)/ -'}</p>
      </div>
      <div style="text-align: center; margin-bottom: 30px;">
        <p style="font-weight: 700; font-size: 16px;">คณะสังคมศาสตร์ มหาวิทยาลัยเชียงใหม่</p>
        <p>ตำบลสุเทพ อำเภอเมือง จังหวัดเชียงใหม่ 50200</p>
      </div>
      <div style="margin-bottom: 20px;">
        <p>วันที่ ${data.currentDate || getCurrentThaiDate()}</p>
      </div>
      <div style="margin-bottom: 24px;">
        <p style="font-weight: 700;">เรื่อง ขอความอนุเคราะห์เปิดบัญชีเงินฝากออมทรัพย์โครงการวิจัย</p>
        <p>เรียน ผู้จัดการธนาคารไทยพาณิชย์ จำกัด (มหาชน) สาขามหาวิทยาลัยเชียงใหม่</p>
      </div>
      <div class="memo-content">
        ด้วย คณะสังคมศาสตร์ มหาวิทยาลัยเชียงใหม่ ได้อนุมัติและรับสัญญารับทุนสนับสนุนการวิจัย โครงการ “${data.projectTitle}” ของ ${data.researcherName} หัวหน้าโครงการวิจัย เพื่อประโยชน์ในการโอนจ่าย จัดเก็บ ตรวจสอบทางการบัญชี และเบิกจ่ายเงินงวดวิจัยตามระเบียบแหล่งทุนภายนอกอย่างถูกต้องและโปร่งใส
      </div>
      <div class="memo-content">
        คณะสังคมศาสตร์ จึงใคร่ขอความอนุเคราะห์ให้ท่านดำเนินการเปิดบัญชีเงินฝากประเภทออมทรัพย์ ในนามชื่อบัญชี “${data.accountName}” โดยมีเงื่อนไขการเบิกจ่ายสั่งจ่ายเงินคือ “ลงลายมือชื่อสั่งจ่ายโดย ${data.signatoriesList}” ดังเอกสารการอนุมัติการมอบอำนาจเปิดบัญชีของทางมหาวิทยาลัยที่แนบมาด้วยนี้
      </div>
      <div class="memo-content">จึงเรียนมาเพื่อโปรดให้ความอนุเคราะห์ในการเปิดบัญชีดังกล่าว จักเป็นพระคุณยิ่ง</div>
      <div class="memo-signatures" style="margin-top: 50px;">
        <p style="margin-bottom: 24px;">ขอแสดงความนับถือ</p>
        <p style="margin-bottom: 24px;">...................................................</p>
        <p>( คณบดีคณะสังคมศาสตร์ )</p>
        <p>มหาวิทยาลัยเชียงใหม่</p>
      </div>
    `;
  }

  else if (service.templateType === 'contract_signing_memo') {
    memoHTML = `
      <div class="memo-title-block">บันทึกข้อความ</div>
      <div class="memo-meta-row"><span class="memo-meta-label">ส่วนงาน:</span><span class="memo-meta-value">${data.department} คณะสังคมศาสตร์ โทร. 053-943528</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">ที่:</span><span class="memo-meta-value">อว 8393(15.2)/ -</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">วันที่:</span><span class="memo-meta-value">${getCurrentThaiDate()}</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรื่อง:</span><span class="memo-meta-value">ขอเสนอลงนามสัญญาจ้างทำวิจัย / สัญญารับทุนสนับสนุนงานวิจัยภายนอก</span></div>
      <div class="memo-divider"></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรียน:</span><span class="memo-meta-value">คณบดีคณะสังคมศาสตร์</span></div>
      <div class="memo-content">
        ตามที่ ข้าพเจ้า ${data.researcherName} สังกัด ${data.department} ได้ยื่นขอเสนอทุนโครงการวิจัยเรื่อง “${data.projectTitle}” และได้รับการอนุมัติทุนสนับสนุนจาก ${data.fundingSource} วงเงินงบประมาณเป็นเงินทั้งสิ้นจำนวน ${Number(data.budget).toLocaleString()} บาท สัญญาระบุให้มีคู่สัญญาฝ่ายหนึ่งเป็นมหาวิทยาลัยเชียงใหม่ โดยผู้แทนคือคณบดีคณะสังคมศาสตร์ ลงนามเป็นพยาน/ผู้แทน ร่วมกับแหล่งทุนคือ ${data.contractParties}
      </div>
      <div class="memo-content">
        ในการนี้ ข้าพเจ้าจึงนำสัญญาการรับทุนตัวจริงจำนวน 3 ชุด ซึ่งได้ทำการร่วมลงนามในฐานะหัวหน้าโครงการวิจัย/พยานพิจารณาตรวจสอบความถูกต้องเสร็จสิ้นแล้ว เสนอมายังงานบริหารงานวิจัยเพื่อโปรดนำเสนอต่อคณบดีพิจารณาลงลายมือชื่อพยานหรือคู่สัญญาในสัญญารับทุนเพื่อนำส่งให้แหล่งทุนต่อไป
      </div>
      <div class="memo-content">จึงเรียนมาเพื่อโปรดพิจารณาลงนามในสัญญา</div>
      <div class="memo-signatures">
        <p style="margin-bottom: 24px;">(ลงชื่อ)...................................................</p>
        <p>( ${data.researcherName} )</p>
        <p>หัวหน้าโครงการวิจัย</p>
      </div>
    `;
  }

  else if (service.templateType === 'disbursement_memo') {
    memoHTML = `
      <div class="memo-title-block">บันทึกข้อความ</div>
      <div class="memo-meta-row"><span class="memo-meta-label">ส่วนงาน:</span><span class="memo-meta-value">${data.department} คณะสังคมศาสตร์ โทร. 053-943528</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">ที่:</span><span class="memo-meta-value">อว 8393(15.2)/ -</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">วันที่:</span><span class="memo-meta-value">${getCurrentThaiDate()}</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรื่อง:</span><span class="memo-meta-value">ขออนุมัติเบิกจ่ายเงินงวดโครงการวิจัยภายนอก</span></div>
      <div class="memo-divider"></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรียน:</span><span class="memo-meta-value">คณบดีคณะสังคมศาสตร์</span></div>
      <div class="memo-content">
        ตามที่ ข้าพเจ้า ${data.researcherName} ในฐานะหัวหน้าโครงการวิจัย “${data.projectTitle}” ได้รับการจัดสรรงบประมาณจากแหล่งทุนวิจัยภายนอก ${data.fundingSource} ซึ่งปัจจุบัน แหล่งทุนได้ดำเนินการโอนเงินเข้าคลังโครงการของคณะสังคมศาสตร์เรียบร้อยแล้ว ในการนี้ ข้าพเจ้ามีความประสงค์ที่จะขออนุมัติเบิกจ่ายงบประมาณโครงการวิจัยในรอบงวดนี้ เป็น **เงินงวดที่ ${data.installmentNo}** คิดเป็นมูลค่าทุนจำนวน ${Number(data.installmentAmount).toLocaleString()} บาท
      </div>
      <div class="memo-content">
        โดยข้าพเจ้าได้ดำเนินการสรุปความก้าวหน้าลงระบบ CMU Research ตลอดจนจัดเตรียมใบสำคัญทางการเงินครบถ้วนแล้ว จึงขอความอนุเคราะห์ให้ทางฝ่ายการเงินการบัญชีคณะสังคมศาสตร์ดำเนินการโอนยอดเงินจำนวนดังกล่าว (สุทธิหลังหักเงินสมทบโครงการวิจัย) เข้าสู่บัญชีธนาคารวิจัยเลขที่ ${data.bankAccountNo} เพื่อใช้จ่ายในภารกิจการดำเนินโครงการต่อไป
      </div>
      <div class="memo-content">จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติการเบิกจ่ายเงินงวดวิจัย</div>
      <div class="memo-signatures">
        <p style="margin-bottom: 24px;">(ลงชื่อ)...................................................</p>
        <p>( ${data.researcherName} )</p>
        <p>หัวหน้าโครงการวิจัย</p>
      </div>
    `;
  }

  else if (service.templateType === 'page_charge_memo') {
    memoHTML = `
      <div class="memo-title-block">บันทึกข้อความ</div>
      <div class="memo-meta-row"><span class="memo-meta-label">ส่วนงาน:</span><span class="memo-meta-value">${data.department} คณะสังคมศาสตร์ โทร. 053-943528</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">ที่:</span><span class="memo-meta-value">อว 8393(15.2)/ -</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">วันที่:</span><span class="memo-meta-value">${getCurrentThaiDate()}</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรื่อง:</span><span class="memo-meta-value">ขออนุมัติค่าธรรมเนียมตีพิมพ์ผลงานวิจัย / ค่าตอบแทนรางวัลการตีพิมพ์ระดับนานาชาติ</span></div>
      <div class="memo-divider"></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรียน:</span><span class="memo-meta-value">คณบดีคณะสังคมศาสตร์</span></div>
      <div class="memo-content">
        ด้วยบทความวิจัยของข้าพเจ้า ${data.researcherName} สังกัด ${data.department} เรื่อง “${data.articleTitle}” ได้รับการตรวจประเมินและยอมรับให้ได้รับการตีพิมพ์เผยแพร่อย่างเป็นทางการในวารสารระดับนานาชาติ/ชาติ ชื่อ “${data.journalName}” ซึ่งวารสารดังกล่าวได้รับการจัดอันดับอยู่ในฐานข้อมูล ${data.databaseType}
      </div>
      <div class="memo-content">
        ในการนี้ ข้าพเจ้าจึงนำเอกสารหลักฐานใบตอบรับ (Acceptance Letter) ใบเสร็จรับเงินค่าตีพิมพ์ (APC) และบทความฉบับตีพิมพ์ตัวจริงยื่นความประสงค์เพื่อขออนุมัติเบิกจ่ายเงินสนับสนุนช่วยเหลือค่าธรรมเนียมการตีพิมพ์เผยแพร่บทความวิชาการ (Page Charge / APC) จากงบประมาณกองทุนวิจัยคณะสังคมศาสตร์ จำนวนทั้งสิ้น ${Number(data.amountRequested).toLocaleString()} บาท
      </div>
      <div class="memo-content">จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติให้ความช่วยเหลือดังกล่าว</div>
      <div class="memo-signatures">
        <p style="margin-bottom: 24px;">(ลงชื่อ)...................................................</p>
        <p>( ${data.researcherName} )</p>
        <p>อาจารย์/นักวิจัย ผู้ขอเบิก</p>
      </div>
    `;
  }

  else if (service.templateType === 'overhead_memo') {
    memoHTML = `
      <div class="memo-title-block">บันทึกข้อความ</div>
      <div class="memo-meta-row"><span class="memo-meta-label">ส่วนงาน:</span><span class="memo-meta-value">งานบริหารงานวิจัย คณะสังคมศาสตร์ โทร. 053-943528</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">ที่:</span><span class="memo-meta-value">อว 8393(15.2)/ -</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">วันที่:</span><span class="memo-meta-value">${getCurrentThaiDate()}</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรื่อง:</span><span class="memo-meta-value">นำส่งเงินสมทบค่าอุดหนุนสถาบันกองทุนอุดหนุนการวิจัยของส่วนงานและมหาวิทยาลัย</span></div>
      <div class="memo-divider"></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรียน:</span><span class="memo-meta-value">คณบดีคณะสังคมศาสตร์</span></div>
      <div class="memo-content">
        ตามที่โครงการวิจัย เรื่อง “${data.projectTitle}” ภายใต้การบริหารงานของหัวหน้าโครงการ ${data.researcherName} ได้รับทุนวิจัยภายนอกจาก ${data.fundingSource} งบประมาณสุทธิสัญญารับทุนจำนวน ${Number(data.totalBudget).toLocaleString()} บาท และปัจจุบันได้มีการตั้งเบิกงวดเงินวิจัยในรอบนี้จำนวน ${Number(data.currentInstallmentAmount).toLocaleString()} บาท แล้วนั้น
      </div>
      <div class="memo-content">
        ตามระเบียบมหาวิทยาลัยเชียงใหม่ ว่าด้วยการจัดสรรค่าใช้จ่ายเพื่อการจัดการวิจัย (Overhead) ในอัตราที่สัญญาระบุคือร้อยละ ${data.overheadRate}% ฝ่ายการเงินของงานวิจัยคณะสังคมศาสตร์ ได้ประมวลผลและขออนุมัติโอนจ่ายเงินอุดหนุนเพื่อนำส่งกองทุนวิจัยในส่วนงานต่างๆ ดังนี้:
        <br>1. เงินสมทบส่งเข้ากองทุนอุดหนุนการวิจัยมหาวิทยาลัยเชียงใหม่ (30% จากยอด Overhead) เป็นเงินจำนวน ${Number((data.currentInstallmentAmount * (data.overheadRate / 100)) * 0.3).toLocaleString()} บาท
        <br>2. เงินสมทบส่งเข้ากองทุนพัฒนาวิจัยคณะสังคมศาสตร์ (70% จากยอด Overhead) เป็นเงินจำนวน ${Number((data.currentInstallmentAmount * (data.overheadRate / 100)) * 0.7).toLocaleString()} บาท
      </div>
      <div class="memo-content">จึงเรียนมาเพื่อโปรดอนุมัติโอนย้ายงบประมาณสมทบโครงการดังกล่าวตามที่เสนอ</div>
      <div class="memo-signatures">
        <p style="margin-bottom: 24px;">(ลงชื่อ)...................................................</p>
        <p>( คุณณัฐพล พิพัฒนวิชัย )</p>
        <p>เจ้าหน้าที่การเงินการบัญชีงานวิจัย</p>
      </div>
    `;
  }

  else if (service.templateType === 'progress_report_memo') {
    memoHTML = `
      <div class="memo-title-block">บันทึกข้อความ</div>
      <div class="memo-meta-row"><span class="memo-meta-label">ส่วนงาน:</span><span class="memo-meta-value">${data.department} คณะสังคมศาสตร์ โทร. 053-943528</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">ที่:</span><span class="memo-meta-value">อว 8393(15.2)/ -</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">วันที่:</span><span class="memo-meta-value">${getCurrentThaiDate()}</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรื่อง:</span><span class="memo-meta-value">นำส่งรายงานความก้าวหน้าโครงการวิจัย (Progress Report) เสนอส่วนกลาง</span></div>
      <div class="memo-divider"></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรียน:</span><span class="memo-meta-value">ผู้อำนวยการสำนักงานบริหารงานวิจัย มช. (ผ่านคณบดีคณะสังคมศาสตร์)</span></div>
      <div class="memo-content">
        ด้วยโครงการวิจัย เรื่อง “${data.projectTitle}” ของหัวหน้าโครงการ ${data.researcherName} ซึ่งได้รับทุนอุดหนุนการวิจัยภายนอกจาก ${data.fundingSource} บัดนี้ ได้ดำเนินการวิจัยบรรลุไปตามรอบระยะเวลาโครงการที่กำหนดไว้ในเงื่อนไขสัญญารับทุนเรียบร้อยแล้ว
      </div>
      <div class="memo-content">
        ในการนี้ ข้าพเจ้าจึงนำส่งรายงานความก้าวหน้าโครงการวิจัย (Progress Report) สำหรับ **รอบการรายงานงวด ${data.reportingPeriod}** พร้อมรายงานงบประมาณค่าใช้จ่ายและการเงินมาพร้อมบันทึกฉบับนี้จำนวน 1 ชุด เพื่อโปรดพิจารณาส่งมอบต่อยังส่วนกลางของมหาวิทยาลัยและตรวจสอบผลลัพธ์เป็นลายลักษณ์อักษรต่อไป
      </div>
      <div class="memo-content">จึงเรียนมาเพื่อโปรดอนุมัตินำส่งรายงานความก้าวหน้า</div>
      <div class="memo-signatures">
        <p style="margin-bottom: 24px;">(ลงชื่อ)...................................................</p>
        <p>( ${data.researcherName} )</p>
        <p>หัวหน้าโครงการวิจัย</p>
      </div>
    `;
  }

  else if (service.templateType === 'proactive_support_memo') {
    memoHTML = `
      <div class="memo-title-block">บันทึกข้อความ</div>
      <div class="memo-meta-row"><span class="memo-meta-label">ส่วนงาน:</span><span class="memo-meta-value">${data.affiliation} คณะสังคมศาสตร์ โทร. 053-943528</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">ที่:</span><span class="memo-meta-value">อว 8393(15.2)/ -</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">วันที่:</span><span class="memo-meta-value">${getCurrentThaiDate()}</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรื่อง:</span><span class="memo-meta-value">ขอเสนอขอยืมพื้นที่ทำงาน สิ่งอำนวยความสะดวกในการจัดทำยุทธศาสตร์วิจัย</span></div>
      <div class="memo-divider"></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรียน:</span><span class="memo-meta-value">คณบดีคณะสังคมศาสตร์ มหาวิทยาลัยเชียงใหม่</span></div>
      <div class="memo-content">
        ด้วยข้าพเจ้า ${data.researcherName} สังกัด ${data.affiliation} เป็นนักวิจัยยุทธศาสตร์เชิงรุกที่มีความประสงค์จะดำเนินกิจกรรมขยายขอบเขตการทำโครงการวิจัยในเรื่องหลักคือ “${data.researchArea}” เพื่อสนับสนุนเป้าหมายยุทธศาสตร์ความเป็นเลิศทางการวิจัยของคณะสังคมศาสตร์
      </div>
      <div class="memo-content">
        ในการนี้ ข้าพเจ้าจึงขอยื่นความจำนงในการขอรับการสนับสนุนบริการตามรายละเอียดดังต่อไปนี้:
        <br><pre style="font-family: inherit; font-size: 13px; margin: 12px 0 12px 30px; line-height: 1.6; border-left: 2px solid var(--primary); padding-left: 12px;">${data.supportRequired}</pre>
        หวังเป็นอย่างยิ่งว่าจะได้รับการจัดสรรเพื่อความคล่องตัวในการปฏิบัติงานวิจัยเชิงรุกร่วมกับคณะสังคมศาสตร์
      </div>
      <div class="memo-content">จึงเรียนมาเพื่อโปรดพิจารณาความอนุเคราะห์และอนุมัติ</div>
      <div class="memo-signatures">
        <p style="margin-bottom: 24px;">(ลงชื่อ)...................................................</p>
        <p>( ${data.researcherName} )</p>
        <p>นักวิจัยยุทธศาสตร์เชิงรุก คณะสังคมศาสตร์</p>
      </div>
    `;
  }

  else if (service.templateType === 'db_update_memo') {
    memoHTML = `
      <div class="memo-title-block">บันทึกข้อความ</div>
      <div class="memo-meta-row"><span class="memo-meta-label">ส่วนงาน:</span><span class="memo-meta-value">${data.department} คณะสังคมศาสตร์ โทร. 053-943528</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">ที่:</span><span class="memo-meta-value">อว 8393(15.2)/ -</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">วันที่:</span><span class="memo-meta-value">${getCurrentThaiDate()}</span></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรื่อง:</span><span class="memo-meta-value">ขอยื่นเอกสารประกอบการขึ้นทะเบียนและบันทึกปรับปรุงข้อมูลในฐานข้อมูลวิจัย</span></div>
      <div class="memo-divider"></div>
      <div class="memo-meta-row"><span class="memo-meta-label">เรียน:</span><span class="memo-meta-value">เจ้าหน้าที่ผู้ดูแลระบบฐานข้อมูลวิจัยคณะสังคมศาสตร์ มช.</span></div>
      <div class="memo-content">
        ด้วย โครงการวิจัย เรื่อง “${data.projectTitle}” ของหัวหน้าโครงการ ${data.researcherName} ได้รับสัญญารับทุนสนับสนุนการดำเนินโครงการเสร็จสิ้นสมบูรณ์เป็นเงินงบประมาณรวมจำนวน ${Number(data.budget).toLocaleString()} บาท ในการนี้ ข้าพเจ้าจึงนำส่งเอกสารสัญญาเพื่อขึ้นทะเบียนและบันทึกประวัติการวิจัยให้เป็นปัจจุบัน
      </div>
      <div class="memo-content">
        จุดประสงค์ขอยื่นปรับปรุงฐานข้อมูล: **${data.updateStatus}** เพื่อใช้รายงานสถิติเป็นค่าน้ำหนักผลงานและประวัติกิจกรรมวิชาการประจำปีของบุคลากรในคณะสังคมศาสตร์
      </div>
      <div class="memo-content">จึงเรียนมาเพื่อโปรดดำเนินการบันทึกข้อมูลปรับปรุงฐานข้อมูลวิจัย</div>
      <div class="memo-signatures">
        <p style="margin-bottom: 24px;">(ลงชื่อ)...................................................</p>
        <p>( ${data.researcherName} )</p>
        <p>หัวหน้าโครงการวิจัย</p>
      </div>
    `;
  }

  memoOutputArea.innerHTML = memoHTML;
}

// ช่วยคำนวณหาวันปัจจุบันของไทย
function getCurrentThaiDate() {
  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  const d = new Date();
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

/* ==========================================================================
   7. CHATBOT ASSISTANT LOGIC (SMART GUIDE WIZARD)
   ========================================================================== */
const CHAT_FLOW = {
  start: {
    text: "สวัสดีครับ! ผม 'พี่วิจัย SOC' ยินดีต้อนรับคณาจารย์และนักวิจัย คณะสังคมศาสตร์ มช. ทุกท่านครับ วันนี้คุณมีเรื่องอะไรที่ต้องการให้ผมให้คำแนะนำหรือช่วยเหลือพิเศษไหมครับ? (เลือกหัวข้อด้านล่างเพื่อเริ่มการคุย)",
    options: [
      { text: "📂 เสนอข้อเสนอโครงการวิจัยใหม่", nextStep: "init_project" },
      { text: "🏦 การจัดการสัญญารับทุนวิจัยหรือเปิดบัญชีเงินฝาก", nextStep: "contract_banking" },
      { text: "💰 ยื่นเบิกเงินงวดวิจัย หรือขอทุนรางวัลวิชาการ", nextStep: "finance_claims" },
      { text: "📈 การส่งความก้าวหน้าวิจัย หรือคำขอช่วยเหลืออื่นๆ", nextStep: "progress_support" }
    ]
  },
  
  // 1A. เสนอโครงการ
  init_project: {
    text: "เยี่ยมเลยครับสำหรับการเริ่มต้นเสนอรับทุนวิจัยใหม่! งานวิจัยของคณะสังคมศาสตร์ขอแนะนำสองขั้นตอนหลักที่คุณควรทำตอนนี้ครับ:\n\n1. **การยื่นเสนอข้อเสนอโครงการ** (บริการข้อ 1) เพื่อขอความเห็นชอบของคณะกรรมการวิจัยประจำคณะ และเสนอส่งมหาวิทยาลัยเชียงใหม่\n2. **การลงบันทึกในระบบ CMU Research & e-research** (บริการข้อ 11) เพื่อให้โครงการมีเลขรหัสลงทะเบียนวิจัย มช.\n\nคุณต้องการดูรายละเอียดกระบวนการขั้นตอนในข้อใดเป็นพิเศษไหมครับ?",
    options: [
      { text: "🔍 ดูคู่มือการยื่นข้อเสนอโครงการวิจัย (ข้อ 1)", serviceId: 1 },
      { text: "💾 ดูการกรอกข้อมูลในระบบ CMU Research & e-research (ข้อ 11)", serviceId: 11 },
      { text: "↩️ กลับไปเลือกบริการอื่นๆ ใหม่", nextStep: "start" }
    ]
  },
  
  // 1B. สัญญาและการธนาคาร
  contract_banking: {
    text: "ยินดีด้วยครับที่ข้อเสนอโครงการวิจัยได้รับการอนุมัติรับทุนภายนอก! สำหรับขั้นตอนการทำสัญญาและเปิดบัญชีเพื่อเตรียมความพร้อมรับยอดเงินโอน พี่วิจัยแบ่งเป็นคำถามสั้นๆ 2 ข้อดังนี้ คุณต้องการดูส่วนใดครับ?",
    options: [
      { text: "📝 การขอรับมอบอำนาจและการทำสัญญารับทุนวิจัย", nextStep: "sub_contract" },
      { text: "🏦 การยื่นขออนุมัติและจัดทำหนังสือขอเปิดบัญชีธนาคาร", nextStep: "sub_banking" },
      { text: "↩️ ย้อนกลับไปหน้าแรกสุด", nextStep: "start" }
    ]
  },
  sub_contract: {
    text: "สำหรับกรณีนี้ จะมีกระบวนการดำเนินงานที่สอดประสานกัน 2 ขั้นตอนครับ:\n\n1. **การขอรับมอบอำนาจโครงการวิจัย** (บริการข้อ 2) ในฐานะตัวแทนลงนามสัญญาของอธิการบดีสำหรับทุนภายนอก มช.\n2. **การจัดทำสัญญาการรับทุน** (บริการข้อ 5) ตรวจสอบความถูกต้องและเสนอคณบดีหรืออธิการบดีลงนามคู่สัญญา\n\nต้องการเปิดคู่มือการดำเนินการข้อใดขึ้นมาศึกษาและทดลองกรอกตัวอย่างเอกสารครับ?",
    options: [
      { text: "🛡️ คู่มือการขอรับมอบอำนาจโครงการวิจัย (ข้อ 2)", serviceId: 2 },
      { text: "📜 คู่มือการจัดทำสัญญารับทุนวิจัย (ข้อ 5)", serviceId: 5 },
      { text: "↩️ ย้อนกลับไปขั้นตอนก่อนหน้า", nextStep: "contract_banking" }
    ]
  },
  sub_banking: {
    text: "การจัดการบัญชีโครงการวิจัยมี 2 ขั้นตอนเรียงตามการอนุมัติครับ:\n\n1. **การขอรับมอบอำนาจเปิด-ปิดบัญชีวิจัย** (บริการข้อ 3) เพื่อขออนุญาตลงนามสั่งจ่ายร่วมจากมหาวิทยาลัย\n2. **จัดทำหนังสือขอเปิด-ปิดบัญชีส่งตัว** (บริการข้อ 4) เพื่อนำจดหมายของคณบดีไปยื่นเปิดบัญชีเงินฝากที่ธนาคารไทยพาณิชย์ มช.\n\nต้องการดูคู่มือข้อมูลข้อใดเป็นพิเศษครับ?",
    options: [
      { text: "🏦 การขอรับมอบอำนาจเปิด-ปิดบัญชีวิจัย (ข้อ 3)", serviceId: 3 },
      { text: "✉️ การออกหนังสือส่งตัวไปเปิดบัญชีธนาคาร (ข้อ 4)", serviceId: 4 },
      { text: "↩️ ย้อนกลับไปขั้นตอนก่อนหน้า", nextStep: "contract_banking" }
    ]
  },
  
  // 1C. การเงินและรางวัล
  finance_claims: {
    text: "เรื่องการเงินและงบประมาณเป็นหัวใจหลักในการวิจัยเลยครับ! พี่วิจัยขอแนะนำหมวดการเบิกจ่ายออกเป็น 2 แนวทาง ดังนี้ครับ เลือกที่สอดคล้องกับคุณได้เลย:",
    options: [
      { text: "💵 เบิกงวดเงินวิจัยของโครงการที่ได้รับการโอนมาจากแหล่งทุนภายนอก", nextStep: "sub_disburse" },
      { text: "🏆 เบิกรางวัลค่าตอบแทนผลงาน หรือขอทุนค่าตีพิมพ์ (Page Charge / APC)", nextStep: "sub_award" },
      { text: "↩️ ย้อนกลับไปหน้าแรกสุด", nextStep: "start" }
    ]
  },
  sub_disburse: {
    text: "ในการเบิกงวดเงินของโครงการทุนภายนอก จะมี 2 เรื่องการเงินที่เกี่ยวข้องกันครับ:\n\n1. **การเบิกจ่ายเงินงวดโครงการวิจัย** (บริการข้อ 6) ดำเนินการอัปเดตระบบ CMU Research และขอเสนออนุมัติสั่งเบิกผ่าน e-document คณะฯ\n2. **การคำนวณและส่งเงินสมทบกองทุนวิจัย** (บริการข้อ 8) เพื่อเป็นค่า Overhead หักสมทบเข้าคลังมหาวิทยาลัย มช. และคณะสังคมศาสตร์\n\nหัวข้อใดที่คุณต้องการเปิดดูรายละเอียดคู่มือครับ?",
    options: [
      { text: "💰 คู่มือการเบิกจ่ายเงินงวดโครงการภายนอก (ข้อ 6)", serviceId: 6 },
      { text: "📊 คู่มือทำเอกสารส่งเงินสมทบกองทุนวิจัย (ข้อ 8)", serviceId: 8 },
      { text: "↩️ ย้อนกลับไปขั้นตอนก่อนหน้า", nextStep: "finance_claims" }
    ]
  },
  sub_award: {
    text: "การส่งเสริมการเผยแพร่ผลงานวิชาการของบุคลากรสายวิชาการ (บริการข้อ 7) ครอบคลุมการสนับสนุนเงินรางวัลตอบแทนสิ่งตีพิมพ์ และการเบิกจ่ายช่วยเหลือค่าตีพิมพ์วารสารวิชาการ (Page Charge / APC) จากงบประมาณของคณะสังคมศาสตร์\n\nต้องการเปิดคลังเอกสารและดาวน์โหลดแบบฟอร์มคำขอในข้อนี้เลยไหมครับ?",
    options: [
      { text: "📄 เปิดคู่มือเบิกค่าตอบแทนผลงาน & ค่าตีพิมพ์ (ข้อ 7)", serviceId: 7 },
      { text: "↩️ ย้อนกลับไปขั้นตอนก่อนหน้า", nextStep: "finance_claims" }
    ]
  },
  
  // 1D. การติดตามโครงการและการสนับสนุน
  progress_support: {
    text: "การกำกับดูแลช่วยเหลือ และการให้สิทธิประโยชน์นักวิจัยยุทธศาสตร์ คืองานหลักของเราครับ เลือกความต้องการของคุณได้เลย:",
    options: [
      { text: "⏳ ติดตามโครงการและส่งรายงานความก้าวหน้า (Progress Report) ตามเวลา", serviceId: 9 },
      { text: "🛡️ คำแนะนำขอบริการสนับสนุนสำหรับ 'นักวิจัยยุทธศาสตร์เชิงรุก'", serviceId: 10 },
      { text: "↩️ ย้อนกลับไปหน้าแรกสุด", nextStep: "start" }
    ]
  }
};

function initChatBot() {
  // เริ่มการคุยแรกเริ่ม
  chatHistory = [];
  goToChatStep('start');
}

function goToChatStep(stepId) {
  currentChatStep = stepId;
  const step = CHAT_FLOW[stepId];
  if (!step) return;
  
  // 1. เพิ่มข้อความ Bot ลงใน Chat Box
  addChatMessage('bot', step.text);
  
  // 2. เรนเดอร์ตัวเลือกคำถาม
  const optionsArea = document.getElementById('chatOptionsArea');
  optionsArea.innerHTML = step.options.map((opt, idx) => `
    <button class="chat-option-btn" onclick="handleChatOptionClick(${idx})">
      <span>${opt.text}</span>
      <span class="material-icons">east</span>
    </button>
  `).join('');
}

function addChatMessage(sender, text) {
  const chatBoxArea = document.getElementById('chatBoxArea');
  if (!chatBoxArea) return;
  
  const avatar = sender === 'bot' ? '🕵️‍♂️' : '👤';
  const messageHTML = `
    <div class="chat-msg ${sender}">
      ${sender === 'bot' ? `<div class="chat-avatar-small">${avatar}</div>` : ''}
      <div class="chat-bubble glass-panel">
        <p style="white-space: pre-line;">${text}</p>
      </div>
      ${sender === 'user' ? `<div class="chat-avatar-small">${avatar}</div>` : ''}
    </div>
  `;
  
  chatBoxArea.insertAdjacentHTML('beforeend', messageHTML);
  
  // เลื่อนหน้าต่างแชทลงด้านล่างสุดเสมอ
  chatBoxArea.scrollTop = chatBoxArea.scrollHeight;
}

function handleChatOptionClick(optionIdx) {
  const step = CHAT_FLOW[currentChatStep];
  if (!step) return;
  
  const selectedOption = step.options[optionIdx];
  if (!selectedOption) return;
  
  // 1. ส่งข้อความของฝั่งผู้ใช้ลงแชท
  addChatMessage('user', selectedOption.text);
  
  // 2. ดำเนินการต่อ (สลับหน้าต่างไปยังรายละเอียดบริการ หรือ ไปคำถามถัดไป)
  if (selectedOption.serviceId) {
    setTimeout(() => {
      // เปิดบริการและเริ่มคุยใหม่หลังปิด Modal
      openServiceDetail(selectedOption.serviceId);
      initChatBot();
    }, 500);
  } else if (selectedOption.nextStep) {
    setTimeout(() => {
      goToChatStep(selectedOption.nextStep);
    }, 400);
  }
}

/* ==========================================================================
   8. HELPDESK STAFF INDEX RENDERING
   ========================================================================== */
function renderStaff() {
  const staffGrid = document.getElementById('staffGrid');
  const helpdeskSection = document.getElementById('helpdeskSection');
  if (!RESEARCH_DATA.contacts || RESEARCH_DATA.contacts.length === 0) {
    if (helpdeskSection) helpdeskSection.style.display = 'none';
    return;
  }
  if (!staffGrid) return;
  
  staffGrid.innerHTML = RESEARCH_DATA.contacts.map(staff => `
    <article class="staff-card glass-panel">
      <div class="staff-avatar" aria-hidden="true">${staff.avatar}</div>
      <h3>${staff.name}</h3>
      <div class="staff-position">${staff.position}</div>
      <p class="staff-role">${staff.role}</p>
      <div class="staff-contact-links">
        <a href="tel:${staff.phone.replace(/[^0-9]/g, '')}" class="staff-link-item">
          <span class="material-icons">phone</span>
          <span>${staff.phone}</span>
        </a>
        <a href="mailto:${staff.email}" class="staff-link-item">
          <span class="material-icons">mail</span>
          <span>${staff.email}</span>
        </a>
      </div>
    </article>
  `).join('');
}

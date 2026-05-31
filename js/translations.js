const TRANSLATIONS = {
  th: {
    // Header & Hero
    portal_title: "งานบริหารงานวิจัยฯ",
    portal_subtitle: "คณะสังคมศาสตร์ มหาวิทยาลัยเชียงใหม่",
    hero_tag: "ระบบสนับสนุนการปฏิบัติงานด้านวิจัยคณาจารย์และนักวิจัย",
    hero_title: "การดำเนินงานและกระบวนการขั้นตอน",
    hero_title_accent: "การบริหารงานวิจัยฯ",
    hero_subtitle: "อธิบายและแนะนำขั้นตอนการดำเนินการอย่างเป็นระบบ ครอบคลุมขั้นตอนการยื่นเสนอโครงการ สัญญารับทุน ขออนุมัติเปิดบัญชี เบิกจ่ายเงินงวด และการสนับสนุนงานด้านวิจัย คณะสังคมศาสตร์ มหาวิทยาลัยเชียงใหม่",
    
    // Search & Filter
    search_placeholder: "ค้นหาตามชื่องานวิจัย ขั้นตอน บริการ หรือแบบฟอร์ม...",
    clear_search: "ล้างคำค้นหา",
    empty_results_title: "ไม่พบข้อมูลการให้บริการที่ตรงกับคำค้นหาของคุณ",
    empty_results_desc: 'ลองค้นหาด้วยคำอื่น เช่น "เปิดบัญชี", "เบิกเงินงวด", "Page Charge", "ยุทธศาสตร์" เป็นต้น',
    
    // Chatbot Welcome & Floating UI
    chat_float_title: "ผู้ช่วยงานวิจัย",
    chat_float_tooltip: "มีอะไรให้ช่วย? 👋",
    chat_assistant_title: "พี่วิจัย SOC ยินดีต้อนรับ",
    chat_welcome_title: "มีอะไรให้ช่วย?",
    chat_welcome_desc: "หากคุณไม่แน่ใจว่าต้องใช้บริการในหัวข้อใด หรือต้องการเตรียมเอกสารแบบใด ลองถามตอบสั้นๆ เพื่อให้พี่วิจัยค้นหาคำตอบและบริการที่เหมาะกับคุณได้ทันที!",
    chat_start_btn: "เริ่มต้นใช้งาน",
    
    // Related Systems
    related_systems_title: "ระบบที่เกี่ยวข้องในการดำเนินงาน (Related Systems for Research)",
    related_systems_desc_th: "รวมระบบสารสนเทศที่ใช้สนับสนุนการปฏิบัติงานวิจัยและการดำเนินงานต่างๆ",
    related_systems_desc_en: "A collection of information systems that support research administration and project management.",
    cmu_research_title: "ระบบ CMU Research",
    cmu_research_desc: "ระบบบริหารงานวิจัยและฐานข้อมูลกลางของ มหาวิทยาลัยเชียงใหม่ ที่ใช้จัดการข้อมูลนักวิจัย ทุนสนับสนุน และผลงานวิชาการ",
    edoc_title: "ระบบ e-Document",
    edoc_desc: "ระบบสารบรรณอิเล็กทรอนิกส์ของมหาวิทยาลัยเชียงใหม่ ที่ใช้ในการรับ-ส่งหนังสือและเอกสารราชการต่างๆ",
    eresearch_title: "ระบบ e-Research คณะสังคมศาสตร์",
    eresearch_desc: "ระบบฐานข้อมูลโครงการวิจัยของคณาจารย์และนักวิจัย คณะสังคมศาสตร์ มช.",
    gdrive_title: "คลังเอกสารงานวิจัย",
    gdrive_desc: "แบบฟอร์ม คู่มือ และเอกสารอ้างอิงทั้งหมดสำหรับการบริหารงานวิจัย จัดเก็บบน Google Drive พร้อมดาวน์โหลด",
    
    // Contact Section
    contact_title: "Contact Our Research Support Team",
    contact_subtitle: "Our team is ready to assist you with research administration, funding procedures, documentation, and publication support.",
    staff_title: "Research Administration Support",
    staff_dept: "เจ้าหน้าที่งานบริหารงานวิจัยและวิเทศสัมพันธ์",
    staff_desc: "พวกเรายินดีให้คำปรึกษา แนะนำขั้นตอนการเตรียมเอกสาร และอำนวยความสะดวกในทุกกระบวนงานวิจัยของคณาจารย์และนักวิจัยคณะสังคมศาสตร์ทุกท่าน",
    badge_guide: "แนะนำขั้นตอน",
    badge_doc: "ช่วยเตรียมเอกสาร",
    badge_pay: "ประสานการเบิกจ่าย",
    info_address_title: "งานบริหารงานวิจัยฯ คณะสังคมศาสตร์",
    info_address_desc: "239 ถนนห้วยแก้ว ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200",
    info_phone_title: "โทรศัพท์",
    info_phone_desc: "053-943528",
    info_email_title: "อีเมลติดต่อโดยตรง",
    info_email_desc: "rais.soc.pim@gmail.com",
    form_title: "Send Us a Message!",
    form_name_placeholder: "Your Name",
    form_email_placeholder: "Email Address",
    form_msg_placeholder: "Type your message here",
    form_submit_btn: "GIVE US A SHOT",
    
    // Helpdesk / Staff
    helpdesk_title: "ฝ่ายบริหารงานวิจัยและวิเทศสัมพันธ์",
    helpdesk_desc: "ทีมงานเจ้าหน้าที่คอยช่วยเหลือ ให้คำแนะนำ และอำนวยความสะดวกกระบวนงานวิจัยทุกขั้นตอน ติดต่อสอบถามรายละเอียดหรือนัดหมายปรึกษาล่วงหน้าได้ทันที",
    
    // Footer
    footer_desc: "งานบริหารงานวิจัยและวิเทศสัมพันธ์ คณะสังคมศาสตร์ มหาวิทยาลัยเชียงใหม่. ออกแบบและพัฒนาสำหรับสนับสนุนคณาจารย์และนักวิจัย มช.",
    footer_related_title: "หน่วยงานที่เกี่ยวข้อง",
    footer_related_ora: "สำนักงานบริหารงานวิจัย มช. (สบว.)",
    footer_related_faculty: "เว็บไซต์หลักคณะสังคมศาสตร์ มช.",
    footer_cat_title: "หมวดงานบริการ",
    footer_cat_initiation: "ขั้นตอนการเริ่มขอทุนโครงการวิจัย",
    footer_cat_banking: "เกี่ยวกับการเงินและธนาคาร",
    footer_cat_finance: "การเบิกจ่ายงวดเงินและค่าตอบแทน",
    
    // Detail Modal UI
    modal_cat_label: "หมวดหมู่บริการ",
    modal_close_title: "ปิดหน้าต่างรายละเอียด",
    tab_workflow: "ขั้นตอนการดำเนินการ",
    tab_docs: "เอกสารและเช็คลิสต์",
    tab_generator: "ระบบร่างเอกสารตัวอย่าง",
    modal_researcher_flow: "ขั้นตอนการดำเนินการของผู้วิจัย (Researcher Flow)",
    modal_staff_flow: "ขั้นตอนดำเนินงานฝั่งงานวิจัย คณะฯ (Staff Flow)",
    modal_required_docs: "รายการเอกสารที่จำเป็นต้องจัดเตรียม",
    modal_generator_title: "ร่างจดหมาย / บันทึกข้อความ ขออนุมัติเบื้องต้น",
    modal_generator_desc: "กรอกข้อมูลลงในแบบฟอร์มทางซ้าย ระบบจะปรับปรุงร่างจดหมายทางขวาให้อัตโนมัติตามรูปแบบมาตรฐานของคณะ คุณสามารถกดคัดลอกร่างนี้เพื่อนำไปทำบันทึกในระบบ e-Document หรือ Microsoft Word ได้ทันที!",
    modal_preview_title: "ตัวอย่างร่างบันทึกข้อความ (Draft Preview)",
    modal_copy_btn: "คัดลอกร่างเอกสาร",
    modal_copy_success: "คัดลอกลงคลิปบอร์ดแล้ว!",
    modal_download_word: "ดาวน์โหลดไฟล์ Word",
    modal_objective_title: "วัตถุประสงค์และเป้าหมาย",
    modal_tips_title: "ข้อแนะนำและจุดควรระวัง",
    modal_systems_title: "ระบบที่ต้องใช้งานร่วม",
    modal_systems_empty: "ไม่มีระบบเฉพาะเจาะจงใช้งานสำหรับกระบวนการนี้"
  },
  en: {
    // Header & Hero
    portal_title: "Research Administration",
    portal_subtitle: "Faculty of Social Sciences, Chiang Mai University",
    hero_tag: "Research Operations Support System for Faculty and Researchers",
    hero_title: "Operations and Procedures of",
    hero_title_accent: "Research Administration",
    hero_subtitle: "Systematic guidelines and procedures for project proposals, grant agreements, bank accounts, disbursements, and research support at the Faculty of Social Sciences, Chiang Mai University.",
    
    // Search & Filter
    search_placeholder: "Search by research title, procedure, service, or form...",
    clear_search: "Clear search query",
    empty_results_title: "No services matching your search query were found.",
    empty_results_desc: 'Try searching with other terms such as "Open Account", "Installment", "Page Charge", "Strategy", etc.',
    
    // Chatbot Welcome & Floating UI
    chat_float_title: "Research Assistant",
    chat_float_tooltip: "Need help? 👋",
    chat_assistant_title: "SOC Research Assistant",
    chat_welcome_title: "Need help?",
    chat_welcome_desc: "If you are unsure about which service or documents you need, answer these quick questions so we can find the right match for you immediately!",
    chat_start_btn: "Get Started",
    
    // Related Systems
    related_systems_title: "Related Systems for Research Administration",
    related_systems_desc_th: "รวมระบบสารสนเทศที่ใช้สนับสนุนการปฏิบัติงานวิจัยและการดำเนินงานต่างๆ",
    related_systems_desc_en: "A collection of information systems that support research administration and project management.",
    cmu_research_title: "CMU Research System",
    cmu_research_desc: "Chiang Mai University Research Administration and Database System for managing researcher data, grants, and publications.",
    edoc_title: "e-Document System",
    edoc_desc: "Chiang Mai University electronic document system for receiving and sending official documents.",
    eresearch_title: "e-Research Faculty of Social Sciences",
    eresearch_desc: "Research project database system of the Faculty of Social Sciences, CMU.",
    gdrive_title: "Research Document Archive",
    gdrive_desc: "All forms, manuals, and reference documents for research administration stored on Google Drive.",
    
    // Contact Section
    contact_title: "Contact Our Research Support Team",
    contact_subtitle: "Our team is ready to assist you with research administration, funding procedures, documentation, and publication support.",
    staff_title: "Research Administration Support",
    staff_dept: "Research Administration and International Relations Staff",
    staff_desc: "We are pleased to provide consultation, assist in document preparation, and facilitate research disbursements for all Faculty of Social Sciences faculty and researchers.",
    badge_guide: "Guidelines",
    badge_doc: "Document Prep",
    badge_pay: "Disbursements",
    info_address_title: "Research Administration, Faculty of Social Sciences",
    info_address_desc: "239 Huay Kaew Rd., Suthep, Mueang, Chiang Mai 50200",
    info_phone_title: "Phone",
    info_phone_desc: "053-943528",
    info_email_title: "Direct Email",
    info_email_desc: "rais.soc.pim@gmail.com",
    form_title: "Send Us a Message!",
    form_name_placeholder: "Your Name",
    form_email_placeholder: "Email Address",
    form_msg_placeholder: "Type your message here",
    form_submit_btn: "GIVE US A SHOT",
    
    // Helpdesk / Staff
    helpdesk_title: "Research Administration & International Relations",
    helpdesk_desc: "Our team is here to help, guide, and facilitate every step of your research. Contact us for details or schedule a consultation.",
    
    // Footer
    footer_desc: "Research Administration and International Relations, Faculty of Social Sciences, Chiang Mai University. Designed and developed to support CMU faculty and researchers.",
    footer_related_title: "Related Agencies",
    footer_related_ora: "CMU Office of Research Administration (ORA)",
    footer_related_faculty: "Faculty of Social Sciences Main Website",
    footer_cat_title: "Service Categories",
    footer_cat_initiation: "Research Grant Initiation",
    footer_cat_banking: "Finance and Banking",
    footer_cat_finance: "Disbursements and Academic Incentives",
    
    // Detail Modal UI
    modal_cat_label: "Category",
    modal_close_title: "Close Details Window",
    tab_workflow: "Workflow Steps",
    tab_docs: "Documents & Checklist",
    tab_generator: "Smart Document Draft Generator",
    modal_researcher_flow: "Researcher Workflow Steps",
    modal_staff_flow: "Faculty Staff Workflow Steps",
    modal_required_docs: "Required Documents Checklist",
    modal_generator_title: "Draft Request Letter / Memo",
    modal_generator_desc: "Fill in the form on the left, and the standard Faculty memo template on the right will update automatically. You can copy the draft directly into e-Document or Microsoft Word!",
    modal_preview_title: "Draft Preview",
    modal_copy_btn: "Copy Draft Document",
    modal_copy_success: "Copied to Clipboard!",
    modal_download_word: "Download Word File",
    modal_objective_title: "Objectives & Goals",
    modal_tips_title: "Tips & Cautions",
    modal_systems_title: "Required Systems",
    modal_systems_empty: "No specific system is required for this process."
  }
};

const RESEARCH_DATA_EN = {
  categories: [
    { id: 'all', title: 'All Services', icon: 'grid_view' },
    { id: 'initiation', title: '1. Grant Initiation', icon: 'create_new_folder', description: 'Steps for project submission, grant contracts, and research database record-keeping.' },
    { id: 'banking', title: '2. Finance & Banking', icon: 'account_balance', description: 'Steps for requesting bank account opening/closure for research projects and preparing bank letters.' },
    { id: 'operation', title: '3. Project Operations', icon: 'folder_open', description: 'Steps during project implementation, document tracking, and general coordination.' },   
    { id: 'grant', title: '4. Contracts & Authorization', icon: 'assignment_turned_in', description: 'Steps for drafting grant agreements and requesting delegation of authority from the university.' },
    { id: 'finance', title: '5. Disbursements & Contributions', icon: 'payments', description: 'Steps for outer-source project installment claims, publication incentives, and institutional overhead contributions.' }
  ],
  services: [
    {
      id: 1,
      number: '1',
      title: 'Research Project Proposal Submission',
      shortTitle: 'Proposal Submission',
      category: 'initiation',
      icon: 'post_add',
      summary: 'Submission of project proposals to request research grants from both CMU internal sources and external funding agencies.',
      objective: 'To properly submit research proposals according to university and faculty research guidelines.',
      researcherSteps: [
        { step: 1, desc: 'Study the research project operations guidelines in document "4.1 Project Operations (PI)".' },
        { step: 2, desc: 'Prepare the research proposal (Full Proposal) including researcher contribution ratios and budget under funding conditions.' },
        { step: 3, desc: 'Prepare the PI Certifying Letter using file "6. Certifying Letter (CMU).doc" or "7. Certifying Letter (Faculty).doc" (or English versions 8, 9).' },
        { step: 4, desc: 'Create a submission memo through the Department Head to route to the Faculty Research Administration.' }
      ],
      staffSteps: [
        { step: 1, desc: 'Review the proposal data, details, researcher ratios, and overhead contributions.' },
        { step: 2, desc: 'Record project details in CMU Research system to obtain a reference number (CMUMIS).' },
        { step: 3, desc: 'Record project details in the Faculty e-research database.' },
        { step: 4, desc: 'Prepare and route the proposal submission letter to CMU Office of Research Administration (ORA) or external funders.' }
      ],
      documents: [
        { name: '4.1 Project Operations (PI).pdf', type: 'pdf', status: 'Reference Guide' },
        { name: '4.2 Project Operations (Co-PI).pdf', type: 'pdf', status: 'Reference Guide' },
        { name: 'Submission Memo (submitted through Department Head)', type: 'doc', status: 'Required' },
        { name: 'Completed Full Proposal & Appendices', type: 'doc', status: 'Required' }
      ],
      systems: [
        { name: 'CMU Research System', url: 'https://research.mis.cmu.ac.th/', usage: 'Register research project details into the university database.' }
      ],
      tips: 'Proposal submission must strictly follow PI guides. Budget calculations and overhead contributions must match university regulations.',
      hasTemplate: true,
      templateType: 'proposal_memo',
      templateFields: [
        { name: 'researcherName', label: 'PI Name', type: 'text', placeholder: 'Asst. Prof. Dr. Somchai Jaidee' },
        { name: 'department', label: 'Department', type: 'text', placeholder: 'Department of Sociology and Anthropology' },
        { name: 'projectTitle', label: 'Project Title (EN)', type: 'text', placeholder: 'Social Behavior Study of Lanna Communities...' },
        { name: 'fundingSource', label: 'Funding Agency', type: 'text', placeholder: 'Thailand Science Research and Innovation (TSRI)' },
        { name: 'budget', label: 'Requested Budget (THB)', type: 'number', placeholder: '500000' }
      ]
    },
    {
      id: 2,
      number: '2',
      title: 'Procedures for Receiving Research Grant Approval',
      shortTitle: 'Grant Approval Steps',
      category: 'initiation',
      icon: 'military_tech',
      summary: 'Procedures for requesting research project approval and receiving funds after grant announcement from internal/external sources.',
      objective: 'To guide researchers in preparing documents for contracts and grant approvals after funding awards are announced.',
      researcherSteps: [
        { step: 1, desc: 'Verify the funding announcement or grant approval letter, and study guidelines in manual 4.1 or 4.2.' },
        { step: 2, desc: 'Prepare power of attorney documents: "5.1 Power of Attorney (e-sign).docx" and "5.2 Copy of Employee Card - President.docx" (if external fund).' },
        { step: 3, desc: 'Prepare the PI Certifying Letter using file "6. Certifying Letter (CMU).doc" or "7. Certifying Letter (Faculty).doc".' },
        { step: 4, desc: 'Prepare a memo requesting project execution and power of attorney (via Department Head) to the Faculty Research Office.' }
      ],
      staffSteps: [
        { step: 1, desc: 'Review the validity of the documents and proof of grant approval.' },
        { step: 2, desc: 'Verify and draft the Power of Attorney request to submit to CMU ORA.' },
        { step: 3, desc: 'Once approved, deliver the Power of Attorney to the PI to proceed with contract signing.' }
      ],
      documents: [
        { name: '4.1 Project Operations (PI).pdf', type: 'pdf', status: 'Reference Guide' },
        { name: '4.2 Project Operations (Co-PI).pdf', type: 'pdf', status: 'Reference Guide' },
        { name: '5.1 Power of Attorney (e-sign).docx', type: 'doc', status: 'Required' },
        { name: '5.2 Copy of Employee Card - President.docx', type: 'doc', status: 'Required' },
        { name: '6. Certifying Letter (CMU).doc', type: 'doc', status: 'Required (based on source)' },
        { name: '7. Certifying Letter (Faculty).doc', type: 'doc', status: 'Required (based on source)' }
      ],
      systems: [
        { name: 'CMU Research System', url: 'https://research.mis.cmu.ac.th/', usage: 'Verify approval status of submitted research proposals.' }
      ],
      tips: 'Prepare documents immediately after grant announcement to avoid delay in signing contracts.',
      hasTemplate: true,
      templateType: 'grant_approval_memo',
      templateFields: [
        { name: 'researcherName', label: 'PI Name', type: 'text', placeholder: 'Asst. Prof. Dr. Chanida Suwanprasit' },
        { name: 'department', label: 'Department', type: 'text', placeholder: 'Department of Geography' },
        { name: 'projectTitle', label: 'Project Title (EN)', type: 'text', placeholder: 'Flood Risk Assessment in Upper Northern Thailand...' },
        { name: 'fundingSource', label: 'Approved Funding Agency', type: 'text', placeholder: 'National Research Council of Thailand (NRCT)' },
        { name: 'budget', label: 'Approved Budget (THB)', type: 'number', placeholder: '1200000' }
      ]
    },
    {
      id: 3,
      number: '3',
      title: 'Requesting Power of Attorney for Research Projects',
      shortTitle: 'Requesting Power of Attorney',
      category: 'grant',
      icon: 'badge',
      summary: 'Process for requesting delegation of authority from the CMU President to allow the PI to sign contracts and execute projects with external funding agencies.',
      objective: 'To delegate authority for executing research agreements on behalf of CMU using forms 5.1 and 5.2.',
      researcherSteps: [
        { step: 1, desc: 'Verify the grant approval letter, and study guidelines in manual 4.1 or 4.2.' },
        { step: 2, desc: 'Prepare power of attorney documents: "5.1 Power of Attorney (e-sign).docx" and "5.2 Copy of Employee card.docx".' },
        { step: 3, desc: 'Prepare the PI Certifying Letter using file "6. Certifying Letter (CMU).doc" or "7. Certifying Letter (Faculty).doc" (English versions 8, 9 also available).' },
        { step: 4, desc: 'Prepare a memo requesting Power of Attorney (via Department Head) to the Faculty Research Office.' },
        { step: 5, desc: 'Submit all physical or digital files to the Faculty Research Administration Office.' }
      ],
      staffSteps: [
        { step: 1, desc: 'Verify document correctness and draft the Power of Attorney letter.' },
        { step: 2, desc: 'Propose to the Associate Dean for signature and forward the request to ORA.' },
        { step: 3, desc: 'Submit to ORA for the CMU President to sign the Power of Attorney.' },
        { step: 4, desc: 'Upon receipt, notify and deliver the signed Power of Attorney to the PI.' }
      ],
      documents: [
        { name: '5.1 Power of Attorney (e-sign).docx', type: 'doc', status: 'Required' },
        { name: '5.2 Copy of Employee Card - President.docx', type: 'doc', status: 'Required' },
        { name: '6. Certifying Letter (CMU).doc', type: 'doc', status: 'Required (based on source)' },
        { name: '7. Certifying Letter (Faculty).doc', type: 'doc', status: 'Required (based on source)' },
        { name: '8. Certifying Letter of Project Leader to CMU.docx', type: 'doc', status: 'Optional (English)' },
        { name: '9. Certifying Letter of Project Leader to Faculty.docx', type: 'doc', status: 'Optional (English)' }
      ],
      systems: [
        { name: 'CMU e-Document System', url: 'https://edoc.cmu.ac.th/', usage: 'Forward the Power of Attorney request to the central university administration.' }
      ],
      tips: 'Ensure all forms 5, 6, 7, 8, or 9 are completely filled out to prevent routing delays at ORA CMU.',
      hasTemplate: true,
      templateType: 'power_of_attorney_memo',
      templateFields: [
        { name: 'researcherName', label: 'PI Name', type: 'text', placeholder: 'Assoc. Prof. Dr. Wasan Panyagaew' },
        { name: 'department', label: 'Department', type: 'text', placeholder: 'Department of Sociology and Anthropology' },
        { name: 'projectTitle', label: 'Project Title', type: 'text', placeholder: 'Flood Risk Assessment in Upper Northern Thailand...' },
        { name: 'fundingSource', label: 'External Funder', type: 'text', placeholder: 'Geo-Informatics and Space Technology Development Agency (GISTDA)' },
        { name: 'contractPeriod', label: 'Project Period', type: 'text', placeholder: '1 Year (June 1, 2026 to May 31, 2027)' },
        { name: 'budget', label: 'Project Budget (THB)', type: 'number', placeholder: '850000' }
      ]
    },
    {
      id: 4,
      number: '4',
      title: 'Power of Attorney to Open-Close Research Accounts',
      shortTitle: 'PoA to Open-Close Bank Accounts',
      category: 'banking',
      icon: 'account_balance_wallet',
      summary: 'Requesting authorization to open a bank account in the project name (usually Krungthai Bank) and establishing authorized signatories matching university and funder rules.',
      objective: 'To authorize withdrawal conditions and list of account signatories for the research project bank account.',
      researcherSteps: [
        { step: 1, desc: 'Study guidelines in manual "4.3 Opening-Closing Research Bank Accounts.pdf".' },
        { step: 2, desc: 'Identify the authorized signatories (usually 3 persons, requires 2 out of 3 signatures to withdraw).' },
        { step: 3, desc: 'Prepare a memo requesting delegation to open the bank account, stating bank branch and signature rules.' },
        { step: 4, desc: 'Submit the memo through the Department Head to the Faculty Research Office.' },
        { step: 5, desc: 'Once the authorization letter is issued by the Faculty, the PI can sign the bank opening request.' },
        { step: 6, desc: 'Send a copy of the opened bank book to the Faculty Research Administration (notifying the opening date).' }
      ],
      staffSteps: [
        { step: 1, desc: 'Verify the document details, signatories, and conditions against manual 4.3.' },
        { step: 2, desc: 'Prepare a request memo to the CMU Vice President for Finance to sign the bank opening authorization.' },
        { step: 3, desc: 'Once authorized, deliver the document to the PI.' },
        { step: 4, desc: 'Submit the bank book copy to the Faculty Finance department.' }
      ],
      documents: [
        { name: '4.3 Opening-Closing Research Bank Accounts.pdf', type: 'pdf', status: 'Reference Guide' },
        { name: 'Request Memo to Open Research Bank Account', type: 'doc', status: 'Required' },
        { name: 'Copy of CMU bank account opening authorization', type: 'pdf', status: 'Required' }
      ],
      systems: [
        { name: 'CMU e-Document System', url: 'https://edoc.cmu.ac.th/', usage: 'Forward the bank opening request to CMU Finance Division.' }
      ],
      tips: 'Specify signatory names and withdrawal terms in detail in the memo to avoid bank rejection.',
      hasTemplate: true,
      templateType: 'open_account_memo',
      templateFields: [
        { name: 'researcherName', label: 'PI Name', type: 'text', placeholder: 'Dr. Rakdee Meepanya' },
        { name: 'department', label: 'Department', type: 'text', placeholder: 'Department of Sociology and Anthropology' },
        { name: 'projectTitle', label: 'Project Title', type: 'text', placeholder: 'Life Skills Development for Ethnic Youth...' },
        { name: 'fundingSource', label: 'External Funder', type: 'text', placeholder: 'Thailand Science Research and Innovation (TSRI)' },
        { name: 'bankBranch', label: 'Bank & Branch', type: 'text', placeholder: 'Siam Commercial Bank, CMU Branch' },
        { name: 'signatories', label: 'Authorized Signatories (and conditions)', type: 'textarea', placeholder: '1. Dr. Rakdee Meepanya (PI)\n2. Asst. Prof. Dr. Panyadee Reanroo (Co-PI)\n3. Miss Somsri Khayanying (Co-PI)\n(Conditions: Signature of PI together with either Co-PI 2 or 3, total of 2 signatures)' }
      ]
    },
    {
      id: 5,
      number: '5',
      title: 'Preparing Letters to Open-Close Research Accounts for Researchers',
      shortTitle: 'Issue Bank Opening-Closing Letters',
      category: 'banking',
      icon: 'contact_mail',
      summary: 'Preparing official Faculty letters addressed to the bank branch to facilitate account opening or closure for projects.',
      objective: 'To issue an official Faculty letter to the bank manager based on guidelines in manual 4.3.',
      researcherSteps: [
        { step: 1, desc: 'Prepare a memo requesting bank introduction letter and draft bank opening form (via Department Head).' },
        { step: 2, desc: 'Submit the memo and draft to the Research Office.' }
      ],
      staffSteps: [
        { step: 1, desc: 'Receive and verify the request, then propose it to the Finance Division.' },
        { step: 2, desc: 'Obtain the Dean\'s signature and issue the official outgoing reference number.' },
        { step: 3, desc: 'Deliver the original signed letter to the PI to bring to the bank, and record details in e-research.' }
      ],
      documents: [
        { name: '4.3 Opening-Closing Research Bank Accounts.pdf', type: 'pdf', status: 'Reference Guide' },
        { name: 'Bank Introduction Letter (signed by the Dean)', type: 'doc', status: 'Required' },
        { name: 'Copy of bank book front page (after account opening)', type: 'pdf', status: 'Required' }
      ],
      systems: [
        { name: 'Faculty e-Research Database', url: '#', usage: 'Record project profile and bank account details.' }
      ],
      tips: 'Strictly follow manual 4.3 for account closing and transfer of remaining interest to university funds.',
      hasTemplate: true,
      templateType: 'bank_letter_draft',
      templateFields: [
        { name: 'letterNo', label: 'Faculty Outgoing No.', type: 'text', placeholder: 'MH 8393(15.2)/' },
        { name: 'currentDate', label: 'Date', type: 'text', placeholder: 'May 24, 2026' },
        { name: 'researcherName', label: 'PI Name', type: 'text', placeholder: 'Asst. Prof. Dr. Nanta Panich' },
        { name: 'projectTitle', label: 'Project Title', type: 'text', placeholder: 'Creative Organic Agriculture Enterprise Upgrading...' },
        { name: 'accountName', label: 'Requested Account Name', type: 'text', placeholder: 'Organic Agriculture Upgrading Project by Asst. Prof. Dr. Nanta Panich' },
        { name: 'signatoriesList', label: 'Authorized Signatories Names', type: 'text', placeholder: 'Asst. Prof. Dr. Nanta Panich and Miss Porntip Supap' }
      ]
    },
    {
      id: 6,
      number: '6',
      title: 'Research Grant Agreement Preparation',
      shortTitle: 'Grant Agreement Preparation',
      category: 'grant',
      icon: 'description',
      summary: 'Steps for reviewing the draft grant agreement and proposing it for signing between the PI, the Faculty, and the external funder.',
      objective: 'To review scope of work, deliverables, and intellectual property terms based on CMU IP regulations.',
      researcherSteps: [
        { step: 1, desc: 'Study contract preparation guidelines in manual "4.1 Project Operations (PI)".' },
        { step: 2, desc: 'Prepare the draft agreement, proposal, and appendices.' },
        { step: 3, desc: 'Prepare a memo requesting contract signature (via Department Head).' }
      ],
      staffSteps: [
        { step: 1, desc: 'Verify contract terms, deliverables, and overhead contribution rates.' },
        { step: 2, desc: 'Propose to the Associate Dean to sign the dispatch letter and route to the university.' },
        { step: 3, desc: 'Route to CMU ORA for the President (or Vice President) to sign.' },
        { step: 4, desc: 'Notify the PI and return the executed contract copies to the PI and funding agency.' }
      ],
      documents: [
        { name: '4.1 Project Operations (PI).pdf', type: 'pdf', status: 'Reference Guide' },
        { name: 'Draft Grant Agreement (Funder Template)', type: 'doc', status: 'Required' },
        { name: 'Memo Requesting Contract Signing', type: 'doc', status: 'Required' }
      ],
      systems: [
        { name: 'CMU e-Document System', url: 'https://edoc.cmu.ac.th/', usage: 'Forward the draft contract to CMU legal team and ORA.' }
      ],
      tips: 'Examine clauses regarding intellectual property, patent rights, and overhead cuts to ensure compliance with CMU policies.',
      hasTemplate: true,
      templateType: 'contract_memo',
      templateFields: [
        { name: 'researcherName', label: 'PI Name', type: 'text', placeholder: 'Dr. Somchai Jaidee' },
        { name: 'department', label: 'Department', type: 'text', placeholder: 'Department of Sociology' },
        { name: 'projectTitle', label: 'Project Title', type: 'text', placeholder: 'Social Behavior Study of Lanna Communities...' },
        { name: 'fundingSource', label: 'Funding Agency', type: 'text', placeholder: 'National Research Council of Thailand (NRCT)' },
        { name: 'budget', label: 'Total Funder Budget (THB)', type: 'number', placeholder: '500000' }
      ]
    },
    {
      id: 7,
      number: '7',
      title: 'Outer-Source Research Installment Disbursements',
      shortTitle: 'Outer-Source Installment Claims',
      category: 'finance',
      icon: 'account_balance',
      summary: 'Procedures for requesting installment disbursements from external grants, including database updates and routing claim requests through Faculty Finance.',
      objective: 'To request approval for drawing research budget installments from external sponsors.',
      researcherSteps: [
        { step: 1, desc: 'Verify fund transfer status and execute the current phase deliverables.' },
        { step: 2, desc: 'Update project progress in the CMU Research database.' },
        { step: 3, desc: 'Prepare the disbursement request memo and financial report forms.' },
        { step: 4, desc: 'Submit the claim (via Department Head) to the Faculty Research Office.' }
      ],
      staffSteps: [
        { step: 1, desc: 'Verify the installment eligibility, progress report attachment, and database records.' },
        { step: 2, desc: 'Route the request through Faculty Finance and CMU Treasury.' },
        { step: 3, desc: 'Confirm budget transfer into the project bank account and notify the PI.' }
      ],
      documents: [
        { name: 'Disbursement Request Memo (Installment Claim)', type: 'doc', status: 'Required' },
        { name: 'Funder Progress / Financial Report', type: 'doc', status: 'Required' },
        { name: 'Copy of Project Bank Book (showing latest balance)', type: 'pdf', status: 'Required' }
      ],
      systems: [
        { name: 'CMU Research System', url: 'https://research.mis.cmu.ac.th/', usage: 'Verify and register progress milestones before claiming funds.' }
      ],
      tips: 'Ensure all milestones are registered in the CMU Research system beforehand to avoid treasury delays.',
      hasTemplate: true,
      templateType: 'disbursement_memo',
      templateFields: [
        { name: 'researcherName', label: 'PI Name', type: 'text', placeholder: 'Asst. Prof. Dr. Somchai Jaidee' },
        { name: 'department', label: 'Department', type: 'text', placeholder: 'Department of Sociology' },
        { name: 'projectTitle', label: 'Project Title', type: 'text', placeholder: 'Social Behavior Study of Lanna Communities...' },
        { name: 'installmentNo', label: 'Installment Claim Phase No.', type: 'text', placeholder: '1st Installment (50%)' },
        { name: 'amount', label: 'Claim Amount (THB)', type: 'number', placeholder: '250000' }
      ]
    },
    {
      id: 8,
      number: '8',
      title: 'Calculation and Submission of Research Fund Contributions',
      shortTitle: 'Overhead Contribution Submission',
      category: 'finance',
      icon: 'percent',
      summary: 'Deducting and submitting the institutional overhead fee (contribution) to Chiang Mai University and Faculty of Social Sciences funds from external projects.',
      objective: 'To calculate and submit overhead contributions as required by CMU research regulations.',
      researcherSteps: [
        { step: 1, desc: 'Calculate the contribution ratio based on the grant type and budget received.' },
        { step: 2, desc: 'Prepare the overhead contribution memo and payment voucher.' },
        { step: 3, desc: 'Submit the payment through Faculty Finance.' }
      ],
      staffSteps: [
        { step: 1, desc: 'Review the overhead calculation sheets against university contribution rates.' },
        { step: 2, desc: 'Issue the receipt and split funds to University and Faculty research reserves.' },
        { step: 3, desc: 'Record the contribution transaction in the project file.' }
      ],
      documents: [
        { name: 'Overhead Contribution Calculation Sheet', type: 'doc', status: 'Required' },
        { name: 'Submission Memo for Overhead Fund', type: 'doc', status: 'Required' }
      ],
      systems: [
        { name: 'Faculty Finance System', url: '#', usage: 'Record and process institutional overhead deduction.' }
      ],
      tips: 'The standard overhead contribution is 10% for general academic grants, but may vary by funding contract.',
      hasTemplate: true,
      templateType: 'contribution_memo',
      templateFields: [
        { name: 'researcherName', label: 'PI Name', type: 'text', placeholder: 'Asst. Prof. Dr. Somchai Jaidee' },
        { name: 'department', label: 'Department', type: 'text', placeholder: 'Department of Sociology' },
        { name: 'projectTitle', label: 'Project Title', type: 'text', placeholder: 'Social Behavior Study of Lanna Communities...' },
        { name: 'contributionRate', label: 'Contribution Rate (%)', type: 'text', placeholder: '10%' },
        { name: 'amount', label: 'Overhead Amount to Submit (THB)', type: 'number', placeholder: '50000' }
      ]
    },
    {
      id: 9,
      number: '9',
      title: 'Publication Rewards / Academic Incentives',
      shortTitle: 'Publication Incentives',
      category: 'finance',
      icon: 'emoji_events',
      summary: 'Applying for research rewards, publication incentives, or journal page charge support (APC) from Faculty resources.',
      objective: 'To apply for academic incentives and journal publication page charge support.',
      researcherSteps: [
        { step: 1, desc: 'Verify that the published journal is indexed in Scopus or Web of Science and check Q-ranking.' },
        { step: 2, desc: 'Prepare the application form (e.g., APC reward form).' },
        { step: 3, desc: 'Attach proof of publication, indexing, and invoice receipt.' },
        { step: 4, desc: 'Submit the application to the Faculty Research Office.' }
      ],
      staffSteps: [
        { step: 1, desc: 'Check journal index status, Q-ranking, and applicant credentials.' },
        { step: 2, desc: 'Submit the request to the Faculty Research Committee for approval.' },
        { step: 3, desc: 'Process payment through Finance once approved.' }
      ],
      documents: [
        { name: 'Journal Publication Incentive Application Form.docx', type: 'doc', status: 'Required' },
        { name: 'Proof of Journal Indexing (Scopus/SJR)', type: 'pdf', status: 'Required' },
        { name: 'Published Journal Paper (Full Text)', type: 'pdf', status: 'Required' }
      ],
      systems: [
        { name: 'Scopus Database', url: 'https://www.scopus.com/', usage: 'Verify journal index status and citation percentile.' }
      ],
      tips: 'Ensure correct author affiliation (Faculty of Social Sciences, CMU) is listed in the published paper to qualify.',
      hasTemplate: true,
      templateType: 'reward_memo',
      templateFields: [
        { name: 'researcherName', label: 'Applicant Name', type: 'text', placeholder: 'Dr. Somsak Rakchat' },
        { name: 'department', label: 'Department', type: 'text', placeholder: 'Department of Geography' },
        { name: 'paperTitle', label: 'Published Paper Title', type: 'text', placeholder: 'Urban Heat Island Effect in Chiang Mai Basin...' },
        { name: 'journalName', label: 'Journal Name', type: 'text', placeholder: 'Journal of Environmental Sciences' },
        { name: 'ranking', label: 'Journal Rank / Index (e.g. Scopus Q1)', type: 'text', placeholder: 'Scopus Q1 (SJR 0.85)' }
      ]
    },
    {
      id: 10,
      number: '10',
      title: 'Submitting Research Progress Reports',
      shortTitle: 'Progress Reports Submission',
      category: 'operation',
      icon: 'hourglass_empty',
      summary: 'Procedures for submitting progress reports and financial summaries to funding sponsors according to specified contract timelines.',
      objective: 'To track project milestones and submit required reports to sponsors on schedule.',
      researcherSteps: [
        { step: 1, desc: 'Consolidate project progress and compile the mid-term or final report.' },
        { step: 2, desc: 'Draft the progress submission memo and update status in CMU Research.' },
        { step: 3, desc: 'Submit the reports through the Department Head to the Research Office.' }
      ],
      staffSteps: [
        { step: 1, desc: 'Verify that the progress report format matches sponsor guidelines.' },
        { step: 2, desc: 'Forward the report to CMU ORA or the sponsor, and update tracking records.' }
      ],
      documents: [
        { name: 'Research Project Progress Report (Sponsor format)', type: 'doc', status: 'Required' },
        { name: 'Memo Requesting Progress Submission', type: 'doc', status: 'Required' }
      ],
      systems: [
        { name: 'CMU Research System', url: 'https://research.mis.cmu.ac.th/', usage: 'Register progress status online.' }
      ],
      tips: 'Submit reports at least 15 days before the deadline to allow administrative processing and reviews.',
      hasTemplate: true,
      templateType: 'progress_memo',
      templateFields: [
        { name: 'researcherName', label: 'PI Name', type: 'text', placeholder: 'Asst. Prof. Dr. Somchai Jaidee' },
        { name: 'department', label: 'Department', type: 'text', placeholder: 'Department of Sociology' },
        { name: 'projectTitle', label: 'Project Title', type: 'text', placeholder: 'Social Behavior Study of Lanna Communities...' },
        { name: 'reportPhase', label: 'Report Phase (e.g., 6-month progress)', type: 'text', placeholder: '6-Month Progress Report' }
      ]
    },
    {
      id: 11,
      number: '11',
      title: 'Registering and Recording Research Projects Database',
      shortTitle: 'Project Database Registration',
      category: 'initiation',
      icon: 'storage',
      summary: 'Registering new project details and uploading executed grant agreements to CMU Research and the Faculty e-research systems.',
      objective: 'To ensure all research projects are registered in both university and faculty central databases.',
      researcherSteps: [
        { step: 1, desc: 'Log in to the CMU Research system and fill out the project profile.' },
        { step: 2, desc: 'Upload the scanned copy of the signed grant agreement.' },
        { step: 3, desc: 'Submit a copy to the Faculty Research Office to double-check and register in e-research.' }
      ],
      staffSteps: [
        { step: 1, desc: 'Review the online project details against the hardcopy grant agreement.' },
        { step: 2, desc: 'Approve and register the profile in the CMU Research system.' },
        { step: 3, desc: 'Log and register details in the Faculty e-research system.' }
      ],
      documents: [
        { name: 'Executed Grant Agreement (Signed copy)', type: 'pdf', status: 'Required' },
        { name: 'Memo Requesting Database Registration', type: 'doc', status: 'Required' }
      ],
      systems: [
        { name: 'CMU Research System', url: 'https://research.mis.cmu.ac.th/', usage: 'Register and archive research profile data.' },
        { name: 'Faculty e-Research Database', url: '#', usage: 'Record project profile into local faculty records.' }
      ],
      tips: 'Ensure correct name spelling and matching numbers to prevent system sync issues.',
      hasTemplate: true,
      templateType: 'db_update_memo',
      templateFields: [
        { name: 'researcherName', label: 'PI Name', type: 'text', placeholder: 'Asst. Prof. Dr. Nanta Panich' },
        { name: 'department', label: 'Department', type: 'text', placeholder: 'Department of Geography' },
        { name: 'projectTitle', label: 'Project Title', type: 'text', placeholder: 'Creative Organic Agriculture Enterprise Upgrading...' },
        { name: 'budget', label: 'Approved Budget (THB)', type: 'number', placeholder: '600000' },
        { name: 'updateStatus', label: 'Registration Purpose', type: 'text', placeholder: 'To register new project and attach executed grant contract' }
      ]
    }
  ],
  contacts: [
    {
      name: "Mrs. Pimpa",
      role: "Head of Research Administration",
      desc: "Manages overall research administration, strategic projects, and policy development.",
      phone: "053-943528",
      email: "rais.soc.pim@gmail.com",
      avatar: "👩‍💼"
    },
    {
      name: "Miss Orn",
      role: "Research Coordinator",
      desc: "Handles proposal submissions, grant approvals, and ORA/external agency coordination.",
      phone: "053-943528",
      email: "research.soc@cmu.ac.th",
      avatar: "👩"
    },
    {
      name: "Mr. Nut",
      role: "Finance & Budget Officer",
      desc: "Manages research project disbursements, overhead calculations, and financial claims.",
      phone: "053-943528",
      email: "finance.research.soc@gmail.com",
      avatar: "👨"
    }
  ]
};

const CHAT_FLOW_EN = {
  start: {
    text: "Hello! I am 'Research Assistant SOC'. Welcome to the Faculty of Social Sciences research portal. Do you have any specific inquiries or require assistance with research administration today? (Choose a topic below to start)",
    options: [
      { text: "📂 Submit a New Research Proposal", nextStep: "init_project" },
      { text: "🏦 Handle Grant Agreements or Bank Accounts", nextStep: "contract_banking" },
      { text: "💰 Claim Research Installments or Incentives", nextStep: "finance_claims" },
      { text: "⏳ Submit Progress Reports or Other Support", nextStep: "progress_support" }
    ]
  },
  init_project: {
    text: "Great! Starting a new research project is exciting. We recommend two key steps to begin:\n\n1. **Research Project Proposal Submission** (Service 1) to get Faculty Committee approval.\n2. **Database Registration** (Service 11) to obtain a CMU research code.\n\nWhich of these would you like to inspect in detail?",
    options: [
      { text: "🔍 Submission Guidelines (Service 1)", serviceId: 1 },
      { text: "💾 Database Registration Steps (Service 11)", serviceId: 11 },
      { text: "↩️ Back to main topics", nextStep: "start" }
    ]
  },
  contract_banking: {
    text: "Congratulations on your grant award! For contract and banking procedures, we have 2 main routes. Which one do you want to inspect?",
    options: [
      { text: "📝 Request Power of Attorney & Grant Contracts", nextStep: "sub_contract" },
      { text: "🏦 Request to Open/Close a Bank Account", nextStep: "sub_banking" },
      { text: "↩️ Back to main topics", nextStep: "start" }
    ]
  },
  sub_contract: {
    text: "For contract execution, we guide you through 3 steps:\n\n1. **Grant Approval steps** (Service 2) for initial procedures after announcement.\n2. **Requesting Power of Attorney** (Service 3) to sign on behalf of CMU President.\n3. **Grant Agreement Preparation** (Service 6) for final draft review.\n\nWhich one would you like to open?",
    options: [
      { text: "🎖️ Grant Approval steps (Service 2)", serviceId: 2 },
      { text: "🛡️ Requesting Power of Attorney (Service 3)", serviceId: 3 },
      { text: "📜 Agreement Preparation (Service 6)", serviceId: 6 },
      { text: "↩️ Go back a step", nextStep: "contract_banking" }
    ]
  },
  sub_banking: {
    text: "For banking, we guide you through 2 steps:\n\n1. **PoA to Open/Close Accounts** (Service 4) to authorize conditions.\n2. **Issue Bank Opening/Closing Letters** (Service 5) to generate intro letters.\n\nWhich one would you like to inspect?",
    options: [
      { text: "🏦 PoA for opening bank accounts (Service 4)", serviceId: 4 },
      { text: "✉️ Issue Bank Letters (Service 5)", serviceId: 5 },
      { text: "↩️ Go back a step", nextStep: "contract_banking" }
    ]
  },
  finance_claims: {
    text: "Finance and budgets are crucial! Choose the path that matches your current status:",
    options: [
      { text: "💵 Claim budget installments from external sponsor", nextStep: "sub_disburse" },
      { text: "🏆 Claim academic rewards or publication incentive (APC)", nextStep: "sub_award" },
      { text: "↩️ Back to main topics", nextStep: "start" }
    ]
  },
  sub_disburse: {
    text: "For external claims, 2 main services are related:\n\n1. **Outer-Source Installment Claims** (Service 7) to draft budget requests.\n2. **Overhead Contribution Submission** (Service 8) to calculate overhead cuts.\n\nWhich guide would you like to open?",
    options: [
      { text: "💰 Installment Claims Guide (Service 7)", serviceId: 7 },
      { text: "📊 Overhead Submission Guide (Service 8)", serviceId: 8 },
      { text: "↩️ Go back a step", nextStep: "finance_claims" }
    ]
  },
  sub_award: {
    text: "The Publication Incentives (Service 9) details applying for journal page charge support (APC) and academic rewards.\n\nWould you like to open this guide?",
    options: [
      { text: "📄 Open Publication Incentives Guide (Service 9)", serviceId: 9 },
      { text: "↩️ Go back a step", nextStep: "finance_claims" }
    ]
  },
  progress_support: {
    text: "Managing deliverables and strategic researcher status are our key services. Choose your concern:",
    options: [
      { text: "⏳ Submit progress report according to contract schedule", serviceId: 10 },
      { text: "↩️ Back to main topics", nextStep: "start" }
    ]
  }
};

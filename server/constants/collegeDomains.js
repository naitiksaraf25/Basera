/**
 * Comprehensive Indian Higher Education Institutional Email Allowlist
 * Covers:
 * - All 23 Indian Institutes of Technology (IITs)
 * - All 21 Indian Institutes of Management (IIMs)
 * - All 31 National Institutes of Technology (NITs) & IIEST
 * - Top Indian Institutes of Information Technology (IIITs)
 * - Leading Central & State Universities
 * - Premier Private Universities & Autonomous Colleges
 * - Leading Medical, Law, Design & Architecture Institutes
 * - Global Benchmark Institutions
 */

export const COLLEGE_ALLOWLIST = [
  // ==========================================
  // 1. ALL 23 IITs (Indian Institutes of Technology)
  // ==========================================
  "iitb.ac.in",        // IIT Bombay
  "iitd.ac.in",        // IIT Delhi
  "iitm.ac.in",        // IIT Madras
  "iitk.ac.in",        // IIT Kanpur
  "iitkgp.ac.in",      // IIT Kharagpur
  "iitr.ac.in",        // IIT Roorkee
  "iitg.ac.in",        // IIT Guwahati
  "iith.ac.in",        // IIT Hyderabad
  "iitbhu.ac.in",      // IIT (BHU) Varanasi
  "iitism.ac.in",      // IIT (ISM) Dhanbad
  "iiti.ac.in",        // IIT Indore
  "iitgn.ac.in",       // IIT Gandhinagar
  "iitrpr.ac.in",      // IIT Ropar
  "iitbbs.ac.in",      // IIT Bhubaneswar
  "iitp.ac.in",        // IIT Patna
  "iitj.ac.in",        // IIT Jodhpur
  "iitmandi.ac.in",    // IIT Mandi
  "iitpkd.ac.in",      // IIT Palakkad
  "iittp.ac.in",       // IIT Tirupati
  "iitjammu.ac.in",    // IIT Jammu
  "iitdh.ac.in",       // IIT Dharwad
  "iitgoa.ac.in",      // IIT Goa
  "iitbhilai.ac.in",   // IIT Bhilai
  "iit.ac.in",         // Generic IIT parent domain

  // ==========================================
  // 2. ALL 21 IIMs (Indian Institutes of Management)
  // ==========================================
  "iima.ac.in",        // IIM Ahmedabad
  "iimb.ac.in",        // IIM Bangalore
  "iimc.ac.in",        // IIM Calcutta
  "iimcal.ac.in",      // IIM Calcutta alternate
  "iiml.ac.in",        // IIM Lucknow
  "iimi.ac.in",        // IIM Indore
  "iimk.ac.in",        // IIM Kozhikode
  "iimshillong.ac.in", // IIM Shillong
  "iimrohtak.ac.in",   // IIM Rohtak
  "iimraipur.ac.in",   // IIM Raipur
  "iimranchi.ac.in",   // IIM Ranchi
  "iimtrichy.ac.in",   // IIM Tiruchirappalli
  "iimkashipur.ac.in", // IIM Kashipur
  "iimudaipur.ac.in",  // IIM Udaipur
  "iimnagpur.ac.in",   // IIM Nagpur
  "iimvisakhapatnam.ac.in", // IIM Visakhapatnam
  "iimbg.ac.in",       // IIM Bodh Gaya
  "iimasr.ac.in",      // IIM Amritsar
  "iimsambalpur.ac.in",// IIM Sambalpur
  "iimsirmaur.ac.in",  // IIM Sirmaur
  "iimjammu.ac.in",    // IIM Jammu

  // ==========================================
  // 3. ALL 31 NITs & IIEST Shibpur
  // ==========================================
  "nitt.edu",          // NIT Trichy
  "nitk.ac.in",        // NIT Surathkal
  "nitk.edu.in",       // NIT Surathkal alternate
  "nitw.ac.in",        // NIT Warangal
  "vnit.ac.in",        // VNIT Nagpur
  "mnit.ac.in",        // MNIT Jaipur
  "mnnit.ac.in",       // MNNIT Allahabad
  "manit.ac.in",       // MANIT Bhopal
  "nitc.ac.in",        // NIT Calicut
  "nitrkl.ac.in",      // NIT Rourkela
  "nits.ac.in",        // NIT Silchar
  "nitdgp.ac.in",      // NIT Durgapur
  "nitj.ac.in",        // NIT Jalandhar
  "nitjsr.ac.in",      // NIT Jamshedpur
  "nitkkr.ac.in",      // NIT Kurukshetra
  "nitp.ac.in",        // NIT Patna
  "nitrr.ac.in",       // NIT Raipur
  "nith.ac.in",        // NIT Hamirpur
  "nitsri.ac.in",      // NIT Srinagar
  "nitgoa.ac.in",      // NIT Goa
  "nitdelhi.ac.in",    // NIT Delhi
  "nitpy.ac.in",       // NIT Puducherry
  "nituk.ac.in",       // NIT Uttarakhand
  "nitm.ac.in",        // NIT Meghalaya
  "nitmanipur.ac.in",  // NIT Manipur
  "nitmizoram.ac.in",  // NIT Mizoram
  "nitnagaland.ac.in", // NIT Nagaland
  "nitsikkim.ac.in",   // NIT Sikkim
  "nitap.ac.in",       // NIT Arunachal Pradesh
  "nita.ac.in",        // NIT Agartala
  "nitandhra.ac.in",   // NIT Andhra Pradesh
  "iiests.ac.in",      // IIEST Shibpur

  // ==========================================
  // 4. IIITs & Premier National Research Institutes
  // ==========================================
  "iiit.ac.in",        // IIIT Hyderabad
  "iiitd.ac.in",       // IIIT Delhi
  "iiitb.ac.in",       // IIIT Bangalore
  "iiita.ac.in",       // IIIT Allahabad
  "iiitdm.ac.in",      // IIITDM Jabalpur / Kancheepuram
  "iiitm.ac.in",       // ABV-IIITM Gwalior
  "iiitg.ac.in",       // IIIT Guwahati
  "iiitk.ac.in",       // IIIT Kota
  "iiitvadodara.ac.in",// IIIT Vadodara
  "iiitl.ac.in",       // IIIT Lucknow
  "iiitp.ac.in",       // IIIT Pune
  "iiitn.ac.in",       // IIIT Nagpur
  "iiits.ac.in",       // IIIT Sri City
  "iiitkottayam.ac.in",// IIIT Kottayam
  "isical.ac.in",      // Indian Statistical Institute Kolkata
  "isibang.ac.in",     // ISI Bangalore
  "isid.ac.in",        // ISI Delhi
  "isi.ac.in",         // ISI Generic
  "tifr.res.in",       // Tata Institute of Fundamental Research
  "cmi.ac.in",         // Chennai Mathematical Institute
  "iisc.ac.in",        // Indian Institute of Science Bangalore
  "iisermohali.ac.in", // IISER Mohali
  "iiserpune.ac.in",   // IISER Pune
  "iiserkol.ac.in",    // IISER Kolkata
  "iiserb.ac.in",      // IISER Bhopal
  "iisertvm.ac.in",    // IISER Thiruvananthapuram
  "iisertpr.ac.in",    // IISER Tirupati
  "iiserbpr.ac.in",    // IISER Berhampur

  // ==========================================
  // 5. Major Central & State Universities
  // ==========================================
  "du.ac.in",          // Delhi University
  "jnu.ac.in",         // Jawaharlal Nehru University
  "bhu.ac.in",         // Banaras Hindu University
  "amu.ac.in",         // Aligarh Muslim University
  "jmi.ac.in",         // Jamia Millia Islamia
  "uohyd.ac.in",       // University of Hyderabad
  "mu.ac.in",          // University of Mumbai
  "unipune.ac.in",     // Savitribai Phule Pune University
  "caluniv.ac.in",     // University of Calcutta
  "jadavpuruniversity.in", // Jadavpur University
  "annauniv.edu",      // Anna University Chennai
  "osmania.ac.in",     // Osmania University Hyderabad
  "allduniv.ac.in",    // University of Allahabad
  "uniraj.ac.in",      // University of Rajasthan
  "gujaratuniversity.ac.in", // Gujarat University
  "pu.ac.in",          // Panjab University Chandigarh
  "gndu.ac.in",        // Guru Nanak Dev University
  "mdu.ac.in",         // Maharshi Dayanand University
  "cusat.ac.in",       // Cochin University of Science & Tech
  "klyuniv.ac.in",     // Kalyani University
  "gauhati.ac.in",     // Gauhati University
  "tezu.ernet.in",     // Tezpur University
  "visva-bharati.ac.in", // Visva-Bharati Santiniketan
  "bbau.ac.in",        // Babasaheb Bhimrao Ambedkar University

  // ==========================================
  // 6. Top Private & Deemed Universities
  // ==========================================
  "bits-pilani.ac.in", // BITS Pilani (Pilani, Goa, Hyderabad)
  "vit.ac.in",         // VIT Vellore / Chennai / AP / Bhopal
  "vitstudent.ac.in",  // VIT Student domain
  "manipal.edu",       // Manipal Academy of Higher Education (MAHE)
  "learner.manipal.edu",// Manipal student domain
  "christuniversity.in",// Christ University Bengaluru
  "siu.edu.in",        // Symbiosis International University
  "amity.edu",         // Amity University
  "srmist.edu.in",     // SRM Institute of Science & Technology
  "thapar.edu",        // Thapar Institute of Eng & Tech
  "ashoka.edu.in",     // Ashoka University
  "snu.edu.in",        // Shiv Nadar University
  "flame.edu.in",      // FLAME University Pune
  "krea.edu.in",       // Krea University
  "plaksha.edu.in",    // Plaksha University
  "bennett.edu.in",    // Bennett University
  "jgu.edu.in",        // O.P. Jindal Global University
  "upes.ac.in",        // UPES Dehradun
  "nmims.edu",         // NMIMS Mumbai
  "spjimr.org",        // SPJIMR Mumbai
  "xlri.ac.in",        // XLRI Jamshedpur / Delhi
  "mdi.ac.in",         // MDI Gurgaon
  "fms.edu",           // FMS Delhi
  "tiss.edu",          // Tata Institute of Social Sciences
  "daiict.ac.in",      // DA-IICT Gandhinagar
  "da-iict.ac.in",     // DA-IICT alternate
  "nirmauni.ac.in",    // Nirma University Ahmedabad
  "pes.edu",           // PES University Bengaluru
  "rvce.edu.in",       // RV College of Engineering Bengaluru
  "msrit.edu",         // Ramaiah Institute of Technology
  "bmsce.ac.in",       // BMS College of Engineering
  "coep.org.in",       // COEP Tech University Pune
  "coep.ac.in",        // COEP Tech alternate
  "vjti.ac.in",        // VJTI Mumbai
  "ictmumbai.edu.in",  // ICT Mumbai
  "dtu.ac.in",         // Delhi Technological University
  "dce.edu",           // DTU / DCE alternate
  "nsut.ac.in",        // Netaji Subhas University of Tech
  "igdtuw.ac.in",      // IGDTUW Delhi
  "chitkara.edu.in",   // Chitkara University
  "lpu.in",            // Lovely Professional University
  "sharda.ac.in",      // Sharda University
  "galgotiasuniversity.edu.in", // Galgotias University
  "kiit.ac.in",        // KIIT Bhubaneswar
  "soa.ac.in",         // Siksha 'O' Anusandhan
  "sathyabama.ac.in",  // Sathyabama University Chennai
  "sau.int",           // South Asian University Delhi
  "pdpu.ac.in",        // Pandit Deendayal Energy University
  "pau.edu",           // Punjab Agricultural University
  "gbpuat.ac.in",      // Pantnagar University

  // ==========================================
  // 7. Premier Law, Medical, Design & Specialized
  // ==========================================
  "aiims.edu",         // AIIMS New Delhi
  "pgimer.edu.in",     // PGIMER Chandigarh
  "cmcvellore.ac.in",  // CMC Vellore
  "jipmer.edu.in",     // JIPMER Puducherry
  "nls.ac.in",         // NLSIU Bengaluru
  "nludelhi.ac.in",    // NLU Delhi
  "nalsar.ac.in",      // NALSAR Hyderabad
  "nujs.edu",          // WBNUJS Kolkata
  "nliu.ac.in",        // NLIU Bhopal
  "gnlu.ac.in",        // GNLU Gandhinagar
  "nid.edu",           // National Institute of Design
  "nift.ac.in",        // National Institute of Fashion Technology
  "spa.ac.in",         // School of Planning and Architecture
  "cept.ac.in",        // CEPT University Ahmedabad

  // ==========================================
  // 8. International Benchmark Universities
  // ==========================================
  "stanford.edu",
  "mit.edu",
  "harvard.edu",
  "berkeley.edu",
  "nyu.edu",
  "columbia.edu",
  "cmu.edu",
  "ox.ac.uk",
  "cam.ac.uk",
  "nus.edu.sg",
  "ntu.edu.sg",
  "college.edu",
  "university.edu"
];

// Domains that are strictly personal / commercial and should never be auto-verified
const PUBLIC_CONSUMER_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.in",
  "yahoo.in",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "zoho.com",
  "mail.com",
  "gmx.com",
  "yandex.com",
  "rediffmail.com",
  "inbox.com",
  "fastmail.com",
  "tempmail.com",
  "guerrillamail.com",
  "10minutemail.com"
]);

/**
 * Checks if a domain matches the static allowlist or institutional TLD pattern.
 * @param {string} domainInput
 * @returns {{ isAllowed: boolean, matchedDomain?: string, matchType: 'exact'|'subdomain'|'pattern'|null }}
 */
export function checkStaticCollegeAllowlist(domainInput) {
  if (!domainInput || typeof domainInput !== "string") {
    return { isAllowed: false, matchType: null };
  }

  const domain = domainInput.trim().toLowerCase();

  // Exclude consumer public email domains
  if (PUBLIC_CONSUMER_EMAIL_DOMAINS.has(domain)) {
    return { isAllowed: false, matchType: null };
  }

  // 1. Direct or Subdomain match against static list
  for (const allowed of COLLEGE_ALLOWLIST) {
    if (domain === allowed) {
      return { isAllowed: true, matchedDomain: allowed, matchType: "exact" };
    }
    if (domain.endsWith("." + allowed)) {
      return { isAllowed: true, matchedDomain: allowed, matchType: "subdomain" };
    }
  }

  // 2. High-confidence Indian Academic / Educational TLD patterns (.ac.in, .edu.in)
  // Ensure it has at least 3 parts (e.g. xyz.ac.in or abc.edu.in)
  if (domain.endsWith(".ac.in") || domain.endsWith(".edu.in") || domain.endsWith(".res.in")) {
    const parts = domain.split(".");
    if (parts.length >= 3 && parts[parts.length - 3].length >= 2) {
      return { isAllowed: true, matchedDomain: domain, matchType: "pattern" };
    }
  }

  return { isAllowed: false, matchType: null };
}

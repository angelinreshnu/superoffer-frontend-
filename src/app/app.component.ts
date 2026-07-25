import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Role = 'student' | 'university' | 'loan' | 'consultant' | 'admin';
type EducationLevel = 'school' | 'college' | '';

interface RoleConfig {
  label: string;
  user: string;
  org: string;
  nav: { label: string; icon: string }[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './profile-centre.css', './corporate-theme.css', './offer-workspace.css', './large-type.css', './font-reduction.css', './student-shell.css', './font-boost-30.css', './onboarding-typography.css', './university-portal.css']
})
export class AppComponent {
  @ViewChild('messageThread') messageThread?: ElementRef<HTMLDivElement>;
  readonly roleOptions: Role[] = ['student', 'university', 'loan', 'consultant', 'admin'];
  role: Role = 'university';
  active = 'Dashboard';
  showLogin = true;
  loginRole: 'university' | 'student' = 'university';
  loginEmail = 'maya.chen@northbridge.edu';
  loginPassword = 'password123';
  sidebarOpen = false;
  educationLevel: EducationLevel = '';
  profileStep = 0;
  profileSubmitted = false;
  profileEditMode = false;
  profileMenuOpen = false;
  profilePhoto = '';
  profileViewSection = 0;
  selectedInterests = ['Computer Science', 'Data & AI'];
  uploadedDocuments: Record<string, boolean> = {
    'Class 10 certificate & marksheet': true,
    'Official academic transcripts': true,
    'Entrance exam score reports': true
  };
  showRoleMenu = false;
  showStudentMenu = false;
  showOffer = false;
  showNotifications = false;
  showSearchFilters = false;
  toast = '';
  inboxFilter = 'All';
  offerView: 'offers' | 'compare' = 'offers';
  offerFilter: 'all' | 'accepted' | 'rejected' | 'shortlisted' = 'all';
  search = '';
  chatMessage = '';
  institutionTyping = false;
  emailNotifications = true;
  offerNotifications = true;
  showCandidateProfile = false;
  showUniversityOfferComposer = false;
  selectedStudentIndex = 0;
  universitySettingsView: 'organization' | 'team' | 'billing' | 'notifications' | 'security' = 'organization';
  programView: 'catalog' | 'criteria' | 'templates' = 'catalog';
  universityInvitationFilter = 'All';

  readonly configs: Record<Role, RoleConfig> = {
    student: {
      label: 'Student', user: 'Aarav Mehta', org: 'Profile in progress',
      nav: [
        { label: 'Dashboard', icon: '⌂' },
        { label: 'Offers', icon: '✉' }
      ]
    },
    university: {
      label: 'University Officer', user: 'Maya Chen', org: 'Northbridge University',
      nav: [
        { label: 'Dashboard', icon: '⌂' }, { label: 'Search Students', icon: '⌕' },
        { label: 'Shortlists', icon: '☆' }, { label: 'Programs & Offers', icon: '▤' },
        { label: 'Invitations', icon: '✉' },
        { label: 'Reports', icon: '↗' }, { label: 'Org Settings', icon: '⚙' }
      ]
    },
    loan: {
      label: 'Loan Officer', user: 'Rohan Kapoor', org: 'EduFund Capital',
      nav: [
        { label: 'Dashboard', icon: '⌂' }, { label: 'Search Students', icon: '⌕' },
        { label: 'Eligibility Review', icon: '✓' }, { label: 'Invitations', icon: '✉' },
        { label: 'Reports', icon: '↗' }, { label: 'Org Settings', icon: '⚙' }
      ]
    },
    consultant: {
      label: 'Study Abroad Consultant', user: 'Zoya Nair', org: 'GlobalPath Consulting',
      nav: [
        { label: 'Dashboard', icon: '⌂' }, { label: 'Search Students', icon: '⌕' },
        { label: 'Invitations', icon: '✉' }, { label: 'Active Clients', icon: '♙' },
        { label: 'Reports', icon: '↗' }, { label: 'Org Settings', icon: '⚙' }
      ]
    },
    admin: {
      label: 'Super Admin', user: 'Priya Sharma', org: 'SuperOffer Platform',
      nav: [
        { label: 'Dashboard', icon: '⌂' }, { label: 'Users', icon: '♙' },
        { label: 'Universities', icon: '▥' }, { label: 'Loan Providers', icon: '◫' },
        { label: 'Consultants', icon: '◉' }, { label: 'AI Matching Config', icon: '✦' },
        { label: 'Subscriptions', icon: '◇' }, { label: 'Reports', icon: '↗' },
        { label: 'Platform Settings', icon: '⚙' }, { label: 'Audit Log', icon: '≡' }
      ]
    }
  };

  offers = [
    { type: 'University', brand: 'NB', logo: '/logos/northbridge.png', institution: 'Northbridge University', repName: 'Maya Chen', repTitle: 'Senior Admissions Officer', title: 'MSc Data Science · Fall 2027', highlight: '40% scholarship', detail: 'CAD 19,800 tuition after award', score: 94, status: 'New', days: 8, color: 'violet', facts: [{ label: 'Campus', value: 'Toronto, Canada' }, { label: 'Duration', value: '24 months' }, { label: 'Application fee', value: 'Fully waived' }, { label: 'Seat deposit', value: 'CAD 1,500' }], requirements: ['Accept before the offer deadline', 'Upload final degree transcript', 'Maintain minimum 3.2 GPA'] },
    { type: 'University', brand: 'WU', logo: '/logos/westford.png', institution: 'Westford University', repName: 'Oliver Grant', repTitle: 'International Admissions Manager', title: 'MSc Artificial Intelligence · Fall 2027', highlight: '30% scholarship', detail: 'GBP 18,200 tuition after award', score: 91, status: 'New', days: 11, color: 'orange', facts: [{ label: 'Campus', value: 'Manchester, UK' }, { label: 'Duration', value: '12 months' }, { label: 'Application fee', value: 'GBP 75' }, { label: 'Seat deposit', value: 'GBP 2,000' }], requirements: ['Confirm enrolment online', 'Submit official IELTS report', 'Provide final completion certificate'] },
    { type: 'University', brand: 'LU', logo: '/logos/lakeview.png', institution: 'Lakeview University', repName: 'Emma Wilson', repTitle: 'Graduate Programme Adviser', title: 'MSc Computer Science · Fall 2027', highlight: 'CAD 8,000 award', detail: 'CAD 22,400 tuition after award', score: 88, status: 'Negotiating', days: 5, color: 'mint', facts: [{ label: 'Campus', value: 'Vancouver, Canada' }, { label: 'Duration', value: '20 months' }, { label: 'Application fee', value: 'Waived' }, { label: 'Seat deposit', value: 'CAD 1,200' }], requirements: ['Respond to revised award', 'Upload consolidated transcript', 'Complete faculty interview'] },
    { type: 'Education Loan', brand: 'EF', logo: '/logos/edufund.png', institution: 'EduFund Capital', repName: 'Rohan Kapoor', repTitle: 'Senior Education Loan Officer', title: 'Global Education Loan', highlight: '₹32 lakh approved', detail: '9.2% indicative rate · 12-year tenure', score: 92, status: 'New', days: 14, color: 'mint', facts: [{ label: 'Processing fee', value: '0.75% + GST' }, { label: 'Moratorium', value: 'Course + 12 months' }, { label: 'Collateral', value: 'Not required' }, { label: 'Disbursement', value: 'Direct to university' }], requirements: ['Complete co-applicant KYC', 'Upload admission letter', 'Verify income documents'] },
    { type: 'Education Loan', brand: 'LF', logo: '/logos/learnfund.png', institution: 'LearnFund Finance', repName: 'Ananya Rao', repTitle: 'Student Finance Specialist', title: 'Study Abroad Flexi Loan', highlight: '₹25 lakh approved', detail: '9.6% indicative rate · no prepayment fee', score: 86, status: 'New', days: 10, color: 'orange', facts: [{ label: 'Processing fee', value: '₹12,500 + GST' }, { label: 'Moratorium', value: 'Course + 6 months' }, { label: 'Collateral', value: 'Not required' }, { label: 'Disbursement', value: 'Semester-wise' }], requirements: ['Confirm requested loan amount', 'Submit co-applicant bank statements', 'Complete video verification'] }
  ];
  selectedOffer = this.offers[0];
  offerMessages: Record<string, { from: 'student' | 'institution'; text: string; time: string }[]> = {
    'Northbridge University': [
      { from: 'institution', text: 'Hello Aarav, congratulations! Your profile is an excellent fit for our MSc Data Science programme.', time: '10:12 AM' },
      { from: 'student', text: 'Thank you. Could you clarify whether the scholarship continues for the full programme?', time: '10:18 AM' },
      { from: 'institution', text: 'Yes. The 40% award applies to both academic years, subject to maintaining good academic standing.', time: '10:24 AM' }
    ]
  };

  students = [
    { initials: 'AM', name: 'Aarav Mehta', course: 'MSc Data Science', country: 'Canada', intake: 'Fall 2027', score: 94, completion: 92, detail: 'IELTS 8.0 · GPA 8.8/10', accent: '#7357dc' },
    { initials: 'SK', name: 'Sara Khan', course: 'MSc Computer Science', country: 'Canada', intake: 'Fall 2027', score: 91, completion: 88, detail: 'IELTS 7.5 · GPA 3.7/4', accent: '#e78c66' },
    { initials: 'RV', name: 'Riya Verma', course: 'MBA Analytics', country: 'UK', intake: 'Spring 2027', score: 87, completion: 95, detail: 'GMAT 710 · GPA 8.4/10', accent: '#20a47b' }
  ];
  universityPrograms = [
    { name: 'MSc Data Science', level: 'Postgraduate', intake: 'Fall 2027', campus: 'Toronto', seats: 42, applicants: 186, status: 'Active' },
    { name: 'MSc Artificial Intelligence', level: 'Postgraduate', intake: 'Fall 2027', campus: 'Toronto', seats: 28, applicants: 121, status: 'Active' },
    { name: 'BSc Computer Science', level: 'Undergraduate', intake: 'Fall 2027', campus: 'Vancouver', seats: 70, applicants: 294, status: 'Active' }
  ];
  universityInvitations = [
    { student: 'Aarav Mehta', program: 'MSc Data Science', value: '40% scholarship', score: 94, status: 'Viewed', sent: '2 days ago', expires: '12 days' },
    { student: 'Sara Khan', program: 'MSc Computer Science', value: '25% scholarship', score: 91, status: 'Negotiating', sent: '4 days ago', expires: '10 days' },
    { student: 'Riya Verma', program: 'MBA Analytics', value: 'Fast-track admission', score: 87, status: 'Accepted', sent: '6 days ago', expires: '—' },
    { student: 'Dev Patel', program: 'MSc Data Science', value: 'Fee waiver', score: 89, status: 'Sent', sent: 'Yesterday', expires: '13 days' }
  ];

  get selectedStudent() { return this.students[this.selectedStudentIndex]; }
  get filteredUniversityInvitations() {
    return this.universityInvitationFilter === 'All'
      ? this.universityInvitations
      : this.universityInvitations.filter(item => item.status === this.universityInvitationFilter);
  }

  get cfg(): RoleConfig { return this.configs[this.role]; }
  get isInstitution(): boolean { return ['university', 'loan', 'consultant'].includes(this.role); }
  get universityOffers() { return this.offers.filter(offer => offer.type === 'University'); }
  get filteredOffers() {
    if (this.offerFilter === 'all') return this.offers;
    const status = this.offerFilter[0].toUpperCase() + this.offerFilter.slice(1);
    return this.offers.filter(offer => offer.status === status);
  }
  get acceptedOfferCount() { return this.offers.filter(offer => offer.status === 'Accepted').length; }
  get rejectedOfferCount() { return this.offers.filter(offer => offer.status === 'Rejected').length; }
  get shortlistedOfferCount() { return this.offers.filter(offer => offer.status === 'Shortlisted').length; }
  get currentOfferMessages() { return this.offerMessages[this.selectedOffer.institution] || []; }
  get profileProgress(): number {
    if (this.profileSubmitted) return 100;
    return this.educationLevel ? Math.max(12, Math.round((this.profileStep / 8) * 100)) : 0;
  }
  get uploadedDocumentCount(): number {
    return this.requiredDocuments.filter(document => this.uploadedDocuments[document]).length;
  }
  get missingDocumentCount(): number {
    return this.requiredDocuments.length - this.uploadedDocumentCount;
  }
  get profileView(): typeof this.profileViews[number] { return this.profileViews[this.profileViewSection]; }
  get profileCompletion(): number { return Math.round(((8 + this.uploadedDocumentCount) / (10 + this.requiredDocuments.length)) * 100); }
  get documentUpdateCount(): number { return 1; }

  readonly profileSections = [
    { title: 'Education level', subtitle: 'Tell us where you are in your academic journey', icon: '🎓' },
    { title: 'Personal information', subtitle: 'Your identity and contact details', icon: '◎' },
    { title: 'Academic information', subtitle: 'Add your complete education history', icon: '▤' },
    { title: 'Study preferences', subtitle: 'Define where and what you want to study', icon: '⌖' },
    { title: 'Entrance exam scores', subtitle: 'Add language and aptitude test results', icon: '✦' },
    { title: 'Achievements', subtitle: 'Show universities what makes you stand out', icon: '★' },
    { title: 'Financial preferences', subtitle: 'Set your budget, scholarship and loan needs', icon: '₹' },
    { title: 'Documents', subtitle: 'Upload the records universities need to assess you', icon: '⇧' },
    { title: 'Review & submit', subtitle: 'Confirm your profile and become discoverable', icon: '✓' }
  ];
  readonly profileViews = [
    { label: 'My story', icon: '◎' }, { label: 'Academics', icon: '🎓' },
    { label: 'Study goals', icon: '⌖' }, { label: 'Highlights', icon: '✦' },
    { label: 'Documents', icon: '▤' }, { label: 'Account', icon: '⚙' }
  ];

  readonly requiredDocuments = [
    'Class 10 certificate & marksheet', 'Class 12 certificate & marksheet',
    'Passport / government ID', 'Official academic transcripts',
    'Entrance exam score reports', 'Statement of Purpose (SOP)',
    'Letters of Recommendation', 'CV / résumé'
  ];
  readonly streamInterests = [
    'Computer Science', 'Data & AI', 'Engineering', 'Business & Management',
    'Medicine & Health', 'Law', 'Arts & Design', 'Social Sciences',
    'Natural Sciences', 'Finance & Economics'
  ];
  readonly leaderboard = [
    { rank: 1, name: 'Sara Khan', detail: 'Computer Science · Fall 2027', score: 98, initials: 'SK' },
    { rank: 2, name: 'Dev Patel', detail: 'Data Science · Fall 2027', score: 96, initials: 'DP' },
    { rank: 3, name: 'Aarav Mehta', detail: 'Data & AI · Fall 2027', score: 94, initials: 'AM', me: true },
    { rank: 4, name: 'Riya Verma', detail: 'Business Analytics · Spring 2027', score: 92, initials: 'RV' },
    { rank: 5, name: 'Kabir Shah', detail: 'Engineering · Fall 2027', score: 90, initials: 'KS' }
  ];

  selectRole(role: Role): void {
    this.role = role;
    this.active = role === 'student' ? 'Offers' : 'Dashboard';
    this.showRoleMenu = false;
    this.notify(`Switched to ${this.configs[role].label} view`);
  }

  selectLoginRole(role: 'university' | 'student'): void {
    this.loginRole = role;
    this.loginEmail = role === 'university' ? 'maya.chen@northbridge.edu' : 'aarav.mehta@email.com';
  }

  signIn(): void {
    this.role = this.loginRole;
    this.active = this.loginRole === 'university' ? 'Dashboard' : 'Offers';
    this.showLogin = false;
    this.notify(this.loginRole === 'university' ? 'Welcome to Northbridge University' : 'Welcome back, Aarav');
  }

  logout(): void {
    this.showStudentMenu = false;
    this.showLogin = true;
  }

  navigate(label: string): void {
    this.active = label;
    this.showStudentMenu = false;
    if (label !== 'Profile') this.profileEditMode = false;
    if (label === 'Offers' || label === 'University Offers' || label === 'Inbox') this.offerView = 'offers';
    this.showOffer = false;
    this.showNotifications = false;
  }

  notify(message: string): void {
    this.toast = message;
    setTimeout(() => { if (this.toast === message) this.toast = ''; }, 2800);
  }

  action(message: string): void {
    this.showOffer = false;
    this.notify(message);
  }

  openCandidate(index: number): void {
    this.selectedStudentIndex = index;
    this.showCandidateProfile = true;
  }

  composeUniversityOffer(index = this.selectedStudentIndex): void {
    this.selectedStudentIndex = index;
    this.showCandidateProfile = false;
    this.showUniversityOfferComposer = true;
  }

  sendUniversityOffer(): void {
    this.showUniversityOfferComposer = false;
    this.notify(`Invitation sent to ${this.selectedStudent.name}`);
  }

  selectOffer(offer: typeof this.offers[number]): void {
    this.selectedOffer = offer;
    this.institutionTyping = false;
    if (!this.offerMessages[offer.institution]) {
      this.offerMessages[offer.institution] = [
        { from: 'institution', text: `Hello Aarav, we’re pleased to share this ${offer.type.toLowerCase()} offer with you. Ask us anything about the terms.`, time: 'Today' }
      ];
    }
    this.scrollChatToBottom();
  }

  sendOfferMessage(): void {
    const text = this.chatMessage.trim();
    if (!text) return;
    if (!this.offerMessages[this.selectedOffer.institution]) this.offerMessages[this.selectedOffer.institution] = [];
    const institution = this.selectedOffer.institution;
    this.offerMessages[institution] = [
      ...(this.offerMessages[institution] || []),
      { from: 'student', text, time: 'Just now' }
    ];
    this.chatMessage = '';
    this.institutionTyping = true;
    this.notify('Message sent');
    this.scrollChatToBottom();
    setTimeout(() => {
      this.offerMessages[institution] = [
        ...(this.offerMessages[institution] || []),
        {
          from: 'institution',
          text: 'Thank you for your message. Our offer team has received it and will clarify the terms with you here.',
          time: 'Just now'
        }
      ];
      if (this.selectedOffer.institution === institution) this.institutionTyping = false;
      this.scrollChatToBottom();
    }, 900);
  }

  private scrollChatToBottom(): void {
    setTimeout(() => {
      const thread = this.messageThread?.nativeElement;
      if (thread) thread.scrollTop = thread.scrollHeight;
    });
  }

  acceptSelectedOffer(): void {
    this.selectedOffer.status = 'Accepted';
    this.notify(`${this.selectedOffer.institution} offer accepted`);
  }

  rejectSelectedOffer(): void {
    this.selectedOffer.status = 'Rejected';
    this.notify(`${this.selectedOffer.institution} offer rejected`);
  }

  shortlistSelectedOffer(): void {
    this.selectedOffer.status = 'Shortlisted';
    this.notify(`${this.selectedOffer.institution} added to shortlist`);
  }

  setOfferFilter(filter: 'all' | 'accepted' | 'rejected' | 'shortlisted'): void {
    this.offerFilter = filter;
    const firstOffer = this.filteredOffers[0];
    if (firstOffer) this.selectOffer(firstOffer);
  }

  chooseEducation(level: EducationLevel): void {
    this.educationLevel = level;
    this.profileStep = 1;
    this.notify(level === 'school' ? 'School student (UG) journey selected' : 'College student (PG) journey selected');
  }

  nextProfileStep(): void {
    if (!this.educationLevel) {
      this.notify('Choose your education level to continue');
      return;
    }
    this.profileStep = Math.min(8, this.profileStep + 1);
  }

  previousProfileStep(): void { this.profileStep = Math.max(0, this.profileStep - 1); }

  uploadDocument(name: string): void {
    this.uploadedDocuments[name] = true;
    this.notify(`${name} added`);
  }

  editProfileSection(step: number): void {
    this.profileStep = step;
    this.profileEditMode = true;
    this.profileMenuOpen = false;
  }

  selectProfileStep(step: number): void {
    this.profileStep = step;
    this.profileMenuOpen = false;
  }

  setProfileView(index: number): void {
    this.profileViewSection = Math.max(0, Math.min(this.profileViews.length - 1, index));
  }


  saveProfileChanges(): void {
    this.profileEditMode = false;
    this.notify('Profile changes saved');
  }

  toggleInterest(interest: string): void {
    this.selectedInterests = this.selectedInterests.includes(interest)
      ? this.selectedInterests.filter(item => item !== interest)
      : [...this.selectedInterests, interest];
  }

  uploadPhoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.notify('Please choose a JPG, PNG or WebP image');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePhoto = String(reader.result);
      this.notify('Profile photo updated');
    };
    reader.readAsDataURL(file);
  }

  submitProfile(): void {
    this.profileSubmitted = true;
    this.profileEditMode = false;
    this.configs.student.org = this.educationLevel === 'school' ? 'UG applicant · Fall 2027' : 'PG applicant · Fall 2027';
    this.notify('Profile submitted — your student dashboard is now unlocked');
    this.active = 'Offers';
  }
}

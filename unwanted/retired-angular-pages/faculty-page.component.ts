import { Component } from '@angular/core';
import { PortalLandingComponent, PortalContent } from '../../shared/portal-landing.component';

@Component({ selector: 'app-faculty-page', standalone: true, imports: [PortalLandingComponent], template: '<app-portal-landing [content]="content" />' })
export class FacultyPageComponent {
  content: PortalContent = {
    key:'faculty', eyebrow:'A focused academic workspace', title:'Teach, assess, and support students from one organised portal.',
    intro:'The Faculty workspace brings everyday academic responsibilities into a calm, accessible dashboard connected to the university ecosystem.',
    primary:'Register as faculty', secondary:'Explore faculty tools',
    stats:[{value:'One',label:'course workspace'},{value:'Live',label:'attendance visibility'},{value:'Clear',label:'grading workflow'}],
    featuresTitle:'Spend less time managing tools and more time teaching.',
    features:[
      {icon:'▤',title:'Course management',text:'Organise course information, modules, resources, and teaching schedules.'},
      {icon:'✓',title:'Attendance',text:'Record and review attendance with clear course and student-level summaries.'},
      {icon:'◇',title:'Assignments',text:'Publish assignments, deadlines, supporting material, and submission guidance.'},
      {icon:'A+',title:'Student grading',text:'Manage assessment scores and provide consistent, constructive feedback.'},
      {icon:'!',title:'Notices',text:'Share important academic announcements with the right student groups.'},
      {icon:'▥',title:'Dashboard preview',text:'See upcoming classes, pending grading, attendance, and recent notices at a glance.'}
    ],
    process:['Create a faculty account with your official email','Provide university and department information','Confirm your institutional association','Enter the faculty workspace'],
    requirements:['Full name and official email','University and department','Faculty or employee identifier','Primary subject area'],
    faqs:[
      {q:'Is Faculty the same as University Admissions?',a:'No. Faculty supports academic delivery such as courses and grading. University Admissions manages discovery, shortlists, and admission offers.'},
      {q:'Can faculty see every student on SuperOffer?',a:'No. Faculty access is limited to their assigned academic context and does not inherit marketplace-wide student search permissions.'},
      {q:'Will attendance and grading be built now?',a:'This module establishes registration, login, navigation, and the portal entry. Detailed academic workflows are the next implementation stage.'}
    ]
  };
}

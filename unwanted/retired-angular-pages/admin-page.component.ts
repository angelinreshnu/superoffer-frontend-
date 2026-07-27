import { Component } from '@angular/core';
import { PortalLandingComponent, PortalContent } from '../../shared/portal-landing.component';

@Component({ selector: 'app-admin-page', standalone: true, imports: [PortalLandingComponent], template: '<app-portal-landing [content]="content" />' })
export class AdminPageComponent {
  content: PortalContent = {
    key:'admin', eyebrow:'Internal platform operations', title:'Keep the SuperOffer marketplace trusted, secure, and healthy.',
    intro:'A protected workspace for authorised Super Admins to verify organisations, monitor platform activity, manage users, configure rules, and review audit evidence.',
    primary:'Secure admin login', secondary:'View responsibilities',
    stats:[{value:'MFA',label:'required for admin access'},{value:'100%',label:'write actions audited'},{value:'Live',label:'platform monitoring'}],
    featuresTitle:'Operational control with accountability built in.',
    features:[
      {icon:'▥',title:'Platform analytics',text:'Monitor active users, invitation volume, acceptance funnels, subscriptions, and marketplace health.'},
      {icon:'✓',title:'University approvals',text:'Review accreditation and business evidence, then approve or reject with a documented reason.'},
      {icon:'◎',title:'User management',text:'Support, suspend, reinstate, and moderate accounts using role-scoped controls.'},
      {icon:'↗',title:'Reports',text:'Export platform-wide funnel, revenue, verification, and matching effectiveness reports.'},
      {icon:'⚙',title:'System settings',text:'Configure thresholds, expiry rules, quotas, notifications, and matching weights.'},
      {icon:'⬡',title:'Security monitoring',text:'Review authentication health, flagged activity, and an append-only audit trail.'}
    ],
    process:['Sign in with a provisioned Super Admin account','Complete required multi-factor authentication','Review verification and platform health queues','Perform audited administration actions'],
    faqs:[
      {q:'Can someone register as an Admin?',a:'No. Super Admin is an internal role provisioned only by another authorised Super Admin.'},
      {q:'Are admin actions tracked?',a:'Yes. Every write action is recorded with the actor, timestamp, and before-and-after state.'},
      {q:'What happens when a university is rejected?',a:'A rejection reason is mandatory. The organisation is notified and may correct its evidence before resubmitting.'}
    ]
  };
}

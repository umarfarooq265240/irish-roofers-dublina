import type { LegalPage } from "../types";

const D = "2026-11-18";

// TODO(client): these are plain-language drafts, not legal advice. Have a solicitor review them,
// and add the registered company name and number if the business is a company.
export const legalPages: LegalPage[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How Irish Roofers Dublin collects and uses the details you send us.",
    updated: D,
    body: [
      { type: "p", text: "This policy explains what personal information Irish Roofers Dublin collects through this website and what we do with it." },
      { type: "h2", text: "What we collect" },
      { type: "p", text: "Only what you choose to send us: your name, phone number, email address, Eircode and a description of the job. The enquiry form on this website opens a pre-filled email or a phone call on your own device. It does not send your details to any server." },
      { type: "h2", text: "How we use it" },
      { type: "p", text: "We use your details to reply to your enquiry, arrange an inspection and give you a quote. We do not sell your details and we do not use them for unrelated marketing." },
      { type: "h2", text: "How long we keep it" },
      { type: "p", text: "We keep enquiry details for as long as needed to deal with your enquiry and any guarantee that follows, and then delete them." },
      { type: "h2", text: "Your rights" },
      { type: "p", text: "Under the GDPR you can ask to see, correct or delete the personal information we hold about you, and you can complain to the Data Protection Commission (dataprotection.ie). Contact us on 086 050 8558 to make a request." },
      { type: "h2", text: "Cookies" },
      { type: "p", text: "See our Cookie Policy for the cookies this website uses." },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description: "Which cookies and similar storage the Irish Roofers Dublin website uses.",
    updated: D,
    body: [
      { type: "p", text: "This website keeps cookie use to a minimum. Strictly necessary storage keeps the site working and remembers your cookie choice. Analytics and marketing cookies only load if you allow them." },
      { type: "h2", text: "Strictly necessary" },
      { type: "p", text: "We store your cookie choice in your browser's local storage so we do not ask you again. This cannot be switched off." },
      { type: "h2", text: "Analytics" },
      { type: "p", text: "No analytics tools are set up on this site at the moment. If we add one, it will only load if you accept analytics cookies." },
      { type: "h2", text: "Marketing" },
      { type: "p", text: "No marketing or advertising cookies are set up on this site at the moment." },
      { type: "h2", text: "Changing your choice" },
      { type: "p", text: "Use the Cookie Settings link in the footer at any time to review or change your choice." },
      { type: "h2", text: "Third-party content" },
      { type: "p", text: "Pages with an embedded Google Map may load content from Google when you view them. See Google's own privacy information for details." },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    description: "The terms that apply to quotes and work carried out by Irish Roofers Dublin.",
    updated: D,
    body: [
      { type: "p", text: "These terms summarise how we work. Your written quote may include extra details for your job." },
      { type: "h2", text: "Quotes" },
      { type: "p", text: "Quotes are free and given after an inspection. A written quote sets out the work, the materials and the price. Guide prices on this website are guides only and are not a quote." },
      { type: "h2", text: "Guarantee" },
      { type: "p", text: "Work carried out by us carries a 10-year guarantee against defects in our workmanship. The guarantee does not cover storm damage, damage caused by others, or normal wear to parts of the roof we did not work on." },
      { type: "h2", text: "Payment" },
      { type: "p", text: "Payment terms are agreed before work starts and written on your quote." },
      { type: "h2", text: "Changes and extra work" },
      { type: "p", text: "If we find hidden defects once work starts, we will tell you, explain the options and agree any change in price before carrying on." },
      { type: "h2", text: "Complaints" },
      { type: "p", text: "If something is not right, call us on 086 050 8558 and we will come back to put it right." },
    ],
  },
  {
    slug: "accessibility-statement",
    title: "Accessibility Statement",
    description: "How accessible the Irish Roofers Dublin website is and how to tell us about a problem.",
    updated: D,
    body: [
      { type: "p", text: "We want everyone to be able to use this website." },
      { type: "h2", text: "What we do" },
      { type: "ticks", items: [
        { text: "Pages use headings, landmarks and a skip link so they can be used with a keyboard and screen reader." },
        { text: "Images have text descriptions." },
        { text: "Animations respect your device's reduced-motion setting." },
        { text: "Text is resizable and contrast is designed to meet WCAG 2.1 AA, though we have not had a formal audit." },
      ] },
      { type: "h2", text: "Tell us about a problem" },
      { type: "p", text: "If you find something hard to use, call us on 086 050 8558 and we will help another way and fix the problem." },
    ],
  },
];

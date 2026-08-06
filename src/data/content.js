export const navItems = [
  ['Solutions', '#solutions'],
  ['Warranty', '#warranty'],
  ['Quality Process', '#quality'],
  ['Industries', '#industries'],
  // ['Reviews', '#reviews'],
  ['FAQs', '#faq'],
]
import budgetImage from "../assets/optimize-procurement-budgets.jpg";
import performanceImage from "../assets/guaranteed-device-performance.jpg";
import warrantyImage from "../assets/enterprise-warranty-support.jpg";

export const aboutCards = [
  {
    image: budgetImage,
    title: "Optimize Procurement Budgets",
    text: "Cut hardware acquisition costs significantly without overspending on brand-new machines.",
  },
  {
    image: performanceImage,
    title: "Guaranteed Device Performance",
    text: "Every unit undergoes rigorous, multi-point functional and hardware testing. Get full visibility into device conditions and inspection reports.",
  },
  {
    image: warrantyImage,
    title: "Enterprise Warranty Support",
    text: "Risk-free procurement backed by warranty coverage and structured post-purchase assistance.",
  },
];


import itCompanies from "../assets/it-companies.jpg";
import education from "../assets/education.jpg";
import sharedServices from "../assets/bpo.jpg";
import Startups from "../assets/startups.jpg";
import Manufacturing from "../assets/manufacturing.jpg";
import Government from "../assets/government.jpg";


export const industries = [
  {
    title: 'IT Companies',
    description: 'Employee onboarding, developers, project teams, support operations and remote work.',
    image: itCompanies,
  },
  {
    title: 'Education',
    description: 'Computer labs, teachers, administration, digital learning and training programs.',
    image: education,

  },
  {
    title: 'BPO & Shared Services',
    description: 'High-volume laptop and desktop deployment for operational teams.',
    image: sharedServices,

  },
  {
    title: 'Startups',
    description: 'Flexible device procurement for growing teams without heavy upfront investment.',
    image: Startups,

  },
  {
    title: 'Manufacturing',
    description: 'Plant offices, field teams, supervisors, quality teams and back-office functions.',
    image: Manufacturing,
  },
  {
    title: 'Government & NGOs',
    description: 'Budget-conscious procurement for offices, institutions, programs and field projects.',
    image: Government,

  },
];

export const configs = [
  { tier: 'Essential', title: 'Routine Office Work', processor: 'Intel Core i3', spec: '8GB RAM · SSD storage', points: ['Emails and documentation', 'Browser-based business tools', 'Budget-friendly deployment'] },
  { tier: 'Professional', title: 'Everyday Business Workloads', processor: 'Intel Core i5', spec: '8GB / 16GB RAM · 256GB+ SSD', points: ['Business productivity', 'Multi-tasking and collaboration', 'Most teams and departments'], featured: true },
  { tier: 'High Performance', title: 'Technical Workloads', processor: 'Intel Core i7', spec: '16GB RAM · 512GB SSD', points: ['Demanding productivity', 'Technical and analytical use', 'Power-user requirements'] },
]

export const reviews = [
  { text: 'The laptops were delivered on time and worked well for our employee deployment. The team also helped us coordinate consistent configurations and delivery.', name: 'Business Customer', role: 'Employee deployment project' },
  { text: 'XtraCover helped us source laptops for a new team while keeping the project within budget and simplifying the procurement process.', name: 'Corporate IT Team', role: 'Bulk device procurement' },
  { text: 'The structured quotation and device options made it easier to align specifications across departments and plan the rollout.', name: 'Procurement Team', role: 'Multi-team deployment' },
]

export const faqs = [
  ['Do refurbished laptops come with a warranty? ', 'Yes. Every eligible device includes warranty coverage. The exact period, inclusions, exclusions and support process will be stated in the quotation and applicable warranty terms. '],
  ['Can businesses order laptops in bulk? ', 'Yes. XtraCover Business supports bulk and repeat procurement requirements for startups, enterprises, institutions and other organisations. '],
  ['Can laptop configurations be standardised? ', 'Yes, subject to available inventory. Share the required processor, RAM, storage, preferred brand, model generation and intended application. '],
  ['Do you provide QC reports? ', 'Each eligible device can be supported by a QC certificate containing relevant device information and test results. '],
  ['Can devices be delivered to multiple locations? ', 'Multi-location delivery requirements can be discussed with the business team. Delivery is subject to location serviceability, quantity and commercial terms. '],
  ['Can you recommend laptops based on employee roles? ', 'Yes. Share the applications, workloads and usage requirements for each team. Suitable configurations can be recommended based on budget and availability. '],
  ['How can a business raise a warranty request? ', 'A warranty request can be raised with the support team by sharing the device details, order information and reported issue. The request will be assessed according to the applicable warranty terms.'],
]


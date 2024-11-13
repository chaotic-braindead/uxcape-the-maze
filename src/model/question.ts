export interface Question {
  question: string;
  choices: string[];
  answer: number;
}

export const questions: Question[] = [
  {
    question: 'What does "UI stand for in design"?',
    choices: ['User Interface', 'User Interaction', 'Universal Interface'],
    answer: 0,
  },
  {
    question: 'Which color is often associated with error messages?',
    choices: ['Green', 'Red', 'Blue'],
    answer: 1,
  },
  {
    question: 'What is the primary focus of UX design?',
    choices: ['Visual Aesthetics', 'Data Analysis', 'User Experience'],
    answer: 2,
  },
  {
    question: 'Which tool is commonly used for creating wireframes?',
    choices: ['Figma', 'Adobe Photoshop', 'Canva'],
    answer: 0,
  },
  {
    question: 'What does "wireframe" refer to UI/UX design?',
    choices: [
      'A source code for design',
      'A basic layout of a design',
      'A structure or foundation of a frame',
    ],
    answer: 1,
  },
  {
    question: 'What does "responsive design" ensure?',
    choices: [
      'The user experience is memorable',
      'The website responds quickly at a user interaction',
      'The design adapts to different screen sizes',
    ],
    answer: 2,
  },
  {
    question: 'What does "usability" refer to in UX?',
    choices: [
      'The ease of use of a product',
      "The product's ability to stand out",
      'The scalability of a product',
    ],
    answer: 0,
  },
  {
    question: 'What is the purpose of a "prototype"?',
    choices: [
      "To analyze a competitor's product",
      'To simulate and test an idea',
      'To finalize the product',
    ],
    answer: 1,
  },
  {
    question: 'What does "heuristic evaluation" involve?',
    choices: [
      "Testing a product's loading speed",
      'Conducting user interviews',
      'Evaluating design against usability principles',
    ],
    answer: 2,
  },
  {
    question: 'What is "A/B Testing" used for in UI/UX?',
    choices: [
      'Comparing two design options',
      'Choosing color palettes',
      'Testing code to mimic wireframe',
    ],
    answer: 0,
  },
  {
    question:
      'Which method involves drawing a visual diagram of user thoughts?',
    choices: ['Content Auditing', 'Mind Mapping', 'Persona Building'],
    answer: 1,
  },
  {
    question: 'What is a "pain point" in UX?',
    choices: [
      'A peak in user traffic allowed',
      'The point of maximum user engagement in a site',
      'A point that invokes negative emotions to the user',
    ],
    answer: 2,
  },
  {
    question:
      'Which of these methods is used to organize and prioritize design feedback?',
    choices: ['Affinity Diagramming', 'A/B Testing', 'Competitive Analysis'],
    answer: 0,
  },
  {
    question: 'What does the "80/20 Rule" suggest in UX design?',
    choices: [
      '80% of the design light colors; 20% accent color',
      '80% of users will only use 20% of features',
      '80% of the cost comes from 20% of design time',
    ],
    answer: 1,
  },
  {
    question: 'What does "responsive typography" mean?',
    choices: [
      'Text adjusts size based on screen size',
      'Text changes font type based on user preference',
      'Text changes color when clicked',
    ],
    answer: 0,
  },
  {
    question: 'What is a "mood board" used for in design?',
    choices: [
      'Organizing user feedback',
      'Establishing a color scheme and visual style',
      'Creating a structural layout based on the mood',
    ],
    answer: 1,
  },
  {
    question: 'What is the primary goal of "accessibility" in design?',
    choices: [
      'Attract a specific demographic',
      'Increase product loading speed',
      'Ensure usability for all users, including those with disabilities',
    ],
    answer: 2,
  },
  {
    question:
      'Which design principle states "content that is grouped together is perceived as related"?',
    choices: ['Proximity', 'Harmony', 'Consistency'],
    answer: 0,
  },
  {
    question: 'What does the term "conversion rate" refer to in UX?',
    choices: [
      'Percentage of time users spend on a page',
      'Percentage of users completing a desired action',
      'Percentage of how frequent the UI changes',
    ],
    answer: 1,
  },
  {
    question: 'What is a "sitemap" in UX design?',
    choices: [
      "A map for a user's geo-location",
      'A roadmap of features to be implemented',
      "A visual representation of a site's structure",
    ],
    answer: 2,
  },
];

export const contact = {
  phone: '+91 90144 28518', phoneHref: '+919014428518', whatsapp: '919014428518',
  email: 'tattvamindlabs2k@gmail.com',
  address: 'Plot No. 70, Venkatramana Colony, Nagole, Hyderabad, Telangana, India',
};

export type Practice = {
  slug: string; name: string; group: 'Energy & rituals' | 'Inner exploration' | 'Body & lifestyle';
  icon: string; intro: string; description: string; focus: string[];
};

export const practices: Practice[] = [
  {slug:'reiki-healing',name:'Reiki Healing',group:'Energy & rituals',icon:'hands',intro:'A gentle energy-based practice with space for stillness and personal reflection.',description:'Explore Reiki within Tattva’s holistic approach to wellbeing. The practice is offered as a complementary, personal experience rooted in the Reiki tradition. Begin with a conversation about your interests and what you would like to explore.',focus:['Stillness and relaxation','Personal wellbeing intentions','An introduction to energy practices']},
  {slug:'crystal-healing',name:'Crystal Healing',group:'Energy & rituals',icon:'gem',intro:'Explore crystals, intention and personal ritual through an experiential lens.',description:'Discover crystal practices as a way to engage with intention, symbolism and quiet reflection. Tattva approaches these experiences through traditional energy frameworks and personal exploration, with an emphasis on individual meaning.',focus:['Intention and reflection','Crystal-based rituals','Exploring personal meaning']},
  {slug:'candle-healing',name:'Candle Healing',group:'Energy & rituals',icon:'flame',intro:'Candle-based rituals that invite a pause, an intention and a moment of awareness.',description:'Explore the role of light, intention and ritual in a personal wellbeing practice. Candle Healing at Tattva is a complementary spiritual offering. Ask the team about the format and the guidance provided before participating.',focus:['Personal rituals','Intention setting','Quiet, attentive reflection']},
  {slug:'past-life-regression',name:'Past Life Regression',group:'Inner exploration',icon:'compass',intro:'A guided space to explore inner narratives and the questions you bring with you.',description:'Past Life Regression is offered within a spiritual and experiential framework. Sessions invite subjective reflection on inner imagery and personal narratives. These experiences should not be treated as verified historical memories or a substitute for psychological therapy.',focus:['Inner narratives and imagery','Personal questions and meaning','Guided self-exploration']},
  {slug:'inner-child-womb-regression',name:'Inner-Child Healing & Womb Regression',group:'Inner exploration',icon:'heart',intro:'An opportunity to approach your inner experiences with curiosity and care.',description:'Explore personal stories, emotions and patterns in a guided, reflective setting. Inner-child and womb-regression experiences are offered as complementary practices for self-exploration. The team can explain the approach and discuss whether it aligns with your interests.',focus:['Self-reflection','Personal stories and emotions','A compassionate relationship with yourself']},
  {slug:'ice-bath-experiences',name:'Ice Bath Experiences',group:'Body & lifestyle',icon:'snow',intro:'Explore a body-focused experience with preparation and an individual suitability conversation.',description:'Tattva’s ice bath experiences introduce a different way of engaging with body awareness. Ask the team about the format, preparation, supervision and suitability before deciding to participate.',focus:['Body awareness','Preparation and suitability','Experiential wellbeing']},
  {slug:'yoga',name:'Yoga',group:'Body & lifestyle',icon:'flower',intro:'Reconnect with your body through a practice of movement, attention and presence.',description:'Explore yoga as part of a holistic relationship with your body and everyday life. Tattva brings movement and self-awareness into its wellbeing approach. Ask about the available session formats and how to begin.',focus:['Mindful movement','Body awareness','A personal practice']},
  {slug:'breathwork',name:'Breathwork',group:'Body & lifestyle',icon:'wind',intro:'Make space to notice your breath and explore a more attentive rhythm.',description:'Breathwork offers a focused opportunity to explore breath and awareness. Discuss the available practices, your experience and any suitability considerations with the team before choosing a session.',focus:['Breath awareness','Presence and attention','An experiential introduction']},
  {slug:'diet-lifestyle',name:'Diet & Lifestyle Wellbeing',group:'Body & lifestyle',icon:'leaf',intro:'Reflect on the everyday choices that shape your relationship with wellbeing.',description:'Explore diet and lifestyle-oriented wellbeing support through the lens of daily habits and personal goals. This is a starting point for a conversation about the kind of support available and the choices you want to understand more deeply.',focus:['Everyday habits','Lifestyle reflection','Personal wellbeing goals']},
  {slug:'colour-therapy',name:'Colour Therapy',group:'Energy & rituals',icon:'sun',intro:'An experiential exploration of colour, personal associations and mindful awareness.',description:'Discover colour-based practices as part of Tattva’s complementary wellbeing offerings. Explore how colour can become a focus for personal reflection, intention and creative self-exploration.',focus:['Colour and personal meaning','Mindful awareness','Reflective experiences']},
  {slug:'neuro-linguistic-programming',name:'Neuro-Linguistic Programming',group:'Inner exploration',icon:'brain',intro:'Explore language, personal patterns and new perspectives on everyday experience.',description:'Tattva includes Neuro-Linguistic Programming within its personal-development offerings. Enquire about the approach, session format and the areas of self-exploration available. Each conversation begins with understanding your interests.',focus:['Language and perspective','Personal patterns','Self-awareness']},
];

export const groups = [
  {name:'Energy & rituals',eyebrow:'Connect with your inner world',description:'Reiki, crystals, candles and colour. Explore intentional practices that make room for stillness.',icon:'gem'},
  {name:'Inner exploration',eyebrow:'Understand yourself more deeply',description:'A reflective space for personal narratives, emotional awareness and new perspectives.',icon:'compass'},
  {name:'Body & lifestyle',eyebrow:'Bring awareness into daily life',description:'Yoga, breathwork, ice bath experiences, and diet and lifestyle-oriented wellbeing.',icon:'flower'},
] as const;

export const solutions = [
  {name:'Everyday stress',icon:'activity'}, {name:'Emotional wellbeing',icon:'heart'},
  {name:'Self-awareness',icon:'brain'}, {name:'Rest & relaxation',icon:'moon'},
  {name:'Relationships',icon:'users'}, {name:'Inner-child work',icon:'flower'},
  {name:'Energy & balance',icon:'sun'}, {name:'Mindful movement',icon:'wind'},
  {name:'Lifestyle & habits',icon:'leaf'},
];

export const interviews = [
  {id:'fzv9hIs_T9o',title:'Candle practices & the energy of home',category:'Rituals & reflection',source:'ManamTV Hyderabad Health',image:'interview-candles',description:'Dr Archana shares her spiritual perspectives on candle practices, intention and the home environment.'},
  {id:'MTLHPN_kEYg',title:'Small habits. A more mindful life.',category:'Personal growth',source:'QubeTV Health',image:'interview-habits',description:'A conversation about making time for reflection and building consistent everyday habits.'},
  {id:'fPwC2nDXNJ0',title:'Crystals, chakras & visualisation',category:'Energy practices',source:'Kiran TV Life',image:'interview-crystals',description:'An introduction to Dr Archana’s perspectives on crystals, spiritual traditions and intention.'},
];

export const faqs = [
  {q:'Where should I begin?',a:'You can explore our practices or start with a conversation. Share what interests you, and the team will explain the available options and help you choose a next step.'},
  {q:'What is ANTARAA?',a:'ANTARAA is Tattva Mindlabs’ signature inner-transformation workshop. Its launch is planned for 20 December. You can express interest to receive details about the format, schedule and participation.'},
  {q:'Are these practices a replacement for therapy?',a:'No. Tattva’s holistic practices are complementary experiences for self-exploration and personal wellbeing. They do not replace psychological therapy, diagnosis or medical care.'},
  {q:'Are sessions online or in person?',a:'Please share your preferred format when you enquire. The team will confirm which options are available for your chosen practice or workshop.'},
  {q:'How are appointments confirmed?',a:'Prepare your enquiry and send it through WhatsApp or email. The team will respond with availability, fees and next steps. Your appointment is confirmed only after you receive their confirmation.'},
];

export function enquiryLink(interest: string, type = 'consultation') {
  return `/contact/?type=${encodeURIComponent(type)}&interest=${encodeURIComponent(interest)}#enquiry`;
}

export const complementaryNote = 'Our holistic practices support self-exploration and personal wellbeing. They complement, and do not replace, psychological therapy or medical care.';

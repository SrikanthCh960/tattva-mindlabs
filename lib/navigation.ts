export type MenuFeature = {title: string; detail: string; href: string; image: string; position?: string};
type MenuBase = {id: string; label: string; href: string};
export type MenuGroup = MenuBase & ({kind: 'dropdown'; intro: string; links: {label: string; href: string}[]; features: MenuFeature[]; note?: string} | {kind: 'link'});

export const menuGroups: MenuGroup[] = [
  {kind:'dropdown',id:'about',label:'About Us',href:'/about/',intro:'Meet the people and purpose behind a more conscious way of living.',
    links:[{label:'Our philosophy',href:'/about/'},{label:'Meet Archana',href:'/about/#archana'},{label:'Awards & recognitions',href:'/#recognitions'},{label:'Volunteering',href:'/volunteering/'},{label:'Connect with us',href:'/contact/'}],
    features:[
      {title:'Meet Archana Nanduri',detail:'The person behind Tattva',href:'/about/#archana',image:'/media/archana-portrait.webp',position:'center 28%'},
      {title:'A journey within',detail:'Mind · Body · Energy · Soul',href:'/about/',image:'/media/archana-riverside.webp',position:'center top'},
      {title:'Be part of the community',detail:'Share your time and skills',href:'/volunteering/',image:'/media/volunteering-seva-640.webp'},
    ]},
  {kind:'dropdown',id:'services',label:'Services',href:'/services/',intro:'Find a practice that resonates with where you are today.',
    links:[{label:'All 11 practices',href:'/services/'},{label:'Energy & rituals',href:'/services/#energy'},{label:'Inner exploration',href:'/services/#exploration'},{label:'Body & lifestyle',href:'/services/#body'},{label:'Help me choose',href:'/contact/?type=consultation#enquiry'}],
    features:[
      {title:'Energy & stillness',detail:'Explore Reiki Healing',href:'/services/reiki-healing/',image:'/media/practices/reiki-healing-960.webp'},
      {title:'A little inner care',detail:'Inner-child exploration',href:'/services/inner-child-womb-regression/',image:'/media/practices/inner-child-womb-regression-960.webp'},
      {title:'Movement & presence',detail:'Discover yoga',href:'/services/yoga/',image:'/media/practices/yoga-960.webp'},
    ]},
  {kind:'dropdown',id:'programmes',label:'Programmes',href:'/programs/',intro:'Make room for reflection, experience and meaningful inner change.',
    links:[{label:'Explore programmes',href:'/programs/'},{label:'Discover ANTARAA',href:'/programs/antaraa/'},{label:'Express your interest',href:'/contact/?type=antaraa&interest=ANTARAA#enquiry'},{label:'Workshop enquiries',href:'/contact/?type=programme#enquiry'}],
    features:[
      {title:'ANTARAA',detail:'Our signature inner-transformation programmes',href:'/programs/antaraa/',image:'/media/archana-hero-sharp.webp',position:'center 8%'},
      {title:'A practice of awareness',detail:'Explore individual wellbeing practices',href:'/services/',image:'/media/practices/breathwork-960.webp'},
      {title:'Start a conversation',detail:'Find your next step with the team',href:'/contact/?type=programme#enquiry',image:'/media/practices/neuro-linguistic-programming-960.webp'},
    ]},
  {kind:'link',id:'explore',label:'Explore',href:'/explore/'},
  {kind:'dropdown',id:'products',label:'Products',href:'/products/',intro:'Thoughtful offerings for the personal rituals you return to.',
    links:[{label:'Explore the collection',href:'/products/'},{label:'Artisanal Bath Salts',href:'/products/#bath-salts'},{label:'Divine Vibrance',href:'/products/#divine-vibrance'},{label:'Product enquiries',href:'/contact/?type=product#enquiry'}],
    features:[
      {title:'Artisanal Bath Salts',detail:'A moment for your bath ritual',href:'/products/#bath-salts',image:'/media/bath-salts-editorial-640.webp'},
      {title:'Divine Vibrance',detail:'Handmade multipurpose powder',href:'/products/#divine-vibrance',image:'/media/divine-vibrance-editorial-640.webp'},
    ],note:'Illustrative ritual imagery. Ask us about product details and availability.'},
  {kind:'link',id:'contact',label:'Contact Us',href:'/contact/'},
];

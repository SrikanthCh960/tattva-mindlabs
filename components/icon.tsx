import { Activity, Brain, Compass, Flame, Flower2, Gem, HandHeart, Heart, Leaf, Moon, Snowflake, Sun, Users, Wind } from 'lucide-react';
const icons = {activity:Activity,brain:Brain,compass:Compass,flame:Flame,flower:Flower2,gem:Gem,hands:HandHeart,heart:Heart,leaf:Leaf,moon:Moon,snow:Snowflake,sun:Sun,users:Users,wind:Wind};
export function Icon({name,size=28,className=''}:{name:string;size?:number;className?:string}) { const Component=icons[name as keyof typeof icons]||Flower2;return <Component size={size} strokeWidth={1.35} className={className} aria-hidden="true"/>; }

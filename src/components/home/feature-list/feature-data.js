import { BrainCircuit, HeartPulseIcon, LeafIcon, ShieldCheck, Sparkles, Target } from 'lucide-react'
import img1 from '../../../assets/details1.jpg'
import img2 from '../../../assets/details2.jpg'
import img3 from '../../../assets/details3.jpg'
import img4 from '../../../assets/details4.jpg'
import img5 from '../../../assets/details5.jpg'

export const featureSteps = [
  {
    title: 'Set gentle goals',
    desc: 'Choose the outcomes that matter most right now, from managing stress to building steadier daily routines.',
    image: img1,
    icon: Target,
    color: 'from-[#0a2e12]/80 to-[#1a5c2a]/60',
    accent: '#3bab35',
  },
  {
    title: 'Create a personal profile',
    desc: 'Build a more accurate support journey with preferences, wellbeing context, and emotional check-in patterns.',
    image: img2,
    icon: ShieldCheck,
    color: 'from-[#0f2e1a]/80 to-[#1e6b32]/60',
    accent: '#5ccf58',
  },
  {
    title: 'Complete a guided assessment',
    desc: 'Answer thoughtful questions that help the platform understand your needs without making the process feel overwhelming.',
    image: img3,
    icon: BrainCircuit,
    color: 'from-[#0a2b2e]/80 to-[#0f5c5a]/60',
    accent: '#1faba5',
  },
  {
    title: 'Connect with expert support',
    desc: 'Reach the right counselor or therapist with less friction and more confidence.',
    image: img4,
    icon: HeartPulseIcon,
    color: 'from-[#1e1a0a]/80 to-[#5c4f0f]/60',
    accent: '#ab8e1f',
  },
  {
    title: 'Receive intelligent insights',
    desc: 'Use AI-assisted recommendations to discover next steps, routines, and support pathways with more clarity.',
    image: img5,
    icon: Sparkles,
    color: 'from-[#1a0a2e]/80 to-[#3d1a6b]/60',
    accent: '#9b59d6',
  },
]

export const supportPillars = [
  {
    title: 'Health and fitness',
    description: 'Build sustainable routines that protect energy, focus, and resilience.',
    icon: HeartPulseIcon,
  },
  {
    title: 'Healthy diet',
    description: 'Nourishment guidance that supports mood, recovery, and everyday wellbeing.',
    icon: LeafIcon,
  },
]

export const ease = { out: [0.16, 1, 0.3, 1], inOut: [0.76, 0, 0.24, 1] }

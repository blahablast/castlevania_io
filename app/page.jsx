'use client'
import AudioPlayer from '@/components/audio-player'
import HeroHome from '@/components/hero-home/hero-home'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <AudioPlayer src="/music/sotn_moon.mp3" />
      <HeroHome />
      <Link href="/simons-quest" className="text-blue-500 hover:underline">
        Simons Quest
      </Link>
    </>
  )
}

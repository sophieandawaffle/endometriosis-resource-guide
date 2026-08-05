import { Hero } from '@/components/hero'
import { StickyNav } from '@/components/sticky-nav'
import { StartHere } from '@/components/start-here'
import { FreeSupport } from '@/components/free-support'
import { EndoAtWork } from '@/components/endo-at-work'
import { MiscAdvice } from '@/components/misc-advice'
import { SpendMoney } from '@/components/spend-money'
import { SurgerySupport } from '@/components/surgery-support'
import { Resources } from '@/components/resources'
import { SiteFooter } from '@/components/site-footer'

export default function Home() {
  return (
    <main>
      <StickyNav />
      <Hero />
      <StartHere />
      <FreeSupport />
      <EndoAtWork />
      <MiscAdvice />
      <SpendMoney />
      <SurgerySupport />
      <Resources />
      <SiteFooter />
    </main>
  )
}

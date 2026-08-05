import { SectionHeader } from './section-header'
import { ContentList } from './content-list'
import { Callout } from './callout'

const FREE_ITEMS = [
  {
    text: 'Believe them. Endometriosis is often invisible — don\'t question or minimise what they\'re going through.',
  },
  {
    text: 'Ask what kind of support they need, rather than assuming. Sometimes they want practical help, sometimes just someone to listen.',
  },
  {
    text: 'Check in on bad days. A simple "thinking of you" text when they\'re flaring can mean everything.',
  },
  {
    text: 'Offer to come to appointments with them — whether as a driver or as a second set of ears with the doctor.',
  },
  {
    text: 'Do some research so they don\'t have to explain it to you every time. Understanding the basics removes a huge emotional burden.',
  },
  {
    text: 'Don\'t say "have you tried yoga?" or "have you tried going gluten free?" unless they\'ve asked for your input.',
    note: 'Well-meaning advice can feel dismissive of a complex medical condition.',
  },
  {
    text: 'Help with practical tasks during flares: cooking, cleaning, grocery shopping, picking up kids.',
  },
  {
    text: 'Cancel plans without guilt-tripping them. They likely feel bad enough already.',
  },
  {
    text: 'Advocate for them if they\'re struggling to be heard by a doctor. Accompany them and back up what they\'re saying.',
  },
  {
    text: 'Learn their triggers and try to accommodate them — certain foods, activities, or stressors can worsen symptoms.',
  },
  {
    text: 'Don\'t compare their pain to normal period pain. Endo pain is categorically different.',
  },
  {
    text: 'Be patient. Chronic illness affects mood, energy, and plans. It\'s not personal.',
  },
  {
    text: 'Share their content or the content they create about endo — amplifying their voice costs nothing.',
  },
  {
    text: 'Ask about their fertility fears if they bring it up. Don\'t avoid the topic — it\'s often the elephant in the room.',
  },
  {
    text: 'Sit with them. Presence is powerful. You don\'t have to fix anything.',
  },
]

export function FreeSupport() {
  return (
    <section id="free-support" className="scroll-mt-16 py-12 md:py-16 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionHeader
          label="Zero cost — low to medium effort"
          title="Free Ways to Support"
          description="These are acts of service you can do for zero or low cost that can mean a lot to people dealing with endometriosis."
        />

        <Callout>
          <p>
            Most of these things require only time, empathy, and willingness to show up.
            They won&apos;t fix the condition — but they can significantly reduce the emotional and
            practical burden of living with it.
          </p>
        </Callout>

        <div className="mt-8">
          <ContentList items={FREE_ITEMS} />
        </div>
      </div>
    </section>
  )
}

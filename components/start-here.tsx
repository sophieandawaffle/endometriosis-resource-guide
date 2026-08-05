import { SectionHeader } from './section-header'
import { Callout } from './callout'

export function StartHere() {
  return (
    <section id="start-here" className="scroll-mt-16 py-12 md:py-16 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionHeader
          label="Introduction"
          title="Start Here"
        />

        <div className="grid md:grid-cols-2 gap-6">
          <Callout variant="warning">
            <p className="font-semibold text-foreground mb-2">What this guide is</p>
            <p>
              I asked my TikTok community one question: <em>how do you ACTUALLY help someone with endometriosis?</em>{' '}
              Hundreds of comments came in. This is what they said, sorted so you can filter by cost and effort.
            </p>
            <p className="mt-3">
              This is a guide written by a woman with endo, with suggestions from real people with endometriosis.
            </p>
          </Callout>

          <Callout variant="note">
            <p className="font-semibold text-foreground mb-2">Important to know</p>
            <p>
              By no means are you expected to do ALL of these things. Doing what you&apos;re able to do is enough.
              And importantly, none of these things are cures or guaranteed to help.
            </p>
            <p className="mt-3">
              This is simply a guide to help encourage thoughtfulness and consideration.
            </p>
          </Callout>
        </div>

        {/* What is endometriosis */}
        <div id="what-is-endo" className="mt-10 scroll-mt-16">
          <h3 className="font-display text-[clamp(1.5rem,4vw,3rem)] uppercase leading-none mb-5" style={{ color: 'var(--endo-red)' }}>
            What is endometriosis?
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm leading-relaxed text-muted-foreground">
            <div className="space-y-3">
              <p>
                Endometriosis is a chronic, often debilitating condition where tissue similar to the lining of the uterus
                grows outside of it — on the ovaries, fallopian tubes, bowel, bladder, and in severe cases, further afield.
              </p>
              <p>
                It affects roughly <strong className="text-foreground">1 in 10 women and people with a uterus</strong> — around 190 million worldwide.
                In the UK, it takes an average of <strong className="text-foreground">8–10 years</strong> to receive a diagnosis.
              </p>
            </div>
            <div className="space-y-3">
              <p>
                Symptoms include chronic pelvic pain, extremely painful periods, pain during sex, fatigue, bowel and bladder problems,
                difficulty getting pregnant, and more. Symptoms vary widely between individuals.
              </p>
              <p>
                There is currently <strong className="text-foreground">no cure</strong>. Treatment options include hormone therapies, pain management, and surgery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

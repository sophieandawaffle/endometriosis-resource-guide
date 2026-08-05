import { Callout } from './callout'

export function StartHere() {
  return (
    <section id="start-here" className="scroll-mt-16 py-12 md:py-16 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Callout>
          <p className="font-semibold text-foreground mb-3">Start here</p>
          <p className="leading-relaxed">
            I asked my TikTok community one question: <strong>how do you ACTUALLY help someone with endometriosis?</strong> Hundreds of comments came in. This is what they said, sorted so you can filter by cost and effort.
          </p>
          <p className="mt-3 leading-relaxed">
            This is a guide written by a woman with endo, with suggestions from real people with endometriosis.
          </p>
          <p className="mt-3 leading-relaxed">
            By no means are you expected to do ALL of these things! Doing what you&apos;re able to do is enough. And importantly, <strong>none of these things are cures or guaranteed to help.</strong> This is simply a guide to help encourage thoughtfulness and consideration.
          </p>
          <p className="mt-4 text-[11px] font-mono text-muted-foreground">
            Last updated: 4th August 2026
          </p>
        </Callout>

        <div id="what-is-endo" className="mt-10 scroll-mt-16">
          <h3 className="font-display text-[clamp(1.25rem,3vw,2rem)] uppercase leading-none mb-4 text-foreground">
            What is endometriosis?
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            The official NHS definition is:
          </p>
        </div>
      </div>
    </section>
  )
}

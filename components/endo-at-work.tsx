import { SectionHeader } from './section-header'

export function EndoAtWork() {
  return (
    <section id="endo-at-work" className="scroll-mt-16 py-12 md:py-16 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionHeader
          label="Endo at Work"
          title="ENDO AT WORK"
          description="If you're an employer of someone with endometriosis, or have a colleague with endo, these are some ways to help and useful things to know."
        />

        <div className="mt-8 space-y-3">
          {[
            { num: 1, text: <><strong>Know the impact.</strong> Here are some key stats about endometriosis in the workplace to be aware of</> },
            { num: 2, text: <>Make <strong>guilt-free sick leave</strong> the standard. Sickness policies should treat endo-related absence as linked to a health condition, not strikes against an attendance record</> },
            { num: 3, text: <><strong>Ask what they need</strong> from you as an employer</> },
            { num: 4, text: <>Allow for <strong>flexible working hours</strong> where possible</> },
            { num: 5, text: <>Accommodate <strong>dietary needs</strong> at corporate lunches/dinners and office snacks</> },
            { num: 6, text: <>Sign up for the <a href="https://www.endometriosis-uk.org/endometriosis-friendly-employer-scheme" target="_blank" rel="noopener noreferrer" className="underline decoration-[var(--endo-red)] underline-offset-2 hover:text-[var(--endo-red)]"><strong>Endometriosis Friendly Employer Scheme</strong></a> (UK)</> },
            { num: 7, text: <>Give the option to <strong>work from home</strong> on flare days</> },
            { num: 8, text: <>Show understanding around time off for <strong>medical appointments</strong></> },
            { num: 9, text: <>Provide <strong>free period products</strong> in your workplace (organic period care brand TOTM offers a 10% discount on all its products to organisations committing to be Endometriosis Friendly Employers. In addition, 1% of its online sales are donated to Endometriosis UK)</> },
          ].map((item) => (
            <div key={item.num} className="flex gap-4 items-start border border-border bg-card p-4">
              <span className="font-mono text-[10px] text-muted-foreground shrink-0 w-5 text-right pt-1">{item.num}.</span>
              <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              In the US
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              FMLA can give eligible employees unpaid, job-protected leave for a serious health condition, and the ADA can require reasonable accommodations where the condition substantially limits a major life activity. Eligibility rules apply, so it&apos;s worth checking against your employer&apos;s size and your hours.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              In the UK
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              Endometriosis is not automatically a disability under the Equality Act 2010, but it can meet the legal definition where symptoms have a substantial, long-term adverse effect on normal day-to-day activities, and fluctuating or episodic conditions still count if the overall impact is substantial. Where it qualifies, employers have a legal duty to make reasonable adjustments, including for absence or sickness records linked to the condition. A 2026 Employment Appeal Tribunal case, Pal v Accenture UK, confirmed endometriosis can amount to a disability and trigger that duty, including around performance management. Worth flagging the difference between two things people confuse: a reasonable adjustment (a legal duty if you meet the disability test) and a flexible working request, which is a separate, weaker right. Every employee can request flexible working, but employers only have to consider it reasonably, not grant it.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              The Endometriosis Friendly Employer scheme
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              Endometriosis UK runs an Endometriosis Friendly Employer scheme where organisations pledge to build a supportive culture across leadership, stigma, and communication. Signed-up employers appoint Endometriosis Champions who are trained by the charity to raise awareness and give practical support to colleagues. Members already range from NHS trusts and ambulance services to universities, councils, and firms like Capgemini and Azets.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

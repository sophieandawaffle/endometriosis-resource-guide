/**
 * Emails Lucy when a suggestion lands. Deliberately does NOT include the
 * submitter's contact details — it's a nudge to go and read the review page,
 * not a copy of the inbox.
 */

const TO = process.env.SUGGESTIONS_TO || 'lucy.aitchison3@gmail.com'
const FROM = process.env.SUGGESTIONS_FROM || 'ENDO guide <onboarding@resend.dev>'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function notifyConfigured() {
  return Boolean(process.env.RESEND_API_KEY)
}

export async function notifyNewSuggestion(input: {
  message: string
  topic: string
  reviewUrl: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { sent: false, reason: 'not-configured' as const }

  const preview =
    input.message.length > 400 ? `${input.message.slice(0, 400)}…` : input.message

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1A1A1A;">
      <p style="font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: #6B6560; margin: 0 0 16px;">
        New suggestion — ENDO guide
      </p>
      <div style="white-space: pre-wrap; border-left: 4px solid #E8251A; padding: 4px 0 4px 16px; margin: 0 0 8px; font-size: 15px;">
        ${escapeHtml(preview)}
      </div>
      <p style="font-size: 13px; color: #6B6560; margin: 0 0 24px;">
        Suggested section: ${escapeHtml(input.topic || 'Not specified')}
      </p>
      <a href="${input.reviewUrl}" style="display: inline-block; background: #E8251A; color: #F2F0EC; padding: 14px 24px; text-decoration: none; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;">
        Review it
      </a>
      <p style="font-size: 12px; color: #6B6560; margin: 24px 0 0;">
        Approve, edit, or reject it there. Approving puts it on the site in about a minute.
      </p>
    </div>
  `

  const text = [
    'New suggestion — ENDO guide',
    '',
    preview,
    '',
    `Suggested section: ${input.topic || 'Not specified'}`,
    '',
    `Review it: ${input.reviewUrl}`,
  ].join('\n')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: 'New suggestion for the ENDO guide',
        html,
        text,
      }),
    })

    if (!response.ok) {
      console.error('Resend rejected the notification:', response.status, await response.text())
      return { sent: false, reason: 'rejected' as const }
    }
  } catch (error) {
    console.error('Failed to send the notification:', error)
    return { sent: false, reason: 'error' as const }
  }

  return { sent: true, reason: null }
}

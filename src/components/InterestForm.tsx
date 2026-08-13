import { useState } from 'react'
import type { FormEvent } from 'react'
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '../config'
import {
  COURSE_OPTIONS,
  validateInterestForm,
} from '../lib/interest-form'
import type { FieldErrors, InterestFormInput } from '../lib/interest-form'

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'success' }
  | { kind: 'unconfigured' }
  | { kind: 'error'; message: string }

const emptyInput: InterestFormInput = {
  parentName: '',
  email: '',
  childAge: '',
  course: '',
  message: '',
}

const inputClasses =
  'w-full rounded-sm border border-line bg-void px-3 py-2.5 text-sm text-paper placeholder:text-fog focus:border-phosphor focus:outline-none'
const labelClasses = 'mb-1.5 block text-sm font-medium text-mint-muted'

export function InterestForm() {
  const [input, setInput] = useState<InterestFormInput>(emptyInput)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  function update(field: keyof InterestFormInput, value: string) {
    setInput((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => {
      if (!(field in previous)) return previous
      const next = { ...previous }
      delete next[field]
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus({ kind: 'idle' })

    const result = validateInterestForm(input)
    if (!result.success) {
      setErrors(result.errors)
      return
    }
    setErrors({})

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus({ kind: 'unconfigured' })
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New interest: ${result.values.course} (age ${result.values.childAge})`,
          from_name: "The Don't Panic Lab website",
          parent_name: result.values.parentName,
          email: result.values.email,
          child_age: result.values.childAge,
          course_interest: result.values.course,
          message: result.values.message ?? '',
        }),
      })
      // Web3Forms returns HTTP 200 with { success: false } on logical failures,
      // so check the body rather than only the status code.
      const data: { success?: boolean } = await response
        .json()
        .catch(() => ({}))
      if (!response.ok || data.success === false) {
        throw new Error(`Submission failed with status ${response.status}`)
      }
      setInput(emptyInput)
      setStatus({ kind: 'success' })
    } catch {
      setStatus({
        kind: 'error',
        message:
          'Something went wrong while sending. Please try again, or email us directly.',
      })
    }
  }

  const sending = status.kind === 'sending'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      aria-describedby="interest-form-status"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="parentName" className={labelClasses}>
            Parent name <span className="text-phosphor" aria-hidden="true">*</span>
          </label>
          <input
            id="parentName"
            name="parentName"
            type="text"
            autoComplete="name"
            required
            disabled={sending}
            value={input.parentName}
            onChange={(event) => update('parentName', event.target.value)}
            aria-invalid={errors.parentName ? true : undefined}
            aria-describedby={errors.parentName ? 'parentName-error' : undefined}
            className={inputClasses}
            placeholder="Ada Lovelace"
          />
          {errors.parentName ? (
            <p id="parentName-error" role="alert" className="mt-1.5 text-xs text-danger">
              {errors.parentName}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email <span className="text-phosphor" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={sending}
            value={input.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClasses}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-danger">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="childAge" className={labelClasses}>
            Child&rsquo;s age <span className="text-phosphor" aria-hidden="true">*</span>
          </label>
          <input
            id="childAge"
            name="childAge"
            type="number"
            inputMode="numeric"
            min={6}
            max={18}
            required
            disabled={sending}
            value={input.childAge}
            onChange={(event) => update('childAge', event.target.value)}
            aria-invalid={errors.childAge ? true : undefined}
            aria-describedby={errors.childAge ? 'childAge-error' : undefined}
            className={inputClasses}
            placeholder="9"
          />
          {errors.childAge ? (
            <p id="childAge-error" role="alert" className="mt-1.5 text-xs text-danger">
              {errors.childAge}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="course" className={labelClasses}>
            Course interest <span className="text-phosphor" aria-hidden="true">*</span>
          </label>
          <select
            id="course"
            name="course"
            required
            disabled={sending}
            value={input.course}
            onChange={(event) => update('course', event.target.value)}
            aria-invalid={errors.course ? true : undefined}
            aria-describedby={errors.course ? 'course-error' : undefined}
            className={inputClasses}
          >
            <option value="" disabled>
              Select a course&hellip;
            </option>
            {COURSE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.course ? (
            <p id="course-error" role="alert" className="mt-1.5 text-xs text-danger">
              {errors.course}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message <span className="text-fog">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={1000}
          disabled={sending}
          value={input.message}
          onChange={(event) => update('message', event.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? 'message-error' : 'message-hint'
          }
          className={inputClasses}
          placeholder="Anything we should know — goals, questions, preferred times&hellip;"
        />
        <p id="message-hint" className="mt-1.5 text-xs text-fog">
          {input.message.length}/1000 characters
        </p>
        {errors.message ? (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-danger">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center gap-2 rounded-sm border border-phosphor bg-phosphor/10 px-5 py-3 text-sm font-bold text-phosphor transition-all hover:bg-phosphor hover:text-void hover:shadow-glow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-phosphor/10 disabled:hover:text-phosphor disabled:hover:shadow-none"
      >
        {sending ? (
          <>
            <span
              className="inline-block h-3 w-3 animate-spin rounded-full border border-phosphor border-t-transparent"
              aria-hidden="true"
            />
            sending&hellip;
          </>
        ) : (
          <>
            <span aria-hidden="true">&gt;</span> send --interest
          </>
        )}
      </button>

      <div id="interest-form-status" aria-live="polite" role="status" className="min-h-6 text-sm">
        {status.kind === 'sending' ? (
          <p className="text-amber">
            <span aria-hidden="true">$ </span>transmitting interest packet&hellip;
          </p>
        ) : null}
        {status.kind === 'success' ? (
          <p className="text-phosphor">
            <span aria-hidden="true">$ </span>OK 200 — thanks! We&rsquo;ll reply
            within a couple of days with taster class options.
          </p>
        ) : null}
        {status.kind === 'unconfigured' ? (
          <p className="text-amber">
            <span aria-hidden="true">$ </span>WARN — form endpoint not configured
            yet. Your interest is valid, but nothing was sent. Please email us
            directly for now.
          </p>
        ) : null}
        {status.kind === 'error' ? (
          <p className="text-danger">
            <span aria-hidden="true">$ </span>ERR — {status.message}
          </p>
        ) : null}
      </div>
    </form>
  )
}

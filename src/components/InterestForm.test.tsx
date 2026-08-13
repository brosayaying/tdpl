import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InterestForm } from './InterestForm'

// Control the access key per test via the shared mutable config stub.
const configStub = vi.hoisted(() => ({ accessKey: '' }))
vi.mock('../config', () => ({
  WEB3FORMS_ENDPOINT: 'https://api.web3forms.com/submit',
  get WEB3FORMS_ACCESS_KEY() {
    return configStub.accessKey
  },
}))

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(/parent name/i), {
    target: { value: 'Ada Lovelace' },
  })
  fireEvent.change(screen.getByLabelText(/^email/i), {
    target: { value: 'ada@example.com' },
  })
  fireEvent.change(screen.getByLabelText(/child.s age/i), {
    target: { value: '9' },
  })
  fireEvent.change(screen.getByLabelText(/course interest/i), {
    target: { value: 'Python' },
  })
}

describe('InterestForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    configStub.accessKey = ''
  })

  afterEach(() => {
    cleanup()
  })

  it('shows inline field errors for invalid submissions without posting', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    render(<InterestForm />)

    fireEvent.click(screen.getByRole('button', { name: /send --interest/i }))

    expect(await screen.findByText(/please enter your name/i)).toBeTruthy()
    expect(screen.getByText(/please enter your email/i)).toBeTruthy()
    expect(screen.getByText(/please enter your child.s age/i)).toBeTruthy()
    expect(screen.getByText(/please choose a course/i)).toBeTruthy()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('clears a field error once the field is edited', async () => {
    render(<InterestForm />)
    fireEvent.click(screen.getByRole('button', { name: /send --interest/i }))
    expect(await screen.findByText(/please enter your name/i)).toBeTruthy()

    fireEvent.change(screen.getByLabelText(/parent name/i), {
      target: { value: 'Grace' },
    })
    expect(screen.queryByText(/please enter your name/i)).toBeNull()
  })

  it('shows the unconfigured-endpoint warning and makes no request when the access key is empty', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    render(<InterestForm />)
    fillValidForm()

    fireEvent.click(screen.getByRole('button', { name: /send --interest/i }))

    expect(
      await screen.findByText(/form endpoint not configured yet/i),
    ).toBeTruthy()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('posts the Web3Forms payload and shows success on a good response', async () => {
    configStub.accessKey = 'test-key-123'
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    render(<InterestForm />)
    fillValidForm()
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'See you at the taster.' },
    })

    fireEvent.click(screen.getByRole('button', { name: /send --interest/i }))

    expect(await screen.findByText(/OK 200/i)).toBeTruthy()
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.web3forms.com/submit')
    const body = JSON.parse(String(init.body))
    expect(body).toMatchObject({
      access_key: 'test-key-123',
      parent_name: 'Ada Lovelace',
      email: 'ada@example.com',
      child_age: 9,
      course_interest: 'Python',
      message: 'See you at the taster.',
    })
  })

  it('treats an HTTP 200 with success:false as an error and keeps input', async () => {
    configStub.accessKey = 'test-key-123'
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: false, message: 'bad key' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    render(<InterestForm />)
    fillValidForm()

    fireEvent.click(screen.getByRole('button', { name: /send --interest/i }))

    expect(await screen.findByText(/something went wrong/i)).toBeTruthy()
    // Input is retained so the user can retry.
    expect(screen.getByDisplayValue('Ada Lovelace')).toBeTruthy()
  })
})

import { describe, expect, it } from 'vitest'
import { validateInterestForm } from './interest-form'
import type { InterestFormInput } from './interest-form'

const validInput: InterestFormInput = {
  parentName: 'Ada Lovelace',
  email: 'ada@example.com',
  childAge: '9',
  course: 'Python',
  message: 'Looking forward to it!',
}

describe('validateInterestForm', () => {
  it('accepts valid input and trims strings', () => {
    const result = validateInterestForm({
      ...validInput,
      parentName: '  Ada Lovelace  ',
      email: '  ada@example.com ',
      message: '  hello  ',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.values.parentName).toBe('Ada Lovelace')
      expect(result.values.email).toBe('ada@example.com')
      expect(result.values.message).toBe('hello')
      expect(result.values.childAge).toBe(9)
    }
  })

  it('requires a parent name', () => {
    const result = validateInterestForm({ ...validInput, parentName: '   ' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.parentName).toBeTruthy()
    }
  })

  it('rejects invalid email addresses', () => {
    for (const email of ['', 'not-an-email', 'ada@', '@example.com']) {
      const result = validateInterestForm({ ...validInput, email })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.errors.email).toBeTruthy()
      }
    }
  })

  it('enforces the age boundary of 6–18', () => {
    const tooYoung = validateInterestForm({ ...validInput, childAge: '5' })
    expect(tooYoung.success).toBe(false)
    if (!tooYoung.success) expect(tooYoung.errors.childAge).toMatch(/6/)

    const tooOld = validateInterestForm({ ...validInput, childAge: '19' })
    expect(tooOld.success).toBe(false)
    if (!tooOld.success) expect(tooOld.errors.childAge).toMatch(/18/)

    for (const edge of ['6', '18']) {
      const result = validateInterestForm({ ...validInput, childAge: edge })
      expect(result.success).toBe(true)
    }
  })

  it('rejects missing, fractional, or non-numeric ages', () => {
    for (const childAge of ['', '9.5', 'nine']) {
      const result = validateInterestForm({ ...validInput, childAge })
      expect(result.success).toBe(false)
      if (!result.success) expect(result.errors.childAge).toBeTruthy()
    }
  })

  it('only allows the five course options', () => {
    const invalid = validateInterestForm({ ...validInput, course: 'COBOL' })
    expect(invalid.success).toBe(false)
    if (!invalid.success) expect(invalid.errors.course).toBeTruthy()

    const empty = validateInterestForm({ ...validInput, course: '' })
    expect(empty.success).toBe(false)

    for (const course of ['Scratch', 'Python', 'AI', 'Robotics', 'Not sure']) {
      const result = validateInterestForm({ ...validInput, course })
      expect(result.success).toBe(true)
    }
  })

  it('caps the optional message at 1000 characters', () => {
    const ok = validateInterestForm({
      ...validInput,
      message: 'x'.repeat(1000),
    })
    expect(ok.success).toBe(true)

    const tooLong = validateInterestForm({
      ...validInput,
      message: 'x'.repeat(1001),
    })
    expect(tooLong.success).toBe(false)
    if (!tooLong.success) expect(tooLong.errors.message).toMatch(/1000/)
  })

  it('allows an empty message', () => {
    const result = validateInterestForm({ ...validInput, message: '' })
    expect(result.success).toBe(true)
  })

  it('returns the first error per field only', () => {
    const result = validateInterestForm({
      parentName: '',
      email: 'bad',
      childAge: '3',
      course: 'Nope',
      message: 'x'.repeat(1001),
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(Object.keys(result.errors).sort()).toEqual([
        'childAge',
        'course',
        'email',
        'message',
        'parentName',
      ])
    }
  })
})

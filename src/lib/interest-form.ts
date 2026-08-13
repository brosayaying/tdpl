import { z } from 'zod'

export const COURSE_OPTIONS = [
  'Scratch',
  'Python',
  'AI',
  'Robotics',
  'Not sure',
] as const

export type CourseOption = (typeof COURSE_OPTIONS)[number]

export const interestFormSchema = z.object({
  parentName: z
    .string()
    .trim()
    .min(1, 'Please enter your name.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .email('That email address doesn\u2019t look right.'),
  childAge: z
    .number({ message: 'Please enter your child\u2019s age.' })
    .int('Age must be a whole number.')
    .min(6, 'Our classes start from age 6.')
    .max(18, 'Our classes go up to age 18.'),
  course: z.enum(COURSE_OPTIONS, {
    message: 'Please choose a course (or "Not sure").',
  }),
  message: z
    .string()
    .trim()
    .max(1000, 'Message must be 1000 characters or fewer.')
    .optional(),
})

export type InterestFormValues = z.infer<typeof interestFormSchema>

export type InterestFormInput = {
  parentName: string
  email: string
  childAge: string
  course: string
  message: string
}

/** Convert raw (string) form state into the typed shape the schema expects. */
export function toSchemaInput(input: InterestFormInput) {
  return {
    parentName: input.parentName,
    email: input.email,
    childAge: input.childAge === '' ? Number.NaN : Number(input.childAge),
    course: input.course,
    message: input.message,
  }
}

export type FieldErrors = Partial<Record<keyof InterestFormValues, string>>

/** Validate raw form input; returns typed values on success or field errors. */
export function validateInterestForm(
  input: InterestFormInput,
):
  | { success: true; values: InterestFormValues }
  | { success: false; errors: FieldErrors } {
  const result = interestFormSchema.safeParse(toSchemaInput(input))
  if (result.success) {
    return { success: true, values: result.data }
  }
  const errors: FieldErrors = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0]
    if (typeof field === 'string' && !(field in errors)) {
      errors[field as keyof InterestFormValues] = issue.message
    }
  }
  return { success: false, errors }
}

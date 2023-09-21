import { expect, test } from 'vitest'

import { emailRule,passwordRule } from '../src/utils/validation';

// emails 
test('Email test@test.fr should be valid', () => {
  expect(emailRule('test@test.fr')).toBe(true)
})

test('Email test@test.com should be valid', () => {
  expect(emailRule('test@test.com')).toBe(true)
})

test("String test.com shouldn't be valid", () => {
  expect(emailRule('test.com')).toBe('Invalid email.')
})

test("Short tld test@test.a shouldn't be valid", () => {
  expect(emailRule('a@a.a')).toBe('Invalid email.')
})

// passwords
test("One character password shouldn be too short", () => {
  expect(passwordRule('a')).toBe('Password must contain at least 8 characters with combination of uppercase letters, lowercase letters, and numbers.')
})

test("No number password shouldn't be valid", () => {
  expect(passwordRule('ABCDEFGHIJKLMNOPQRSTUV')).toBe('Password must contain at least 8 characters with combination of uppercase letters, lowercase letters, and numbers.')
})

test("Only number password shouldn't be valid", () => {
  expect(passwordRule('123456789')).toBe('Password must contain at least 8 characters with combination of uppercase letters, lowercase letters, and numbers.')
})

test("One number & one cap password of at least 8 characters should be valid", () => {
  expect(passwordRule('Abcdefgh1')).toBe(true)
})


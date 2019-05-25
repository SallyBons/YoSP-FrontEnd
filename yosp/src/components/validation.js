import GLOBAL_CONFIG from '../config';
import { setTimeout } from 'timers';

const required = value => (value ? undefined : 'This field is required');
//  const passwordConditions = value => (value.length <= 6 & value.length <= 24? undefined : 'Password must be 6-24 symbols');
const passwordMin = value => (value.length >= 6 ? undefined : 'Password must be 6 at least');
const passwordMax = value => (value.length <= 24 ? undefined : 'Password must be no longer then 24');
const maxLengthName = value => (value.length <= 24 ? undefined : 'Max length - 24');
const maxLengthSurname = value => (value.length <= 32 ? undefined : 'Max length - 32');
const specialSymbols = value => (value && /[!@#$%^&*]/i.test(value) ? 'Dont use special symbols!' : undefined);
const matchesPassword = (value, allValues) => (value === allValues.password ? undefined : 'Passwords must match');
const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined);
const asyncValidateEmail = value => {
  setTimeout(() => {
    let status = checkEmailExistance(value);
    if (status) {
      console.log(status)
    }
  }, 3000);
}

const checkEmailExistance = async (value) => {
  const result = await fetch(`${GLOBAL_CONFIG.backendUrl}/user/check-email?email=${value}`)
    .then(result => result.text())
    .then(result => {
      return JSON.parse(result)
    })
  return result;
}

export {
  required,
  maxLengthName,
  maxLengthSurname,
  passwordMin,
  passwordMax,
  specialSymbols,
  matchesPassword,
  email,
  asyncValidateEmail
};

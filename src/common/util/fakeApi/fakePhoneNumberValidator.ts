/*
USING LOCAL LIBRARY TO FAKE A PHONE NUMBER VALIDATION API
ref: https://github.com/ruimarinho/google-libphonenumber
*/
import { PhoneNumberUtil } from 'google-libphonenumber';

import { UserPhoneNumber } from '../../../type/core/phoneNumber';
import { sleep } from './sleep';

const phoneUtil = PhoneNumberUtil.getInstance();

export type PhoneNumberValidationResult = {
  valid: boolean;
  userPhoneNumber: UserPhoneNumber;
  error?: Error;
};

export const fakePhoneNumberValidatorApi = async (
  userPhoneNumber: UserPhoneNumber,
): Promise<PhoneNumberValidationResult> => {
  // FAKE A NETWORK DELAY IN 300ms
  await sleep(300);

  try {
    const number = phoneUtil.parse(userPhoneNumber.phoneNumber, userPhoneNumber.countryAlpha2);

    const valid = phoneUtil.isValidNumberForRegion(number, userPhoneNumber.countryAlpha2);
    console.debug(
      `CHECKED ${userPhoneNumber.phoneNumber} FOR REGION ${userPhoneNumber.countryAlpha2} -> ${valid}`,
    );
    return {
      valid,
      userPhoneNumber,
    };
  } catch (err: any) {
    return {
      valid: false,
      userPhoneNumber,
      error: err,
    };
  }
};

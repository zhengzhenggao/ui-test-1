import { PhoneNumberUtil } from 'google-libphonenumber';

import { UserPhoneNumber } from '../../../type/core/phoneNumber';

const phoneUtil = PhoneNumberUtil.getInstance();

// TO FORMAT PHONE NUMBER INTO LOCAL STYLE (NOT USING)
export const phoneNumberFormatter = (userPhoneNumber: UserPhoneNumber): string => {
  const number = phoneUtil.parse(userPhoneNumber.phoneNumber, userPhoneNumber.countryAlpha2);

  const formatted = phoneUtil.formatInOriginalFormat(number, userPhoneNumber.countryAlpha2);
  return formatted;
};

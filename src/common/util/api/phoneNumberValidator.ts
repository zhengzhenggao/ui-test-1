import { UserPhoneNumber } from '../../../type/core/phoneNumber';
import apiHelper, {
  SupportedIncomingFormat,
  SupportedMethod,
  SupportedOutgoingFormat,
} from '../helper/ApiHelper';

export type phoneNumberValidatorApiCallerResponse = {
  valid: boolean;
  error?: Error;
};

export const phoneNumberValidatorApiCaller = async (userPhoneNumber: UserPhoneNumber) => {
  // THIS IS THE REAL API CALLING SECTION THAT WILL BE USED
  const apiResult = await apiHelper(
    'https://somePhoneNumberValidationServer',
    '/check/phonenumber',
    SupportedMethod.POST,
    {
      phoneNumber: userPhoneNumber.phoneNumber,
      country: userPhoneNumber.countryAlpha2,
    },
    {
      incomingFormat: SupportedIncomingFormat.JSON,
      outgoingFormat: SupportedOutgoingFormat.JSON,
    },
  );

  if (apiResult.success) {
    return {
      valid: apiResult.data.isValid,
    };
  } else {
    return {
      valid: false,
      error: new Error('Phone Number Validator API CALLING ERROR'),
    };
  }
};

export type UserPhoneNumber = {
  phoneNumber: string;
} & CountryCodeConfig;

export type CountryCodeConfig = {
  countryAlpha2: string;
  countryCode: string;
  countryFlag: string;
  countryName: string;
  validation?: RegExp;
};

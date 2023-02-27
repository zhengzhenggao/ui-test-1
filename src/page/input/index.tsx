import {
  Button,
  Container,
  FormControl,
  InputLabel,
  NativeSelect,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { debounce } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  StyledBoxContainer,
  StyledContainer,
} from '../../common/component/StyledContainer/StyledContainer';
import { phoneNumberValidatorApiCaller } from '../../common/util/api/phoneNumberValidator';
import { fakePhoneNumberValidatorApi } from '../../common/util/fakeApi/fakePhoneNumberValidator';
import { phoneCountryCodeList } from '../../configuration/data/phoneCountryCode';
import { useAppDispatch } from '../../store/hooks';
import { addUserPhoneNumber } from '../../store/slice/appBaseStore';
import { CountryCodeConfig, UserPhoneNumber } from '../../type/core/phoneNumber';
import { AppChildPageProps } from '../appThemedPage';

type InputProps = {
  empty?: boolean;
} & AppChildPageProps;

export const Input = (props: InputProps): JSX.Element => {
  // INITIALIZE FUNCTION
  const getDefaultCountry = (): CountryCodeConfig => {
    // LATER COULD BE CHANGE TO IP EXTRACTED INFO
    const defaultCountryCode = phoneCountryCodeList.find((one) => {
      return one.countryAlpha2 === 'HK';
    });
    if (defaultCountryCode) {
      console.log('FOUND DEFAULT', defaultCountryCode);
      return defaultCountryCode;
    } else {
      return phoneCountryCodeList[0];
    }
  };
  const defaultCountry = useMemo(getDefaultCountry, []);

  // LOCAL HOOKS
  const navigate = useNavigate();
  const [isNeedCheck, setIsNeedCheck] = useState<boolean>(true);
  const [countryCodeSelect, setCountryCodeSelect] = useState<CountryCodeConfig>(defaultCountry);
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>('');
  const [phoneNumberInputError, setPhoneNumberInputError] = useState<boolean>(false);

  // REDUX HOOKS
  const dispatch = useAppDispatch();

  // PAGE FUNCTION

  const validatePhoneNumber = async () => {
    // console.debug('I CHECK');
    // console.log(phoneNumberInput);
    const userPhoneNumber: UserPhoneNumber = {
      ...countryCodeSelect,
      phoneNumber: phoneNumberInput,
    };

    // FAKE VALIDATION API
    const validationResult = await fakePhoneNumberValidatorApi(userPhoneNumber);

    // REAL VALIDATION API (IMPLEMENT ONLY)
    // const validationResult = await phoneNumberValidatorApiCaller(userPhoneNumber);

    if (validationResult.error) {
      // API ERRORED
      // SET INPUT ERROR AS WELL
      setPhoneNumberInputError(true);
    } else {
      setPhoneNumberInputError(!validationResult.valid);
      setIsNeedCheck(!validationResult.valid);
    }
  };

  // EVENT HANDLER
  const handleUserPhoneNumberInput = (event: any) => {
    // console.log('onChange', event.target.value);
    // ANY CHANGE OF VALUE WILL RESET isNeedCheck STATE
    setIsNeedCheck(true);
    const sanitized = event.target.value.replace('e', '');
    setPhoneNumberInput(sanitized);
    // console.log('set', sanitized);
  };

  const handleNextClick = debounce((event: any) => {
    const userPhoneNumber: UserPhoneNumber = {
      ...countryCodeSelect,
      phoneNumber: phoneNumberInput,
    };

    dispatch(addUserPhoneNumber(userPhoneNumber));

    // console.log('I CLICKED', userPhoneNumber);
    navigate('/Result');
  }, 500);

  const handleEnterKeyPress = debounce((event: any) => {
    if (event.key === 'Enter') {
      // console.log('DETECTED ENTER KEY');
      validatePhoneNumber();
    }
  });

  const handleResultButtonClick = debounce((event: any) => {
    navigate('/Result');
  });

  // REACT FUNCTION

  return (
    <>
      <Container className='header-section' {...props.pageTheme.page?.input?.header?.container}>
        <Button
          {...props.pageTheme.page?.input?.header?.resultButton}
          onClick={handleResultButtonClick}
          tabIndex={0}
        >
          Result
        </Button>
      </Container>
      <StyledBoxContainer
        className='body-section'
        {...props.pageTheme.page?.input?.body?.container}
      >
        <StyledContainer>
          <FormControl fullWidth>
            <InputLabel variant='standard' htmlFor='uncontrolled-native'>
              Country Code
            </InputLabel>
            <NativeSelect
              defaultValue={countryCodeSelect?.countryAlpha2}
              inputProps={{
                name: 'countryCode',
                id: 'uncontrolled-native',
              }}
              tabIndex={0}
              onChange={(event) => {
                const findCountryCode = phoneCountryCodeList.find((one) => {
                  return one.countryAlpha2 === event.target.value;
                });
                if (findCountryCode) {
                  setCountryCodeSelect(findCountryCode);
                  // console.log('SET CC SELECT', findCountryCode);
                }
              }}
            >
              {phoneCountryCodeList.map((value: CountryCodeConfig, index: number) => {
                return (
                  <option
                    key={`country_code_index_${index}`}
                    value={value.countryAlpha2}
                  >{`${value.countryAlpha2} ${value.countryFlag} ${value.countryName} ${value.countryCode}`}</option>
                );
              })}
            </NativeSelect>
          </FormControl>
        </StyledContainer>
        <StyledContainer>
          <FormControl fullWidth>
            <TextField
              id='user_phone_number_input'
              label='Phone Number'
              error={phoneNumberInputError}
              type='number'
              tabIndex={1}
              autoFocus={true}
              helperText={
                phoneNumberInputError ? 'Incorrect number, please check and try again' : ''
              }
              value={phoneNumberInput}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              onBlur={validatePhoneNumber}
              onChange={handleUserPhoneNumberInput}
              onKeyDown={handleEnterKeyPress}
            />
          </FormControl>
        </StyledContainer>
        <StyledContainer>
          <Button
            variant='contained'
            disabled={!isNeedCheck ? phoneNumberInputError : true}
            onClick={handleNextClick}
            color='primary'
            size='large'
            tabIndex={2}
          >
            Next
          </Button>
        </StyledContainer>
      </StyledBoxContainer>
      <Container className='footer-section'>
        <Typography variant='subtitle1'>Remark</Typography>
        <Typography variant='body1'>
          Phone number checking feature: Using a fake async function to simulate the result Leaving
          the real API calling with self written ApiHelper to handle in the feature
        </Typography>
        <br />
        <Typography variant='body1'>
          Phone number checking feature: ENTER & TAB key will trigger the validation
        </Typography>
        <Typography variant='body1'>UI Misc.: Tab indexed</Typography>
      </Container>
    </>
  );
};

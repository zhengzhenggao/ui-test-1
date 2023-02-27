import {
  Button,
  Container,
  FormControl,
  InputLabel,
  NativeSelect,
  Select,
  TextField,
} from '@mui/material';
import { maxWidth } from '@mui/system';
import Box from '@mui/system/Box';
import { debounce } from 'lodash';
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  StyledBoxContainer,
  StyledContainer,
} from '../../common/component/StyledContainer/StyledContainer';
import { StyledTable } from '../../common/component/StyledTable/StyledTable';
import { selectAppBaseData } from '../../store/slice/appBaseStore';
import { UserPhoneNumber } from '../../type/core/phoneNumber';
import { AppChildPageProps } from '../appThemedPage';

type ResultProps = {
  empty?: boolean;
} & AppChildPageProps;

export const Result = (props: ResultProps): JSX.Element => {
  // INITIALIZE FUNCTION

  // LOCAL HOOKS
  const navigate = useNavigate();

  // REDUX HOOKS
  const passedPhoneNumberList = useSelector(selectAppBaseData).passedPhoneNumberList;

  // PAGE FUNCTION

  // EVENT HANDLER
  const handleBackButtonClick = debounce((event) => {
    navigate('/Input');
  });

  // REACT FUNCTION

  return (
    <Fragment>
      <Container className='header-section' {...props.pageTheme.page?.result?.header?.container}>
        <Button
          {...props.pageTheme.page?.result?.header?.backButton}
          onClick={handleBackButtonClick}
          tabIndex={0}
        >
          Back
        </Button>
      </Container>
      <StyledBoxContainer
        className='body-section'
        tabIndex={1}
        {...props.pageTheme.page?.result?.body?.container}
      >
        <StyledTable<UserPhoneNumber>
          name={'ValidUserPhoneNumberListTable'}
          data={passedPhoneNumberList}
          headers={['Country', 'CountryAlpha2', 'Flag', 'Code', 'PhoneNumber']}
          dataMatchHeaders={[
            'countryName',
            'countryAlpha2',
            'countryFlag',
            'countryCode',
            'phoneNumber',
          ]}
        />
      </StyledBoxContainer>
      <Container className='footer-section'></Container>
    </Fragment>
  );
};

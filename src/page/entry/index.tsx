import { Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AppChildPageProps } from '../appThemedPage';

type EntryProps = {
  empty?: boolean;
} & AppChildPageProps;

export const Entry = (props: EntryProps): JSX.Element => {
  // LOCAL HOOKS
  const navigate = useNavigate();
  // PAGE FUNCTION

  // EVENT HANDLER
  const handleBodyContainerClick = () => {
    navigate('/Input');
  };

  return (
    <>
      <Container
        className='header-section'
        {...props.pageTheme.page?.entry?.header?.container}
      ></Container>
      <Container
        className='body-section'
        onClick={(event) => {
          handleBodyContainerClick();
        }}
        {...props.pageTheme.page?.entry?.body?.container}
      >
        <img
          src={props.pageTheme.page?.entry?.body?.welcomeImage?.src ?? ''}
          style={props.pageTheme.page?.entry?.body?.welcomeImage?.style}
        />
      </Container>
      <Container className='footer-section'></Container>
    </>
  );
};

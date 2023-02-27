import { Container, ContainerProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledContainerComponent = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('tablet')]: {
    width: '100%',
    maxWidth: 'xs',
    display: 'flex',
  },
  [theme.breakpoints.up('tablet')]: {
    width: '50%',
    maxWidth: 'xs',
    display: 'flex',
  },
}));

export const StyledContainer = (props: ContainerProps) => {
  return <StyledContainerComponent>{props.children}</StyledContainerComponent>;
};

const StyledBoxContainerComponent = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('tablet')]: {
    width: '100%',
    maxWidth: 'xs',
    flexDirection: 'column',
    display: 'flex',
    gap: '50px',
  },
  [theme.breakpoints.up('tablet')]: {
    width: '100%%',
    flexDirection: 'row',
    display: 'flex',
  },
}));

export const StyledBoxContainer = (props: ContainerProps) => {
  return <StyledBoxContainerComponent>{props.children}</StyledBoxContainerComponent>;
};

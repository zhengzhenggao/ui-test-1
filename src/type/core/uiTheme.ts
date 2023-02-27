import { ButtonProps, ContainerProps } from '@mui/material';
import { CSSProperties, ImgHTMLAttributes } from 'react';

export type UIThemeOption = {
  root: {
    container: ContainerProps;
  };
  page?: {
    entry?: {
      header?: {
        container?: ContainerProps;
      };
      body?: {
        container?: ContainerProps;
        welcomeImage?: {
          src?: string;
          style?: CSSProperties;
        };
      };
    };
    input?: {
      header?: {
        container?: ContainerProps;
        resultButton?: ButtonProps;
      };
      body?: {
        container?: ContainerProps;
      };
    };
    result?: {
      header?: {
        container?: ContainerProps;
        backButton?: ButtonProps;
      };
      body?: {
        container?: ContainerProps;
      };
    };
  };
};

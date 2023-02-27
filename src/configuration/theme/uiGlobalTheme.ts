import { UIThemeOption } from '../../type/core/uiTheme';

export const uiGlobalTheme: UIThemeOption = {
  root: {
    container: {
      style: {
        paddingTop: '1%',
        width: '100vw',
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
  page: {
    entry: {
      header: {
        container: {},
      },
      body: {
        container: {
          disableGutters: true,
          fixed: true,
          maxWidth: 'tablet',
          style: {
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
        welcomeImage: {
          src: './images/page/entry/welcome.webp',
          style: {
            width: '100%',
          },
        },
      },
    },
    input: {
      header: {
        container: {
          style: {
            height: '25vh', // ADD TO PADDING
          },
        },
        resultButton: {
          variant: 'contained',
          color: 'primary',
        },
      },
      body: {
        container: {
          disableGutters: true,
          maxWidth: 'tablet',
          style: {
            display: 'flex',
            flexFlow: 'row',
            flexGrow: 'inherit',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: 'auto',
          },
        },
      },
    },
    result: {
      header: {
        container: {
          style: {
            height: '25vh', // ADD TO PADDING
          },
        },
        backButton: {
          variant: 'outlined',
          color: 'primary',
        },
      },
      body: {
        container: {
          disableGutters: true,
          maxWidth: 'tablet',
          style: {
            display: 'flex',
            flexFlow: 'row',
            flexGrow: 'inherit',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: 'auto',
          },
        },
      },
    },
  },
};

import { createGlobalStyle } from 'styled-components';

// Export global theme styles
export const GlobalStyles = createGlobalStyle`
:root {

  /* Primary color */
  --blue-1: #00566c;
  --blue-2: #00566c;
  --blue-3: #00566c;
  --blue-4: #00566c;;
  --blue-5: #00566c;
  --blue-6: #00566c;
  --blue-7: #00566c;
  --blue-8: #00566c;
  --blue-9: #00566c;
  --blue-10: #00566c;
  
  /* Primary color / Base colors */
  --base-1: #FFFFFF;
  --base-2: #F8F8F9;
  --base-3: #F0F0F2;
  --base-4: #DFE0E5;;
  --base-5: #C2C4CC;
  --base-6: #989CA6;
  --base-7: #777C8C;
  --base-8: #475166;
  --base-9: #27324D;
  --base-10: #000A28;

   /* Semantic Color / Danger */
  --danger-1: #FCF3F3;
  --danger-2: #F2C7C7;
  --danger-3: #E79D9D;;
  --danger-4: #DD7777;;
  --danger-5: #D25454;
  --danger-6: #C73434;
  --danger-7: #BD1717;
  --danger-8: #B20000;
  --danger-9: #A50000;
  --danger-10: #990000;

  --green-base: #2AA472;

  --success-7: #119262;

  

  --box-shadow-1: 0px 2px 8px rgba(0, 10, 40, 0.15);
  --box-shadow-2: 0px 4px 12px rgba(0, 10, 40, 0.15);

  --size-xl: 48px;
  --size-lg: 24px;
  --size-md: 16px;
  --size-sm: 12px;
  --size-xs: 8px;
  --size-xss: 4px; 

  /* Styled Masthead */
  --styled-masthead-background-color: #00566c;
  --styled-masthead-height: 467px;

  /* Lend Barrow Cta */
  --cta-background: rgba(39, 50, 77, 0.5);
  
  /* Market Graph */
  --box-shadow-teal: inset 0px 1px 0px #42C1CA;
  --box-shadow-yellow: inset 0px 1px 0px #FBC918;
  --box-shadow-pink: inset 0px 1px 0px #D46CA0;

}
`;

const screens = {
  screenXs: 480,
  screenSm: 576,
  screenMd: 768,
  screenLg: 992,
  screenXl: 1200,
  screenXxl: 1400,
};

const layout = {
  page: `margin:0 auto; width:100%; max-width: calc(${screens.screenXl}px + 100px); padding: 24px 50px`,
  pageNoPadding: `margin:0 auto; width:100%; max-width: calc(${screens.screenXl}px + 100px);`,
  pageWider: `margin:0 auto; width:100%; max-width: ${screens.screenXxl}px`,
  fullscreen: 'top:0;right:0;bottom:0;left:0;width:100%;position:fixed',
};

// Export theme settings and configurations
export const theme = {
  screens,
  layout,
};

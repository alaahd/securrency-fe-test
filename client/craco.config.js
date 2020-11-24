const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#00566c',
              '@layout-header-background': '#FFFFFF',
              '@layout-header-height': '56px',
              '@layout-body-background': '#E5E5E5',
              '@layout-footer-background': '#000A28',
              '@layout-header-color': '#000A28',
              '@page-header-back-color': '#FFFFFF',
              '@menu-dark-bg': 'transparent',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

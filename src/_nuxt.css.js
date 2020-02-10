/** [project-name] DEFAULT CSS */
/** this file is generated automaticly from SOJUZ CLI */
/** mode info: https://github.com/sojuz-project */
const { mode } = require(`./nuxt.layout.js`);
let outCss;
if (mode == 'default') {
  outCss = [
    /** files list start tag */
    '/app/css/global/reset/megazine.css',
    '/app/css/global/image-and-background/default.css',
    '/app/css/global/spacing/blocks-default.css',
    '/app/css/global/spacing/padding-px.css',
    '/app/css/global/aligments/default.css',
    '/app/css/global/buttons/default.css',
    '/app/css/global/header/default.css',
    '/app/css/global/font-families/poppins.css',
    '/app/css/global/font-dimentions/default.css',
    '/app/css/global/font-colors/default.css',
    '/app/css/global/background-colors/default.css',
    '/app/css/global/transitions/default.css',
    '/app/css/global/atomic-base/atomic-flex.css',
    '/app/css/global/nav-list/nav-list-px.css',
    '/app/css/global/forms/default-forms-px.css',
    '/app/css/global/notyfications/main-message.css',
    /** !files list stop tag */
  ];
} else {
  outCss = [];
}
export const css = outCss;

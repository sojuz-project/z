export const modules = {
  /* Not lazyloaded */
  // BlocksMenu,

  /* CORE GUTENBERG BLOCKS */
  coredefault: () => import(/* webpackChunkName: "default" */ '~/components/core/default'),
  coregroup: () => import(/* webpackChunkName: "columns" */ '~/components/core/Group'),
  corecolumn: () => import(/* webpackChunkName: "columns" */ '~/components/core/Column'),
  corecolumns: () => import(/* webpackChunkName: "columns" */ '~/components/core/Columns'),
  coreparagraph: () => import(/* webpackChunkName: "paragraph" */ '~/components/core/Paragraph'),
  coreimage: () => import(/* webpackChunkName: "image" */ '~/modules/images/ResponsiveImg'),
  // coreimage: () => import(/* webpackChunkName: "image" */ '~/modules/images/Image'),
  coregallery: () => import(/* webpackChunkName: "galerry" */ '~/modules/images/Gallery'),
  corecover: () => import(/* webpackChunkName: "cover" */ '~/components/core/Cover'),
  coreseparator: () => import(/* webpackChunkName: "separator" */ '~/components/core/Separator'),
  corespacer: () => import(/* webpackChunkName: "separator" */ '~/components/core/Spacer'),
  coreheading: () => import(/* webpackChunkName: "heading" */ '~/components/core/Heading'),
  corebutton: () => import(/* webpackChunkName: "spacer" */ '~/components/core/Button'),
  corelist: () => import('~/components/core/List'),
  corequote: () => import('~/components/core/Quote'),
  corepullquote: () => import('~/components/core/Pullquote'),
  coremediatext: () => import('~/components/core/MediaText'),
  coretable: () => import('~/components/core/Table'),
  coreembedyoutube: () => import('~/components/core/Embed'),
  coreembedtwitter: () => import('~/components/core/Embed'),

  /* CUSTOM GUTENBERG BLOCKS */
  sojuzgraphquery: () => import(/* webpackChunkName: "base" */ '~/components/custom/GraphQuery'),
  cgbblockwrapper: () => import(/* webpackChunkName: "base" */ '~/components/custom/Wrapper'),
  sojuzacfform: () => import(/* webpackChunkName: "base" */ '~/modules/form/AcfForm'),
  query: () => import(/* webpackChunkName: "base" */ '~/components/custom/Query'),
  ChildPost: () => import(/* webpackChunkName: "crearsy" */ '~/components/custom/ChildPost'),

  FullCalendar: () => import('~/modules/calendar/FullCalendar'),

  /* NAVIGATION */
  BlocksMenu: () => import('~/modules/navigation/BlocksMenu'),
  // MetaList: () => import('~/components/postCards/MetaList'),
  NavCategory: () => import('~/modules/navigation/NavCategory'),
  Pagination: () => import('~/modules/pagination/Pagination'),
  NavItem: () => import('~/modules/navigation/NavMenuItem'),
  NavLink: () => import('~/modules/navigation/NavLink'),
  NavItemParent: () => import('~/modules/navigation/NavMenuItemParent'),
  NavDropdown: () => import('~/modules/navigation/NavDropdown'),
  LoginMenu: () => import(/* webpackChunkName: "default" */ '~/modules/login/LoginMenu'),
  LogoutMenu: () => import(/* webpackChunkName: "default" */ '~/modules/login/LogoutMenu'),

  /* ECCOMERCE */
  CartButton: () => import(/* webpackChunkName: "default" */ '~/modules/cart/CartButton'),
  Cart: () => import('~/components/Cart'),
  AddToCart: () => import('~/modules/cart/AddToCart'),
  Sale: () => import(/* webpackChunkName: "crearsy" */ '~/components/postCards/Sale'),

  /* FORMS */
  custominput: () => import('~/modules/forms/InputField'),
  // Dropdown: () => import('~/modules/forms/Dropdown'),
  // DropdownCategory: () => import('~/modules/forms/DropdownCategory'),

  /* PROFILE */
  BillingForm: () => import(/* webpackChunkName: "profile" */ '~/modules/forms/BillingForm.vue'),
  Login: () => import(/* webpackChunkName: "login" */ '~/modules/forms/Login'),
  Register: () => import(/* webpackChunkName: "login" */ '~/modules/forms/Register'),
  ProfileBookmarks: () => import(/* webpackChunkName: "profile" */ '~/modules/profile/Bookmarks'),
  ProfileDownloads: () => import(/* webpackChunkName: "profile" */ '~/modules/profile/Downloads'),
  ProfilePurchaseHistory: () => import(/* webpackChunkName: "profile" */ '~/modules/profile/PurchaseHistory'),

  /* EXTRA  */
  PostCard: () => import(/* webpackChunkName: "crearsy" */ '~/components/postCards/PostCard'),
  SinglePost: () => import(/* webpackChunkName: "crearsy" */ '~/components/postCards/SinglePost'),
  ProductCard: () => import(/* webpackChunkName: "crearsy" */ '~/components/postCards/ProductCard'),
  ProductCardSlider: () => import(/* webpackChunkName: "crearsy" */ '~/components/postCards/ProductCardSlider'),
  SingleProduct: () => import(/* webpackChunkName: "crearsy" */ '~/components/postCards/SingleProduct'),

  /* MODULES  */
  Search: () => import('~/modules/search/Search'),
  ImgStatic: () => import('~/modules/images/ImgStatic'),
  ResponsiveImg: () => import('~/modules/images/ResponsiveImg'),
  Like: () => import('~/modules/like/Like'),
  Bookmark: () => import('~/modules/bookmark/Bookmark'),
  SocialShare: () => import('~/modules/social/SocialShareBlock'),
};

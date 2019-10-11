import Vue from 'vue';

export const CART_KEY = 'cart';
export const cartHash = () => (typeof window === 'undefined' ? '' : window.sessionStorage.cart_hash);
export const setCart = (cart) => window.sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
export const getCart = () => JSON.parse(window.sessionStorage.getItem(CART_KEY)) || [];

export const cartSession = Vue.observable({
  productsCount: 0,
});

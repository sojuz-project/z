import Vue from 'vue';

export const cartHash = () => (typeof window === 'undefined' ? '' : window.sessionStorage.cart_hash);

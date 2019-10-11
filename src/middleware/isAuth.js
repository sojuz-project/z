export default function({ app, route, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken();

  if (route.path === '/cart' && !hasToken) {
    redirect('/login');
  } else if (route.path === '/login' && hasToken) {
    redirect('/products');
  }
}

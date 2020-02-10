export default ({ req }, inject) => {
  inject('isMobile', () => {
    const userAgent = process.client ? navigator.userAgent : req.headers['user-agent'];
    return /\b(Android|Windows Phone|BlackBerry|webOS|IEMobile|iPhone|iPad|iPod)\b/i.test(userAgent);
  });
};

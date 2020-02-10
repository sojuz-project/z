<template>
  <div @click="onClick">
    <slot />
  </div>
</template>

<script>
import networks from './networks.json';

export default {
  name: 'SocialShare',
  props: {
    network: {
      type: String,
      validator: (value) =>
        [
          'facebook',
          'email',
          'linkedin',
          'odnoklassniki',
          'pinterest',
          'reddit',
          'skype',
          'telegram',
          'twitter',
          'viber',
          'vk',
          'weibo',
          'whatsapp',
          'sms',
          'sms_ios',
        ].includes(value),
      default: '',
    },
    /**
     * URL to share.
     * @var string
     */
    url: {
      type: String,
      default: process.client ? window.location.href : '',
    },

    /**
     * Sharing title, if available by network.
     * @var string
     */
    title: {
      type: String,
      default: process.client ? document.title : '',
    },

    /**
     * Sharing description, if available by network.
     * @var string
     */
    description: {
      type: String,
      default: process.client ? document.description : '',
    },

    /**
     * Facebook quote
     * @var string
     */
    // quote: {
    //   type: String,
    //   default: '',
    // },

    /**
     * Twitter hashtags
     * @var string
    //  */
    // hashtags: {
    //   type: String,
    //   default: '',
    // },

    /**
     * Twitter user.
     * @var string
     */
    // twitterUser: {
    //   type: String,
    //   default: '',
    // },

    /**
     * Pinterest Media URL.
     * Specifies the image/media to be used.
     */
    media: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      popup: {
        status: false,
        resizable: true,
        toolbar: false,
        menubar: false,
        scrollbars: false,
        location: false,
        directories: false,
        width: 626,
        height: 436,
        top: 0,
        left: 0,
        window: undefined,
        interval: null,
      },
    };
  },
  methods: {
    onClick() {
      networks[this.network].type === 'popup' ? this.share(this.network) : this.touch(this.network);
    },
    /**
     * Returns generated sharer url.
     *
     * @param network Social network key.
     */
    createSharingUrl(network) {
      const ua = navigator.userAgent.toLowerCase();

      /**
       * On IOS, SMS sharing link need a special formating
       * Source: https://weblog.west-wind.com/posts/2013/Oct/09/Prefilling-an-SMS-on-Mobile-Devices-with-the-sms-Uri-Scheme#Body-only
       */
      if (network === 'sms' && (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1)) {
        network += '_ios';
      }

      let url = networks[network].sharer;

      /**
       * On IOS, Twitter sharing shouldn't include a hashtag parameter if the hashtag value is empty
       * Source: https://github.com/nicolasbeauvais/vue-social-sharing/issues/143
       */
      if (network === 'twitter' && this.hashtags && this.hashtags.length === 0) {
        url = url.replace('&hashtags=@hashtags', '');
      }

      return url
        .replace(/@url/g, encodeURIComponent(this.url))
        .replace(/@title/g, encodeURIComponent(this.title))
        .replace(/@description/g, encodeURIComponent(this.description))
        .replace(/@quote/g, encodeURIComponent(this.quote))
        .replace(/@hashtags/g, this.generateHashtags(network, this.hashtags))
        .replace(/@media/g, this.media)
        .replace(/@twitteruser/g, this.twitterUser ? '&via=' + this.twitterUser : '');
    },
    /**
     * Encode hashtags for the specified social network.
     *
     * @param  network Social network key
     * @param  hashtags All hashtags specified
     */
    generateHashtags(network, hashtags) {
      if (network === 'facebook' && hashtags && hashtags.length > 0) {
        return '%23' + hashtags.split(',')[0];
      }

      return hashtags;
    },
    /**
     * Shares URL in specified network.
     *
     * @param network Social network key.
     */
    share(network) {
      this.openSharer(network, this.createSharingUrl(network));

      // this.$root.$emit('social_shares_open', network, this.url);
      // this.$emit('open', network, this.url);
    },

    /**
     * Touches network and emits click event.
     *
     * @param network Social network key.
     */
    touch(network) {
      window.open(this.createSharingUrl(network), '_self');

      // this.$root.$emit('social_shares_open', network, this.url);
      // this.$emit('open', network, this.url);
    },

    popupCalculate() {
      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

      const width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width;
      const height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height;

      this.popup.left = width / 2 - this.popup.width / 2 + dualScreenLeft;
      this.popup.top = height / 2 - this.popup.height / 2 + dualScreenTop;
    },

    /**
     * Opens sharer popup.
     *
     * @param network Social network key
     * @param url Url to share.
     */
    openSharer(network, url) {
      this.popupCalculate();
      // If a popup window already exist it will be replaced, trigger a close event.
      let popupWindow = null;
      if (popupWindow && this.popup.interval) {
        clearInterval(this.popup.interval);

        popupWindow.close(); // Force close (for Facebook)

        // this.$root.$emit('social_shares_change', network, this.url);
        // this.$emit('change', network, this.url);
      }

      popupWindow = window.open(
        url,
        'sharer',
        'status=' +
          (this.popup.status ? 'yes' : 'no') +
          ',height=' +
          this.popup.height +
          ',width=' +
          this.popup.width +
          ',resizable=' +
          (this.popup.resizable ? 'yes' : 'no') +
          ',left=' +
          this.popup.left +
          ',top=' +
          this.popup.top +
          ',screenX=' +
          this.popup.left +
          ',screenY=' +
          this.popup.top +
          ',toolbar=' +
          (this.popup.toolbar ? 'yes' : 'no') +
          ',menubar=' +
          (this.popup.menubar ? 'yes' : 'no') +
          ',scrollbars=' +
          (this.popup.scrollbars ? 'yes' : 'no') +
          ',location=' +
          (this.popup.location ? 'yes' : 'no') +
          ',directories=' +
          (this.popup.directories ? 'yes' : 'no')
      );

      popupWindow.focus();

      // Create an interval to detect popup closing event
      this.popup.interval = setInterval(() => {
        if (popupWindow.closed) {
          clearInterval(this.popup.interval);

          popupWindow = undefined;

          // this.$root.$emit('social_shares_close', network, this.url);
          // this.$emit('close', network, this.url);
        }
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <div
    v-if="toastMessage && toastMessage.msg"
    @click="close()"
    :class="['main-message', 'has-ultrasmall-font-size', toastMessage.type]"
  >
    <p>{{ toastMessage.msg }}</p>
    <IcoClose :blockAttrs="{ weight: 600 }" class="close" />
  </div>
</template>

<script>
export default {
  name: 'ToastMessage',
  components: {
    IcoClose: () => import('~/components/icons/Close'),
  },
  data() {
    return {
      timeout: null,
    };
  },
  methods: {
    close() {
      this.$updateToast({ msg: '' });
    },
    // toastTimeout() {
    //   if (this.timeout) {
    //     clearTimeout(this.timeout);
    //   }
    //   this.timeout = setTimeout(this.close, 30000000000000);
    // },
  },
  apollo: {
    toastMessage: {
      query: require('./getToast.gql'),
      update({ toastMessage, ...rest }) {
        // this.toastTimeout();
        return JSON.parse(toastMessage);
      },
    },
  },
};
</script>

<style scoped>
.main-message:after {
  width: 100%;
  height: 5px;
  position: absolute;
  z-index: 5;
  bottom: 0px;
  left: 0;
  content: '';
  animation: 3s toastTime linear;
}

.main-message:after {
  background-color: #00000033;
}

@keyframes toastTime {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>

<template>
  <div class="search">
    <div @click="toggleInput" v-if="!inputMode">{{ currentText }}<span class="cursor">|</span></div>
    <input @blur="toggleInput" v-else />
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      inputMode: false,
      interval: null,
      searchText: 'Search something',
      currentText: '',
    };
  },
  mounted() {
    setTimeout(this.textAnimation, 1500);
  },
  methods: {
    toggleInput() {
      this.inputMode = !this.inputMode;
    },
    textAnimation() {
      this.interval = setInterval(() => {
        if (this.searchText === this.currentText) {
          clearInterval(this.interval);
        } else {
          this.currentText += this.searchText.replace(this.currentText, '')[0];
        }
      }, 100);
    },
  },
};
</script>

<style scoped>
.search {
  font-size: 32px;
  text-align: center;
  padding: 10px 0;
}

.cursor {
  animation: cursor 1s steps(2, end) infinite;
}

@keyframes cursor {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

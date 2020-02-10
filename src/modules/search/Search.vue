<template>
  <div :class="[blockAttrs.className, 'animated-search']">
    <p @click="toggleInput" v-if="!inputMode">
      <span>{{ currentText }}</span>
      <span class="cursor">|</span>
    </p>
    <div class="flex search">
      <input v-model="search" @keyup.enter="sendSearchForm" @input="runQuery" v-show="inputMode" autofocus />
      <!-- <button @click="sendSearchForm" v-if="inputMode" type="submit">send</button> -->
    </div>
    <div v-if="suggestions.length > 0" class="suggestions nav-v-list inner-border closed l-hg-300 p-0-20i">
      <p v-for="(item, i) in suggestions" :key="i">
        <nuxt-link :to="`/search/${item.text}`">
          {{ item.text }}
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      inputMode: false,
      interval: null,
      searchText: this.blockAttrs.placecholder ? this.blockAttrs.placecholder : 'Search something',
      currentText: '',
      search: '',
      suggestions: [],
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
    runQuery(e) {
      this.$apollo
        .query({
          query: require('./suggest.gql'),
          fetchPolicy: 'no-cache',
          variables: { query: e.target.value },
        })
        .then(({ data }) => {
          this.suggestions = data.suggest.post_title[0].options;
        })
        .catch((response) => console.log('apollo reeor', response));
    },
    sendSearchForm() {
      this.$router.push({ query: { search: this.search } });
    },
  },
};
</script>

<style scoped>
.animated-search p {
  /* padding: 10px 0; */
  border-bottom: 1px solid #ccc;
}
.animated-search input {
  margin-bottom: 0px;
}
.block .animated-search .suggestions {
  margin-top: -1px;
}
.block .animated-search .suggestions a {
  font-size: 14px;
  font-weight: normal;
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

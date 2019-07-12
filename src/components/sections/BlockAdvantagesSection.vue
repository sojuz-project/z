<template>
  <section :style="{ 'background-color': attrs.backgroundColor }">
    <HeaderTitle
      v-scroll-reveal="$root.initialRoute ? { distance: '20px', delay: 100 } : { opacity:100 }"
      class="title"
      :title="attrs.title"
      :i="iteration"
    />
    <ul
      v-scroll-reveal="$root.initialRoute ? { distance: '20px', delay: 200 } : { opacity:100 }"
      class="list"
    >
      <li
        v-for="(item, i) in attrs.gallery"
        :key="i"
        :class="{'active':( activeSlideIndex === i ),'inactive':( activeSlideIndex !== i )}"
        @click="changeSlideList(i)"
      >
      <span v-html="item.content"></span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 2.8em">
          <g
          fill="#E93558"
          stroke="#E93558"
          stroke-width="1">
            <rect
            x="0.5"
            y="0.5"
            width="98%"
            height="2.8em"
            rx="1.3em"
            fill="none"></rect>
          </g>
        </svg>
      </li>
    </ul>
    <ul
      v-scroll-reveal="$root.initialRoute ? { distance: '20px', delay: 300 } : { opacity:100 }"
      class="content"
    >
      <li
        v-for="(item, i) in attrs.gallery"
        :key="i"
        :class="['nav-li',{'active':( activeSlideIndex === i ),'inactive':( activeSlideIndex !== i )}]"
      >
        <div v-if="activeSlideIndex === i" v-scroll-reveal.reset="{ distance: '20px' }">
          <p v-html="item.description"/>
          <Thumbnail :item="item.image" width="50vw"/>
        </div>
      </li>
    </ul>
    <div v-if="iteration===0" class="first-footer">
      <img src="~/assets/Scroll-icon.svg" alt="scroll">
    </div>
  </section>
</template>

<script>
import Thumbnail from '~/components/Thumbnail'
import HeaderTitle from '~/components/HeaderTitle'
import(`~/css/${process.env.STYLE_BASE}/grid/advantages-grid.css`)
import(`~/css/${process.env.STYLE_BASE}/decorate/advantages-decorate.css`)

export default {
  components: {
    Thumbnail,
    HeaderTitle
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({})
    },
    iteration: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      activeSlideIndex: 0
    }
  },
  methods: {
    changeSlideList: function (index) {
      this.activeSlideIndex = index
    }
  }
}
</script>

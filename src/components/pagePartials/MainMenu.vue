<template>
  <div class="main-menu">
    <ul v-if="menus" :style="{ background }">
      <li v-for="(item, i) in menus.items" :key="i">
        <div v-if="item.children.length > 0" class="sub-menu">
          <span :class="['dorp-down-item']" @click="(e) => activeSubmenu(e)">
            {{ item.navitem.post_title }}
            <svg :style="{ fill: '#ccc' }" width="10px" height="10px" viewBox="0 0 1000 1000">
              <path d="M 751.7,499.9 261.6,10 216.4,59.2 657.1,500 212.3,940.8 261.5,990 Z" />
            </svg>
          </span>
          <ul :style="{ background }">
            <li
              v-for="(subitem, j) in item.children"
              :key="j"
              @click="
                (e) => {
                  clear(e);
                  hideMobile(e);
                }
              "
            >
              <nuxt-link :to="{ path: `/${subitem.navitem.post_name}` }" class="menu-link">
                {{ subitem.navitem.post_title }}
              </nuxt-link>
            </li>
          </ul>
        </div>

          <nuxt-link @click="
            (e) => {
              clear(e);
              hideMobile(e);
            }
          "
            v-if="item.children.length === 0"
            :to="{ path: `/${item.navitem.post_name}` }"
            :aria-label="`Read more about ${item.navitem.post_name}`"
            class="menu-link"
          >
            {{ item.navitem.post_title }}
          </nuxt-link>

      </li>
      <li class="bold">
        <nuxt-link 
          v-if="!$apolloHelpers.getToken()" 
          :to="{ path: `${$route.path === '/' || $route.name === 'modal' ? '' : $route.path}/modal/login` }" >
          Login / Register
        </nuxt-link>
      </li>
      <li class="action">
        <cart-button />
      </li>
      <li v-if="$apolloHelpers.getToken()" class="action has-light-gray-background-color">
        <div class="sub-menu" @click="(e) => activeSubmenu(e)">
          <div class="overlay"></div>
         <IcoUser :attrs="{weight:200, fill:'none'}"/>
          <ul>
            <li class=""><nuxt-link :to="{ path: `/panel/bookmarks` }" >My wishlist</nuxt-link></li>
            <li class=""><nuxt-link :to="{ path: `/panel/downloads` }" >My downloads</nuxt-link></li>
            <li class=""><nuxt-link :to="{ path: `/panel/program` }" >Affiliate program</nuxt-link></li>
            <li class="spaced"><nuxt-link :to="{ path: `/panel/settings` }" >Account settings</nuxt-link></li>
            <li class="spaced dark"><a @click="() => { $apolloHelpers.onLogout(); }" >Log out</a></li>
          </ul>
        </div>
      </li>
    </ul>
    
    <div class="mobile">
      <div @click="(e) => showMobile(e)" class="show">
        <svg :style="{ fill: '#ccc' }" width="15px" height="15px" viewBox="0 0 1000 1000">
          <path
            d="M 70 123.46484 L 69.804688 193.1875 L 928.99609 194.52734 L 928.99609 124.94922 L 70 123.46484 z M 69.804688 463.1875 L 69.611328 532.91211 L 928.80078 534.25 L 928.80078 464.67188 L 69.804688 463.1875 z M 69.804688 803.1875 L 69.611328 872.91211 L 928.80078 874.25195 L 928.80078 804.67188 L 69.804688 803.1875 z "
          />
        </svg>
      </div>
      <div @click="(e) => hideMobile(e)" class="hide">
        <svg :style="{ fill: '#ccc' }" width="15px" height="15px" viewBox="0 0 1000 1000">
          <path
            d="M 119.43945,74.30078 70,123.46484 445.51562,499.85938 69.07031,875.33008 118.23438,924.76953 494.70117,549.18164 870.33984,925.69922 919.53906,876.5 544.01758,500.00391 920.4707,124.42969 871.26953,75.23047 494.8457,450.67969 Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import Menus from '~/gql/menus.gql';
import CartButton from '~/components/ecommerce/CartButton';

export default {
  components: {
    IcoUser: () => import('~/components/icons/User'),
    CartButton,
  },
  props: {
    background: {
      type: String,
      default: '',
    },
  },
  apollo: {
    menus: {
      variables: {
        name: 'main-menu',
      },
      query: Menus,
    },
  },
  methods: {
    /* DOM operations for dropdown menu */
    showMobile: function(e) {
      e.target.closest('.main-menu').classList.add('open-mobile');
    },
    hideMobile: function(e) {
      e.target.closest('.main-menu').classList.remove('open-mobile');
    },
    activeSubmenu: function(e) {
      this.clear(e);
      e.target.parentElement.classList.add('active');
    },
    clear: function(e) {
      Array.from(e.target.closest('.main-menu').querySelectorAll('.sub-menu')).map((item) => {
        item.classList.remove('active');
      });
    },
  },
};
</script>

<template>
  <ul class="sidebar-menu">
    <li><nuxt-link :to="{ path: `/panel/profile` }">Profile settings</nuxt-link></li>
    <li><nuxt-link :to="{ path: `/panel/billing` }">Billing informations</nuxt-link></li>
    <li><nuxt-link :to="{ path: `/panel/notyficatons` }">Email notyficatons</nuxt-link></li>
    <li><nuxt-link :to="{ path: `/panel/downloads` }">My downloads</nuxt-link></li>
    <li><nuxt-link :to="{ path: `/panel/bookmarks` }">My wishelist</nuxt-link></li>
    <li><nuxt-link :to="{ path: `/panel/purchasehistory` }">Purchase history</nuxt-link></li>
  </ul>
</template>

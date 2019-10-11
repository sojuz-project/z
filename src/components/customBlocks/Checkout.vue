<template>
  <div>
    <div v-if="!attrs.reasignTo">
      component wrapper
    </div>
    <div v-if="attrs.reasignTo" :is="attrs.reasignTo"></div>
    <div
      v-if="attrs.overlayColor"
      :style="{
        opacity: attrs.overlayOpacity,
        backgroundColor: attrs.overlayColor,
      }"
      class="overlay"
    ></div>
  </div>
</template>

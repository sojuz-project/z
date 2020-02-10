<template>
  <transition name="fade" appear>
    <slot />
  </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 2s;
  transform: translateY(0);
  transition-delay: 300ms;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

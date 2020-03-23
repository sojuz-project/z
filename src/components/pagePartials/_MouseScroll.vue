<template>
  <div class="mouse-scroll">
    <a
      href="#section-1"
      class="mouse-scroll-animaion__wrapper"
      :aria-label="`Scroll down to next section`"
      :style="{color}"
    >
      <svg xmlns="http://www.w3.org/2000/svg"  width="22.925" height="43.667" viewBox="0 0 22.925 53.667">
        <defs>
          <style>.a,.b,.d{fill:none;}.a{stroke:#fff;}.c,.e{stroke:none;}.e{fill:#fff;}</style>
        </defs>
        <g class="mouse-scroll-animation__mouse" transform="translate(-731 -968)">
          <g class="a" transform="translate(731 968)">
            <rect :style="{stroke:color}" class="c" width="22.925" height="43.667" rx="11.463"/>
            <rect
              :style="{stroke:color,fill:color}"
              fill-opacity="0.2"
              class="d"
              x="0.5"
              y="0.5"
              width="21.925"
              height="42.667"
              rx="10.963"/>
          </g>
          <g class="b mouse-scroll-animation__circle" transform="translate(740.279 975.642)">
            <path :style="{fill:color}" class="c" d="M2.183,0A2.183,2.183,0,0,1,4.367,2.183V7.642A2.183,2.183,0,0,1,0,7.642V2.183A2.183,2.183,0,0,1,2.183,0Z"/>
            <path :style="{fill:color}" class="e" d="M 2.183334350585938 1.000001907348633 C 1.530844449996948 1.000001907348633 1.000004291534424 1.530841827392578 1.000004291534424 2.183332443237305 L 1.000004291534424 7.641672134399414 C 1.000004291534424 8.294162750244141 1.530844449996948 8.825002670288086 2.183334350585938 8.825002670288086 C 2.835824489593506 8.825002670288086 3.366664409637451 8.294162750244141 3.366664409637451 7.641672134399414 L 3.366664409637451 2.183332443237305 C 3.366664409637451 1.530841827392578 2.835824489593506 1.000001907348633 2.183334350585938 1.000001907348633 M 2.183334350585938 1.9073486328125e-06 C 3.389154434204102 1.9073486328125e-06 4.366664409637451 0.9775123596191406 4.366664409637451 2.183332443237305 L 4.366664409637451 7.641672134399414 C 4.366664409637451 8.847492218017578 3.389154434204102 9.825002670288086 2.183334350585938 9.825002670288086 C 0.9775142669677734 9.825002670288086 4.291534423828125e-06 8.847492218017578 4.291534423828125e-06 7.641672134399414 L 4.291534423828125e-06 2.183332443237305 C 4.291534423828125e-06 0.9775123596191406 0.9775142669677734 1.9073486328125e-06 2.183334350585938 1.9073486328125e-06 Z"/>
          </g>
        </g>
      </svg>
    </a>
    <div class="mouse-scroll-text">SCROLL</div>
  </div>
</template>
<script>
export default {
  props: [ 'color' ]
}
</script>
<style>
.mouse-scroll{
   text-align: center;
}
.mouse-scroll-text{
  text-align: center;
  font-size:9px;
  margin-bottom:-3em;
}
.mouse-scroll-animaion__wrapper {
  position: relative;
  display: inline-block;
  transform: scale(0.8);
  text-decoration: none;
  text-align: center;
}

.mouse-scroll-animaion__wrapper:after {
  position: absolute;
  content: '';
  width: 18.925px;
  box-sizing: border-box;
  height: 35.667px;
  border-radius: 30px;
  left: 2px;
  animation: mouse-scroll-animation__mouse-after 1s infinite;
  animation-delay: 2s;
}

.mouse-scroll-animation__mouse {
  animation: mouse-scroll-animation__mouse 2s infinite, mouse-scroll-animation__mouse-hover-out 2s;
  stroke-dashoffset: 120;
  stroke-dasharray: 120;
}

.mouse-scroll-animaion__wrapper:hover .mouse-scroll-animation__mouse {
  animation: mouse-scroll-animation__mouse 2s infinite, mouse-scroll-animation__mouse-hover 1s;
}

.mouse-scroll-animaion__wrapper:hover .mouse-scroll-animation__mouse {
  stroke-dashoffset: 0;
}

.mouse-scroll-animation__circle {
  position: relative;
  top: 15px;
  opacity: 1;
  animation: mouse-scroll-animation__circle 2s infinite;
}

@keyframes mouse-scroll-animation__mouse {
  0% {transform: translate(-731px, -968px);}
  50% {transform: translate(-731px, -958px);}
  100% {transform: translate(-731px, -968px);}
}

@keyframes mouse-scroll-animation__mouse-after {
  0% {top: 0;}
  50% {top: 8.8px;}
  100% {top: 0;}
}

@keyframes mouse-scroll-animation__mouse-hover {
  0% {stroke-dashoffset: 120;}
  100% {stroke-dashoffset: 0;}
}

@keyframes mouse-scroll-animation__mouse-hover-out {
  0% {stroke-dashoffset: 0;}
  100% {stroke-dashoffset: 120;}
}

@keyframes mouse-scroll-animation__circle {
  0% {transform: translate(740.279px, 975.642px); opacity: 1;}
  50%, 100% {transform: translate(740.279px, 985.642px); opacity: 0;}
}
</style>

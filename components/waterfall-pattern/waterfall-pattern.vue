<template>
  <div
    class="waterfall"
    :class="{[theme]: theme}"
  />
</template>

<script setup lang="ts">
interface WaterfallProperties {
  theme: "heartbeat" | "line" | "circle" | "lava";
}

withDefaults(defineProps<WaterfallProperties>(), {
  theme: "line",
});

</script>

<style lang="scss" scoped>
$waterfall-width: 200px;

.waterfall {
  overflow: hidden;
  position: relative;
  width: $waterfall-width;
  height: 100%;

  &.heartbeat {
    background: linear-gradient(180deg, #FF31316B, #F760BEB0);
    &::after {
      position: absolute;
      background: linear-gradient(180deg, #FFB6CD 0%, #f87ea1 37.36%);
      box-shadow: 0 3px 15px rgba(147, 141, 141, 0.14);
      content: "";
      width: 200px;
      height: 200px;
      left: 50%;
      transform-origin: left;
      transform: translateX(-50%);
      scale: 1;
      border-radius: 100%;
      animation: 5s ease-in-out heartbeat infinite alternate;
    }
  }

  &.circle {
    background: linear-gradient(180deg, #FCEAF5 0%, #F567BD 100%);

    &::after {
      position: absolute;
      background: linear-gradient(-90deg, #FAB7E0 0%, #FE6A80 100%);
      content: "";
      height: 100vh;
      top: 0;
      right: 0;
      width: 100vh;
      border-radius: 50%;
      animation: 15s linear circle infinite alternate;
    }
  }

  &.lava {
    background: linear-gradient(180deg, #5968F4, #5d80fc, #5968F4);
    //display: flex;
    //flex-direction: column;
    //align-items: center;
    background-size: 100% 100vh;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      height: 200px;
      content: "";
      background: linear-gradient(180deg, rgba(255, 101, 101, 0.00) 0%, #69adfa 100%);
      //border-radius: 100% 0 0 100%;
      border-radius: 100%;
      background-blend-mode: color-burn;
      animation: 30s linear rectangle-item infinite alternate;
      will-change: transform, border-radius;
    }
  }

  &.line {
    background: #FFCACA;

    &::after {
      position: absolute;
      content: "";
      top: -50%;
      left: 0;
      right: 0;
      bottom: 100%;
      background: linear-gradient(180deg, rgba(255, 101, 101, 0.00) 0%, #FA6969 100%);
      border-radius: 0px 0px 500px 500px;
      animation: 10s linear waterfall infinite;
    }
  }
}

@keyframes heartbeat {
  from {
    scale: 1;
  }

  25% {
    scale: 1.5;
  }

  50% {
    scale: 1;
  }

  to {
    scale: 10;
    opacity: 0.5;
    rotate: -30deg;
  }
}

@keyframes waterfall {
  from {
    transform: translateY(0%)
  }
  to {
    transform: translateY(calc(100vh + 300px))
  }
}

@keyframes circle {
  from {
    transform: translateX(0)
  }
  to {
    transform: translateX(-$waterfall-width)
  }
}

@keyframes rectangle-item {
  from {
    scale: 1;
  }
  33% {
    transform: skew(2deg);
  }
  50% {
    rotate: 180deg;
    transform: skewX(3deg) skewY(5deg);
    scale: 0.88;
  }
  66% {
    transform: skew(17deg);
  }
  to {
    translate: 0 calc(100vh - 300px);
    transform: skew(8deg);
    scale: 1;
  }
}

@include theme-dark {
  .waterfall {
    &.circle {
      background: linear-gradient(180deg, #0EAA9F 0%, #52A4BE 100%, #1397A2 100%);
      &::after {
        background: linear-gradient(180deg, #09BB9B 32.73%, #1783A5 79.84%);
      }
    }
    &.lava {
      background: linear-gradient(180deg, #F29730, #F29D2D, #F29730);
      &::after {
        background: linear-gradient(180deg, rgba(255, 101, 101, 0.00) 0%, #F8C816 100%);
      }
    }
    .line {
      background: rgb(40, 201, 97);
      &::after {
        background: linear-gradient(180deg, rgba(0,0,0,0), #32e87c);
      }
    }
    .heartbeat {
      background: linear-gradient(180deg, #4C8993 0%, rgba(77, 169, 139, 0.94) 68.63%);
      &::after {
        background: linear-gradient(180deg, #82C152, #76BB69, #4DA58C);
      }
    }
  }
}
</style>

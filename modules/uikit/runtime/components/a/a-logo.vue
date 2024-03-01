<template>
  <svg
    viewBox="0 0 55 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="background"
      cx="27.5"
      cy="27.5"
      r="27.5"
    />
    <circle
      class="foreground"
      cx="36"
      cy="36"
      r="16"
    />
    <defs>
      <linearGradient
        id="linear-light-theme-1"
        x1="27.5"
        y1="0"
        x2="27.5"
        y2="55"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FF0000" />
        <stop
          offset="1"
          stop-color="#FFBFBF"
          stop-opacity="0.44"
        />
      </linearGradient>
      <linearGradient
        id="linear-light-theme-2"
        x1="36"
        y1="20"
        x2="23.5"
        y2="42.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#F368CC" />
        <stop
          offset="1"
          stop-color="#FF00B8"
          stop-opacity="0"
        />
      </linearGradient>

      <linearGradient
        id="linear-dark-theme-1"
        x1="27.5"
        y1="0"
        x2="27.5"
        y2="55"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#0CC0A5" />
        <stop
          offset="1"
          stop-color="#73D2F0"
          stop-opacity="0.44"
        />
      </linearGradient>
      <linearGradient
        id="linear-dark-theme-2"
        x1="36"
        y1="20"
        x2="23.5"
        y2="42.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#D9D11E" />
        <stop
          offset="1"
          stop-color="#0CC0A5"
          stop-opacity="0"
        />
      </linearGradient>
    </defs>
  </svg>
</template>

<style lang="scss" scoped>
.background {
  fill: url(#linear-light-theme-1);
}

.foreground {
  fill: url(#linear-light-theme-2);
}

@include theme-dark {
  .background {
    fill: url(#linear-dark-theme-1);
  }

  .foreground {
    fill: url(#linear-dark-theme-2);
  }
}
</style>

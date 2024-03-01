<template>
  <table class="post-content-table">
    <slot />
  </table>
</template>

<style lang="scss">
.post-content-table {
  border-spacing: 0;
  background: var(--color-neutral-2);
  border-radius: 4px;
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;

}

//td {
//  border: solid 1px #000;
//  border-style: none solid solid none;
//  padding: 10px;
//}

@include theme-dark {
  .post-content-table {
    background: var(--color-neutral-10);
  }
}
</style>

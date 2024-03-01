<template>
  <code class="code">
    <slot />
  </code>
</template>

<style lang="scss" scoped>
.code {
  display: inline-block;
  line-height: 1;
  font-family: 'JetBrains Mono', Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
  font-size: 16px;
  color: var(--color-red-dark);
  background: var(--color-neutral-3);
  //border: 1.5px solid var(--color-red-normal);
  padding: 2px 5px;
  margin: 0 3px;
  border-radius: 4px;
}

@include theme-dark {
  .code {
    color: var(--color-green-normal);
    background: var(--color-neutral-9);
  }
}
</style>

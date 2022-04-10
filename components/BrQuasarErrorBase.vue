<template>
  <q-page padding>
    <h3><slot name="title" /></h3>
    <slot />
    <slot name="contact" />
  </q-page>
</template>

<script>
export default {
  name: 'BrQuasarErrorBase'
};
</script>

<style>
</style>

<script setup>
import BasicExample from './BasicExample.vue';

</script>

<template>
  <BasicExample/>
</template>

<style scoped>
.test-item
{
  padding: 10px;
  background-color: red;
  border:1px solid #dcdcdc;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

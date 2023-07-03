<script setup>
import DraggableTransitionElement from './components/DraggableTransitionElement.vue';
import { reactive, onMounted,ref } from 'vue';

const items = ref([]);
onMounted(()=>
{
  items.value.push({text:"test 1"});
  items.value.push({text:"test 2"});
  

})

</script>

<template>
  <DraggableTransitionElement tag="div" name="test" v-model="items" item-key="text">
    <template  v-slot:item="item" draggable="true">
      <div  class="test-item">
        <p>{{ item.item.text }}</p>
      </div>
    </template>
    
  </DraggableTransitionElement>
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

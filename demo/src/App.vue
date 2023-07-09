<script setup>
import { DraggableTransitionElement } from 'simple-draggable-component-vue';
import BasicExample from './components/BasicExample.vue'
import { reactive, onMounted,ref } from 'vue';

const items = ref([]);
onMounted(()=>
{
  
  
  

})

</script>

<template>
  <div class="container">
    <ul class="nav nav-tabs">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#basic-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link " id="home-tab" data-bs-toggle="tab" data-bs-target="#clone-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="basic-tab-pane" role="tabpanel">
          <BasicExample/>

      </div>
    
      <div class="tab-pane fade show active" id="clone-tab-pane" role="tabpanel">...</div>
      </div>
  </div>
</template>

<style lang="scss" scoped>
  .container
  {
    margin-top: 100px;
  }
</style>

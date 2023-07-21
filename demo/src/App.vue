<script setup>
import { DraggableTransitionElement } from 'simple-draggable-component-vue';
import BasicExample from './components/BasicExample.vue';
import CssExample from './components/CssExample.vue';
import CloneExample from './components/CloneExample.vue';


import TransitionsExample from './components/TransitionsExample.vue'

import { reactive, onMounted,ref } from 'vue';

const items = ref([]);
onMounted(()=>
{
  
  
  

})

</script>

<template>
  <div class="container">
    <h1>simple-draggable-component-vue</h1>
    <ul class="nav nav-tabs">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#basic-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Basic</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link " id="home-tab" data-bs-toggle="tab" data-bs-target="#transitions-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Transitions </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#css-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">CSS customization</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#clone-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Clone</button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="basic-tab-pane" role="tabpanel">
          <BasicExample/>

        </div>
      
        <div class="tab-pane fade" id="transitions-tab-pane" role="tabpanel">
          <TransitionsExample/>
        </div>
        <div class="tab-pane fade" id="css-tab-pane" role="tabpanel">
          <CssExample/>
        </div>
        <div class="tab-pane fade" id="clone-tab-pane" role="tabpanel">
          <CloneExample/>
        </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>
  .container
  {
    h1{

      margin-top: 40px;
      margin-bottom: 40px;
    }
  }
</style>

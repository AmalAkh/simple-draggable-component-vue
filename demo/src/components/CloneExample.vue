<script setup>
import  {DraggableElement}  from 'simple-draggable-component-vue';
import { onMounted, reactive } from 'vue';
import generateItems from './../utils/generate_items.js';

let [items1,items2] = generateItems();
const group1 = reactive({items:items1});
const group2 = reactive({items:items2});

onMounted(()=>
{
    
    
})
function cloneToGroup1(item)
{   
    alert("Cloned!");
    group2.items.splice(group2.items.indexOf(item),1);
    return item;
}
function cloneToGroup2(item)
{   
    alert("Cloned!");

    group1.items.splice(group1.items.indexOf(item),1);
    return item;
}



</script>
<template>
    <div class="container">
        <div class="column">
            <DraggableElement  :clone="cloneToGroup1"  class="group-1-dragable" item-key="id" v-model="group1.items">
                <template #item="{item}">
                    <div class="drag-item">
                        <p>{{ item.name }}</p>
                    </div>
                </template> 
            </DraggableElement >
        </div>
        <div class="column">

            <DraggableElement :clone="cloneToGroup2" class="group-2-dragable" item-key="id" v-model="group2.items">
                <template #item="{item}">
                    <div class="drag-item">
                        <p>{{ item.name }}</p>
                    </div>
                </template> 
            </DraggableElement >
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .container
    {
        display: flex;
        
    }
    .column
    {
        flex:6;
        margin: 10px;
        border-radius: 10px;
        overflow: hidden;
        
    }
    .group-1-dragable
    {
        display: flex;
        flex-direction: column;
    }
    .group-2-dragable
    {
        display: flex;
        flex-direction: column;
    }
    
</style>
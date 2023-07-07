<script setup>
import  DraggableTransitionElement from './components/DraggableTransitionElement.vue';
import  DraggableElement from './components/DraggableElement.vue';

import { onMounted, reactive,ref } from 'vue';
function generateId()
{
    return String(Math.round(Math.random()*100000));
}
function generateItems()
{
    let group1 = [];
    let group2 = [];
    for(let i = 0 ; i < 10; i++)
    {
        group1.push(reactive({name:`item ${i+1}`, id:generateId()}));
    }
    for(let i = 10 ; i < 20; i++)
    {
        group2.push(reactive({name:`item ${i+1}`, id:generateId()}));
    }
    return [group1, group2]
}
const isDragging = ref(false);
let [items1,items2] = generateItems();
const group1 = reactive({items:items1});
const group2 = reactive({items:items2});

onMounted(()=>
{
    
    
})
function cloneToGroup1(item)
{   
    

    group2.items.splice(group2.items.findIndex(it=>it.id == item.id),1);
    
   
    return item;
    
}
function cloneToGroup2(item)
{   
    group1.items.splice(group1.items.findIndex(it=>it.id == item.id),1);
   
    
    return item;
}



</script>
<template>
    <div class="container">
        <div class="column">
            <DraggableTransitionElement  name="list" :clone="cloneToGroup1"  item-key="id" v-model="group1.items">
                <template #item="{item}">
                    <div class="drag-item"   >
                        <p>{{ item.name }}</p>
                    </div>
                </template> 
            </DraggableTransitionElement >
        </div>
        <div class="column">

            <DraggableTransitionElement tag="div" name="list" :clone="cloneToGroup2" item-key="id" v-model="group2.items">
                <template #item="{item}">
                    <div class="drag-item">
                        <p>{{ item.name }}</p>
                    </div>
                </template> 
                
            </DraggableTransitionElement >
        </div>
    </div>
</template>
<style lang="scss">
.list-move, /* apply transition to moving elements */
    .list-enter-active,
    .list-leave-active {
        transition: all 200ms ;
    }

    .list-enter-from,
    .list-leave-to {
    opacity: 0;
    transform: scale(0);
 
    }

    /* ensure leaving items are taken out of layout flow so that moving
    animations can be calculated correctly. */
    .list-leave-active {
    position: absolute;
    }
    .drag-item
    {
        background-color: #e7e7e7;
        border:1px solid #dcdcdc;
        width:100%;
        
        padding: 10px;
        opacity: 1;
        &.moving
        {

            background-color: blue !important;
        }
        p
        {
            margin-bottom: 0px;
        }
    }
    .dragging
    {
        .drag-item
        {
            
            background-color: red;
            width:100%;
        }  

    }
    .sdcv-moving
    {
        .drag-item
        {
            

            background-color: rgb(51, 0, 255);
            width:100%;
        } 
    }
    .container
    {
        display: flex;
    }
    .column
    {
        flex:6;
        padding: 10px;
        
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
    .temporary
    {
        .drag-item
        {
            background-color: blue;
        }
        
    }
    
</style>
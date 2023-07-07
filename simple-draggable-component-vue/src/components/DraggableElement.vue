<script>
import EventBus from "../utils/event_bus";
export default  
{
    
    
    props:
    {
        modelValue:{},
        group:
        {
            type:String
        },
        
        put:
        {
            type:Boolean,
            default:true
        },
        clone:
        {
            type:Function,
            default:function(item)
            {
                return item;
            }
        },
        itemKey:
        {
            type:String,
            required:true
        },
        tag:
        {
            type:String,
            default:"div"
        },
        name:
        {
            type:String,
            required:true
        },
        enabled:
        {
            type:Boolean, 
            
            default:true
        }
        
    },
    data(){return{elId:"",dragEnded:true,blocked:false,draggable:false, dragover:false,draggingItemIndex:-1,draggingItemKey:"", activeItems:[], shadowActiveItems:[], transitioning:false, isAdded:false}},
    methods:
    {
        
        dragStart(index)
        {
          
            this.dragEnded = false;
            this.draggingItemIndex=index
            this.draggingItemKey = this.activeItems[index][this.itemKey];
            window.draggableElementIsDragging = true;
            window.draggableElementDraggingObject = this.activeItems[index];
            window.draggableElementGroup = this.group;
            window.draggingElementInitalElementId = this.elId
           
            this.$emit("movestart",this.activeItems[index],index);
            console.log("dragstared")
            this.updateShadowItems();

            
        },
        dragEnd()
        {
            this.draggingItemIndex=-1
            this.draggingItemKey = "";
            this.dragEnded = true;

            window.draggableElementIsDragging = false;
            window.draggableElementDraggingObject = null;
            window.draggableElementGroup = "";
            window.draggableElementIsDragging = false;
            window.draggingElementInitalElementId = "";
            this.isAdded = false;
            this.updateShadowItems();

            
            //debugger;
            
            this.$emit("moveend");
            
        },
        changePosition(index)
        {
        
            console.log(this.draggingItemIndex);
               
            if(index != this.draggingItemIndex && this.draggingItemIndex != -1 && (!this.transitioning && !this.blocked) )
            {
                
                
                this.blocked = true;
                let cont = this.activeItems[index];
                let cont2 = this.activeItems[this.draggingItemIndex];
                
                this.activeItems[index] = cont2;
                this.activeItems[this.draggingItemIndex] = cont;
                this.shadowActiveItems[index] = {isActive:true};
                this.shadowActiveItems[this.draggingItemIndex] = {isActive:false}
                
                this.$emit("moved",this.draggingItemIndex, index, this.activeItems[this.draggingItemIndex])
                this.draggingItemIndex = index;

                setTimeout(()=>
                {
                    this.blocked = false;
                },50)
                this.$emit("update:modelValue", this.activeItems);
                
            }else if(this.draggingItemIndex == -1 && window.draggableElementIsDragging)
            {
                if(!this.isAdded && (this.group == window.draggableElementGroup || this.group == undefined) && (this.put || this.elId == window.draggingElementInitalElementId) && this.enabled)
                {
                
                    this.blocked = true;
          
                    this.draggingItemIndex = index;
                    this.dragEnded = false;
                    let newItems = [];
                    let newShadowItems = [];
                   
                    for(let i = 0; i < this.activeItems.length+1;i++)
                    {
                        
                        if(i == index)
                        {
                            
                            newItems.push(this.clone(window.draggableElementDraggingObject));
                            newShadowItems.push({isActive:true});
                            

                        }else if(i > index)
                        {
                            

                            newItems.push(this.activeItems[i-1]);
                            newShadowItems.push({isActive:false});

                        }
                        else
                        {
                            

                            newItems.push(this.activeItems[i]);
                            newShadowItems.push({isActive:false});
                            
                        }
                    }
                   
                    
                  
                 

                    this.draggingItemKey = newItems[index][this.itemKey];
                    console.log("drag key changed");
                    this.activeItems = newItems;
                    this.$emit("update:modelValue", this.activeItems);
                    EventBus.emit("cloned", this.elId);
                    
                    this.isAdded = true;
                    this.dragEnded = false;

                    setTimeout(()=>
                    {
                        this.blocked = false;
                    
                    },90)
                    
                    
                }
            }
            
                
                
        },
        drop()
        {
            this.updateShadowItems();
            this.draggingItemIndex = -1;
            this.draggingItemKey = "";
            this.isAdded = false;
            this.blocked = false;      
            

          
        },
        updateShadowItems()
        {
            this.shadowActiveItems = [];
            for(let i in this.activeItems)
            {
                this.shadowActiveItems.push({isActive:false});
            }
        }
    },

    mounted()
    {
        this.activeItems = this.modelValue;
        
        this.updateShadowItems();
        this.elId = String(Math.ceil(Math.random()*10000000));
        EventBus.on("cloned", (elId)=>
        {
            
            //this.$emit("update:modelValue", this.activeItems);
           
            if(elId != this.elId)
            {
                this.updateShadowItems();
                
                this.draggingItemIndex = -1;
                this.draggingItemKey = "";
                this.isAdded = false;
                this.blocked = false;
       
            }
           
        })

    },
    watch:
    {
        modelValue()
        {
            this.activeItems = this.modelValue;
            this.updateShadowItems();


        }
    }
}
</script>
<template>
   
    <component :is="tag" :class="{'disabled':!enabled}">
      <div  v-for="(item,index) in shadowActiveItems" :draggable="enabled"  :key="activeItems[index][itemKey]" :class="{'sdcv-dragging':draggingItemKey==activeItems[index][itemKey], 'sdcv-moving':item.isActive }" @dragstart="dragStart(index)" @dragend="dragEnd" @dragover.prevent="changePosition(index)" @transitionrun="transitioning=true" @transitionstart="transitioning=true"  @transitionend="transitioning=false" @transitioncancel="transitioning=false"   @dragleave.prevent.stop="" @drop="drop"  >
          <slot name="item" :item="activeItems[index]">
              
          </slot>
      </div>
    </component>
    
      
    
    
</template>
<style lang="scss" scoped>
.disabled:hover
    {
        cursor:not-allowed;
    }
</style>
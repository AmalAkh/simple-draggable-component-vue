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
            
            this.updateShadowItems();
            this.$emit("movestart",index,this.activeItems[index]);
       
            
        },
        dragEnd()
        {
            let index = this.draggingItemIndex;
          
            
            this.draggingItemIndex=-1
            this.draggingItemKey = "";
            this.dragEnded = true;

            window.draggableElementIsDragging = false;
            window.draggableElementDraggingObject = null;
            window.draggableElementGroup = "";
            window.draggableElementIsDragging = false;
            window.draggingElementInitalElementId = "";
            this.isAdded = false;
            this.isInnerMutation = false;
       
            
            
            this.updateShadowItems();
           
            

            
        },
        changePosition(index)
        {
        
            
            if(index != this.draggingItemIndex && this.draggingItemIndex != -1 && (!this.transitioning && !this.blocked) && this.enabled )
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
             
                this.isInnerMutation = true;

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
                    this.shadowActiveItems = [];
                   
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
                    
                    this.activeItems = newItems;
                    this.isInnerMutation = true;

        
                    this.$emit("update:modelValue", this.activeItems);
                    EventBus.emit("cloned",this.elId);
                    this.$emit("cloned",index, this.activeItems[index]);

                    this.shadowActiveItems = newShadowItems;
                    this.shadowActiveItems[index].isActive = true;
                    
                    this.isAdded = true;
                    this.dragEnded = false;

                   
                    
                }
            }
            
                
                
        },
        drop()
        {
            this.updateShadowItems();
            this.$emit("moveend", this.draggingItemIndex,this.activeItems[this.draggingItemIndex]);
            
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
        },
        transitionEnd()
        {
            this.transitioning=false;
            this.blocked = false;
         
        },
        transitionCancel()
        {
            this.transitioning=false;
      
            
        }

        
    },
    mounted()
    {
        this.activeItems = this.modelValue;
        this.updateShadowItems();

        this.elId = String(Math.ceil(Math.random()*10000000));
        EventBus.on("cloned", (elId)=>
        {
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
        modelValue:
        {
           handler()
           {
                this.activeItems = this.modelValue;
          
                if(!this.isInnerMutation)
                {
                    
                    this.updateShadowItems();
                  
                }
                else
                {
                    
                    this.isInnerMutation = false;

                }
                
           },
           deep:true
        }
    }
}
</script>
<template>
    <transition-group :tag="tag"  :name="name" :class="{'disabled':!enabled}">
      
      <div style="cursor: grab;"   v-for="(item,index) in shadowActiveItems" :draggable="enabled"  :key="activeItems[index][itemKey]" :class="{'sdcv-dragging':draggingItemKey==activeItems[index][itemKey], 'sdcv-moving':item.isActive }" @dragstart="dragStart(index)" @dragend="dragEnd" @dragover.prevent="changePosition(index)" @transitionrun="transitioning=true" @transitionstart="transitioning=true"  @transitionend="transitionEnd" @transitioncancel="transitionCancel"   @dragleave.prevent.stop="" @drop="drop"  >
          <slot name="item" :item="activeItems[index]" >
              
          </slot>
      </div>
      
    </transition-group>
    
</template>
<style lang="scss" scoped>
    .sdcv-moving
    {
        cursor: grabbing !important;
    }
    .sdcv-dragging
    {
        cursor: grabbing !important;

    }
    .disabled:hover
    {
        cursor:not-allowed;
    }
</style>
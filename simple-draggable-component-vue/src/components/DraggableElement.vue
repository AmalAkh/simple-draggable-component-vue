<script>
import EventBus from "../utils/EventBus";
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
        }
        
    },
    data(){return{elId:"",dragEnded:true,blocked:false,draggable:false, dragover:false,draggingItemIndex:-1,draggingItemKey:"", activeItems:[], transitioning:false, isAdded:false}},
    methods:
    {
        
        dragStart(index)
        {
            console.log("started");
            this.dragEnded = false;
            this.draggingItemIndex=index
            this.draggingItemKey = this.activeItems[index][this.itemKey];
            window.draggableElementIsDragging = true;
            window.draggableElementDraggingObject = this.activeItems[index];
            window.draggableElementGroup = this.group;
            window.draggingElementInitalElementId = this.elId
            this.$emit("movestart",this.activeItems[index],index);
       
            
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
            console.log("dragend")
            //debugger;
            
            this.$emit("moveend");
            
        },
        changePosition(index)
        {
        
            
            if(index != this.draggingItemIndex && this.draggingItemIndex != -1 && (!this.transitioning && !this.blocked) )
            {
                
                
                this.blocked = true;
                let cont = this.activeItems[index];
                let cont2 = this.activeItems[this.draggingItemIndex];
              
                this.activeItems[index] = cont2;
                this.activeItems[this.draggingItemIndex] = cont;

                
                this.$emit("moved",this.draggingItemIndex, index, this.activeItems[this.draggingItemIndex])
                this.draggingItemIndex = index;

                setTimeout(()=>
                {
                    this.blocked = false;
                },50)
                this.$emit("update:modelValue", this.activeItems);
                console.log("moveee");
               
            }else if(this.draggingItemIndex == -1 && window.draggableElementIsDragging)
            {
                
                if(!this.isAdded && (this.group == window.draggableElementGroup || this.group == undefined) && (this.put || this.elId == window.draggingElementInitalElementId))
                {
                
                    this.blocked = true;
          
                    this.draggingItemIndex = index;
                    this.dragEnded = false;
                    let newItems = [];
                   
                    for(let i = 0; i < this.activeItems.length+1;i++)
                    {
                        
                        if(i == index)
                        {
                            
                            newItems.push(this.clone(window.draggableElementDraggingObject));
                         
                            

                        }else if(i > index)
                        {
                            

                            newItems.push(this.activeItems[i-1]);

                        }
                        else
                        {
                            

                            newItems.push(this.activeItems[i]);
                            
                        }
                    }
                   
                    
                  
                 

                    this.draggingItemKey = newItems[index][this.itemKey];
                    
                    this.activeItems = newItems;
                    this.$emit("update:modelValue", this.activeItems);
                    EventBus.emit("cloned", this.elId);
                    
                    this.isAdded = true;
                    this.dragEnded = false;

                    setTimeout(()=>
                    {
                        this.blocked = false;
                        console.log("changed")
                    },90)
                    
                    
                }
            }
            
                
                
        },
        drop()
        {
            
            this.draggingItemIndex = -1;
            this.draggingItemKey = "";
            this.isAdded = false;
            this.blocked = false;      
            

          
        },
        test()
        {

        }
        
    },
    mounted()
    {
        this.activeItems = this.modelValue;
        this.elId = String(Math.ceil(Math.random()*10000000));
        EventBus.on("cloned", (elId)=>
        {
            if(elId != this.elId)
            {
               
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
            
        }
    }
}
</script>
<template>
   
      
      <div  v-for="(item,index) in activeItems"  :key="item[itemKey]" :class="{'dragging':draggingItemKey==item[itemKey] }" @dragstart="dragStart(index)" @dragend="dragEnd" @dragover.prevent="changePosition(index)" @transitionrun="transitioning=true" @transitionstart="transitioning=true"  @transitionend="transitioning=false" @transitioncancel="transitioning=false"   @dragleave.prevent.stop="" @drop="drop"  >
          <slot name="item" :item="item">
              
          </slot>
      </div>
      
    
    
</template>
<style lang="scss" scoped>
.empty-target-zone
{
    flex:auto;
    background-color: gray;
}
</style>
(function(a,i){typeof exports=="object"&&typeof module<"u"?i(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],i):(a=typeof globalThis<"u"?globalThis:a||self,i(a.SimpleDraggableComponentVue={},a.Vue))})(this,function(a,i){"use strict";var D=Object.defineProperty;var k=(a,i,d)=>i in a?D(a,i,{enumerable:!0,configurable:!0,writable:!0,value:d}):a[i]=d;var u=(a,i,d)=>(k(a,typeof i!="symbol"?i+"":i,d),d);const o=class{static emit(e,...n){for(let m of o._events[e])m(...n)}static on(e,n){Object.keys(o._events).includes(e)&&o._events[e].push(n)}};let d=o;u(d,"_events",{});const K="",I=(t,e)=>{const n=t.__vccOpts||t;for(const[m,g]of e)n[m]=g;return n},c={props:{modelValue:{},group:{type:String},put:{type:Boolean,default:!0},clone:{type:Function,default:function(t){return t}},itemKey:{type:String,required:!0},tag:{type:String,default:"div"},name:{type:String,required:!0}},data(){return{elId:"",dragEnded:!0,blocked:!1,draggable:!1,dragover:!1,draggingItemIndex:-1,draggingItemKey:"",activeItems:[],transitioning:!1,isAdded:!1}},methods:{dragStart(t){console.log("started"),this.dragEnded=!1,this.draggingItemIndex=t,this.draggingItemKey=this.activeItems[t][this.itemKey],window.draggableElementIsDragging=!0,window.draggableElementDraggingObject=this.activeItems[t],window.draggableElementGroup=this.group,window.draggingElementInitalElementId=this.elId,this.$emit("movestart",this.activeItems[t],t)},dragEnd(){this.draggingItemIndex=-1,this.draggingItemKey="",this.dragEnded=!0,window.draggableElementIsDragging=!1,window.draggableElementDraggingObject=null,window.draggableElementGroup="",window.draggableElementIsDragging=!1,window.draggingElementInitalElementId="",this.isAdded=!1,console.log("dragend"),this.$emit("moveend")},changePosition(t){if(t!=this.draggingItemIndex&&this.draggingItemIndex!=-1&&!this.transitioning&&!this.blocked){this.blocked=!0;let e=this.activeItems[t],n=this.activeItems[this.draggingItemIndex];this.activeItems[t]=n,this.activeItems[this.draggingItemIndex]=e,this.$emit("moved",this.draggingItemIndex,t,this.activeItems[this.draggingItemIndex]),this.draggingItemIndex=t,setTimeout(()=>{this.blocked=!1},50),this.$emit("update:modelValue",this.activeItems),console.log("moveee")}else if(this.draggingItemIndex==-1&&window.draggableElementIsDragging&&!this.isAdded&&(this.group==window.draggableElementGroup||this.group==null)&&(this.put||this.elId==window.draggingElementInitalElementId)){this.blocked=!0,this.draggingItemIndex=t,this.dragEnded=!1;let e=[];for(let n=0;n<this.activeItems.length+1;n++)n==t?e.push(this.clone(window.draggableElementDraggingObject)):n>t?e.push(this.activeItems[n-1]):e.push(this.activeItems[n]);this.draggingItemKey=e[t][this.itemKey],this.activeItems=e,this.$emit("update:modelValue",this.activeItems),d.emit("cloned",this.elId),this.isAdded=!0,this.dragEnded=!1,setTimeout(()=>{this.blocked=!1,console.log("changed")},90)}},drop(){this.draggingItemIndex=-1,this.draggingItemKey="",this.isAdded=!1,this.blocked=!1},test(){}},mounted(){this.activeItems=this.modelValue,this.elId=String(Math.ceil(Math.random()*1e7)),d.on("cloned",t=>{t!=this.elId&&(this.draggingItemIndex=-1,this.draggingItemKey="",this.isAdded=!1,this.blocked=!1)})},watch:{modelValue(){this.activeItems=this.modelValue}}},f=["onDragstart","onDragover"];function p(t,e,n,m,g,r){return i.openBlock(),i.createBlock(i.TransitionGroup,{tag:n.tag,name:n.name},{default:i.withCtx(()=>[(i.openBlock(!0),i.createElementBlock(i.Fragment,null,i.renderList(g.activeItems,(l,h)=>(i.openBlock(),i.createElementBlock("div",{key:l[n.itemKey],class:i.normalizeClass({dragging:g.draggingItemKey==l[n.itemKey]}),onDragstart:s=>r.dragStart(h),onDragend:e[0]||(e[0]=(...s)=>r.dragEnd&&r.dragEnd(...s)),onDragover:i.withModifiers(s=>r.changePosition(h),["prevent"]),onTransitionrun:e[1]||(e[1]=s=>g.transitioning=!0),onTransitionstart:e[2]||(e[2]=s=>g.transitioning=!0),onTransitionend:e[3]||(e[3]=s=>g.transitioning=!1),onTransitioncancel:e[4]||(e[4]=s=>g.transitioning=!1),onDragleave:e[5]||(e[5]=i.withModifiers(()=>{},["prevent","stop"])),onDrop:e[6]||(e[6]=(...s)=>r.drop&&r.drop(...s))},[i.renderSlot(t.$slots,"item",{item:l},void 0,!0)],42,f))),128))]),_:3},8,["tag","name"])}const v=I(c,[["render",p],["__scopeId","data-v-e76761a0"]]),S="",w={props:{modelValue:{},group:{type:String},put:{type:Boolean,default:!0},clone:{type:Function,default:function(t){return t}},itemKey:{type:String,required:!0},tag:{type:String,default:"div"},name:{type:String,required:!0}},data(){return{elId:"",dragEnded:!0,blocked:!1,draggable:!1,dragover:!1,draggingItemIndex:-1,draggingItemKey:"",activeItems:[],transitioning:!1,isAdded:!1}},methods:{dragStart(t){console.log("started"),this.dragEnded=!1,this.draggingItemIndex=t,this.draggingItemKey=this.activeItems[t][this.itemKey],window.draggableElementIsDragging=!0,window.draggableElementDraggingObject=this.activeItems[t],window.draggableElementGroup=this.group,window.draggingElementInitalElementId=this.elId,this.$emit("movestart",this.activeItems[t],t)},dragEnd(){this.draggingItemIndex=-1,this.draggingItemKey="",this.dragEnded=!0,window.draggableElementIsDragging=!1,window.draggableElementDraggingObject=null,window.draggableElementGroup="",window.draggableElementIsDragging=!1,window.draggingElementInitalElementId="",this.isAdded=!1,console.log("dragend"),this.$emit("moveend")},changePosition(t){if(t!=this.draggingItemIndex&&this.draggingItemIndex!=-1&&!this.transitioning&&!this.blocked){this.blocked=!0;let e=this.activeItems[t],n=this.activeItems[this.draggingItemIndex];this.activeItems[t]=n,this.activeItems[this.draggingItemIndex]=e,this.$emit("moved",this.draggingItemIndex,t,this.activeItems[this.draggingItemIndex]),this.draggingItemIndex=t,setTimeout(()=>{this.blocked=!1},50),this.$emit("update:modelValue",this.activeItems),console.log("moveee")}else if(this.draggingItemIndex==-1&&window.draggableElementIsDragging&&!this.isAdded&&(this.group==window.draggableElementGroup||this.group==null)&&(this.put||this.elId==window.draggingElementInitalElementId)){this.blocked=!0,this.draggingItemIndex=t,this.dragEnded=!1;let e=[];for(let n=0;n<this.activeItems.length+1;n++)n==t?e.push(this.clone(window.draggableElementDraggingObject)):n>t?e.push(this.activeItems[n-1]):e.push(this.activeItems[n]);this.draggingItemKey=e[t][this.itemKey],this.activeItems=e,this.$emit("update:modelValue",this.activeItems),d.emit("cloned",this.elId),this.isAdded=!0,this.dragEnded=!1,setTimeout(()=>{this.blocked=!1,console.log("changed")},90)}},drop(){this.draggingItemIndex=-1,this.draggingItemKey="",this.isAdded=!1,this.blocked=!1},test(){}},mounted(){this.activeItems=this.modelValue,this.elId=String(Math.ceil(Math.random()*1e7)),d.on("cloned",t=>{t!=this.elId&&(this.draggingItemIndex=-1,this.draggingItemKey="",this.isAdded=!1,this.blocked=!1)})},watch:{modelValue(){this.activeItems=this.modelValue}}},E=["onDragstart","onDragover"];function b(t,e,n,m,g,r){return i.openBlock(!0),i.createElementBlock(i.Fragment,null,i.renderList(g.activeItems,(l,h)=>(i.openBlock(),i.createElementBlock("div",{key:l[n.itemKey],class:i.normalizeClass({dragging:g.draggingItemKey==l[n.itemKey]}),onDragstart:s=>r.dragStart(h),onDragend:e[0]||(e[0]=(...s)=>r.dragEnd&&r.dragEnd(...s)),onDragover:i.withModifiers(s=>r.changePosition(h),["prevent"]),onTransitionrun:e[1]||(e[1]=s=>g.transitioning=!0),onTransitionstart:e[2]||(e[2]=s=>g.transitioning=!0),onTransitionend:e[3]||(e[3]=s=>g.transitioning=!1),onTransitioncancel:e[4]||(e[4]=s=>g.transitioning=!1),onDragleave:e[5]||(e[5]=i.withModifiers(()=>{},["prevent","stop"])),onDrop:e[6]||(e[6]=(...s)=>r.drop&&r.drop(...s))},[i.renderSlot(t.$slots,"item",{item:l},void 0,!0)],42,E))),128)}const y=I(w,[["render",b],["__scopeId","data-v-92109a50"]]);a.DraggableElement=y,a.DraggableTransitionElement=v,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});

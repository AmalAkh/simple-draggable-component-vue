# simple-draggable-component-vue
 Simple draggable component for VueJS 3.x

 ## Demo
 [Demo](https://amalakh.github.io/simple-draggable-component-vue-demo/)

## Installation

```
npm i simple-draggable-component-vue
```

## Usage

### Basic example
```
<DraggableElement v-model="items">
    <template #item="{item}">
       <div>
           <p>{{ item.name }}</p>
       </div>
    </template> 
</DraggableElement >
```

### Example with transitions
```
<DraggableTransitionElement name="list" item-key="id" v-model="items">
    <template #item="{item}">
       <div>
           <p>{{ item.name }}</p>
       </div>
    </template> 
</DraggableTransitionElement >
```
### Props

**modelValue** <br>
type: Array <br>
required: false 
<br><br>
An array of objects
<br><br><br>

**name** (exist only in DraggableTransitionElement) <br>
type: String <br>
required: true 
<br><br>
Name of the transition class
<br><br><br>

**itemKey** (exist only in DraggableTransitionElement) <br>
type: String <br>
required: true 
<br><br>
Name of the object property to determine an unique id for every element of the list. Property of the object have to be String
<br><br><br>


**enabled** <br>
type: Boolean <br>
required: false<br>
default:true
<br><br>
Determine if the element is enabled
<br><br><br>

**put** <br>
type: Boolean <br>
required: false<br>
default:true
<br><br>
Determine if it is possible to put an element here
<br><br><br>

**clone** <br>
type: Function <br>
required: false<br>
default:function(item)
{
   return item;
}
<br><br>
Function for clonning an element. Have to return an object.
<br><br><br>

**tag** <br>
type: String <br>
required: false<br>
default:"div"
<br><br>
Tag name for wrapping items
<br><br><br>

**group** <br>
type: String <br>
required: false<br>
default:null
<br><br>
Group name. When two draggable elements have different names, you can't clone items from one to another.
<br><br><br>

**modelValue** <br>
type: Array <br>
required: false<br>
default:null
<br><br>
Array of the items
<br><br><br>


### Events


**movestart**

Triggers when item starts moving

Example:

```
function movestart(index, item)
{
 //...
}
```
index - item index<br>
item - moving item

<br><br><br>


**moveend**

Triggers when item stop moving

Example:

```
function moveend(index, items)
{
 //...
}
```
index - item index<br>
items - moving item

<br><br><br>



**moved**

Triggers when item changes its position 

Example:

```
function moved(prevIndex, newIndex, item)
{
 //...
}
```
prevIndex - previous index<br>
newIndex - new index<br>
item - current item <br>

**cloned**

Triggers, when item is cloned. Triggers in the component, on which it was droped

Example:

```
function cloned(index, item)
{
 //...
}
```
index - current index
item - current item <br>


<br><br><br>


### CSS customization
<br><br>
You can customize appearance of the dragging elements by these two classes
<br><br>
```
    .sdcv-dragging
    {
        //for element which is moved by cursor;
    }
    .sdcv-moving
    {
        //for element that is in the element;
    }
```






















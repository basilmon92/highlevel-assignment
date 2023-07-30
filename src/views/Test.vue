<template>
    <div class="flowchart-builder">
        <draggable class="flowchart-canvas" v-model="flowchartItems"
            :options="{ group: 'flowchart', animation: 150, direction: 'vertical' }">
            <div v-for="item in flowchartItems" :key="item.id" class="flowchart-item">
                <div class="flowchart-item-content">
                    {{ item.text }}
                    <span class="delete-btn" @click="deleteItem(item)">X</span>
                </div>
                <draggable v-if="item.condition" class="flowchart-children" v-model="item.children"
                    :options="{ group: 'flowchart', animation: 150, direction: 'vertical' }">
                    <div v-for="child in item.children" :key="child.id" class="flowchart-child-item">
                        <div class="flowchart-item-content">
                            {{ child.text }}
                            <span class="delete-btn" @click="deleteItem(item, child)">X</span>
                        </div>
                    </div>
                </draggable>
            </div>
            <div v-if="showIfElseItem" class="flowchart-item if-else-item">
                <div class="flowchart-item-content">
                    Does the contact match the following condition?
                    <span class="delete-btn" @click="cancelIfElseItem">X</span>
                </div>
            </div>
        </draggable>
        <div class="add-item-section">
            <button @click="addItem('Send Email')">Add Send Email</button>
            <button @click="addItem('Send SMS')">Add Send SMS</button>
        </div>
        <div class="add-if-else-section">
            <button @click="addIfElseItem">Add If/Else</button>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data () {
    return {
      flowchartItems: [],
      ifElseChildren: [],
      showIfElseItem: false
    }
  },
  methods: {
    addItem (text) {
      this.flowchartItems.push({
        id: Date.now(),
        text,
        condition: false,
        children: []
      })
    },
    addIfElseItem () {
      this.ifElseChildren.push({
        id: Date.now(),
        text: 'Yes',
        condition: false,
        children: []
      })
      this.ifElseChildren.push({
        id: Date.now() + 1,
        text: 'No',
        condition: false,
        children: []
      })
      this.flowchartItems.push({
        id: Date.now(),
        text: 'Does the contact match the following condition?',
        condition: true,
        children: this.ifElseChildren
      })
      this.ifElseChildren = []
      this.showIfElseItem = false
    },
    deleteItem (parentItem, itemToDelete) {
      if (itemToDelete) {
        parentItem.children = parentItem.children.filter(
          (child) => child.id !== itemToDelete.id
        )
      } else {
        this.flowchartItems = this.flowchartItems.filter(
          (item) => item.id !== parentItem.id
        )
      }
    },
    deleteIfElseChild (child) {
      this.ifElseChildren = this.ifElseChildren.filter(
        (item) => item.id !== child.id
      )
    },
    cancelIfElseItem () {
      this.ifElseChildren = []
      this.showIfElseItem = false
    }
  }
}
</script>

<style>
.flowchart-builder {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.flowchart-canvas {
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    min-height: 300px;
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.flowchart-item {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 10px;
    margin: 10px;
    border-radius: 8px;
    cursor: grab;
    width: 180px;
    text-align: center;
    position: relative;
    z-index: 1;
}

.flowchart-children {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.flowchart-grandchildren {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.flowchart-item-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.flowchart-item-content .delete-btn {
    cursor: pointer;
    color: red;
    margin-left: 5px;
}

.add-item-section {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.add-item-section button {
    cursor: pointer;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    margin: 5px;
}

.add-if-else-section {
    display: flex;
    align-items: center;
}

.add-if-else-section button {
    cursor: pointer;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    margin: 5px;
}

.flowchart-child-item,
.flowchart-grandchild-item {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 8px;
    margin: 5px;
    border-radius: 8px;
    cursor: grab;
    width: 150px;
    text-align: center;
    position: relative;
    z-index: 1;
}

.flowchart-item::before,
.flowchart-child-item::before,
.flowchart-grandchild-item::before {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: -10px;
    width: 1px;
    height: 10px;
    background-color: #ccc;
}

.flowchart-children::before {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: 0;
    width: 1px;
    height: 5px;
    background-color: #ccc;
}

.flowchart-children::after {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: 5px;
    width: 100%;
    height: 1px;
    background-color: #ccc;
}

.flowchart-grandchildren::before {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: 0;
    width: 1px;
    height: 5px;
    background-color: #ccc;
}

.flowchart-grandchildren::after {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: 5px;
    width: 100%;
    height: 1px;
    background-color: #ccc;
}

.flowchart-children::after {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: 5px;
    width: 1px;
    height: 100%;
    background-color: #ccc;
    z-index: -1;
}

.flowchart-grandchildren::after {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: 5px;
    width: 1px;
    height: 100%;
    background-color: #ccc;
    z-index: -1;
}
</style>

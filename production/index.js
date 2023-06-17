var E = Object.defineProperty;
var b = (t, e, i) => e in t ? E(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var u = (t, e, i) => (b(t, typeof e != "symbol" ? e + "" : e, i), i);
import { openBlock as o, createBlock as y, TransitionGroup as D, withCtx as K, createElementBlock as I, Fragment as v, renderList as c, normalizeClass as f, withModifiers as h, renderSlot as w } from "vue";
const m = class {
  static emit(e, ...i) {
    for (let r of m._events[e])
      r(...i);
  }
  static on(e, i) {
    Object.keys(m._events).includes(e) && m._events[e].push(i);
  }
};
let d = m;
u(d, "_events", {});
const p = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
}, k = {
  props: {
    modelValue: {},
    group: {
      type: String
    },
    put: {
      type: Boolean,
      default: !0
    },
    clone: {
      type: Function,
      default: function(t) {
        return t;
      }
    },
    itemKey: {
      type: String,
      required: !0
    },
    tag: {
      type: String,
      default: "div"
    },
    name: {
      type: String,
      required: !0
    }
  },
  data() {
    return { elId: "", dragEnded: !0, blocked: !1, draggable: !1, dragover: !1, draggingItemIndex: -1, draggingItemKey: "", activeItems: [], transitioning: !1, isAdded: !1 };
  },
  methods: {
    dragStart(t) {
      console.log("started"), this.dragEnded = !1, this.draggingItemIndex = t, this.draggingItemKey = this.activeItems[t][this.itemKey], window.draggableElementIsDragging = !0, window.draggableElementDraggingObject = this.activeItems[t], window.draggableElementGroup = this.group, window.draggingElementInitalElementId = this.elId, this.$emit("movestart", this.activeItems[t], t);
    },
    dragEnd() {
      this.draggingItemIndex = -1, this.draggingItemKey = "", this.dragEnded = !0, window.draggableElementIsDragging = !1, window.draggableElementDraggingObject = null, window.draggableElementGroup = "", window.draggableElementIsDragging = !1, window.draggingElementInitalElementId = "", this.isAdded = !1, console.log("dragend"), this.$emit("moveend");
    },
    changePosition(t) {
      if (t != this.draggingItemIndex && this.draggingItemIndex != -1 && !this.transitioning && !this.blocked) {
        this.blocked = !0;
        let e = this.activeItems[t], i = this.activeItems[this.draggingItemIndex];
        this.activeItems[t] = i, this.activeItems[this.draggingItemIndex] = e, this.$emit("moved", this.draggingItemIndex, t, this.activeItems[this.draggingItemIndex]), this.draggingItemIndex = t, setTimeout(() => {
          this.blocked = !1;
        }, 50), this.$emit("update:modelValue", this.activeItems), console.log("moveee");
      } else if (this.draggingItemIndex == -1 && window.draggableElementIsDragging && !this.isAdded && (this.group == window.draggableElementGroup || this.group == null) && (this.put || this.elId == window.draggingElementInitalElementId)) {
        this.blocked = !0, this.draggingItemIndex = t, this.dragEnded = !1;
        let e = [];
        for (let i = 0; i < this.activeItems.length + 1; i++)
          i == t ? e.push(this.clone(window.draggableElementDraggingObject)) : i > t ? e.push(this.activeItems[i - 1]) : e.push(this.activeItems[i]);
        this.draggingItemKey = e[t][this.itemKey], this.activeItems = e, this.$emit("update:modelValue", this.activeItems), d.emit("cloned", this.elId), this.isAdded = !0, this.dragEnded = !1, setTimeout(() => {
          this.blocked = !1, console.log("changed");
        }, 90);
      }
    },
    drop() {
      this.draggingItemIndex = -1, this.draggingItemKey = "", this.isAdded = !1, this.blocked = !1;
    },
    test() {
    }
  },
  mounted() {
    this.activeItems = this.modelValue, this.elId = String(Math.ceil(Math.random() * 1e7)), d.on("cloned", (t) => {
      t != this.elId && (this.draggingItemIndex = -1, this.draggingItemKey = "", this.isAdded = !1, this.blocked = !1);
    });
  },
  watch: {
    modelValue() {
      this.activeItems = this.modelValue;
    }
  }
}, S = ["onDragstart", "onDragover"];
function T(t, e, i, r, s, g) {
  return o(), y(D, {
    tag: i.tag,
    name: i.name
  }, {
    default: K(() => [
      (o(!0), I(v, null, c(s.activeItems, (a, l) => (o(), I("div", {
        key: a[i.itemKey],
        class: f({ dragging: s.draggingItemKey == a[i.itemKey] }),
        onDragstart: (n) => g.dragStart(l),
        onDragend: e[0] || (e[0] = (...n) => g.dragEnd && g.dragEnd(...n)),
        onDragover: h((n) => g.changePosition(l), ["prevent"]),
        onTransitionrun: e[1] || (e[1] = (n) => s.transitioning = !0),
        onTransitionstart: e[2] || (e[2] = (n) => s.transitioning = !0),
        onTransitionend: e[3] || (e[3] = (n) => s.transitioning = !1),
        onTransitioncancel: e[4] || (e[4] = (n) => s.transitioning = !1),
        onDragleave: e[5] || (e[5] = h(() => {
        }, ["prevent", "stop"])),
        onDrop: e[6] || (e[6] = (...n) => g.drop && g.drop(...n))
      }, [
        w(t.$slots, "item", { item: a }, void 0, !0)
      ], 42, S))), 128))
    ]),
    _: 3
  }, 8, ["tag", "name"]);
}
const x = /* @__PURE__ */ p(k, [["render", T], ["__scopeId", "data-v-e76761a0"]]);
const _ = {
  props: {
    modelValue: {},
    group: {
      type: String
    },
    put: {
      type: Boolean,
      default: !0
    },
    clone: {
      type: Function,
      default: function(t) {
        return t;
      }
    },
    itemKey: {
      type: String,
      required: !0
    },
    tag: {
      type: String,
      default: "div"
    },
    name: {
      type: String,
      required: !0
    }
  },
  data() {
    return { elId: "", dragEnded: !0, blocked: !1, draggable: !1, dragover: !1, draggingItemIndex: -1, draggingItemKey: "", activeItems: [], transitioning: !1, isAdded: !1 };
  },
  methods: {
    dragStart(t) {
      console.log("started"), this.dragEnded = !1, this.draggingItemIndex = t, this.draggingItemKey = this.activeItems[t][this.itemKey], window.draggableElementIsDragging = !0, window.draggableElementDraggingObject = this.activeItems[t], window.draggableElementGroup = this.group, window.draggingElementInitalElementId = this.elId, this.$emit("movestart", this.activeItems[t], t);
    },
    dragEnd() {
      this.draggingItemIndex = -1, this.draggingItemKey = "", this.dragEnded = !0, window.draggableElementIsDragging = !1, window.draggableElementDraggingObject = null, window.draggableElementGroup = "", window.draggableElementIsDragging = !1, window.draggingElementInitalElementId = "", this.isAdded = !1, console.log("dragend"), this.$emit("moveend");
    },
    changePosition(t) {
      if (t != this.draggingItemIndex && this.draggingItemIndex != -1 && !this.transitioning && !this.blocked) {
        this.blocked = !0;
        let e = this.activeItems[t], i = this.activeItems[this.draggingItemIndex];
        this.activeItems[t] = i, this.activeItems[this.draggingItemIndex] = e, this.$emit("moved", this.draggingItemIndex, t, this.activeItems[this.draggingItemIndex]), this.draggingItemIndex = t, setTimeout(() => {
          this.blocked = !1;
        }, 50), this.$emit("update:modelValue", this.activeItems), console.log("moveee");
      } else if (this.draggingItemIndex == -1 && window.draggableElementIsDragging && !this.isAdded && (this.group == window.draggableElementGroup || this.group == null) && (this.put || this.elId == window.draggingElementInitalElementId)) {
        this.blocked = !0, this.draggingItemIndex = t, this.dragEnded = !1;
        let e = [];
        for (let i = 0; i < this.activeItems.length + 1; i++)
          i == t ? e.push(this.clone(window.draggableElementDraggingObject)) : i > t ? e.push(this.activeItems[i - 1]) : e.push(this.activeItems[i]);
        this.draggingItemKey = e[t][this.itemKey], this.activeItems = e, this.$emit("update:modelValue", this.activeItems), d.emit("cloned", this.elId), this.isAdded = !0, this.dragEnded = !1, setTimeout(() => {
          this.blocked = !1, console.log("changed");
        }, 90);
      }
    },
    drop() {
      this.draggingItemIndex = -1, this.draggingItemKey = "", this.isAdded = !1, this.blocked = !1;
    },
    test() {
    }
  },
  mounted() {
    this.activeItems = this.modelValue, this.elId = String(Math.ceil(Math.random() * 1e7)), d.on("cloned", (t) => {
      t != this.elId && (this.draggingItemIndex = -1, this.draggingItemKey = "", this.isAdded = !1, this.blocked = !1);
    });
  },
  watch: {
    modelValue() {
      this.activeItems = this.modelValue;
    }
  }
}, A = ["onDragstart", "onDragover"];
function V(t, e, i, r, s, g) {
  return o(!0), I(v, null, c(s.activeItems, (a, l) => (o(), I("div", {
    key: a[i.itemKey],
    class: f({ dragging: s.draggingItemKey == a[i.itemKey] }),
    onDragstart: (n) => g.dragStart(l),
    onDragend: e[0] || (e[0] = (...n) => g.dragEnd && g.dragEnd(...n)),
    onDragover: h((n) => g.changePosition(l), ["prevent"]),
    onTransitionrun: e[1] || (e[1] = (n) => s.transitioning = !0),
    onTransitionstart: e[2] || (e[2] = (n) => s.transitioning = !0),
    onTransitionend: e[3] || (e[3] = (n) => s.transitioning = !1),
    onTransitioncancel: e[4] || (e[4] = (n) => s.transitioning = !1),
    onDragleave: e[5] || (e[5] = h(() => {
    }, ["prevent", "stop"])),
    onDrop: e[6] || (e[6] = (...n) => g.drop && g.drop(...n))
  }, [
    w(t.$slots, "item", { item: a }, void 0, !0)
  ], 42, A))), 128);
}
const G = /* @__PURE__ */ p(_, [["render", V], ["__scopeId", "data-v-92109a50"]]);
export {
  G as DraggableElement,
  x as DraggableTransitionElement
};

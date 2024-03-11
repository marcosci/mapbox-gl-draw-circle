// import SelectFeatureMode, {
//   drawStyles as selectFeatureDrawStyles,
// } from "mapbox-gl-draw-select-mode";
// import defaultDrawStyle from "https://unpkg.com/@mapbox/mapbox-gl-draw@1.3.0/src/lib/theme.js";

import CircleMode, { drawStyles } from "./src/index";

import "./index.css";

let map, draw, drawBar;

map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/light-v11", // style URL
  center: [7.743189929905293, 48.09744836188367],
  zoom: 10, // starting zoom
  accessToken:
    "pk.eyJ1IjoibWFyY28tc2NpYWluaSIsImEiOiJja3hhdTNqeTAxM2dpMnJxY3hlODdna2FlIn0.ca84aO5lB8kRqzAoNZQvfg",
});

draw = new MapboxDraw({
  modes: {
    ...MapboxDraw.modes,
    draw_circle: CircleMode.CircleMode,
  },
  displayControlsDefault: false,
  controls: {},
  styles: drawStyles,
  userProperties: true,
});

class extendDrawBar {
  constructor(opt) {
    const ctrl = this;
    ctrl.draw = opt.draw;
    ctrl.buttons = opt.buttons || [];
    ctrl.onAddOrig = opt.draw.onAdd;
    ctrl.onRemoveOrig = opt.draw.onRemove;
  }
  onAdd(map) {
    const ctrl = this;
    ctrl.map = map;
    ctrl.elContainer = ctrl.onAddOrig(map);
    ctrl.buttons.forEach((b) => {
      ctrl.addButton(b);
    });
    return ctrl.elContainer;
  }
  onRemove(map) {
    const ctrl = this;
    ctrl.buttons.forEach((b) => {
      ctrl.removeButton(b);
    });
    ctrl.onRemoveOrig(map);
  }
  addButton(opt) {
    const ctrl = this;
    const elButton = document.createElement("button");
    elButton.className = "mapbox-gl-draw_ctrl-draw-btn";
    if (opt.classes instanceof Array) {
      opt.classes.forEach((c) => {
        elButton.classList.add(c);
      });
    }
    elButton.addEventListener(opt.on, opt.action);
    elButton.title = opt.title;
    ctrl.elContainer.appendChild(elButton);
    opt.elButton = elButton;
  }
  removeButton(opt) {
    opt.elButton.removeEventListener(opt.on, opt.action);
    opt.elButton.remove();
  }
}

window.draw = draw;

drawBar = new extendDrawBar({
  draw: draw,
  buttons: [
    {
      on: "click",
      action: () => {
        console.log("draw_line_string");
        draw.changeMode("draw_circle");
      },
      classes: ["fg-circle-o"],
      title: "Draw Circular Polygon (c)",
    },
  ],
});

map.once("load", () => {
  map.resize();
  map.addControl(drawBar, "top-right");
  console.log(draw);

  map.on("draw.update", function (e) {
    console.log("🚀 ~ file: index.js ~ line 158 ~ e", e);
  });
});

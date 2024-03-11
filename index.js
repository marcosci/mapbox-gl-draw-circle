import CircleMode, { drawStyles } from "./src/index";
import DrawRectangle from "@geostarters/mapbox-gl-draw-rectangle-assisted-mode";
import SplitPolygonMode, {
  drawStyles as splitPolygonDrawStyles,
} from "mapbox-split-polygon-mode";
import {
  SnapPolygonMode,
  SnapPointMode,
  SnapLineMode,
  SnapDirectSelect,
} from "mapbox-gl-draw-snap-mode";
import Buffer from "@turf/buffer";
import Length from "@turf/length";

import "./index.css";
let accessToken = import.meta.env.VITE_MAPBOX_API_ACCESS_TOKEN;

let map, draw, drawBar;
let measurement = {
  length: [],
  area: [],
};

function fireCreateBuffer(newF) {
  map.fire("draw.create", {
    action: "Buffer",
    features: newF,
  });
}

map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/light-v11", // style URL
  center: [7.743189929905293, 48.09744836188367],
  zoom: 10, // starting zoom
  accessToken: accessToken,
});

draw = new MapboxDraw({
  modes: {
    ...SplitPolygonMode(MapboxDraw.modes),
    draw_circle: CircleMode.CircleMode,
    draw_assisted_rectangle: DrawRectangle,
    draw_point: SnapPointMode,
    draw_polygon: SnapPolygonMode,
    draw_line_string: SnapLineMode,
    direct_select: SnapDirectSelect,
  },
  displayControlsDefault: false,
  controls: {
    trash: true,
  },
  styles: [...splitPolygonDrawStyles(drawStyles)],
  userProperties: true,
  snap: true,
  guides: false,
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

class extendDrawBarCheckboxes {
  constructor(opt) {
    let ctrl = this;
    ctrl.checkboxes = opt.checkboxes || [];
    ctrl.onRemoveOrig = opt.draw.onRemove;
  }
  onAdd(map) {
    let ctrl = this;
    ctrl.map = map;
    ctrl._container = document.createElement("div");
    ctrl._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
    ctrl.elContainer = ctrl._container;
    ctrl.checkboxes.forEach((b) => {
      ctrl.addCheckbox(b);
    });
    return ctrl._container;
  }
  onRemove(map) {
    ctrl.checkboxes.forEach((b) => {
      ctrl.removeButton(b);
    });
    ctrl.onRemoveOrig(map);
  }
  addCheckbox(opt) {
    let ctrl = this;
    const elCheckbox = document.createElement("input");
    elCheckbox.setAttribute("type", "checkbox");
    elCheckbox.setAttribute("title", opt.title);
    elCheckbox.checked = opt.initialState === "checked";
    elCheckbox.className = "mapbox-gl-draw_ctrl-draw-btn";
    if (opt.classes instanceof Array) {
      opt.classes.forEach((c) => {
        elCheckbox.classList.add(c);
      });
    }
    elCheckbox.addEventListener(opt.on, opt.action);
    ctrl.elContainer.appendChild(elCheckbox);
    opt.elCheckbox = elCheckbox;
  }
  removeButton(opt) {
    opt.elCheckbox.removeEventListener(opt.on, opt.action);
    opt.elCheckbox.remove();
  }
}

window.draw = draw;

drawBar = new extendDrawBar({
  draw: draw,
  buttons: [
    {
      on: "click",
      action: () => {
        console.log("draw_point");
        draw.changeMode("draw_point");
      },
      classes: ["fg-point"],
      title: "Punkt zeichnen",
    },
    {
      on: "click",
      action: () => {
        console.log("draw_line");
        draw.changeMode("draw_line_string");
      },
      classes: ["fg-polyline-pt"],
      title: "Linie zeichnen",
    },
    {
      on: "click",
      action: () => {
        console.log("draw_polygon");
        draw.changeMode("draw_polygon");
      },
      classes: ["fg-polygon-pt"],
      title: "Geometrie zeichnen",
    },
    {
      on: "click",
      action: () => {
        console.log("draw_circle");
        draw.changeMode("draw_circle");
      },
      classes: ["fg-circle-o"],
      title: "Kreis zeichnen",
    },
    {
      on: "click",
      action: () => {
        console.log("draw_assisted_rectangle");
        draw.changeMode("draw_assisted_rectangle");
      },
      classes: ["fg-rectangle-o"],
      title: "Assistiertes Rechteck",
    },
    {
      on: "click",
      action: () => {
        console.log("split_polygon");
        draw.changeMode("split_polygon");
      },
      classes: ["fg-split-polygon"],
      title: "Geometrie aufteilen",
    },
    {
      on: "click",
      action: () => {
        console.log("combine");
        draw.combineFeatures();
      },
      classes: ["fg-union"],
      title: "Geometrie vereinen",
    },
    {
      on: "click",
      action: () => {
        console.log("uncombine_features");
        draw.uncombineFeatures();
      },
      classes: ["fg-difference"],
      title: "Geometrie auflösen",
    },
    {
      on: "click",
      action: () => {
        console.log("measure line");
        let selected_line = draw.getSelected();
        measurement.length = [];
        const selectedFeatures = draw.getSelected().features;
        if (!selectedFeatures.length) return;
        selectedFeatures.forEach((main, idx) => {
          let length = Length(main, {
            units: draw.options.lengthUnits || "kilometers",
          });
          measurement.length.push({ id: main.id, value: length });
          (draw.options.showLength || true) &&
            draw.setFeatureProperty(main.id, "has_length", "true") &&
            draw.setFeatureProperty(
              main.id,
              "length",
              parseFloat(length).toFixed(4),
            ) &&
            draw.setFeatureProperty(
              main.id,
              "length_unit",
              draw.options.lengthUnits || "Kilometer",
            );
        });
      },
      classes: ["fg-measure-line"],
      title: "Linie Messen",
    },
    {
      on: "click",
      action: () => {
        console.log("buffer feature");
        const selectedFeatures = draw.getSelected().features;
        if (!selectedFeatures.length) return;
        const bufferOptions = {};
        bufferOptions.units = draw.options.bufferUnits || "kilometers";
        bufferOptions.steps = draw.options.bufferSteps || 64;
        let ids = [];
        let buffers = [];
        selectedFeatures.forEach((main) => {
          let buffered = Buffer(
            main,
            draw.options.bufferSize || 0.5,
            bufferOptions,
          );
          buffered.id = `${main.id}_buffer_${Math.floor(Math.random() * Math.floor(1000))}`;
          ids.push(buffered.id);
          buffers.push(buffered);
          draw.add(buffered);
        });
        fireCreateBuffer(buffers);
        draw.changeMode("simple_select", { featureIds: ids });
      },
      classes: ["fg-buffer"],
      title: "Geometrie auflösen",
    },
  ],
});

const SnapOptionsBar = new extendDrawBarCheckboxes({
  draw: draw,
  checkboxes: [
    {
      on: "change",
      action: (e) => {
        draw.options.snap = e.target.checked;
      },
      classes: ["snap_mode", "fg-snap", "fg-lg"],
      title: "Snap",
      initialState: "checked",
    },
    {
      on: "change",
      action: (e) => {
        draw.options.guides = e.target.checked;
      },
      classes: ["snap_mode", "fg-grid", "fg-lg"],
      title: "Hilfslinien",
    },
  ],
});

map.once("load", () => {
  map.resize();
  map.addControl(drawBar, "top-right");

  map.addControl(SnapOptionsBar, "top-right");

  map.on("draw.update", function (e) {
    console.log("🚀 ~ file: index.js ~ line 158 ~ e", e);
    /// Fixing an issue caused by mapbox-gl-draw. check `Readme.md` section ##Notes.
    if (e.action === "split_polygon") {
      const allFeatures = draw.getAll().features;

      allFeatures.forEach(({ id }) =>
        draw.setFeatureProperty(
          id,
          splitPolygonConstants.highlightPropertyName,
          undefined,
        ),
      );
    }
  });
});

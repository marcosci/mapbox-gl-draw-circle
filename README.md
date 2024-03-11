# mapbox-gl-draw-circle-mode

[![npm version](https://badge.fury.io/js/mapbox-gl-draw-circle-mode.svg)](https://badge.fury.io/js/mapbox-gl-draw-circle-mode)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A custom mode for Mapbox GL Draw that enables users to draw circles and see live updates of the circle's diameter.

## Installation

You can install the package via npm:

```bash
npm install mapbox-gl-draw-circle-mode
```

## Usage

To use `mapbox-gl-draw-circle-mode`, you need to integrate it with Mapbox GL Draw. Here's a basic example of how to set it up:

```javascript
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import CircleMode, { drawStyles } from "mapbox-gl-draw-circle-mode";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [0, 0],
  zoom: 2,
});

const draw = new MapboxDraw({
  modes: {
    ...MapboxDraw.modes,
    draw_circle: CircleMode.CircleMode,
  },
  displayControlsDefault: false,
  controls: {},
  styles: drawStyles,
  userProperties: true,
});

map.addControl(draw);

// Listen for draw.create event to get circle data
map.on("draw.create", function (event) {
  if (event.features[0].geometry.type === "circle") {
    const circle = event.features[0];
    console.log("Circle center:", circle.geometry.coordinates);
    console.log("Circle radius:", circle.properties.radius);
  }
});
```

## Extented Draw Bar

If you are looking for inspiration of how to

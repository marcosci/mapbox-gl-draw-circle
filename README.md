[![NPM](https://img.shields.io/npm/v/mapbox-gl-draw-circle.svg)](https://www.npmjs.com/package/mapbox-gl-draw-circle)
[![Release](https://github.com/marcosci/mapbox-gl-draw-circle/actions/workflows/release.yml/badge.svg)](https://github.com/marcosci/mapbox-gl-draw-circle/actions/workflows/release.yml)

# mapbox-gl-draw-circle

A revised and modified version of the custom mode for [MapboxGL-Draw](https://github.com/mapbox/mapbox-gl-draw) to split polygons based on a drawn lineString from [Reyhane Masumi](https://github.com/ReyhaneMasumi/mapbox-gl-draw-split-polygon-mode/blob/main/.github/workflows/develop.yml).

## [DEMO](https://marcosci.github.io/mapbox-gl-draw-circle/)

![A GIF showing how to split a polygon](demo/example.gif)

## Install

```bash
npm install mapbox-gl-draw-circle
```

or use CDN:

```html
<script src="https://unpkg.com/mapbox-gl-draw-circle"></script>
```

## Usage

```js
import mapboxGl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import defaultDrawStyle from "@mapbox/mapbox-gl-draw/src/lib/theme.js";

import SplitPolygonMode, {
  drawStyles as splitPolygonDrawStyles,
} from "mapbox-gl-draw-circle";

const map = new mapboxgl.Map({
  container: "map",
  center: [-91.874, 42.76],
  zoom: 12,
});

draw = new MapboxDraw({
  userProperties: true,
  displayControlsDefault: false,
  modes: {
    ...SplitPolygonMode(MapboxDraw.modes),
  },
  styles: [...splitPolygonDrawStyles(defaultDrawStyle)],
  userProperties: true,
});

map.addControl(draw);

/// Activate the mode
draw.changeMode("split_polygon");

/// you can modify the behavior using these options:
draw.changeMode(
  "split_polygon",
  /** Default option values: */
  {
    highlightColor: "#222",
    lineWidth: 0,
    lineWidthUnit: "kilometers",
  }
);
```

## License

MIT © [marcosci](LICENSE)

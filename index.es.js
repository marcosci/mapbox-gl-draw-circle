var pe = 63710088e-1, fr = {
  centimeters: pe * 100,
  centimetres: pe * 100,
  degrees: pe / 111325,
  feet: pe * 3.28084,
  inches: pe * 39.37,
  kilometers: pe / 1e3,
  kilometres: pe / 1e3,
  meters: pe,
  metres: pe,
  miles: pe / 1609.344,
  millimeters: pe * 1e3,
  millimetres: pe * 1e3,
  nauticalmiles: pe / 1852,
  radians: 1,
  yards: pe * 1.0936
};
function ft(p, c, _) {
  _ === void 0 && (_ = {});
  var M = { type: "Feature" };
  return (_.id === 0 || _.id) && (M.id = _.id), _.bbox && (M.bbox = _.bbox), M.properties = c || {}, M.geometry = p, M;
}
function _o(p, c, _) {
  if (_ === void 0 && (_ = {}), !p)
    throw new Error("coordinates is required");
  if (!Array.isArray(p))
    throw new Error("coordinates must be an Array");
  if (p.length < 2)
    throw new Error("coordinates must be at least 2 numbers long");
  if (!lr(p[0]) || !lr(p[1]))
    throw new Error("coordinates must contain numbers");
  var M = {
    type: "Point",
    coordinates: p
  };
  return ft(M, c, _);
}
function Eo(p, c, _) {
  _ === void 0 && (_ = {});
  for (var M = 0, L = p; M < L.length; M++) {
    var N = L[M];
    if (N.length < 4)
      throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
    for (var A = 0; A < N[N.length - 1].length; A++)
      if (N[N.length - 1][A] !== N[0][A])
        throw new Error("First and last Position are not equivalent.");
  }
  var P = {
    type: "Polygon",
    coordinates: p
  };
  return ft(P, c, _);
}
function xo(p, c, _) {
  if (_ === void 0 && (_ = {}), p.length < 2)
    throw new Error("coordinates must be an array of two or more positions");
  var M = {
    type: "LineString",
    coordinates: p
  };
  return ft(M, c, _);
}
function wo(p, c) {
  c === void 0 && (c = "kilometers");
  var _ = fr[c];
  if (!_)
    throw new Error(c + " units is invalid");
  return p * _;
}
function To(p, c) {
  c === void 0 && (c = "kilometers");
  var _ = fr[c];
  if (!_)
    throw new Error(c + " units is invalid");
  return p / _;
}
function sr(p) {
  var c = p % (2 * Math.PI);
  return c * 180 / Math.PI;
}
function qe(p) {
  var c = p % 360;
  return c * Math.PI / 180;
}
function lr(p) {
  return !isNaN(p) && p !== null && !Array.isArray(p);
}
function dn(p) {
  if (!p)
    throw new Error("coord is required");
  if (!Array.isArray(p)) {
    if (p.type === "Feature" && p.geometry !== null && p.geometry.type === "Point")
      return p.geometry.coordinates;
    if (p.type === "Point")
      return p.coordinates;
  }
  if (Array.isArray(p) && p.length >= 2 && !Array.isArray(p[0]) && !Array.isArray(p[1]))
    return p;
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
function Co(p, c, _, M) {
  M === void 0 && (M = {});
  var L = dn(p), N = qe(L[0]), A = qe(L[1]), P = qe(_), U = To(c, M.units), a = Math.asin(Math.sin(A) * Math.cos(U) + Math.cos(A) * Math.sin(U) * Math.cos(P)), u = N + Math.atan2(Math.sin(P) * Math.sin(U) * Math.cos(A), Math.cos(U) - Math.sin(A) * Math.sin(a)), y = sr(u), v = sr(a);
  return _o([y, v], M.properties);
}
function So(p, c, _) {
  _ === void 0 && (_ = {});
  for (var M = _.steps || 64, L = _.properties ? _.properties : !Array.isArray(p) && p.type === "Feature" && p.properties ? p.properties : {}, N = [], A = 0; A < M; A++)
    N.push(Co(p, c, A * -360 / M, _).geometry.coordinates);
  return N.push(N[0]), Eo([N], L);
}
var nt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function dr(p) {
  return p && p.__esModule && Object.prototype.hasOwnProperty.call(p, "default") ? p.default : p;
}
var pr = { exports: {} };
(function(p, c) {
  (function(_, M) {
    p.exports = M();
  })(nt, function() {
    var _ = function(e, t) {
      var n = { drag: [], click: [], mousemove: [], mousedown: [], mouseup: [], mouseout: [], keydown: [], keyup: [], touchstart: [], touchmove: [], touchend: [], tap: [] }, r = { on: function(i, s, m) {
        if (n[i] === void 0)
          throw new Error("Invalid event type: " + i);
        n[i].push({ selector: s, fn: m });
      }, render: function(i) {
        t.store.featureChanged(i);
      } }, o = function(i, s) {
        for (var m = n[i], E = m.length; E--; ) {
          var C = m[E];
          if (C.selector(s)) {
            C.fn.call(r, s) || t.store.render(), t.ui.updateMapClasses();
            break;
          }
        }
      };
      return e.start.call(r), { render: e.render, stop: function() {
        e.stop && e.stop();
      }, trash: function() {
        e.trash && (e.trash(), t.store.render());
      }, combineFeatures: function() {
        e.combineFeatures && e.combineFeatures();
      }, uncombineFeatures: function() {
        e.uncombineFeatures && e.uncombineFeatures();
      }, drag: function(i) {
        o("drag", i);
      }, click: function(i) {
        o("click", i);
      }, mousemove: function(i) {
        o("mousemove", i);
      }, mousedown: function(i) {
        o("mousedown", i);
      }, mouseup: function(i) {
        o("mouseup", i);
      }, mouseout: function(i) {
        o("mouseout", i);
      }, keydown: function(i) {
        o("keydown", i);
      }, keyup: function(i) {
        o("keyup", i);
      }, touchstart: function(i) {
        o("touchstart", i);
      }, touchmove: function(i) {
        o("touchmove", i);
      }, touchend: function(i) {
        o("touchend", i);
      }, tap: function(i) {
        o("tap", i);
      } };
    };
    function M(e) {
      return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
    }
    function L(e) {
      if (e.__esModule)
        return e;
      var t = e.default;
      if (typeof t == "function") {
        var n = function r() {
          if (this instanceof r) {
            var o = [null];
            o.push.apply(o, arguments);
            var i = Function.bind.apply(t, o);
            return new i();
          }
          return t.apply(this, arguments);
        };
        n.prototype = t.prototype;
      } else
        n = {};
      return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
        var o = Object.getOwnPropertyDescriptor(e, r);
        Object.defineProperty(n, r, o.get ? o : { enumerable: !0, get: function() {
          return e[r];
        } });
      }), n;
    }
    var N = {}, A = { RADIUS: 6378137, FLATTENING: 1 / 298.257223563, POLAR_RADIUS: 63567523142e-4 }, P = A;
    function U(e) {
      var t = 0;
      if (e && e.length > 0) {
        t += Math.abs(a(e[0]));
        for (var n = 1; n < e.length; n++)
          t -= Math.abs(a(e[n]));
      }
      return t;
    }
    function a(e) {
      var t, n, r, o, i, s, m = 0, E = e.length;
      if (E > 2) {
        for (s = 0; s < E; s++)
          s === E - 2 ? (r = E - 2, o = E - 1, i = 0) : s === E - 1 ? (r = E - 1, o = 0, i = 1) : (r = s, o = s + 1, i = s + 2), t = e[r], n = e[o], m += (u(e[i][0]) - u(t[0])) * Math.sin(u(n[1]));
        m = m * P.RADIUS * P.RADIUS / 2;
      }
      return m;
    }
    function u(e) {
      return e * Math.PI / 180;
    }
    N.geometry = function e(t) {
      var n, r = 0;
      switch (t.type) {
        case "Polygon":
          return U(t.coordinates);
        case "MultiPolygon":
          for (n = 0; n < t.coordinates.length; n++)
            r += U(t.coordinates[n]);
          return r;
        case "Point":
        case "MultiPoint":
        case "LineString":
        case "MultiLineString":
          return 0;
        case "GeometryCollection":
          for (n = 0; n < t.geometries.length; n++)
            r += e(t.geometries[n]);
          return r;
      }
    }, N.ring = a;
    var y = { CONTROL_BASE: "mapboxgl-ctrl", CONTROL_PREFIX: "mapboxgl-ctrl-", CONTROL_BUTTON: "mapbox-gl-draw_ctrl-draw-btn", CONTROL_BUTTON_LINE: "mapbox-gl-draw_line", CONTROL_BUTTON_POLYGON: "mapbox-gl-draw_polygon", CONTROL_BUTTON_POINT: "mapbox-gl-draw_point", CONTROL_BUTTON_TRASH: "mapbox-gl-draw_trash", CONTROL_BUTTON_COMBINE_FEATURES: "mapbox-gl-draw_combine", CONTROL_BUTTON_UNCOMBINE_FEATURES: "mapbox-gl-draw_uncombine", CONTROL_GROUP: "mapboxgl-ctrl-group", ATTRIBUTION: "mapboxgl-ctrl-attrib", ACTIVE_BUTTON: "active", BOX_SELECT: "mapbox-gl-draw_boxselect" }, v = { HOT: "mapbox-gl-draw-hot", COLD: "mapbox-gl-draw-cold" }, f = { ADD: "add", MOVE: "move", DRAG: "drag", POINTER: "pointer", NONE: "none" }, b = { POLYGON: "polygon", LINE: "line_string", POINT: "point" }, h = { FEATURE: "Feature", POLYGON: "Polygon", LINE_STRING: "LineString", POINT: "Point", FEATURE_COLLECTION: "FeatureCollection", MULTI_PREFIX: "Multi", MULTI_POINT: "MultiPoint", MULTI_LINE_STRING: "MultiLineString", MULTI_POLYGON: "MultiPolygon" }, w = { DRAW_LINE_STRING: "draw_line_string", DRAW_POLYGON: "draw_polygon", DRAW_POINT: "draw_point", SIMPLE_SELECT: "simple_select", DIRECT_SELECT: "direct_select", STATIC: "static" }, R = { CREATE: "draw.create", DELETE: "draw.delete", UPDATE: "draw.update", SELECTION_CHANGE: "draw.selectionchange", MODE_CHANGE: "draw.modechange", ACTIONABLE: "draw.actionable", RENDER: "draw.render", COMBINE_FEATURES: "draw.combine", UNCOMBINE_FEATURES: "draw.uncombine" }, $ = { MOVE: "move", CHANGE_COORDINATES: "change_coordinates" }, D = { FEATURE: "feature", MIDPOINT: "midpoint", VERTEX: "vertex" }, V = { ACTIVE: "true", INACTIVE: "false" }, Y = ["scrollZoom", "boxZoom", "dragRotate", "dragPan", "keyboard", "doubleClickZoom", "touchZoomRotate"], Ee = -85, ae = Object.freeze({ __proto__: null, classes: y, sources: v, cursors: f, types: b, geojsonTypes: h, modes: w, events: R, updateActions: $, meta: D, activeStates: V, interactions: Y, LAT_MIN: -90, LAT_RENDERED_MIN: Ee, LAT_MAX: 90, LAT_RENDERED_MAX: 85, LNG_MIN: -270, LNG_MAX: 270 }), me = { Point: 0, LineString: 1, MultiLineString: 1, Polygon: 2 };
    function te(e, t) {
      var n = me[e.geometry.type] - me[t.geometry.type];
      return n === 0 && e.geometry.type === h.POLYGON ? e.area - t.area : n;
    }
    function fe(e) {
      return e.map(function(t) {
        return t.geometry.type === h.POLYGON && (t.area = N.geometry({ type: h.FEATURE, property: {}, geometry: t.geometry })), t;
      }).sort(te).map(function(t) {
        return delete t.area, t;
      });
    }
    function Ze(e, t) {
      return t === void 0 && (t = 0), [[e.point.x - t, e.point.y - t], [e.point.x + t, e.point.y + t]];
    }
    function se(e) {
      if (this._items = {}, this._nums = {}, this._length = e ? e.length : 0, e)
        for (var t = 0, n = e.length; t < n; t++)
          this.add(e[t]), e[t] !== void 0 && (typeof e[t] == "string" ? this._items[e[t]] = t : this._nums[e[t]] = t);
    }
    se.prototype.add = function(e) {
      return this.has(e) || (this._length++, typeof e == "string" ? this._items[e] = this._length : this._nums[e] = this._length), this;
    }, se.prototype.delete = function(e) {
      return this.has(e) === !1 || (this._length--, delete this._items[e], delete this._nums[e]), this;
    }, se.prototype.has = function(e) {
      return (typeof e == "string" || typeof e == "number") && (this._items[e] !== void 0 || this._nums[e] !== void 0);
    }, se.prototype.values = function() {
      var e = this, t = [];
      return Object.keys(this._items).forEach(function(n) {
        t.push({ k: n, v: e._items[n] });
      }), Object.keys(this._nums).forEach(function(n) {
        t.push({ k: JSON.parse(n), v: e._nums[n] });
      }), t.sort(function(n, r) {
        return n.v - r.v;
      }).map(function(n) {
        return n.k;
      });
    }, se.prototype.clear = function() {
      return this._length = 0, this._items = {}, this._nums = {}, this;
    };
    var ve = [D.FEATURE, D.MIDPOINT, D.VERTEX], Ce = { click: function(e, t, n) {
      return pn(e, t, n, n.options.clickBuffer);
    }, touch: function(e, t, n) {
      return pn(e, t, n, n.options.touchBuffer);
    } };
    function pn(e, t, n, r) {
      if (n.map === null)
        return [];
      var o = e ? Ze(e, r) : t, i = {};
      n.options.styles && (i.layers = n.options.styles.map(function(C) {
        return C.id;
      }).filter(function(C) {
        return n.map.getLayer(C) != null;
      }));
      var s = n.map.queryRenderedFeatures(o, i).filter(function(C) {
        return ve.indexOf(C.properties.meta) !== -1;
      }), m = new se(), E = [];
      return s.forEach(function(C) {
        var S = C.properties.id;
        m.has(S) || (m.add(S), E.push(C));
      }), fe(E);
    }
    function dt(e, t) {
      var n = Ce.click(e, null, t), r = { mouse: f.NONE };
      return n[0] && (r.mouse = n[0].properties.active === V.ACTIVE ? f.MOVE : f.POINTER, r.feature = n[0].properties.meta), t.events.currentModeName().indexOf("draw") !== -1 && (r.mouse = f.ADD), t.ui.queueMapClasses(r), t.ui.updateMapClasses(), n[0];
    }
    function Vt(e, t) {
      var n = e.x - t.x, r = e.y - t.y;
      return Math.sqrt(n * n + r * r);
    }
    function Gt(e, t, n) {
      n === void 0 && (n = {});
      var r = n.fineTolerance != null ? n.fineTolerance : 4, o = n.grossTolerance != null ? n.grossTolerance : 12, i = n.interval != null ? n.interval : 500;
      e.point = e.point || t.point, e.time = e.time || t.time;
      var s = Vt(e.point, t.point);
      return s < r || s < o && t.time - e.time < i;
    }
    function zt(e, t, n) {
      n === void 0 && (n = {});
      var r = n.tolerance != null ? n.tolerance : 25, o = n.interval != null ? n.interval : 250;
      return e.point = e.point || t.point, e.time = e.time || t.time, Vt(e.point, t.point) < r && t.time - e.time < o;
    }
    var hn = { exports: {} }, Jt = hn.exports = function(e, t) {
      if (t || (t = 16), e === void 0 && (e = 128), e <= 0)
        return "0";
      for (var n = Math.log(Math.pow(2, e)) / Math.log(t), r = 2; n === 1 / 0; r *= 2)
        n = Math.log(Math.pow(2, e / r)) / Math.log(t) * r;
      var o = n - Math.floor(n), i = "";
      for (r = 0; r < Math.floor(n); r++)
        i = Math.floor(Math.random() * t).toString(t) + i;
      if (o) {
        var s = Math.pow(t, o);
        i = Math.floor(Math.random() * s).toString(t) + i;
      }
      var m = parseInt(i, t);
      return m !== 1 / 0 && m >= Math.pow(2, e) ? Jt(e, t) : i;
    };
    Jt.rack = function(e, t, n) {
      var r = function(i) {
        var s = 0;
        do {
          if (s++ > 10) {
            if (!n)
              throw new Error("too many ID collisions, use more bits");
            e += n;
          }
          var m = Jt(e, t);
        } while (Object.hasOwnProperty.call(o, m));
        return o[m] = i, m;
      }, o = r.hats = {};
      return r.get = function(i) {
        return r.hats[i];
      }, r.set = function(i, s) {
        return r.hats[i] = s, r;
      }, r.bits = e || 128, r.base = t || 16, r;
    };
    var Yt = M(hn.exports), le = function(e, t) {
      this.ctx = e, this.properties = t.properties || {}, this.coordinates = t.geometry.coordinates, this.id = t.id || Yt(), this.type = t.geometry.type;
    };
    le.prototype.changed = function() {
      this.ctx.store.featureChanged(this.id);
    }, le.prototype.incomingCoords = function(e) {
      this.setCoordinates(e);
    }, le.prototype.setCoordinates = function(e) {
      this.coordinates = e, this.changed();
    }, le.prototype.getCoordinates = function() {
      return JSON.parse(JSON.stringify(this.coordinates));
    }, le.prototype.setProperty = function(e, t) {
      this.properties[e] = t;
    }, le.prototype.toGeoJSON = function() {
      return JSON.parse(JSON.stringify({ id: this.id, type: h.FEATURE, properties: this.properties, geometry: { coordinates: this.getCoordinates(), type: this.type } }));
    }, le.prototype.internal = function(e) {
      var t = { id: this.id, meta: D.FEATURE, "meta:type": this.type, active: V.INACTIVE, mode: e };
      if (this.ctx.options.userProperties)
        for (var n in this.properties)
          t["user_" + n] = this.properties[n];
      return { type: h.FEATURE, properties: t, geometry: { coordinates: this.getCoordinates(), type: this.type } };
    };
    var Ue = function(e, t) {
      le.call(this, e, t);
    };
    (Ue.prototype = Object.create(le.prototype)).isValid = function() {
      return typeof this.coordinates[0] == "number" && typeof this.coordinates[1] == "number";
    }, Ue.prototype.updateCoordinate = function(e, t, n) {
      this.coordinates = arguments.length === 3 ? [t, n] : [e, t], this.changed();
    }, Ue.prototype.getCoordinate = function() {
      return this.getCoordinates();
    };
    var Se = function(e, t) {
      le.call(this, e, t);
    };
    (Se.prototype = Object.create(le.prototype)).isValid = function() {
      return this.coordinates.length > 1;
    }, Se.prototype.addCoordinate = function(e, t, n) {
      this.changed();
      var r = parseInt(e, 10);
      this.coordinates.splice(r, 0, [t, n]);
    }, Se.prototype.getCoordinate = function(e) {
      var t = parseInt(e, 10);
      return JSON.parse(JSON.stringify(this.coordinates[t]));
    }, Se.prototype.removeCoordinate = function(e) {
      this.changed(), this.coordinates.splice(parseInt(e, 10), 1);
    }, Se.prototype.updateCoordinate = function(e, t, n) {
      var r = parseInt(e, 10);
      this.coordinates[r] = [t, n], this.changed();
    };
    var he = function(e, t) {
      le.call(this, e, t), this.coordinates = this.coordinates.map(function(n) {
        return n.slice(0, -1);
      });
    };
    (he.prototype = Object.create(le.prototype)).isValid = function() {
      return this.coordinates.length !== 0 && this.coordinates.every(function(e) {
        return e.length > 2;
      });
    }, he.prototype.incomingCoords = function(e) {
      this.coordinates = e.map(function(t) {
        return t.slice(0, -1);
      }), this.changed();
    }, he.prototype.setCoordinates = function(e) {
      this.coordinates = e, this.changed();
    }, he.prototype.addCoordinate = function(e, t, n) {
      this.changed();
      var r = e.split(".").map(function(o) {
        return parseInt(o, 10);
      });
      this.coordinates[r[0]].splice(r[1], 0, [t, n]);
    }, he.prototype.removeCoordinate = function(e) {
      this.changed();
      var t = e.split(".").map(function(r) {
        return parseInt(r, 10);
      }), n = this.coordinates[t[0]];
      n && (n.splice(t[1], 1), n.length < 3 && this.coordinates.splice(t[0], 1));
    }, he.prototype.getCoordinate = function(e) {
      var t = e.split(".").map(function(r) {
        return parseInt(r, 10);
      }), n = this.coordinates[t[0]];
      return JSON.parse(JSON.stringify(n[t[1]]));
    }, he.prototype.getCoordinates = function() {
      return this.coordinates.map(function(e) {
        return e.concat([e[0]]);
      });
    }, he.prototype.updateCoordinate = function(e, t, n) {
      this.changed();
      var r = e.split("."), o = parseInt(r[0], 10), i = parseInt(r[1], 10);
      this.coordinates[o] === void 0 && (this.coordinates[o] = []), this.coordinates[o][i] = [t, n];
    };
    var vr = { MultiPoint: Ue, MultiLineString: Se, MultiPolygon: he }, pt = function(e, t, n, r, o) {
      var i = n.split("."), s = parseInt(i[0], 10), m = i[1] ? i.slice(1).join(".") : null;
      return e[s][t](m, r, o);
    }, de = function(e, t) {
      if (le.call(this, e, t), delete this.coordinates, this.model = vr[t.geometry.type], this.model === void 0)
        throw new TypeError(t.geometry.type + " is not a valid type");
      this.features = this._coordinatesToFeatures(t.geometry.coordinates);
    };
    function B(e) {
      this.map = e.map, this.drawConfig = JSON.parse(JSON.stringify(e.options || {})), this._ctx = e;
    }
    (de.prototype = Object.create(le.prototype))._coordinatesToFeatures = function(e) {
      var t = this, n = this.model.bind(this);
      return e.map(function(r) {
        return new n(t.ctx, { id: Yt(), type: h.FEATURE, properties: {}, geometry: { coordinates: r, type: t.type.replace("Multi", "") } });
      });
    }, de.prototype.isValid = function() {
      return this.features.every(function(e) {
        return e.isValid();
      });
    }, de.prototype.setCoordinates = function(e) {
      this.features = this._coordinatesToFeatures(e), this.changed();
    }, de.prototype.getCoordinate = function(e) {
      return pt(this.features, "getCoordinate", e);
    }, de.prototype.getCoordinates = function() {
      return JSON.parse(JSON.stringify(this.features.map(function(e) {
        return e.type === h.POLYGON ? e.getCoordinates() : e.coordinates;
      })));
    }, de.prototype.updateCoordinate = function(e, t, n) {
      pt(this.features, "updateCoordinate", e, t, n), this.changed();
    }, de.prototype.addCoordinate = function(e, t, n) {
      pt(this.features, "addCoordinate", e, t, n), this.changed();
    }, de.prototype.removeCoordinate = function(e) {
      pt(this.features, "removeCoordinate", e), this.changed();
    }, de.prototype.getFeatures = function() {
      return this.features;
    }, B.prototype.setSelected = function(e) {
      return this._ctx.store.setSelected(e);
    }, B.prototype.setSelectedCoordinates = function(e) {
      var t = this;
      this._ctx.store.setSelectedCoordinates(e), e.reduce(function(n, r) {
        return n[r.feature_id] === void 0 && (n[r.feature_id] = !0, t._ctx.store.get(r.feature_id).changed()), n;
      }, {});
    }, B.prototype.getSelected = function() {
      return this._ctx.store.getSelected();
    }, B.prototype.getSelectedIds = function() {
      return this._ctx.store.getSelectedIds();
    }, B.prototype.isSelected = function(e) {
      return this._ctx.store.isSelected(e);
    }, B.prototype.getFeature = function(e) {
      return this._ctx.store.get(e);
    }, B.prototype.select = function(e) {
      return this._ctx.store.select(e);
    }, B.prototype.deselect = function(e) {
      return this._ctx.store.deselect(e);
    }, B.prototype.deleteFeature = function(e, t) {
      return t === void 0 && (t = {}), this._ctx.store.delete(e, t);
    }, B.prototype.addFeature = function(e) {
      return this._ctx.store.add(e);
    }, B.prototype.clearSelectedFeatures = function() {
      return this._ctx.store.clearSelected();
    }, B.prototype.clearSelectedCoordinates = function() {
      return this._ctx.store.clearSelectedCoordinates();
    }, B.prototype.setActionableState = function(e) {
      e === void 0 && (e = {});
      var t = { trash: e.trash || !1, combineFeatures: e.combineFeatures || !1, uncombineFeatures: e.uncombineFeatures || !1 };
      return this._ctx.events.actionable(t);
    }, B.prototype.changeMode = function(e, t, n) {
      return t === void 0 && (t = {}), n === void 0 && (n = {}), this._ctx.events.changeMode(e, t, n);
    }, B.prototype.updateUIClasses = function(e) {
      return this._ctx.ui.queueMapClasses(e);
    }, B.prototype.activateUIButton = function(e) {
      return this._ctx.ui.setActiveButton(e);
    }, B.prototype.featuresAt = function(e, t, n) {
      if (n === void 0 && (n = "click"), n !== "click" && n !== "touch")
        throw new Error("invalid buffer type");
      return Ce[n](e, t, this._ctx);
    }, B.prototype.newFeature = function(e) {
      var t = e.geometry.type;
      return t === h.POINT ? new Ue(this._ctx, e) : t === h.LINE_STRING ? new Se(this._ctx, e) : t === h.POLYGON ? new he(this._ctx, e) : new de(this._ctx, e);
    }, B.prototype.isInstanceOf = function(e, t) {
      if (e === h.POINT)
        return t instanceof Ue;
      if (e === h.LINE_STRING)
        return t instanceof Se;
      if (e === h.POLYGON)
        return t instanceof he;
      if (e === "MultiFeature")
        return t instanceof de;
      throw new Error("Unknown feature class: " + e);
    }, B.prototype.doRender = function(e) {
      return this._ctx.store.featureChanged(e);
    }, B.prototype.onSetup = function() {
    }, B.prototype.onDrag = function() {
    }, B.prototype.onClick = function() {
    }, B.prototype.onMouseMove = function() {
    }, B.prototype.onMouseDown = function() {
    }, B.prototype.onMouseUp = function() {
    }, B.prototype.onMouseOut = function() {
    }, B.prototype.onKeyUp = function() {
    }, B.prototype.onKeyDown = function() {
    }, B.prototype.onTouchStart = function() {
    }, B.prototype.onTouchMove = function() {
    }, B.prototype.onTouchEnd = function() {
    }, B.prototype.onTap = function() {
    }, B.prototype.onStop = function() {
    }, B.prototype.onTrash = function() {
    }, B.prototype.onCombineFeature = function() {
    }, B.prototype.onUncombineFeature = function() {
    }, B.prototype.toDisplayFeatures = function() {
      throw new Error("You must overwrite toDisplayFeatures");
    };
    var gn = { drag: "onDrag", click: "onClick", mousemove: "onMouseMove", mousedown: "onMouseDown", mouseup: "onMouseUp", mouseout: "onMouseOut", keyup: "onKeyUp", keydown: "onKeyDown", touchstart: "onTouchStart", touchmove: "onTouchMove", touchend: "onTouchEnd", tap: "onTap" }, br = Object.keys(gn);
    function _r(e) {
      var t = Object.keys(e);
      return function(n, r) {
        r === void 0 && (r = {});
        var o = {}, i = t.reduce(function(s, m) {
          return s[m] = e[m], s;
        }, new B(n));
        return { start: function() {
          var s = this;
          o = i.onSetup(r), br.forEach(function(m) {
            var E, C = gn[m], S = function() {
              return !1;
            };
            e[C] && (S = function() {
              return !0;
            }), s.on(m, S, (E = C, function(x) {
              return i[E](o, x);
            }));
          });
        }, stop: function() {
          i.onStop(o);
        }, trash: function() {
          i.onTrash(o);
        }, combineFeatures: function() {
          i.onCombineFeatures(o);
        }, uncombineFeatures: function() {
          i.onUncombineFeatures(o);
        }, render: function(s, m) {
          i.toDisplayFeatures(o, s, m);
        } };
      };
    }
    function rt(e) {
      return [].concat(e).filter(function(t) {
        return t !== void 0;
      });
    }
    function Er() {
      var e = this;
      if (!(e.ctx.map && e.ctx.map.getSource(v.HOT) !== void 0))
        return E();
      var t = e.ctx.events.currentModeName();
      e.ctx.ui.queueMapClasses({ mode: t });
      var n = [], r = [];
      e.isDirty ? r = e.getAllIds() : (n = e.getChangedIds().filter(function(C) {
        return e.get(C) !== void 0;
      }), r = e.sources.hot.filter(function(C) {
        return C.properties.id && n.indexOf(C.properties.id) === -1 && e.get(C.properties.id) !== void 0;
      }).map(function(C) {
        return C.properties.id;
      })), e.sources.hot = [];
      var o = e.sources.cold.length;
      e.sources.cold = e.isDirty ? [] : e.sources.cold.filter(function(C) {
        var S = C.properties.id || C.properties.parent;
        return n.indexOf(S) === -1;
      });
      var i = o !== e.sources.cold.length || r.length > 0;
      function s(C, S) {
        var x = e.get(C).internal(t);
        e.ctx.events.currentModeRender(x, function(F) {
          e.sources[S].push(F);
        });
      }
      if (n.forEach(function(C) {
        return s(C, "hot");
      }), r.forEach(function(C) {
        return s(C, "cold");
      }), i && e.ctx.map.getSource(v.COLD).setData({ type: h.FEATURE_COLLECTION, features: e.sources.cold }), e.ctx.map.getSource(v.HOT).setData({ type: h.FEATURE_COLLECTION, features: e.sources.hot }), e._emitSelectionChange && (e.ctx.map.fire(R.SELECTION_CHANGE, { features: e.getSelected().map(function(C) {
        return C.toGeoJSON();
      }), points: e.getSelectedCoordinates().map(function(C) {
        return { type: h.FEATURE, properties: {}, geometry: { type: h.POINT, coordinates: C.coordinates } };
      }) }), e._emitSelectionChange = !1), e._deletedFeaturesToEmit.length) {
        var m = e._deletedFeaturesToEmit.map(function(C) {
          return C.toGeoJSON();
        });
        e._deletedFeaturesToEmit = [], e.ctx.map.fire(R.DELETE, { features: m });
      }
      function E() {
        e.isDirty = !1, e.clearChangedIds();
      }
      E(), e.ctx.map.fire(R.RENDER, {});
    }
    function q(e) {
      var t, n = this;
      this._features = {}, this._featureIds = new se(), this._selectedFeatureIds = new se(), this._selectedCoordinates = [], this._changedFeatureIds = new se(), this._deletedFeaturesToEmit = [], this._emitSelectionChange = !1, this._mapInitialConfig = {}, this.ctx = e, this.sources = { hot: [], cold: [] }, this.render = function() {
        t || (t = requestAnimationFrame(function() {
          t = null, Er.call(n);
        }));
      }, this.isDirty = !1;
    }
    function yn(e, t) {
      var n = e._selectedCoordinates.filter(function(r) {
        return e._selectedFeatureIds.has(r.feature_id);
      });
      e._selectedCoordinates.length === n.length || t.silent || (e._emitSelectionChange = !0), e._selectedCoordinates = n;
    }
    q.prototype.createRenderBatch = function() {
      var e = this, t = this.render, n = 0;
      return this.render = function() {
        n++;
      }, function() {
        e.render = t, n > 0 && e.render();
      };
    }, q.prototype.setDirty = function() {
      return this.isDirty = !0, this;
    }, q.prototype.featureChanged = function(e) {
      return this._changedFeatureIds.add(e), this;
    }, q.prototype.getChangedIds = function() {
      return this._changedFeatureIds.values();
    }, q.prototype.clearChangedIds = function() {
      return this._changedFeatureIds.clear(), this;
    }, q.prototype.getAllIds = function() {
      return this._featureIds.values();
    }, q.prototype.add = function(e) {
      return this.featureChanged(e.id), this._features[e.id] = e, this._featureIds.add(e.id), this;
    }, q.prototype.delete = function(e, t) {
      var n = this;
      return t === void 0 && (t = {}), rt(e).forEach(function(r) {
        n._featureIds.has(r) && (n._featureIds.delete(r), n._selectedFeatureIds.delete(r), t.silent || n._deletedFeaturesToEmit.indexOf(n._features[r]) === -1 && n._deletedFeaturesToEmit.push(n._features[r]), delete n._features[r], n.isDirty = !0);
      }), yn(this, t), this;
    }, q.prototype.get = function(e) {
      return this._features[e];
    }, q.prototype.getAll = function() {
      var e = this;
      return Object.keys(this._features).map(function(t) {
        return e._features[t];
      });
    }, q.prototype.select = function(e, t) {
      var n = this;
      return t === void 0 && (t = {}), rt(e).forEach(function(r) {
        n._selectedFeatureIds.has(r) || (n._selectedFeatureIds.add(r), n._changedFeatureIds.add(r), t.silent || (n._emitSelectionChange = !0));
      }), this;
    }, q.prototype.deselect = function(e, t) {
      var n = this;
      return t === void 0 && (t = {}), rt(e).forEach(function(r) {
        n._selectedFeatureIds.has(r) && (n._selectedFeatureIds.delete(r), n._changedFeatureIds.add(r), t.silent || (n._emitSelectionChange = !0));
      }), yn(this, t), this;
    }, q.prototype.clearSelected = function(e) {
      return e === void 0 && (e = {}), this.deselect(this._selectedFeatureIds.values(), { silent: e.silent }), this;
    }, q.prototype.setSelected = function(e, t) {
      var n = this;
      return t === void 0 && (t = {}), e = rt(e), this.deselect(this._selectedFeatureIds.values().filter(function(r) {
        return e.indexOf(r) === -1;
      }), { silent: t.silent }), this.select(e.filter(function(r) {
        return !n._selectedFeatureIds.has(r);
      }), { silent: t.silent }), this;
    }, q.prototype.setSelectedCoordinates = function(e) {
      return this._selectedCoordinates = e, this._emitSelectionChange = !0, this;
    }, q.prototype.clearSelectedCoordinates = function() {
      return this._selectedCoordinates = [], this._emitSelectionChange = !0, this;
    }, q.prototype.getSelectedIds = function() {
      return this._selectedFeatureIds.values();
    }, q.prototype.getSelected = function() {
      var e = this;
      return this._selectedFeatureIds.values().map(function(t) {
        return e.get(t);
      });
    }, q.prototype.getSelectedCoordinates = function() {
      var e = this;
      return this._selectedCoordinates.map(function(t) {
        return { coordinates: e.get(t.feature_id).getCoordinate(t.coord_path) };
      });
    }, q.prototype.isSelected = function(e) {
      return this._selectedFeatureIds.has(e);
    }, q.prototype.setFeatureProperty = function(e, t, n) {
      this.get(e).setProperty(t, n), this.featureChanged(e);
    }, q.prototype.storeMapConfig = function() {
      var e = this;
      Y.forEach(function(t) {
        e.ctx.map[t] && (e._mapInitialConfig[t] = e.ctx.map[t].isEnabled());
      });
    }, q.prototype.restoreMapConfig = function() {
      var e = this;
      Object.keys(this._mapInitialConfig).forEach(function(t) {
        e._mapInitialConfig[t] ? e.ctx.map[t].enable() : e.ctx.map[t].disable();
      });
    }, q.prototype.getInitialConfigValue = function(e) {
      return this._mapInitialConfig[e] === void 0 || this._mapInitialConfig[e];
    };
    var xr = function() {
      for (var e = arguments, t = {}, n = 0; n < arguments.length; n++) {
        var r = e[n];
        for (var o in r)
          wr.call(r, o) && (t[o] = r[o]);
      }
      return t;
    }, wr = Object.prototype.hasOwnProperty, Ne = M(xr), Tr = ["mode", "feature", "mouse"];
    function Cr(e) {
      var t = null, n = null, r = { onRemove: function() {
        return e.map.off("load", r.connect), clearInterval(n), r.removeLayers(), e.store.restoreMapConfig(), e.ui.removeButtons(), e.events.removeEventListeners(), e.ui.clearMapClasses(), e.boxZoomInitial && e.map.boxZoom.enable(), e.map = null, e.container = null, e.store = null, t && t.parentNode && t.parentNode.removeChild(t), t = null, this;
      }, connect: function() {
        e.map.off("load", r.connect), clearInterval(n), r.addLayers(), e.store.storeMapConfig(), e.events.addEventListeners();
      }, onAdd: function(o) {
        var i = o.fire;
        return o.fire = function(s, m) {
          var E = arguments;
          return i.length === 1 && arguments.length !== 1 && (E = [Ne({}, { type: s }, m)]), i.apply(o, E);
        }, e.map = o, e.events = function(s) {
          var m = Object.keys(s.options.modes).reduce(function(g, O) {
            return g[O] = _r(s.options.modes[O]), g;
          }, {}), E = {}, C = {}, S = {}, x = null, F = null;
          S.drag = function(g, O) {
            O({ point: g.point, time: (/* @__PURE__ */ new Date()).getTime() }) ? (s.ui.queueMapClasses({ mouse: f.DRAG }), F.drag(g)) : g.originalEvent.stopPropagation();
          }, S.mousedrag = function(g) {
            S.drag(g, function(O) {
              return !Gt(E, O);
            });
          }, S.touchdrag = function(g) {
            S.drag(g, function(O) {
              return !zt(C, O);
            });
          }, S.mousemove = function(g) {
            if ((g.originalEvent.buttons !== void 0 ? g.originalEvent.buttons : g.originalEvent.which) === 1)
              return S.mousedrag(g);
            var O = dt(g, s);
            g.featureTarget = O, F.mousemove(g);
          }, S.mousedown = function(g) {
            E = { time: (/* @__PURE__ */ new Date()).getTime(), point: g.point };
            var O = dt(g, s);
            g.featureTarget = O, F.mousedown(g);
          }, S.mouseup = function(g) {
            var O = dt(g, s);
            g.featureTarget = O, Gt(E, { point: g.point, time: (/* @__PURE__ */ new Date()).getTime() }) ? F.click(g) : F.mouseup(g);
          }, S.mouseout = function(g) {
            F.mouseout(g);
          }, S.touchstart = function(g) {
            if (s.options.touchEnabled) {
              C = { time: (/* @__PURE__ */ new Date()).getTime(), point: g.point };
              var O = Ce.touch(g, null, s)[0];
              g.featureTarget = O, F.touchstart(g);
            }
          }, S.touchmove = function(g) {
            if (s.options.touchEnabled)
              return F.touchmove(g), S.touchdrag(g);
          }, S.touchend = function(g) {
            if (g.originalEvent.preventDefault(), s.options.touchEnabled) {
              var O = Ce.touch(g, null, s)[0];
              g.featureTarget = O, zt(C, { time: (/* @__PURE__ */ new Date()).getTime(), point: g.point }) ? F.tap(g) : F.touchend(g);
            }
          };
          var X = function(g) {
            return !(g === 8 || g === 46 || g >= 48 && g <= 57);
          };
          function k(g, O, G) {
            G === void 0 && (G = {}), F.stop();
            var ie = m[g];
            if (ie === void 0)
              throw new Error(g + " is not valid");
            x = g;
            var Q = ie(s, O);
            F = _(Q, s), G.silent || s.map.fire(R.MODE_CHANGE, { mode: g }), s.store.setDirty(), s.store.render();
          }
          S.keydown = function(g) {
            (g.srcElement || g.target).classList.contains("mapboxgl-canvas") && (g.keyCode !== 8 && g.keyCode !== 46 || !s.options.controls.trash ? X(g.keyCode) ? F.keydown(g) : g.keyCode === 49 && s.options.controls.point ? k(w.DRAW_POINT) : g.keyCode === 50 && s.options.controls.line_string ? k(w.DRAW_LINE_STRING) : g.keyCode === 51 && s.options.controls.polygon && k(w.DRAW_POLYGON) : (g.preventDefault(), F.trash()));
          }, S.keyup = function(g) {
            X(g.keyCode) && F.keyup(g);
          }, S.zoomend = function() {
            s.store.changeZoom();
          }, S.data = function(g) {
            if (g.dataType === "style") {
              var O = s.setup, G = s.map, ie = s.options, Q = s.store;
              ie.styles.some(function(en) {
                return G.getLayer(en.id);
              }) || (O.addLayers(), Q.setDirty(), Q.render());
            }
          };
          var W = { trash: !1, combineFeatures: !1, uncombineFeatures: !1 };
          return { start: function() {
            x = s.options.defaultMode, F = _(m[x](s), s);
          }, changeMode: k, actionable: function(g) {
            var O = !1;
            Object.keys(g).forEach(function(G) {
              if (W[G] === void 0)
                throw new Error("Invalid action type");
              W[G] !== g[G] && (O = !0), W[G] = g[G];
            }), O && s.map.fire(R.ACTIONABLE, { actions: W });
          }, currentModeName: function() {
            return x;
          }, currentModeRender: function(g, O) {
            return F.render(g, O);
          }, fire: function(g, O) {
            S[g] && S[g](O);
          }, addEventListeners: function() {
            s.map.on("mousemove", S.mousemove), s.map.on("mousedown", S.mousedown), s.map.on("mouseup", S.mouseup), s.map.on("data", S.data), s.map.on("touchmove", S.touchmove), s.map.on("touchstart", S.touchstart), s.map.on("touchend", S.touchend), s.container.addEventListener("mouseout", S.mouseout), s.options.keybindings && (s.container.addEventListener("keydown", S.keydown), s.container.addEventListener("keyup", S.keyup));
          }, removeEventListeners: function() {
            s.map.off("mousemove", S.mousemove), s.map.off("mousedown", S.mousedown), s.map.off("mouseup", S.mouseup), s.map.off("data", S.data), s.map.off("touchmove", S.touchmove), s.map.off("touchstart", S.touchstart), s.map.off("touchend", S.touchend), s.container.removeEventListener("mouseout", S.mouseout), s.options.keybindings && (s.container.removeEventListener("keydown", S.keydown), s.container.removeEventListener("keyup", S.keyup));
          }, trash: function(g) {
            F.trash(g);
          }, combineFeatures: function() {
            F.combineFeatures();
          }, uncombineFeatures: function() {
            F.uncombineFeatures();
          }, getMode: function() {
            return x;
          } };
        }(e), e.ui = /* @__PURE__ */ function(s) {
          var m = {}, E = null, C = { mode: null, feature: null, mouse: null }, S = { mode: null, feature: null, mouse: null };
          function x(g) {
            S = Ne(S, g);
          }
          function F() {
            var g, O;
            if (s.container) {
              var G = [], ie = [];
              Tr.forEach(function(Q) {
                S[Q] !== C[Q] && (G.push(Q + "-" + C[Q]), S[Q] !== null && ie.push(Q + "-" + S[Q]));
              }), G.length > 0 && (g = s.container.classList).remove.apply(g, G), ie.length > 0 && (O = s.container.classList).add.apply(O, ie), C = Ne(C, S);
            }
          }
          function X(g, O) {
            O === void 0 && (O = {});
            var G = document.createElement("button");
            return G.className = y.CONTROL_BUTTON + " " + O.className, G.setAttribute("title", O.title), O.container.appendChild(G), G.addEventListener("click", function(ie) {
              if (ie.preventDefault(), ie.stopPropagation(), ie.target === E)
                return k(), void O.onDeactivate();
              W(g), O.onActivate();
            }, !0), G;
          }
          function k() {
            E && (E.classList.remove(y.ACTIVE_BUTTON), E = null);
          }
          function W(g) {
            k();
            var O = m[g];
            O && O && g !== "trash" && (O.classList.add(y.ACTIVE_BUTTON), E = O);
          }
          return { setActiveButton: W, queueMapClasses: x, updateMapClasses: F, clearMapClasses: function() {
            x({ mode: null, feature: null, mouse: null }), F();
          }, addButtons: function() {
            var g = s.options.controls, O = document.createElement("div");
            return O.className = y.CONTROL_GROUP + " " + y.CONTROL_BASE, g && (g[b.LINE] && (m[b.LINE] = X(b.LINE, { container: O, className: y.CONTROL_BUTTON_LINE, title: "LineString tool " + (s.options.keybindings ? "(l)" : ""), onActivate: function() {
              return s.events.changeMode(w.DRAW_LINE_STRING);
            }, onDeactivate: function() {
              return s.events.trash();
            } })), g[b.POLYGON] && (m[b.POLYGON] = X(b.POLYGON, { container: O, className: y.CONTROL_BUTTON_POLYGON, title: "Polygon tool " + (s.options.keybindings ? "(p)" : ""), onActivate: function() {
              return s.events.changeMode(w.DRAW_POLYGON);
            }, onDeactivate: function() {
              return s.events.trash();
            } })), g[b.POINT] && (m[b.POINT] = X(b.POINT, { container: O, className: y.CONTROL_BUTTON_POINT, title: "Marker tool " + (s.options.keybindings ? "(m)" : ""), onActivate: function() {
              return s.events.changeMode(w.DRAW_POINT);
            }, onDeactivate: function() {
              return s.events.trash();
            } })), g.trash && (m.trash = X("trash", { container: O, className: y.CONTROL_BUTTON_TRASH, title: "Delete", onActivate: function() {
              s.events.trash();
            } })), g.combine_features && (m.combine_features = X("combineFeatures", { container: O, className: y.CONTROL_BUTTON_COMBINE_FEATURES, title: "Combine", onActivate: function() {
              s.events.combineFeatures();
            } })), g.uncombine_features && (m.uncombine_features = X("uncombineFeatures", { container: O, className: y.CONTROL_BUTTON_UNCOMBINE_FEATURES, title: "Uncombine", onActivate: function() {
              s.events.uncombineFeatures();
            } }))), O;
          }, removeButtons: function() {
            Object.keys(m).forEach(function(g) {
              var O = m[g];
              O.parentNode && O.parentNode.removeChild(O), delete m[g];
            });
          } };
        }(e), e.container = o.getContainer(), e.store = new q(e), t = e.ui.addButtons(), e.options.boxSelect && (e.boxZoomInitial = o.boxZoom.isEnabled(), o.boxZoom.disable(), o.dragPan.disable(), o.dragPan.enable()), o.loaded() ? r.connect() : (o.on("load", r.connect), n = setInterval(function() {
          o.loaded() && r.connect();
        }, 16)), e.events.start(), t;
      }, addLayers: function() {
        e.map.addSource(v.COLD, { data: { type: h.FEATURE_COLLECTION, features: [] }, type: "geojson" }), e.map.addSource(v.HOT, { data: { type: h.FEATURE_COLLECTION, features: [] }, type: "geojson" }), e.options.styles.forEach(function(o) {
          e.map.addLayer(o);
        }), e.store.setDirty(!0), e.store.render();
      }, removeLayers: function() {
        e.options.styles.forEach(function(o) {
          e.map.getLayer(o.id) && e.map.removeLayer(o.id);
        }), e.map.getSource(v.COLD) && e.map.removeSource(v.COLD), e.map.getSource(v.HOT) && e.map.removeSource(v.HOT);
      } };
      return e.setup = r, r;
    }
    var mn = [{ id: "gl-draw-polygon-fill-inactive", type: "fill", filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]], paint: { "fill-color": "#3bb2d0", "fill-outline-color": "#3bb2d0", "fill-opacity": 0.1 } }, { id: "gl-draw-polygon-fill-active", type: "fill", filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]], paint: { "fill-color": "#fbb03b", "fill-outline-color": "#fbb03b", "fill-opacity": 0.1 } }, { id: "gl-draw-polygon-midpoint", type: "circle", filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]], paint: { "circle-radius": 3, "circle-color": "#fbb03b" } }, { id: "gl-draw-polygon-stroke-inactive", type: "line", filter: ["all", ["==", "active", "false"], ["==", "$type", "Polygon"], ["!=", "mode", "static"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#3bb2d0", "line-width": 2 } }, { id: "gl-draw-polygon-stroke-active", type: "line", filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#fbb03b", "line-dasharray": [0.2, 2], "line-width": 2 } }, { id: "gl-draw-line-inactive", type: "line", filter: ["all", ["==", "active", "false"], ["==", "$type", "LineString"], ["!=", "mode", "static"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#3bb2d0", "line-width": 2 } }, { id: "gl-draw-line-active", type: "line", filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#fbb03b", "line-dasharray": [0.2, 2], "line-width": 2 } }, { id: "gl-draw-polygon-and-line-vertex-stroke-inactive", type: "circle", filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]], paint: { "circle-radius": 5, "circle-color": "#fff" } }, { id: "gl-draw-polygon-and-line-vertex-inactive", type: "circle", filter: ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]], paint: { "circle-radius": 3, "circle-color": "#fbb03b" } }, { id: "gl-draw-point-point-stroke-inactive", type: "circle", filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]], paint: { "circle-radius": 5, "circle-opacity": 1, "circle-color": "#fff" } }, { id: "gl-draw-point-inactive", type: "circle", filter: ["all", ["==", "active", "false"], ["==", "$type", "Point"], ["==", "meta", "feature"], ["!=", "mode", "static"]], paint: { "circle-radius": 3, "circle-color": "#3bb2d0" } }, { id: "gl-draw-point-stroke-active", type: "circle", filter: ["all", ["==", "$type", "Point"], ["==", "active", "true"], ["!=", "meta", "midpoint"]], paint: { "circle-radius": 7, "circle-color": "#fff" } }, { id: "gl-draw-point-active", type: "circle", filter: ["all", ["==", "$type", "Point"], ["!=", "meta", "midpoint"], ["==", "active", "true"]], paint: { "circle-radius": 5, "circle-color": "#fbb03b" } }, { id: "gl-draw-polygon-fill-static", type: "fill", filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]], paint: { "fill-color": "#404040", "fill-outline-color": "#404040", "fill-opacity": 0.1 } }, { id: "gl-draw-polygon-stroke-static", type: "line", filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#404040", "line-width": 2 } }, { id: "gl-draw-line-static", type: "line", filter: ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#404040", "line-width": 2 } }, { id: "gl-draw-point-static", type: "circle", filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]], paint: { "circle-radius": 5, "circle-color": "#404040" } }];
    function ht(e) {
      return function(t) {
        var n = t.featureTarget;
        return !!n && !!n.properties && n.properties.meta === e;
      };
    }
    function vn(e) {
      return !!e.originalEvent && !!e.originalEvent.shiftKey && e.originalEvent.button === 0;
    }
    function Be(e) {
      return !!e.featureTarget && !!e.featureTarget.properties && e.featureTarget.properties.active === V.ACTIVE && e.featureTarget.properties.meta === D.FEATURE;
    }
    function qt(e) {
      return !!e.featureTarget && !!e.featureTarget.properties && e.featureTarget.properties.active === V.INACTIVE && e.featureTarget.properties.meta === D.FEATURE;
    }
    function gt(e) {
      return e.featureTarget === void 0;
    }
    function Zt(e) {
      return !!e.featureTarget && !!e.featureTarget.properties && e.featureTarget.properties.meta === D.FEATURE;
    }
    function ot(e) {
      var t = e.featureTarget;
      return !!t && !!t.properties && t.properties.meta === D.VERTEX;
    }
    function yt(e) {
      return !!e.originalEvent && e.originalEvent.shiftKey === !0;
    }
    function mt(e) {
      return e.keyCode === 27;
    }
    function vt(e) {
      return e.keyCode === 13;
    }
    var Sr = Object.freeze({ __proto__: null, isOfMetaType: ht, isShiftMousedown: vn, isActiveFeature: Be, isInactiveFeature: qt, noTarget: gt, isFeature: Zt, isVertex: ot, isShiftDown: yt, isEscapeKey: mt, isEnterKey: vt, isTrue: function() {
      return !0;
    } }), Mr = He;
    function He(e, t) {
      this.x = e, this.y = t;
    }
    He.prototype = { clone: function() {
      return new He(this.x, this.y);
    }, add: function(e) {
      return this.clone()._add(e);
    }, sub: function(e) {
      return this.clone()._sub(e);
    }, multByPoint: function(e) {
      return this.clone()._multByPoint(e);
    }, divByPoint: function(e) {
      return this.clone()._divByPoint(e);
    }, mult: function(e) {
      return this.clone()._mult(e);
    }, div: function(e) {
      return this.clone()._div(e);
    }, rotate: function(e) {
      return this.clone()._rotate(e);
    }, rotateAround: function(e, t) {
      return this.clone()._rotateAround(e, t);
    }, matMult: function(e) {
      return this.clone()._matMult(e);
    }, unit: function() {
      return this.clone()._unit();
    }, perp: function() {
      return this.clone()._perp();
    }, round: function() {
      return this.clone()._round();
    }, mag: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }, equals: function(e) {
      return this.x === e.x && this.y === e.y;
    }, dist: function(e) {
      return Math.sqrt(this.distSqr(e));
    }, distSqr: function(e) {
      var t = e.x - this.x, n = e.y - this.y;
      return t * t + n * n;
    }, angle: function() {
      return Math.atan2(this.y, this.x);
    }, angleTo: function(e) {
      return Math.atan2(this.y - e.y, this.x - e.x);
    }, angleWith: function(e) {
      return this.angleWithSep(e.x, e.y);
    }, angleWithSep: function(e, t) {
      return Math.atan2(this.x * t - this.y * e, this.x * e + this.y * t);
    }, _matMult: function(e) {
      var t = e[0] * this.x + e[1] * this.y, n = e[2] * this.x + e[3] * this.y;
      return this.x = t, this.y = n, this;
    }, _add: function(e) {
      return this.x += e.x, this.y += e.y, this;
    }, _sub: function(e) {
      return this.x -= e.x, this.y -= e.y, this;
    }, _mult: function(e) {
      return this.x *= e, this.y *= e, this;
    }, _div: function(e) {
      return this.x /= e, this.y /= e, this;
    }, _multByPoint: function(e) {
      return this.x *= e.x, this.y *= e.y, this;
    }, _divByPoint: function(e) {
      return this.x /= e.x, this.y /= e.y, this;
    }, _unit: function() {
      return this._div(this.mag()), this;
    }, _perp: function() {
      var e = this.y;
      return this.y = this.x, this.x = -e, this;
    }, _rotate: function(e) {
      var t = Math.cos(e), n = Math.sin(e), r = t * this.x - n * this.y, o = n * this.x + t * this.y;
      return this.x = r, this.y = o, this;
    }, _rotateAround: function(e, t) {
      var n = Math.cos(e), r = Math.sin(e), o = t.x + n * (this.x - t.x) - r * (this.y - t.y), i = t.y + r * (this.x - t.x) + n * (this.y - t.y);
      return this.x = o, this.y = i, this;
    }, _round: function() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
    } }, He.convert = function(e) {
      return e instanceof He ? e : Array.isArray(e) ? new He(e[0], e[1]) : e;
    };
    var Or = M(Mr);
    function Ht(e, t) {
      var n = t.getBoundingClientRect();
      return new Or(e.clientX - n.left - (t.clientLeft || 0), e.clientY - n.top - (t.clientTop || 0));
    }
    function Xe(e, t, n, r) {
      return { type: h.FEATURE, properties: { meta: D.VERTEX, parent: e, coord_path: n, active: r ? V.ACTIVE : V.INACTIVE }, geometry: { type: h.POINT, coordinates: t } };
    }
    function bn(e, t, n) {
      var r = t.geometry.coordinates, o = n.geometry.coordinates;
      if (r[1] > 85 || r[1] < Ee || o[1] > 85 || o[1] < Ee)
        return null;
      var i = { lng: (r[0] + o[0]) / 2, lat: (r[1] + o[1]) / 2 };
      return { type: h.FEATURE, properties: { meta: D.MIDPOINT, parent: e, lng: i.lng, lat: i.lat, coord_path: n.properties.coord_path }, geometry: { type: h.POINT, coordinates: [i.lng, i.lat] } };
    }
    function bt(e, t, n) {
      t === void 0 && (t = {}), n === void 0 && (n = null);
      var r, o = e.geometry, i = o.type, s = o.coordinates, m = e.properties && e.properties.id, E = [];
      function C(x, F) {
        var X = "", k = null;
        x.forEach(function(W, g) {
          var O = F != null ? F + "." + g : String(g), G = Xe(m, W, O, S(O));
          if (t.midpoints && k) {
            var ie = bn(m, k, G);
            ie && E.push(ie);
          }
          k = G;
          var Q = JSON.stringify(W);
          X !== Q && E.push(G), g === 0 && (X = Q);
        });
      }
      function S(x) {
        return !!t.selectedPaths && t.selectedPaths.indexOf(x) !== -1;
      }
      return i === h.POINT ? E.push(Xe(m, s, n, S(n))) : i === h.POLYGON ? s.forEach(function(x, F) {
        C(x, n !== null ? n + "." + F : String(F));
      }) : i === h.LINE_STRING ? C(s, n) : i.indexOf(h.MULTI_PREFIX) === 0 && (r = i.replace(h.MULTI_PREFIX, ""), s.forEach(function(x, F) {
        var X = { type: h.FEATURE, properties: e.properties, geometry: { type: r, coordinates: x } };
        E = E.concat(bt(X, t, F));
      })), E;
    }
    var be = { enable: function(e) {
      setTimeout(function() {
        e.map && e.map.doubleClickZoom && e._ctx && e._ctx.store && e._ctx.store.getInitialConfigValue && e._ctx.store.getInitialConfigValue("doubleClickZoom") && e.map.doubleClickZoom.enable();
      }, 0);
    }, disable: function(e) {
      setTimeout(function() {
        e.map && e.map.doubleClickZoom && e.map.doubleClickZoom.disable();
      }, 0);
    } }, _t = { exports: {} }, _n = function(e) {
      if (!e || !e.type)
        return null;
      var t = Pr[e.type];
      if (!t)
        return null;
      if (t === "geometry")
        return { type: "FeatureCollection", features: [{ type: "Feature", properties: {}, geometry: e }] };
      if (t === "feature")
        return { type: "FeatureCollection", features: [e] };
      if (t === "featurecollection")
        return e;
    }, Pr = { Point: "geometry", MultiPoint: "geometry", LineString: "geometry", MultiLineString: "geometry", Polygon: "geometry", MultiPolygon: "geometry", GeometryCollection: "geometry", Feature: "feature", FeatureCollection: "featurecollection" }, Ir = M(_n), Lr = Object.freeze({ __proto__: null, default: function e(t) {
      switch (t && t.type || null) {
        case "FeatureCollection":
          return t.features = t.features.reduce(function(n, r) {
            return n.concat(e(r));
          }, []), t;
        case "Feature":
          return t.geometry ? e(t.geometry).map(function(n) {
            var r = { type: "Feature", properties: JSON.parse(JSON.stringify(t.properties)), geometry: n };
            return t.id !== void 0 && (r.id = t.id), r;
          }) : [t];
        case "MultiPoint":
          return t.coordinates.map(function(n) {
            return { type: "Point", coordinates: n };
          });
        case "MultiPolygon":
          return t.coordinates.map(function(n) {
            return { type: "Polygon", coordinates: n };
          });
        case "MultiLineString":
          return t.coordinates.map(function(n) {
            return { type: "LineString", coordinates: n };
          });
        case "GeometryCollection":
          return t.geometries.map(e).reduce(function(n, r) {
            return n.concat(r);
          }, []);
        case "Point":
        case "Polygon":
        case "LineString":
          return [t];
      }
    } }), Nr = _n, Et = L(Lr), Fr = function(e) {
      return function t(n) {
        return Array.isArray(n) && n.length && typeof n[0] == "number" ? [n] : n.reduce(function(r, o) {
          return Array.isArray(o) && Array.isArray(o[0]) ? r.concat(t(o)) : (r.push(o), r);
        }, []);
      }(e);
    };
    Et instanceof Function || (Et = Et.default);
    var En = { exports: {} }, Ar = En.exports = function(e) {
      return new ge(e);
    };
    function ge(e) {
      this.value = e;
    }
    function xn(e, t, n) {
      var r = [], o = [], i = !0;
      return function s(m) {
        var E = n ? wn(m) : m, C = {}, S = !0, x = { node: E, node_: m, path: [].concat(r), parent: o[o.length - 1], parents: o, key: r.slice(-1)[0], isRoot: r.length === 0, level: r.length, circular: null, update: function(k, W) {
          x.isRoot || (x.parent.node[x.key] = k), x.node = k, W && (S = !1);
        }, delete: function(k) {
          delete x.parent.node[x.key], k && (S = !1);
        }, remove: function(k) {
          Tn(x.parent.node) ? x.parent.node.splice(x.key, 1) : delete x.parent.node[x.key], k && (S = !1);
        }, keys: null, before: function(k) {
          C.before = k;
        }, after: function(k) {
          C.after = k;
        }, pre: function(k) {
          C.pre = k;
        }, post: function(k) {
          C.post = k;
        }, stop: function() {
          i = !1;
        }, block: function() {
          S = !1;
        } };
        if (!i)
          return x;
        function F() {
          if (typeof x.node == "object" && x.node !== null) {
            x.keys && x.node_ === x.node || (x.keys = xt(x.node)), x.isLeaf = x.keys.length == 0;
            for (var k = 0; k < o.length; k++)
              if (o[k].node_ === m) {
                x.circular = o[k];
                break;
              }
          } else
            x.isLeaf = !0, x.keys = null;
          x.notLeaf = !x.isLeaf, x.notRoot = !x.isRoot;
        }
        F();
        var X = t.call(x, x.node);
        return X !== void 0 && x.update && x.update(X), C.before && C.before.call(x, x.node), S && (typeof x.node != "object" || x.node === null || x.circular || (o.push(x), F(), wt(x.keys, function(k, W) {
          r.push(k), C.pre && C.pre.call(x, x.node[k], k);
          var g = s(x.node[k]);
          n && Tt.call(x.node, k) && (x.node[k] = g.node), g.isLast = W == x.keys.length - 1, g.isFirst = W == 0, C.post && C.post.call(x, g), r.pop();
        }), o.pop()), C.after && C.after.call(x, x.node)), x;
      }(e).node;
    }
    function wn(e) {
      if (typeof e == "object" && e !== null) {
        var t;
        if (Tn(e))
          t = [];
        else if (Ke(e) === "[object Date]")
          t = new Date(e.getTime ? e.getTime() : e);
        else if (function(o) {
          return Ke(o) === "[object RegExp]";
        }(e))
          t = new RegExp(e);
        else if (function(o) {
          return Ke(o) === "[object Error]";
        }(e))
          t = { message: e.message };
        else if (function(o) {
          return Ke(o) === "[object Boolean]";
        }(e))
          t = new Boolean(e);
        else if (function(o) {
          return Ke(o) === "[object Number]";
        }(e))
          t = new Number(e);
        else if (function(o) {
          return Ke(o) === "[object String]";
        }(e))
          t = new String(e);
        else if (Object.create && Object.getPrototypeOf)
          t = Object.create(Object.getPrototypeOf(e));
        else if (e.constructor === Object)
          t = {};
        else {
          var n = e.constructor && e.constructor.prototype || e.__proto__ || {}, r = function() {
          };
          r.prototype = n, t = new r();
        }
        return wt(xt(e), function(o) {
          t[o] = e[o];
        }), t;
      }
      return e;
    }
    ge.prototype.get = function(e) {
      for (var t = this.value, n = 0; n < e.length; n++) {
        var r = e[n];
        if (!t || !Tt.call(t, r)) {
          t = void 0;
          break;
        }
        t = t[r];
      }
      return t;
    }, ge.prototype.has = function(e) {
      for (var t = this.value, n = 0; n < e.length; n++) {
        var r = e[n];
        if (!t || !Tt.call(t, r))
          return !1;
        t = t[r];
      }
      return !0;
    }, ge.prototype.set = function(e, t) {
      for (var n = this.value, r = 0; r < e.length - 1; r++) {
        var o = e[r];
        Tt.call(n, o) || (n[o] = {}), n = n[o];
      }
      return n[e[r]] = t, t;
    }, ge.prototype.map = function(e) {
      return xn(this.value, e, !0);
    }, ge.prototype.forEach = function(e) {
      return this.value = xn(this.value, e, !1), this.value;
    }, ge.prototype.reduce = function(e, t) {
      var n = arguments.length === 1, r = n ? this.value : t;
      return this.forEach(function(o) {
        this.isRoot && n || (r = e.call(this, r, o));
      }), r;
    }, ge.prototype.paths = function() {
      var e = [];
      return this.forEach(function(t) {
        e.push(this.path);
      }), e;
    }, ge.prototype.nodes = function() {
      var e = [];
      return this.forEach(function(t) {
        e.push(this.node);
      }), e;
    }, ge.prototype.clone = function() {
      var e = [], t = [];
      return function n(r) {
        for (var o = 0; o < e.length; o++)
          if (e[o] === r)
            return t[o];
        if (typeof r == "object" && r !== null) {
          var i = wn(r);
          return e.push(r), t.push(i), wt(xt(r), function(s) {
            i[s] = n(r[s]);
          }), e.pop(), t.pop(), i;
        }
        return r;
      }(this.value);
    };
    var xt = Object.keys || function(e) {
      var t = [];
      for (var n in e)
        t.push(n);
      return t;
    };
    function Ke(e) {
      return Object.prototype.toString.call(e);
    }
    var Tn = Array.isArray || function(e) {
      return Object.prototype.toString.call(e) === "[object Array]";
    }, wt = function(e, t) {
      if (e.forEach)
        return e.forEach(t);
      for (var n = 0; n < e.length; n++)
        t(e[n], n, e);
    };
    wt(xt(ge.prototype), function(e) {
      Ar[e] = function(t) {
        var n = [].slice.call(arguments, 1), r = new ge(t);
        return r[e].apply(r, n);
      };
    });
    var Tt = Object.hasOwnProperty || function(e, t) {
      return t in e;
    }, kr = En.exports, Rr = ce;
    function ce(e) {
      if (!(this instanceof ce))
        return new ce(e);
      this._bbox = e || [1 / 0, 1 / 0, -1 / 0, -1 / 0], this._valid = !!e;
    }
    ce.prototype.include = function(e) {
      return this._valid = !0, this._bbox[0] = Math.min(this._bbox[0], e[0]), this._bbox[1] = Math.min(this._bbox[1], e[1]), this._bbox[2] = Math.max(this._bbox[2], e[0]), this._bbox[3] = Math.max(this._bbox[3], e[1]), this;
    }, ce.prototype.equals = function(e) {
      var t;
      return t = e instanceof ce ? e.bbox() : e, this._bbox[0] == t[0] && this._bbox[1] == t[1] && this._bbox[2] == t[2] && this._bbox[3] == t[3];
    }, ce.prototype.center = function(e) {
      return this._valid ? [(this._bbox[0] + this._bbox[2]) / 2, (this._bbox[1] + this._bbox[3]) / 2] : null;
    }, ce.prototype.union = function(e) {
      var t;
      return this._valid = !0, t = e instanceof ce ? e.bbox() : e, this._bbox[0] = Math.min(this._bbox[0], t[0]), this._bbox[1] = Math.min(this._bbox[1], t[1]), this._bbox[2] = Math.max(this._bbox[2], t[2]), this._bbox[3] = Math.max(this._bbox[3], t[3]), this;
    }, ce.prototype.bbox = function() {
      return this._valid ? this._bbox : null;
    }, ce.prototype.contains = function(e) {
      if (!e)
        return this._fastContains();
      if (!this._valid)
        return null;
      var t = e[0], n = e[1];
      return this._bbox[0] <= t && this._bbox[1] <= n && this._bbox[2] >= t && this._bbox[3] >= n;
    }, ce.prototype.intersect = function(e) {
      return this._valid ? (t = e instanceof ce ? e.bbox() : e, !(this._bbox[0] > t[2] || this._bbox[2] < t[0] || this._bbox[3] < t[1] || this._bbox[1] > t[3])) : null;
      var t;
    }, ce.prototype._fastContains = function() {
      if (!this._valid)
        return new Function("return null;");
      var e = "return " + this._bbox[0] + "<= ll[0] &&" + this._bbox[1] + "<= ll[1] &&" + this._bbox[2] + ">= ll[0] &&" + this._bbox[3] + ">= ll[1]";
      return new Function("ll", e);
    }, ce.prototype.polygon = function() {
      return this._valid ? { type: "Polygon", coordinates: [[[this._bbox[0], this._bbox[1]], [this._bbox[2], this._bbox[1]], [this._bbox[2], this._bbox[3]], [this._bbox[0], this._bbox[3]], [this._bbox[0], this._bbox[1]]]] } : null;
    };
    var Dr = function(e) {
      if (!e)
        return [];
      var t = Et(Nr(e)), n = [];
      return t.features.forEach(function(r) {
        r.geometry && (n = n.concat(Fr(r.geometry.coordinates)));
      }), n;
    }, Ur = kr, Br = Rr, Cn = { features: ["FeatureCollection"], coordinates: ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"], geometry: ["Feature"], geometries: ["GeometryCollection"] }, jr = Object.keys(Cn);
    function Xt(e) {
      for (var t = Br(), n = Dr(e), r = 0; r < n.length; r++)
        t.include(n[r]);
      return t;
    }
    _t.exports = function(e) {
      return Xt(e).bbox();
    }, _t.exports.polygon = function(e) {
      return Xt(e).polygon();
    }, _t.exports.bboxify = function(e) {
      return Ur(e).map(function(t) {
        t && jr.some(function(n) {
          return !!t[n] && Cn[n].indexOf(t.type) !== -1;
        }) && (t.bbox = Xt(t).bbox(), this.update(t));
      });
    };
    var $r = M(_t.exports), Ct = -90;
    function Kt(e, t) {
      var n = Ct, r = 90, o = Ct, i = 90, s = 270, m = -270;
      e.forEach(function(C) {
        var S = $r(C), x = S[1], F = S[3], X = S[0], k = S[2];
        x > n && (n = x), F < r && (r = F), F > o && (o = F), x < i && (i = x), X < s && (s = X), k > m && (m = k);
      });
      var E = t;
      return n + E.lat > 85 && (E.lat = 85 - n), o + E.lat > 90 && (E.lat = 90 - o), r + E.lat < -85 && (E.lat = -85 - r), i + E.lat < Ct && (E.lat = Ct - i), s + E.lng <= -270 && (E.lng += 360 * Math.ceil(Math.abs(E.lng) / 360)), m + E.lng >= 270 && (E.lng -= 360 * Math.ceil(Math.abs(E.lng) / 360)), E;
    }
    function Wt(e, t) {
      var n = Kt(e.map(function(r) {
        return r.toGeoJSON();
      }), t);
      e.forEach(function(r) {
        var o, i = r.getCoordinates(), s = function(E) {
          var C = { lng: E[0] + n.lng, lat: E[1] + n.lat };
          return [C.lng, C.lat];
        }, m = function(E) {
          return E.map(function(C) {
            return s(C);
          });
        };
        r.type === h.POINT ? o = s(i) : r.type === h.LINE_STRING || r.type === h.MULTI_POINT ? o = i.map(s) : r.type === h.POLYGON || r.type === h.MULTI_LINE_STRING ? o = i.map(m) : r.type === h.MULTI_POLYGON && (o = i.map(function(E) {
          return E.map(function(C) {
            return m(C);
          });
        })), r.incomingCoords(o);
      });
    }
    var ne = { onSetup: function(e) {
      var t = this, n = { dragMoveLocation: null, boxSelectStartLocation: null, boxSelectElement: void 0, boxSelecting: !1, canBoxSelect: !1, dragMoving: !1, canDragMove: !1, initiallySelectedFeatureIds: e.featureIds || [] };
      return this.setSelected(n.initiallySelectedFeatureIds.filter(function(r) {
        return t.getFeature(r) !== void 0;
      })), this.fireActionable(), this.setActionableState({ combineFeatures: !0, uncombineFeatures: !0, trash: !0 }), n;
    }, fireUpdate: function() {
      this.map.fire(R.UPDATE, { action: $.MOVE, features: this.getSelected().map(function(e) {
        return e.toGeoJSON();
      }) });
    }, fireActionable: function() {
      var e = this, t = this.getSelected(), n = t.filter(function(m) {
        return e.isInstanceOf("MultiFeature", m);
      }), r = !1;
      if (t.length > 1) {
        r = !0;
        var o = t[0].type.replace("Multi", "");
        t.forEach(function(m) {
          m.type.replace("Multi", "") !== o && (r = !1);
        });
      }
      var i = n.length > 0, s = t.length > 0;
      this.setActionableState({ combineFeatures: r, uncombineFeatures: i, trash: s });
    }, getUniqueIds: function(e) {
      return e.length ? e.map(function(t) {
        return t.properties.id;
      }).filter(function(t) {
        return t !== void 0;
      }).reduce(function(t, n) {
        return t.add(n), t;
      }, new se()).values() : [];
    }, stopExtendedInteractions: function(e) {
      e.boxSelectElement && (e.boxSelectElement.parentNode && e.boxSelectElement.parentNode.removeChild(e.boxSelectElement), e.boxSelectElement = null), this.map.dragPan.enable(), e.boxSelecting = !1, e.canBoxSelect = !1, e.dragMoving = !1, e.canDragMove = !1;
    }, onStop: function() {
      be.enable(this);
    }, onMouseMove: function(e, t) {
      return Zt(t) && e.dragMoving && this.fireUpdate(), this.stopExtendedInteractions(e), !0;
    }, onMouseOut: function(e) {
      return !e.dragMoving || this.fireUpdate();
    } };
    ne.onTap = ne.onClick = function(e, t) {
      return gt(t) ? this.clickAnywhere(e, t) : ht(D.VERTEX)(t) ? this.clickOnVertex(e, t) : Zt(t) ? this.clickOnFeature(e, t) : void 0;
    }, ne.clickAnywhere = function(e) {
      var t = this, n = this.getSelectedIds();
      n.length && (this.clearSelectedFeatures(), n.forEach(function(r) {
        return t.doRender(r);
      })), be.enable(this), this.stopExtendedInteractions(e);
    }, ne.clickOnVertex = function(e, t) {
      this.changeMode(w.DIRECT_SELECT, { featureId: t.featureTarget.properties.parent, coordPath: t.featureTarget.properties.coord_path, startPos: t.lngLat }), this.updateUIClasses({ mouse: f.MOVE });
    }, ne.startOnActiveFeature = function(e, t) {
      this.stopExtendedInteractions(e), this.map.dragPan.disable(), this.doRender(t.featureTarget.properties.id), e.canDragMove = !0, e.dragMoveLocation = t.lngLat;
    }, ne.clickOnFeature = function(e, t) {
      var n = this;
      be.disable(this), this.stopExtendedInteractions(e);
      var r = yt(t), o = this.getSelectedIds(), i = t.featureTarget.properties.id, s = this.isSelected(i);
      if (!r && s && this.getFeature(i).type !== h.POINT)
        return this.changeMode(w.DIRECT_SELECT, { featureId: i });
      s && r ? (this.deselect(i), this.updateUIClasses({ mouse: f.POINTER }), o.length === 1 && be.enable(this)) : !s && r ? (this.select(i), this.updateUIClasses({ mouse: f.MOVE })) : s || r || (o.forEach(function(m) {
        return n.doRender(m);
      }), this.setSelected(i), this.updateUIClasses({ mouse: f.MOVE })), this.doRender(i);
    }, ne.onMouseDown = function(e, t) {
      return Be(t) ? this.startOnActiveFeature(e, t) : this.drawConfig.boxSelect && vn(t) ? this.startBoxSelect(e, t) : void 0;
    }, ne.startBoxSelect = function(e, t) {
      this.stopExtendedInteractions(e), this.map.dragPan.disable(), e.boxSelectStartLocation = Ht(t.originalEvent, this.map.getContainer()), e.canBoxSelect = !0;
    }, ne.onTouchStart = function(e, t) {
      if (Be(t))
        return this.startOnActiveFeature(e, t);
    }, ne.onDrag = function(e, t) {
      return e.canDragMove ? this.dragMove(e, t) : this.drawConfig.boxSelect && e.canBoxSelect ? this.whileBoxSelect(e, t) : void 0;
    }, ne.whileBoxSelect = function(e, t) {
      e.boxSelecting = !0, this.updateUIClasses({ mouse: f.ADD }), e.boxSelectElement || (e.boxSelectElement = document.createElement("div"), e.boxSelectElement.classList.add(y.BOX_SELECT), this.map.getContainer().appendChild(e.boxSelectElement));
      var n = Ht(t.originalEvent, this.map.getContainer()), r = Math.min(e.boxSelectStartLocation.x, n.x), o = Math.max(e.boxSelectStartLocation.x, n.x), i = Math.min(e.boxSelectStartLocation.y, n.y), s = Math.max(e.boxSelectStartLocation.y, n.y), m = "translate(" + r + "px, " + i + "px)";
      e.boxSelectElement.style.transform = m, e.boxSelectElement.style.WebkitTransform = m, e.boxSelectElement.style.width = o - r + "px", e.boxSelectElement.style.height = s - i + "px";
    }, ne.dragMove = function(e, t) {
      e.dragMoving = !0, t.originalEvent.stopPropagation();
      var n = { lng: t.lngLat.lng - e.dragMoveLocation.lng, lat: t.lngLat.lat - e.dragMoveLocation.lat };
      Wt(this.getSelected(), n), e.dragMoveLocation = t.lngLat;
    }, ne.onTouchEnd = ne.onMouseUp = function(e, t) {
      var n = this;
      if (e.dragMoving)
        this.fireUpdate();
      else if (e.boxSelecting) {
        var r = [e.boxSelectStartLocation, Ht(t.originalEvent, this.map.getContainer())], o = this.featuresAt(null, r, "click"), i = this.getUniqueIds(o).filter(function(s) {
          return !n.isSelected(s);
        });
        i.length && (this.select(i), i.forEach(function(s) {
          return n.doRender(s);
        }), this.updateUIClasses({ mouse: f.MOVE }));
      }
      this.stopExtendedInteractions(e);
    }, ne.toDisplayFeatures = function(e, t, n) {
      t.properties.active = this.isSelected(t.properties.id) ? V.ACTIVE : V.INACTIVE, n(t), this.fireActionable(), t.properties.active === V.ACTIVE && t.geometry.type !== h.POINT && bt(t).forEach(n);
    }, ne.onTrash = function() {
      this.deleteFeature(this.getSelectedIds()), this.fireActionable();
    }, ne.onCombineFeatures = function() {
      var e = this.getSelected();
      if (!(e.length === 0 || e.length < 2)) {
        for (var t = [], n = [], r = e[0].type.replace("Multi", ""), o = 0; o < e.length; o++) {
          var i = e[o];
          if (i.type.replace("Multi", "") !== r)
            return;
          i.type.includes("Multi") ? i.getCoordinates().forEach(function(m) {
            t.push(m);
          }) : t.push(i.getCoordinates()), n.push(i.toGeoJSON());
        }
        if (n.length > 1) {
          var s = this.newFeature({ type: h.FEATURE, properties: n[0].properties, geometry: { type: "Multi" + r, coordinates: t } });
          this.addFeature(s), this.deleteFeature(this.getSelectedIds(), { silent: !0 }), this.setSelected([s.id]), this.map.fire(R.COMBINE_FEATURES, { createdFeatures: [s.toGeoJSON()], deletedFeatures: n });
        }
        this.fireActionable();
      }
    }, ne.onUncombineFeatures = function() {
      var e = this, t = this.getSelected();
      if (t.length !== 0) {
        for (var n = [], r = [], o = function(s) {
          var m = t[s];
          e.isInstanceOf("MultiFeature", m) && (m.getFeatures().forEach(function(E) {
            e.addFeature(E), E.properties = m.properties, n.push(E.toGeoJSON()), e.select([E.id]);
          }), e.deleteFeature(m.id, { silent: !0 }), r.push(m.toGeoJSON()));
        }, i = 0; i < t.length; i++)
          o(i);
        n.length > 1 && this.map.fire(R.UNCOMBINE_FEATURES, { createdFeatures: n, deletedFeatures: r }), this.fireActionable();
      }
    };
    var Sn = ht(D.VERTEX), Mn = ht(D.MIDPOINT), Fe = { fireUpdate: function() {
      this.map.fire(R.UPDATE, { action: $.CHANGE_COORDINATES, features: this.getSelected().map(function(e) {
        return e.toGeoJSON();
      }) });
    }, fireActionable: function(e) {
      this.setActionableState({ combineFeatures: !1, uncombineFeatures: !1, trash: e.selectedCoordPaths.length > 0 });
    }, startDragging: function(e, t) {
      this.map.dragPan.disable(), e.canDragMove = !0, e.dragMoveLocation = t.lngLat;
    }, stopDragging: function(e) {
      this.map.dragPan.enable(), e.dragMoving = !1, e.canDragMove = !1, e.dragMoveLocation = null;
    }, onVertex: function(e, t) {
      this.startDragging(e, t);
      var n = t.featureTarget.properties, r = e.selectedCoordPaths.indexOf(n.coord_path);
      yt(t) || r !== -1 ? yt(t) && r === -1 && e.selectedCoordPaths.push(n.coord_path) : e.selectedCoordPaths = [n.coord_path];
      var o = this.pathsToCoordinates(e.featureId, e.selectedCoordPaths);
      this.setSelectedCoordinates(o);
    }, onMidpoint: function(e, t) {
      this.startDragging(e, t);
      var n = t.featureTarget.properties;
      e.feature.addCoordinate(n.coord_path, n.lng, n.lat), this.fireUpdate(), e.selectedCoordPaths = [n.coord_path];
    }, pathsToCoordinates: function(e, t) {
      return t.map(function(n) {
        return { feature_id: e, coord_path: n };
      });
    }, onFeature: function(e, t) {
      e.selectedCoordPaths.length === 0 ? this.startDragging(e, t) : this.stopDragging(e);
    }, dragFeature: function(e, t, n) {
      Wt(this.getSelected(), n), e.dragMoveLocation = t.lngLat;
    }, dragVertex: function(e, t, n) {
      for (var r = e.selectedCoordPaths.map(function(m) {
        return e.feature.getCoordinate(m);
      }), o = Kt(r.map(function(m) {
        return { type: h.FEATURE, properties: {}, geometry: { type: h.POINT, coordinates: m } };
      }), n), i = 0; i < r.length; i++) {
        var s = r[i];
        e.feature.updateCoordinate(e.selectedCoordPaths[i], s[0] + o.lng, s[1] + o.lat);
      }
    }, clickNoTarget: function() {
      this.changeMode(w.SIMPLE_SELECT);
    }, clickInactive: function() {
      this.changeMode(w.SIMPLE_SELECT);
    }, clickActiveFeature: function(e) {
      e.selectedCoordPaths = [], this.clearSelectedCoordinates(), e.feature.changed();
    }, onSetup: function(e) {
      var t = e.featureId, n = this.getFeature(t);
      if (!n)
        throw new Error("You must provide a featureId to enter direct_select mode");
      if (n.type === h.POINT)
        throw new TypeError("direct_select mode doesn't handle point features");
      var r = { featureId: t, feature: n, dragMoveLocation: e.startPos || null, dragMoving: !1, canDragMove: !1, selectedCoordPaths: e.coordPath ? [e.coordPath] : [] };
      return this.setSelectedCoordinates(this.pathsToCoordinates(t, r.selectedCoordPaths)), this.setSelected(t), be.disable(this), this.setActionableState({ trash: !0 }), r;
    }, onStop: function() {
      be.enable(this), this.clearSelectedCoordinates();
    }, toDisplayFeatures: function(e, t, n) {
      e.featureId === t.properties.id ? (t.properties.active = V.ACTIVE, n(t), bt(t, { map: this.map, midpoints: !0, selectedPaths: e.selectedCoordPaths }).forEach(n)) : (t.properties.active = V.INACTIVE, n(t)), this.fireActionable(e);
    }, onTrash: function(e) {
      e.selectedCoordPaths.sort(function(t, n) {
        return n.localeCompare(t, "en", { numeric: !0 });
      }).forEach(function(t) {
        return e.feature.removeCoordinate(t);
      }), this.fireUpdate(), e.selectedCoordPaths = [], this.clearSelectedCoordinates(), this.fireActionable(e), e.feature.isValid() === !1 && (this.deleteFeature([e.featureId]), this.changeMode(w.SIMPLE_SELECT, {}));
    }, onMouseMove: function(e, t) {
      var n = Be(t), r = Sn(t), o = Mn(t), i = e.selectedCoordPaths.length === 0;
      return n && i || r && !i ? this.updateUIClasses({ mouse: f.MOVE }) : this.updateUIClasses({ mouse: f.NONE }), (r || n || o) && e.dragMoving && this.fireUpdate(), this.stopDragging(e), !0;
    }, onMouseOut: function(e) {
      return e.dragMoving && this.fireUpdate(), !0;
    } };
    Fe.onTouchStart = Fe.onMouseDown = function(e, t) {
      return Sn(t) ? this.onVertex(e, t) : Be(t) ? this.onFeature(e, t) : Mn(t) ? this.onMidpoint(e, t) : void 0;
    }, Fe.onDrag = function(e, t) {
      if (e.canDragMove === !0) {
        e.dragMoving = !0, t.originalEvent.stopPropagation();
        var n = { lng: t.lngLat.lng - e.dragMoveLocation.lng, lat: t.lngLat.lat - e.dragMoveLocation.lat };
        e.selectedCoordPaths.length > 0 ? this.dragVertex(e, t, n) : this.dragFeature(e, t, n), e.dragMoveLocation = t.lngLat;
      }
    }, Fe.onClick = function(e, t) {
      return gt(t) ? this.clickNoTarget(e, t) : Be(t) ? this.clickActiveFeature(e, t) : qt(t) ? this.clickInactive(e, t) : void this.stopDragging(e);
    }, Fe.onTap = function(e, t) {
      return gt(t) ? this.clickNoTarget(e, t) : Be(t) ? this.clickActiveFeature(e, t) : qt(t) ? this.clickInactive(e, t) : void 0;
    }, Fe.onTouchEnd = Fe.onMouseUp = function(e) {
      e.dragMoving && this.fireUpdate(), this.stopDragging(e);
    };
    var xe = {};
    function St(e, t) {
      return !!e.lngLat && e.lngLat.lng === t[0] && e.lngLat.lat === t[1];
    }
    xe.onSetup = function() {
      var e = this.newFeature({ type: h.FEATURE, properties: {}, geometry: { type: h.POINT, coordinates: [] } });
      return this.addFeature(e), this.clearSelectedFeatures(), this.updateUIClasses({ mouse: f.ADD }), this.activateUIButton(b.POINT), this.setActionableState({ trash: !0 }), { point: e };
    }, xe.stopDrawingAndRemove = function(e) {
      this.deleteFeature([e.point.id], { silent: !0 }), this.changeMode(w.SIMPLE_SELECT);
    }, xe.onTap = xe.onClick = function(e, t) {
      this.updateUIClasses({ mouse: f.MOVE }), e.point.updateCoordinate("", t.lngLat.lng, t.lngLat.lat), this.map.fire(R.CREATE, { features: [e.point.toGeoJSON()] }), this.changeMode(w.SIMPLE_SELECT, { featureIds: [e.point.id] });
    }, xe.onStop = function(e) {
      this.activateUIButton(), e.point.getCoordinate().length || this.deleteFeature([e.point.id], { silent: !0 });
    }, xe.toDisplayFeatures = function(e, t, n) {
      var r = t.properties.id === e.point.id;
      if (t.properties.active = r ? V.ACTIVE : V.INACTIVE, !r)
        return n(t);
    }, xe.onTrash = xe.stopDrawingAndRemove, xe.onKeyUp = function(e, t) {
      if (mt(t) || vt(t))
        return this.stopDrawingAndRemove(e, t);
    };
    var je = { onSetup: function() {
      var e = this.newFeature({ type: h.FEATURE, properties: {}, geometry: { type: h.POLYGON, coordinates: [[]] } });
      return this.addFeature(e), this.clearSelectedFeatures(), be.disable(this), this.updateUIClasses({ mouse: f.ADD }), this.activateUIButton(b.POLYGON), this.setActionableState({ trash: !0 }), { polygon: e, currentVertexPosition: 0 };
    }, clickAnywhere: function(e, t) {
      if (e.currentVertexPosition > 0 && St(t, e.polygon.coordinates[0][e.currentVertexPosition - 1]))
        return this.changeMode(w.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
      this.updateUIClasses({ mouse: f.ADD }), e.polygon.updateCoordinate("0." + e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat), e.currentVertexPosition++, e.polygon.updateCoordinate("0." + e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat);
    }, clickOnVertex: function(e) {
      return this.changeMode(w.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
    }, onMouseMove: function(e, t) {
      e.polygon.updateCoordinate("0." + e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat), ot(t) && this.updateUIClasses({ mouse: f.POINTER });
    } };
    je.onTap = je.onClick = function(e, t) {
      return ot(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
    }, je.onKeyUp = function(e, t) {
      mt(t) ? (this.deleteFeature([e.polygon.id], { silent: !0 }), this.changeMode(w.SIMPLE_SELECT)) : vt(t) && this.changeMode(w.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
    }, je.onStop = function(e) {
      this.updateUIClasses({ mouse: f.NONE }), be.enable(this), this.activateUIButton(), this.getFeature(e.polygon.id) !== void 0 && (e.polygon.removeCoordinate("0." + e.currentVertexPosition), e.polygon.isValid() ? this.map.fire(R.CREATE, { features: [e.polygon.toGeoJSON()] }) : (this.deleteFeature([e.polygon.id], { silent: !0 }), this.changeMode(w.SIMPLE_SELECT, {}, { silent: !0 })));
    }, je.toDisplayFeatures = function(e, t, n) {
      var r = t.properties.id === e.polygon.id;
      if (t.properties.active = r ? V.ACTIVE : V.INACTIVE, !r)
        return n(t);
      if (t.geometry.coordinates.length !== 0) {
        var o = t.geometry.coordinates[0].length;
        if (!(o < 3)) {
          if (t.properties.meta = D.FEATURE, n(Xe(e.polygon.id, t.geometry.coordinates[0][0], "0.0", !1)), o > 3) {
            var i = t.geometry.coordinates[0].length - 3;
            n(Xe(e.polygon.id, t.geometry.coordinates[0][i], "0." + i, !1));
          }
          if (o <= 4) {
            var s = [[t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]], [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]]];
            if (n({ type: h.FEATURE, properties: t.properties, geometry: { coordinates: s, type: h.LINE_STRING } }), o === 3)
              return;
          }
          return n(t);
        }
      }
    }, je.onTrash = function(e) {
      this.deleteFeature([e.polygon.id], { silent: !0 }), this.changeMode(w.SIMPLE_SELECT);
    };
    var $e = { onSetup: function(e) {
      var t, n, r = (e = e || {}).featureId, o = "forward";
      if (r) {
        if (!(t = this.getFeature(r)))
          throw new Error("Could not find a feature with the provided featureId");
        var i = e.from;
        if (i && i.type === "Feature" && i.geometry && i.geometry.type === "Point" && (i = i.geometry), i && i.type === "Point" && i.coordinates && i.coordinates.length === 2 && (i = i.coordinates), !i || !Array.isArray(i))
          throw new Error("Please use the `from` property to indicate which point to continue the line from");
        var s = t.coordinates.length - 1;
        if (t.coordinates[s][0] === i[0] && t.coordinates[s][1] === i[1])
          n = s + 1, t.addCoordinate.apply(t, [n].concat(t.coordinates[s]));
        else {
          if (t.coordinates[0][0] !== i[0] || t.coordinates[0][1] !== i[1])
            throw new Error("`from` should match the point at either the start or the end of the provided LineString");
          o = "backwards", n = 0, t.addCoordinate.apply(t, [n].concat(t.coordinates[0]));
        }
      } else
        t = this.newFeature({ type: h.FEATURE, properties: {}, geometry: { type: h.LINE_STRING, coordinates: [] } }), n = 0, this.addFeature(t);
      return this.clearSelectedFeatures(), be.disable(this), this.updateUIClasses({ mouse: f.ADD }), this.activateUIButton(b.LINE), this.setActionableState({ trash: !0 }), { line: t, currentVertexPosition: n, direction: o };
    }, clickAnywhere: function(e, t) {
      if (e.currentVertexPosition > 0 && St(t, e.line.coordinates[e.currentVertexPosition - 1]) || e.direction === "backwards" && St(t, e.line.coordinates[e.currentVertexPosition + 1]))
        return this.changeMode(w.SIMPLE_SELECT, { featureIds: [e.line.id] });
      this.updateUIClasses({ mouse: f.ADD }), e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat), e.direction === "forward" ? (e.currentVertexPosition++, e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat)) : e.line.addCoordinate(0, t.lngLat.lng, t.lngLat.lat);
    }, clickOnVertex: function(e) {
      return this.changeMode(w.SIMPLE_SELECT, { featureIds: [e.line.id] });
    }, onMouseMove: function(e, t) {
      e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat), ot(t) && this.updateUIClasses({ mouse: f.POINTER });
    } };
    $e.onTap = $e.onClick = function(e, t) {
      if (ot(t))
        return this.clickOnVertex(e, t);
      this.clickAnywhere(e, t);
    }, $e.onKeyUp = function(e, t) {
      vt(t) ? this.changeMode(w.SIMPLE_SELECT, { featureIds: [e.line.id] }) : mt(t) && (this.deleteFeature([e.line.id], { silent: !0 }), this.changeMode(w.SIMPLE_SELECT));
    }, $e.onStop = function(e) {
      be.enable(this), this.activateUIButton(), this.getFeature(e.line.id) !== void 0 && (e.line.removeCoordinate("" + e.currentVertexPosition), e.line.isValid() ? this.map.fire(R.CREATE, { features: [e.line.toGeoJSON()] }) : (this.deleteFeature([e.line.id], { silent: !0 }), this.changeMode(w.SIMPLE_SELECT, {}, { silent: !0 })));
    }, $e.onTrash = function(e) {
      this.deleteFeature([e.line.id], { silent: !0 }), this.changeMode(w.SIMPLE_SELECT);
    }, $e.toDisplayFeatures = function(e, t, n) {
      var r = t.properties.id === e.line.id;
      if (t.properties.active = r ? V.ACTIVE : V.INACTIVE, !r)
        return n(t);
      t.geometry.coordinates.length < 2 || (t.properties.meta = D.FEATURE, n(Xe(e.line.id, t.geometry.coordinates[e.direction === "forward" ? t.geometry.coordinates.length - 2 : 1], "" + (e.direction === "forward" ? t.geometry.coordinates.length - 2 : 1), !1)), n(t));
    };
    var On = { simple_select: ne, direct_select: Fe, draw_point: xe, draw_polygon: je, draw_line_string: $e }, Vr = { defaultMode: w.SIMPLE_SELECT, keybindings: !0, touchEnabled: !0, clickBuffer: 2, touchBuffer: 25, boxSelect: !0, displayControlsDefault: !0, styles: mn, modes: On, controls: {}, userProperties: !1 }, Gr = { point: !0, line_string: !0, polygon: !0, trash: !0, combine_features: !0, uncombine_features: !0 }, zr = { point: !1, line_string: !1, polygon: !1, trash: !1, combine_features: !1, uncombine_features: !1 };
    function Pn(e, t) {
      return e.map(function(n) {
        return n.source ? n : Ne(n, { id: n.id + "." + t, source: t === "hot" ? v.HOT : v.COLD });
      });
    }
    var Qt = { exports: {} };
    (function(e, t) {
      var n = "__lodash_hash_undefined__", r = 9007199254740991, o = "[object Arguments]", i = "[object Array]", s = "[object Boolean]", m = "[object Date]", E = "[object Error]", C = "[object Function]", S = "[object Map]", x = "[object Number]", F = "[object Object]", X = "[object Promise]", k = "[object RegExp]", W = "[object Set]", g = "[object String]", O = "[object Symbol]", G = "[object WeakMap]", ie = "[object ArrayBuffer]", Q = "[object DataView]", en = /^\[object .+?Constructor\]$/, Zr = /^(?:0|[1-9]\d*)$/, Z = {};
      Z["[object Float32Array]"] = Z["[object Float64Array]"] = Z["[object Int8Array]"] = Z["[object Int16Array]"] = Z["[object Int32Array]"] = Z["[object Uint8Array]"] = Z["[object Uint8ClampedArray]"] = Z["[object Uint16Array]"] = Z["[object Uint32Array]"] = !0, Z[o] = Z[i] = Z[ie] = Z[s] = Z[Q] = Z[m] = Z[E] = Z[C] = Z[S] = Z[x] = Z[F] = Z[k] = Z[W] = Z[g] = Z[G] = !1;
      var Nn = typeof nt == "object" && nt && nt.Object === Object && nt, Hr = typeof self == "object" && self && self.Object === Object && self, Me = Nn || Hr || Function("return this")(), Fn = t && !t.nodeType && t, An = Fn && e && !e.nodeType && e, kn = An && An.exports === Fn, tn = kn && Nn.process, Rn = function() {
        try {
          return tn && tn.binding && tn.binding("util");
        } catch {
        }
      }(), Dn = Rn && Rn.isTypedArray;
      function Xr(l, d) {
        for (var T = -1, I = l == null ? 0 : l.length; ++T < I; )
          if (d(l[T], T, l))
            return !0;
        return !1;
      }
      function Kr(l) {
        var d = -1, T = Array(l.size);
        return l.forEach(function(I, H) {
          T[++d] = [H, I];
        }), T;
      }
      function Wr(l) {
        var d = -1, T = Array(l.size);
        return l.forEach(function(I) {
          T[++d] = I;
        }), T;
      }
      var Un, Bn, jn, Qr = Array.prototype, eo = Function.prototype, Ot = Object.prototype, nn = Me["__core-js_shared__"], $n = eo.toString, we = Ot.hasOwnProperty, Vn = (Un = /[^.]+$/.exec(nn && nn.keys && nn.keys.IE_PROTO || "")) ? "Symbol(src)_1." + Un : "", Gn = Ot.toString, to = RegExp("^" + $n.call(we).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), zn = kn ? Me.Buffer : void 0, Pt = Me.Symbol, Jn = Me.Uint8Array, Yn = Ot.propertyIsEnumerable, no = Qr.splice, Ve = Pt ? Pt.toStringTag : void 0, qn = Object.getOwnPropertySymbols, ro = zn ? zn.isBuffer : void 0, oo = (Bn = Object.keys, jn = Object, function(l) {
        return Bn(jn(l));
      }), rn = We(Me, "DataView"), it = We(Me, "Map"), on = We(Me, "Promise"), an = We(Me, "Set"), sn = We(Me, "WeakMap"), at = We(Object, "create"), io = Je(rn), ao = Je(it), so = Je(on), lo = Je(an), co = Je(sn), Zn = Pt ? Pt.prototype : void 0, ln = Zn ? Zn.valueOf : void 0;
      function Ge(l) {
        var d = -1, T = l == null ? 0 : l.length;
        for (this.clear(); ++d < T; ) {
          var I = l[d];
          this.set(I[0], I[1]);
        }
      }
      function Oe(l) {
        var d = -1, T = l == null ? 0 : l.length;
        for (this.clear(); ++d < T; ) {
          var I = l[d];
          this.set(I[0], I[1]);
        }
      }
      function ze(l) {
        var d = -1, T = l == null ? 0 : l.length;
        for (this.clear(); ++d < T; ) {
          var I = l[d];
          this.set(I[0], I[1]);
        }
      }
      function It(l) {
        var d = -1, T = l == null ? 0 : l.length;
        for (this.__data__ = new ze(); ++d < T; )
          this.add(l[d]);
      }
      function Ae(l) {
        var d = this.__data__ = new Oe(l);
        this.size = d.size;
      }
      function uo(l, d) {
        var T = Ft(l), I = !T && yo(l), H = !T && !I && cn(l), j = !T && !I && !H && rr(l), K = T || I || H || j, ee = K ? function(oe, Te) {
          for (var Pe = -1, ue = Array(oe); ++Pe < oe; )
            ue[Pe] = Te(Pe);
          return ue;
        }(l.length, String) : [], _e = ee.length;
        for (var re in l)
          !d && !we.call(l, re) || K && (re == "length" || H && (re == "offset" || re == "parent") || j && (re == "buffer" || re == "byteLength" || re == "byteOffset") || go(re, _e)) || ee.push(re);
        return ee;
      }
      function Lt(l, d) {
        for (var T = l.length; T--; )
          if (Qn(l[T][0], d))
            return T;
        return -1;
      }
      function st(l) {
        return l == null ? l === void 0 ? "[object Undefined]" : "[object Null]" : Ve && Ve in Object(l) ? function(d) {
          var T = we.call(d, Ve), I = d[Ve];
          try {
            d[Ve] = void 0;
            var H = !0;
          } catch {
          }
          var j = Gn.call(d);
          return H && (T ? d[Ve] = I : delete d[Ve]), j;
        }(l) : function(d) {
          return Gn.call(d);
        }(l);
      }
      function Hn(l) {
        return lt(l) && st(l) == o;
      }
      function Xn(l, d, T, I, H) {
        return l === d || (l == null || d == null || !lt(l) && !lt(d) ? l != l && d != d : function(j, K, ee, _e, re, oe) {
          var Te = Ft(j), Pe = Ft(K), ue = Te ? i : ke(j), Ie = Pe ? i : ke(K), Qe = (ue = ue == o ? F : ue) == F, At = (Ie = Ie == o ? F : Ie) == F, et = ue == Ie;
          if (et && cn(j)) {
            if (!cn(K))
              return !1;
            Te = !0, Qe = !1;
          }
          if (et && !Qe)
            return oe || (oe = new Ae()), Te || rr(j) ? Kn(j, K, ee, _e, re, oe) : function(J, z, kt, Re, un, ye, Le) {
              switch (kt) {
                case Q:
                  if (J.byteLength != z.byteLength || J.byteOffset != z.byteOffset)
                    return !1;
                  J = J.buffer, z = z.buffer;
                case ie:
                  return !(J.byteLength != z.byteLength || !ye(new Jn(J), new Jn(z)));
                case s:
                case m:
                case x:
                  return Qn(+J, +z);
                case E:
                  return J.name == z.name && J.message == z.message;
                case k:
                case g:
                  return J == z + "";
                case S:
                  var De = Kr;
                case W:
                  var ut = 1 & Re;
                  if (De || (De = Wr), J.size != z.size && !ut)
                    return !1;
                  var Rt = Le.get(J);
                  if (Rt)
                    return Rt == z;
                  Re |= 2, Le.set(J, z);
                  var tt = Kn(De(J), De(z), Re, un, ye, Le);
                  return Le.delete(J), tt;
                case O:
                  if (ln)
                    return ln.call(J) == ln.call(z);
              }
              return !1;
            }(j, K, ue, ee, _e, re, oe);
          if (!(1 & ee)) {
            var ct = Qe && we.call(j, "__wrapped__"), or = At && we.call(K, "__wrapped__");
            if (ct || or) {
              var vo = ct ? j.value() : j, bo = or ? K.value() : K;
              return oe || (oe = new Ae()), re(vo, bo, ee, _e, oe);
            }
          }
          return et ? (oe || (oe = new Ae()), function(J, z, kt, Re, un, ye) {
            var Le = 1 & kt, De = Wn(J), ut = De.length, Rt = Wn(z).length;
            if (ut != Rt && !Le)
              return !1;
            for (var tt = ut; tt--; ) {
              var Ye = De[tt];
              if (!(Le ? Ye in z : we.call(z, Ye)))
                return !1;
            }
            var ir = ye.get(J);
            if (ir && ye.get(z))
              return ir == z;
            var Dt = !0;
            ye.set(J, z), ye.set(z, J);
            for (var fn = Le; ++tt < ut; ) {
              var Ut = J[Ye = De[tt]], Bt = z[Ye];
              if (Re)
                var ar = Le ? Re(Bt, Ut, Ye, z, J, ye) : Re(Ut, Bt, Ye, J, z, ye);
              if (!(ar === void 0 ? Ut === Bt || un(Ut, Bt, kt, Re, ye) : ar)) {
                Dt = !1;
                break;
              }
              fn || (fn = Ye == "constructor");
            }
            if (Dt && !fn) {
              var jt = J.constructor, $t = z.constructor;
              jt == $t || !("constructor" in J) || !("constructor" in z) || typeof jt == "function" && jt instanceof jt && typeof $t == "function" && $t instanceof $t || (Dt = !1);
            }
            return ye.delete(J), ye.delete(z), Dt;
          }(j, K, ee, _e, re, oe)) : !1;
        }(l, d, T, I, Xn, H));
      }
      function fo(l) {
        return !(!nr(l) || function(d) {
          return !!Vn && Vn in d;
        }(l)) && (er(l) ? to : en).test(Je(l));
      }
      function po(l) {
        if (T = (d = l) && d.constructor, I = typeof T == "function" && T.prototype || Ot, d !== I)
          return oo(l);
        var d, T, I, H = [];
        for (var j in Object(l))
          we.call(l, j) && j != "constructor" && H.push(j);
        return H;
      }
      function Kn(l, d, T, I, H, j) {
        var K = 1 & T, ee = l.length, _e = d.length;
        if (ee != _e && !(K && _e > ee))
          return !1;
        var re = j.get(l);
        if (re && j.get(d))
          return re == d;
        var oe = -1, Te = !0, Pe = 2 & T ? new It() : void 0;
        for (j.set(l, d), j.set(d, l); ++oe < ee; ) {
          var ue = l[oe], Ie = d[oe];
          if (I)
            var Qe = K ? I(Ie, ue, oe, d, l, j) : I(ue, Ie, oe, l, d, j);
          if (Qe !== void 0) {
            if (Qe)
              continue;
            Te = !1;
            break;
          }
          if (Pe) {
            if (!Xr(d, function(At, et) {
              if (ct = et, !Pe.has(ct) && (ue === At || H(ue, At, T, I, j)))
                return Pe.push(et);
              var ct;
            })) {
              Te = !1;
              break;
            }
          } else if (ue !== Ie && !H(ue, Ie, T, I, j)) {
            Te = !1;
            break;
          }
        }
        return j.delete(l), j.delete(d), Te;
      }
      function Wn(l) {
        return function(d, T, I) {
          var H = T(d);
          return Ft(d) ? H : function(j, K) {
            for (var ee = -1, _e = K.length, re = j.length; ++ee < _e; )
              j[re + ee] = K[ee];
            return j;
          }(H, I(d));
        }(l, mo, ho);
      }
      function Nt(l, d) {
        var T, I, H = l.__data__;
        return ((I = typeof (T = d)) == "string" || I == "number" || I == "symbol" || I == "boolean" ? T !== "__proto__" : T === null) ? H[typeof d == "string" ? "string" : "hash"] : H.map;
      }
      function We(l, d) {
        var T = function(I, H) {
          return I == null ? void 0 : I[H];
        }(l, d);
        return fo(T) ? T : void 0;
      }
      Ge.prototype.clear = function() {
        this.__data__ = at ? at(null) : {}, this.size = 0;
      }, Ge.prototype.delete = function(l) {
        var d = this.has(l) && delete this.__data__[l];
        return this.size -= d ? 1 : 0, d;
      }, Ge.prototype.get = function(l) {
        var d = this.__data__;
        if (at) {
          var T = d[l];
          return T === n ? void 0 : T;
        }
        return we.call(d, l) ? d[l] : void 0;
      }, Ge.prototype.has = function(l) {
        var d = this.__data__;
        return at ? d[l] !== void 0 : we.call(d, l);
      }, Ge.prototype.set = function(l, d) {
        var T = this.__data__;
        return this.size += this.has(l) ? 0 : 1, T[l] = at && d === void 0 ? n : d, this;
      }, Oe.prototype.clear = function() {
        this.__data__ = [], this.size = 0;
      }, Oe.prototype.delete = function(l) {
        var d = this.__data__, T = Lt(d, l);
        return !(T < 0) && (T == d.length - 1 ? d.pop() : no.call(d, T, 1), --this.size, !0);
      }, Oe.prototype.get = function(l) {
        var d = this.__data__, T = Lt(d, l);
        return T < 0 ? void 0 : d[T][1];
      }, Oe.prototype.has = function(l) {
        return Lt(this.__data__, l) > -1;
      }, Oe.prototype.set = function(l, d) {
        var T = this.__data__, I = Lt(T, l);
        return I < 0 ? (++this.size, T.push([l, d])) : T[I][1] = d, this;
      }, ze.prototype.clear = function() {
        this.size = 0, this.__data__ = { hash: new Ge(), map: new (it || Oe)(), string: new Ge() };
      }, ze.prototype.delete = function(l) {
        var d = Nt(this, l).delete(l);
        return this.size -= d ? 1 : 0, d;
      }, ze.prototype.get = function(l) {
        return Nt(this, l).get(l);
      }, ze.prototype.has = function(l) {
        return Nt(this, l).has(l);
      }, ze.prototype.set = function(l, d) {
        var T = Nt(this, l), I = T.size;
        return T.set(l, d), this.size += T.size == I ? 0 : 1, this;
      }, It.prototype.add = It.prototype.push = function(l) {
        return this.__data__.set(l, n), this;
      }, It.prototype.has = function(l) {
        return this.__data__.has(l);
      }, Ae.prototype.clear = function() {
        this.__data__ = new Oe(), this.size = 0;
      }, Ae.prototype.delete = function(l) {
        var d = this.__data__, T = d.delete(l);
        return this.size = d.size, T;
      }, Ae.prototype.get = function(l) {
        return this.__data__.get(l);
      }, Ae.prototype.has = function(l) {
        return this.__data__.has(l);
      }, Ae.prototype.set = function(l, d) {
        var T = this.__data__;
        if (T instanceof Oe) {
          var I = T.__data__;
          if (!it || I.length < 199)
            return I.push([l, d]), this.size = ++T.size, this;
          T = this.__data__ = new ze(I);
        }
        return T.set(l, d), this.size = T.size, this;
      };
      var ho = qn ? function(l) {
        return l == null ? [] : (l = Object(l), function(d, T) {
          for (var I = -1, H = d == null ? 0 : d.length, j = 0, K = []; ++I < H; ) {
            var ee = d[I];
            T(ee, I, d) && (K[j++] = ee);
          }
          return K;
        }(qn(l), function(d) {
          return Yn.call(l, d);
        }));
      } : function() {
        return [];
      }, ke = st;
      function go(l, d) {
        return !!(d = d ?? r) && (typeof l == "number" || Zr.test(l)) && l > -1 && l % 1 == 0 && l < d;
      }
      function Je(l) {
        if (l != null) {
          try {
            return $n.call(l);
          } catch {
          }
          try {
            return l + "";
          } catch {
          }
        }
        return "";
      }
      function Qn(l, d) {
        return l === d || l != l && d != d;
      }
      (rn && ke(new rn(new ArrayBuffer(1))) != Q || it && ke(new it()) != S || on && ke(on.resolve()) != X || an && ke(new an()) != W || sn && ke(new sn()) != G) && (ke = function(l) {
        var d = st(l), T = d == F ? l.constructor : void 0, I = T ? Je(T) : "";
        if (I)
          switch (I) {
            case io:
              return Q;
            case ao:
              return S;
            case so:
              return X;
            case lo:
              return W;
            case co:
              return G;
          }
        return d;
      });
      var yo = Hn(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Hn : function(l) {
        return lt(l) && we.call(l, "callee") && !Yn.call(l, "callee");
      }, Ft = Array.isArray, cn = ro || function() {
        return !1;
      };
      function er(l) {
        if (!nr(l))
          return !1;
        var d = st(l);
        return d == C || d == "[object GeneratorFunction]" || d == "[object AsyncFunction]" || d == "[object Proxy]";
      }
      function tr(l) {
        return typeof l == "number" && l > -1 && l % 1 == 0 && l <= r;
      }
      function nr(l) {
        var d = typeof l;
        return l != null && (d == "object" || d == "function");
      }
      function lt(l) {
        return l != null && typeof l == "object";
      }
      var rr = Dn ? /* @__PURE__ */ function(l) {
        return function(d) {
          return l(d);
        };
      }(Dn) : function(l) {
        return lt(l) && tr(l.length) && !!Z[st(l)];
      };
      function mo(l) {
        return (d = l) != null && tr(d.length) && !er(d) ? uo(l) : po(l);
        var d;
      }
      e.exports = function(l, d) {
        return Xn(l, d);
      };
    })(Qt, Qt.exports);
    var In = M(Qt.exports);
    function Ln(e, t) {
      return e.length === t.length && JSON.stringify(e.map(function(n) {
        return n;
      }).sort()) === JSON.stringify(t.map(function(n) {
        return n;
      }).sort());
    }
    var Jr = { Polygon: he, LineString: Se, Point: Ue, MultiPolygon: de, MultiLineString: de, MultiPoint: de }, Yr = Object.freeze({ __proto__: null, CommonSelectors: Sr, constrainFeatureMovement: Kt, createMidPoint: bn, createSupplementaryPoints: bt, createVertex: Xe, doubleClickZoom: be, euclideanDistance: Vt, featuresAt: Ce, getFeatureAtAndSetCursors: dt, isClick: Gt, isEventAtCoordinates: St, isTap: zt, mapEventToBoundingBox: Ze, ModeHandler: _, moveFeatures: Wt, sortFeatures: fe, stringSetsAreEqual: Ln, StringSet: se, theme: mn, toDenseArray: rt }), qr = function(e, t) {
      var n = { options: e = function(o) {
        o === void 0 && (o = {});
        var i = Ne(o);
        return o.controls || (i.controls = {}), o.displayControlsDefault === !1 ? i.controls = Ne(zr, o.controls) : i.controls = Ne(Gr, o.controls), (i = Ne(Vr, i)).styles = Pn(i.styles, "cold").concat(Pn(i.styles, "hot")), i;
      }(e) };
      t = function(o, i) {
        return i.modes = w, i.getFeatureIdsAt = function(s) {
          return Ce.click({ point: s }, null, o).map(function(m) {
            return m.properties.id;
          });
        }, i.getSelectedIds = function() {
          return o.store.getSelectedIds();
        }, i.getSelected = function() {
          return { type: h.FEATURE_COLLECTION, features: o.store.getSelectedIds().map(function(s) {
            return o.store.get(s);
          }).map(function(s) {
            return s.toGeoJSON();
          }) };
        }, i.getSelectedPoints = function() {
          return { type: h.FEATURE_COLLECTION, features: o.store.getSelectedCoordinates().map(function(s) {
            return { type: h.FEATURE, properties: {}, geometry: { type: h.POINT, coordinates: s.coordinates } };
          }) };
        }, i.set = function(s) {
          if (s.type === void 0 || s.type !== h.FEATURE_COLLECTION || !Array.isArray(s.features))
            throw new Error("Invalid FeatureCollection");
          var m = o.store.createRenderBatch(), E = o.store.getAllIds().slice(), C = i.add(s), S = new se(C);
          return (E = E.filter(function(x) {
            return !S.has(x);
          })).length && i.delete(E), m(), C;
        }, i.add = function(s) {
          var m = JSON.parse(JSON.stringify(Ir(s))).features.map(function(E) {
            if (E.id = E.id || Yt(), E.geometry === null)
              throw new Error("Invalid geometry: null");
            if (o.store.get(E.id) === void 0 || o.store.get(E.id).type !== E.geometry.type) {
              var C = Jr[E.geometry.type];
              if (C === void 0)
                throw new Error("Invalid geometry type: " + E.geometry.type + ".");
              var S = new C(o, E);
              o.store.add(S);
            } else {
              var x = o.store.get(E.id);
              x.properties = E.properties, In(x.properties, E.properties) || o.store.featureChanged(x.id), In(x.getCoordinates(), E.geometry.coordinates) || x.incomingCoords(E.geometry.coordinates);
            }
            return E.id;
          });
          return o.store.render(), m;
        }, i.get = function(s) {
          var m = o.store.get(s);
          if (m)
            return m.toGeoJSON();
        }, i.getAll = function() {
          return { type: h.FEATURE_COLLECTION, features: o.store.getAll().map(function(s) {
            return s.toGeoJSON();
          }) };
        }, i.delete = function(s) {
          return o.store.delete(s, { silent: !0 }), i.getMode() !== w.DIRECT_SELECT || o.store.getSelectedIds().length ? o.store.render() : o.events.changeMode(w.SIMPLE_SELECT, void 0, { silent: !0 }), i;
        }, i.deleteAll = function() {
          return o.store.delete(o.store.getAllIds(), { silent: !0 }), i.getMode() === w.DIRECT_SELECT ? o.events.changeMode(w.SIMPLE_SELECT, void 0, { silent: !0 }) : o.store.render(), i;
        }, i.changeMode = function(s, m) {
          return m === void 0 && (m = {}), s === w.SIMPLE_SELECT && i.getMode() === w.SIMPLE_SELECT ? (Ln(m.featureIds || [], o.store.getSelectedIds()) || (o.store.setSelected(m.featureIds, { silent: !0 }), o.store.render()), i) : (s === w.DIRECT_SELECT && i.getMode() === w.DIRECT_SELECT && m.featureId === o.store.getSelectedIds()[0] || o.events.changeMode(s, m, { silent: !0 }), i);
        }, i.getMode = function() {
          return o.events.getMode();
        }, i.trash = function() {
          return o.events.trash({ silent: !0 }), i;
        }, i.combineFeatures = function() {
          return o.events.combineFeatures({ silent: !0 }), i;
        }, i.uncombineFeatures = function() {
          return o.events.uncombineFeatures({ silent: !0 }), i;
        }, i.setFeatureProperty = function(s, m, E) {
          return o.store.setFeatureProperty(s, m, E), i;
        }, i;
      }(n, t), n.api = t;
      var r = Cr(n);
      return t.onAdd = r.onAdd, t.onRemove = r.onRemove, t.types = b, t.options = e, t;
    };
    function Mt(e) {
      qr(e, this);
    }
    return Mt.modes = On, Mt.constants = ae, Mt.lib = Yr, Mt;
  });
})(pr);
var Mo = pr.exports;
const hr = /* @__PURE__ */ dr(Mo);
function Oo(p, c, _) {
  _ === void 0 && (_ = {});
  var M = dn(p), L = dn(c), N = qe(L[1] - M[1]), A = qe(L[0] - M[0]), P = qe(M[1]), U = qe(L[1]), a = Math.pow(Math.sin(N / 2), 2) + Math.pow(Math.sin(A / 2), 2) * Math.cos(P) * Math.cos(U);
  return wo(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), _.units);
}
function gr(p, c, _) {
  if (p !== null)
    for (var M, L, N, A, P, U, a, u = 0, y = 0, v, f = p.type, b = f === "FeatureCollection", h = f === "Feature", w = b ? p.features.length : 1, R = 0; R < w; R++) {
      a = b ? p.features[R].geometry : h ? p.geometry : p, v = a ? a.type === "GeometryCollection" : !1, P = v ? a.geometries.length : 1;
      for (var $ = 0; $ < P; $++) {
        var D = 0, V = 0;
        if (A = v ? a.geometries[$] : a, A !== null) {
          U = A.coordinates;
          var Y = A.type;
          switch (u = _ && (Y === "Polygon" || Y === "MultiPolygon") ? 1 : 0, Y) {
            case null:
              break;
            case "Point":
              if (c(
                U,
                y,
                R,
                D,
                V
              ) === !1)
                return !1;
              y++, D++;
              break;
            case "LineString":
            case "MultiPoint":
              for (M = 0; M < U.length; M++) {
                if (c(
                  U[M],
                  y,
                  R,
                  D,
                  V
                ) === !1)
                  return !1;
                y++, Y === "MultiPoint" && D++;
              }
              Y === "LineString" && D++;
              break;
            case "Polygon":
            case "MultiLineString":
              for (M = 0; M < U.length; M++) {
                for (L = 0; L < U[M].length - u; L++) {
                  if (c(
                    U[M][L],
                    y,
                    R,
                    D,
                    V
                  ) === !1)
                    return !1;
                  y++;
                }
                Y === "MultiLineString" && D++, Y === "Polygon" && V++;
              }
              Y === "Polygon" && D++;
              break;
            case "MultiPolygon":
              for (M = 0; M < U.length; M++) {
                for (V = 0, L = 0; L < U[M].length; L++) {
                  for (N = 0; N < U[M][L].length - u; N++) {
                    if (c(
                      U[M][L][N],
                      y,
                      R,
                      D,
                      V
                    ) === !1)
                      return !1;
                    y++;
                  }
                  V++;
                }
                D++;
              }
              break;
            case "GeometryCollection":
              for (M = 0; M < A.geometries.length; M++)
                if (gr(A.geometries[M], c, _) === !1)
                  return !1;
              break;
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
      }
    }
}
function Po(p, c) {
  var _, M, L, N, A, P, U, a, u, y, v = 0, f = p.type === "FeatureCollection", b = p.type === "Feature", h = f ? p.features.length : 1;
  for (_ = 0; _ < h; _++) {
    for (P = f ? p.features[_].geometry : b ? p.geometry : p, a = f ? p.features[_].properties : b ? p.properties : {}, u = f ? p.features[_].bbox : b ? p.bbox : void 0, y = f ? p.features[_].id : b ? p.id : void 0, U = P ? P.type === "GeometryCollection" : !1, A = U ? P.geometries.length : 1, L = 0; L < A; L++) {
      if (N = U ? P.geometries[L] : P, N === null) {
        if (c(
          null,
          v,
          a,
          u,
          y
        ) === !1)
          return !1;
        continue;
      }
      switch (N.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (c(
            N,
            v,
            a,
            u,
            y
          ) === !1)
            return !1;
          break;
        }
        case "GeometryCollection": {
          for (M = 0; M < N.geometries.length; M++)
            if (c(
              N.geometries[M],
              v,
              a,
              u,
              y
            ) === !1)
              return !1;
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    v++;
  }
}
function Io(p, c) {
  Po(p, function(_, M, L, N, A) {
    var P = _ === null ? null : _.type;
    switch (P) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        return c(
          ft(_, L, { bbox: N, id: A }),
          M,
          0
        ) === !1 ? !1 : void 0;
    }
    var U;
    switch (P) {
      case "MultiPoint":
        U = "Point";
        break;
      case "MultiLineString":
        U = "LineString";
        break;
      case "MultiPolygon":
        U = "Polygon";
        break;
    }
    for (var a = 0; a < _.coordinates.length; a++) {
      var u = _.coordinates[a], y = {
        type: U,
        coordinates: u
      };
      if (c(ft(y, L), M, a) === !1)
        return !1;
    }
  });
}
function Lo(p, c) {
  Io(p, function(_, M, L) {
    var N = 0;
    if (_.geometry) {
      var A = _.geometry.type;
      if (!(A === "Point" || A === "MultiPoint")) {
        var P, U = 0, a = 0, u = 0;
        if (gr(
          _,
          function(y, v, f, b, h) {
            if (P === void 0 || M > U || b > a || h > u) {
              P = y, U = M, a = b, u = h, N = 0;
              return;
            }
            var w = xo(
              [P, y],
              _.properties
            );
            if (c(
              w,
              M,
              L,
              h,
              N
            ) === !1)
              return !1;
            N++, P = y;
          }
        ) === !1)
          return !1;
      }
    }
  });
}
function No(p, c, _) {
  var M = _, L = !1;
  return Lo(
    p,
    function(N, A, P, U, a) {
      L === !1 && _ === void 0 ? M = N : M = c(
        M,
        N,
        A,
        P,
        U,
        a
      ), L = !0;
    }
  ), M;
}
function yr(p, c) {
  return c === void 0 && (c = {}), No(p, function(_, M) {
    var L = M.geometry.coordinates;
    return _ + Oo(L[0], L[1], c);
  }, 0);
}
var mr = { exports: {} };
/*! @preserve
 * numeral.js
 * version : 2.0.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */
(function(p) {
  (function(c, _) {
    p.exports ? p.exports = _() : c.numeral = _();
  })(nt, function() {
    var c, _, M = "2.0.6", L = {}, N = {}, A = {
      currentLocale: "en",
      zeroFormat: null,
      nullFormat: null,
      defaultFormat: "0,0",
      scalePercentBy100: !0
    }, P = {
      currentLocale: A.currentLocale,
      zeroFormat: A.zeroFormat,
      nullFormat: A.nullFormat,
      defaultFormat: A.defaultFormat,
      scalePercentBy100: A.scalePercentBy100
    };
    function U(a, u) {
      this._input = a, this._value = u;
    }
    return c = function(a) {
      var u, y, v, f;
      if (c.isNumeral(a))
        u = a.value();
      else if (a === 0 || typeof a > "u")
        u = 0;
      else if (a === null || _.isNaN(a))
        u = null;
      else if (typeof a == "string")
        if (P.zeroFormat && a === P.zeroFormat)
          u = 0;
        else if (P.nullFormat && a === P.nullFormat || !a.replace(/[^0-9]+/g, "").length)
          u = null;
        else {
          for (y in L)
            if (f = typeof L[y].regexps.unformat == "function" ? L[y].regexps.unformat() : L[y].regexps.unformat, f && a.match(f)) {
              v = L[y].unformat;
              break;
            }
          v = v || c._.stringToNumber, u = v(a);
        }
      else
        u = Number(a) || null;
      return new U(a, u);
    }, c.version = M, c.isNumeral = function(a) {
      return a instanceof U;
    }, c._ = _ = {
      // formats numbers separators, decimals places, signs, abbreviations
      numberToFormat: function(a, u, y) {
        var v = N[c.options.currentLocale], f = !1, b = !1, h = 0, w = "", R = 1e12, $ = 1e9, D = 1e6, V = 1e3, Y = "", Ee = !1, ae, me, te, fe, Ze, se, ve;
        if (a = a || 0, me = Math.abs(a), c._.includes(u, "(") ? (f = !0, u = u.replace(/[\(|\)]/g, "")) : (c._.includes(u, "+") || c._.includes(u, "-")) && (Ze = c._.includes(u, "+") ? u.indexOf("+") : a < 0 ? u.indexOf("-") : -1, u = u.replace(/[\+|\-]/g, "")), c._.includes(u, "a") && (ae = u.match(/a(k|m|b|t)?/), ae = ae ? ae[1] : !1, c._.includes(u, " a") && (w = " "), u = u.replace(new RegExp(w + "a[kmbt]?"), ""), me >= R && !ae || ae === "t" ? (w += v.abbreviations.trillion, a = a / R) : me < R && me >= $ && !ae || ae === "b" ? (w += v.abbreviations.billion, a = a / $) : me < $ && me >= D && !ae || ae === "m" ? (w += v.abbreviations.million, a = a / D) : (me < D && me >= V && !ae || ae === "k") && (w += v.abbreviations.thousand, a = a / V)), c._.includes(u, "[.]") && (b = !0, u = u.replace("[.]", ".")), te = a.toString().split(".")[0], fe = u.split(".")[1], se = u.indexOf(","), h = (u.split(".")[0].split(",")[0].match(/0/g) || []).length, fe ? (c._.includes(fe, "[") ? (fe = fe.replace("]", ""), fe = fe.split("["), Y = c._.toFixed(a, fe[0].length + fe[1].length, y, fe[1].length)) : Y = c._.toFixed(a, fe.length, y), te = Y.split(".")[0], c._.includes(Y, ".") ? Y = v.delimiters.decimal + Y.split(".")[1] : Y = "", b && Number(Y.slice(1)) === 0 && (Y = "")) : te = c._.toFixed(a, 0, y), w && !ae && Number(te) >= 1e3 && w !== v.abbreviations.trillion)
          switch (te = String(Number(te) / 1e3), w) {
            case v.abbreviations.thousand:
              w = v.abbreviations.million;
              break;
            case v.abbreviations.million:
              w = v.abbreviations.billion;
              break;
            case v.abbreviations.billion:
              w = v.abbreviations.trillion;
              break;
          }
        if (c._.includes(te, "-") && (te = te.slice(1), Ee = !0), te.length < h)
          for (var Ce = h - te.length; Ce > 0; Ce--)
            te = "0" + te;
        return se > -1 && (te = te.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + v.delimiters.thousands)), u.indexOf(".") === 0 && (te = ""), ve = te + Y + (w || ""), f ? ve = (f && Ee ? "(" : "") + ve + (f && Ee ? ")" : "") : Ze >= 0 ? ve = Ze === 0 ? (Ee ? "-" : "+") + ve : ve + (Ee ? "-" : "+") : Ee && (ve = "-" + ve), ve;
      },
      // unformats numbers separators, decimals places, signs, abbreviations
      stringToNumber: function(a) {
        var u = N[P.currentLocale], y = a, v = {
          thousand: 3,
          million: 6,
          billion: 9,
          trillion: 12
        }, f, b, h;
        if (P.zeroFormat && a === P.zeroFormat)
          b = 0;
        else if (P.nullFormat && a === P.nullFormat || !a.replace(/[^0-9]+/g, "").length)
          b = null;
        else {
          b = 1, u.delimiters.decimal !== "." && (a = a.replace(/\./g, "").replace(u.delimiters.decimal, "."));
          for (f in v)
            if (h = new RegExp("[^a-zA-Z]" + u.abbreviations[f] + "(?:\\)|(\\" + u.currency.symbol + ")?(?:\\))?)?$"), y.match(h)) {
              b *= Math.pow(10, v[f]);
              break;
            }
          b *= (a.split("-").length + Math.min(a.split("(").length - 1, a.split(")").length - 1)) % 2 ? 1 : -1, a = a.replace(/[^0-9\.]+/g, ""), b *= Number(a);
        }
        return b;
      },
      isNaN: function(a) {
        return typeof a == "number" && isNaN(a);
      },
      includes: function(a, u) {
        return a.indexOf(u) !== -1;
      },
      insert: function(a, u, y) {
        return a.slice(0, y) + u + a.slice(y);
      },
      reduce: function(a, u) {
        if (this === null)
          throw new TypeError("Array.prototype.reduce called on null or undefined");
        if (typeof u != "function")
          throw new TypeError(u + " is not a function");
        var y = Object(a), v = y.length >>> 0, f = 0, b;
        if (arguments.length === 3)
          b = arguments[2];
        else {
          for (; f < v && !(f in y); )
            f++;
          if (f >= v)
            throw new TypeError("Reduce of empty array with no initial value");
          b = y[f++];
        }
        for (; f < v; f++)
          f in y && (b = u(b, y[f], f, y));
        return b;
      },
      /**
       * Computes the multiplier necessary to make x >= 1,
       * effectively eliminating miscalculations caused by
       * finite precision.
       */
      multiplier: function(a) {
        var u = a.toString().split(".");
        return u.length < 2 ? 1 : Math.pow(10, u[1].length);
      },
      /**
       * Given a variable number of arguments, returns the maximum
       * multiplier that must be used to normalize an operation involving
       * all of them.
       */
      correctionFactor: function() {
        var a = Array.prototype.slice.call(arguments);
        return a.reduce(function(u, y) {
          var v = _.multiplier(y);
          return u > v ? u : v;
        }, 1);
      },
      /**
       * Implementation of toFixed() that treats floats more like decimals
       *
       * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
       * problems for accounting- and finance-related software.
       */
      toFixed: function(a, u, y, v) {
        var f = a.toString().split("."), b = u - (v || 0), h, w, R, $;
        return f.length === 2 ? h = Math.min(Math.max(f[1].length, b), u) : h = b, R = Math.pow(10, h), $ = (y(a + "e+" + h) / R).toFixed(h), v > u - h && (w = new RegExp("\\.?0{1," + (v - (u - h)) + "}$"), $ = $.replace(w, "")), $;
      }
    }, c.options = P, c.formats = L, c.locales = N, c.locale = function(a) {
      return a && (P.currentLocale = a.toLowerCase()), P.currentLocale;
    }, c.localeData = function(a) {
      if (!a)
        return N[P.currentLocale];
      if (a = a.toLowerCase(), !N[a])
        throw new Error("Unknown locale : " + a);
      return N[a];
    }, c.reset = function() {
      for (var a in A)
        P[a] = A[a];
    }, c.zeroFormat = function(a) {
      P.zeroFormat = typeof a == "string" ? a : null;
    }, c.nullFormat = function(a) {
      P.nullFormat = typeof a == "string" ? a : null;
    }, c.defaultFormat = function(a) {
      P.defaultFormat = typeof a == "string" ? a : "0.0";
    }, c.register = function(a, u, y) {
      if (u = u.toLowerCase(), this[a + "s"][u])
        throw new TypeError(u + " " + a + " already registered.");
      return this[a + "s"][u] = y, y;
    }, c.validate = function(a, u) {
      var y, v, f, b, h, w, R, $;
      if (typeof a != "string" && (a += "", console.warn && console.warn("Numeral.js: Value is not string. It has been co-erced to: ", a)), a = a.trim(), a.match(/^\d+$/))
        return !0;
      if (a === "")
        return !1;
      try {
        R = c.localeData(u);
      } catch {
        R = c.localeData(c.locale());
      }
      return f = R.currency.symbol, h = R.abbreviations, y = R.delimiters.decimal, R.delimiters.thousands === "." ? v = "\\." : v = R.delimiters.thousands, $ = a.match(/^[^\d]+/), $ !== null && (a = a.substr(1), $[0] !== f) || ($ = a.match(/[^\d]+$/), $ !== null && (a = a.slice(0, -1), $[0] !== h.thousand && $[0] !== h.million && $[0] !== h.billion && $[0] !== h.trillion)) ? !1 : (w = new RegExp(v + "{2}"), a.match(/[^\d.,]/g) ? !1 : (b = a.split(y), b.length > 2 ? !1 : b.length < 2 ? !!b[0].match(/^\d+.*\d$/) && !b[0].match(w) : b[0].length === 1 ? !!b[0].match(/^\d+$/) && !b[0].match(w) && !!b[1].match(/^\d+$/) : !!b[0].match(/^\d+.*\d$/) && !b[0].match(w) && !!b[1].match(/^\d+$/)));
    }, c.fn = U.prototype = {
      clone: function() {
        return c(this);
      },
      format: function(a, u) {
        var y = this._value, v = a || P.defaultFormat, f, b, h;
        if (u = u || Math.round, y === 0 && P.zeroFormat !== null)
          b = P.zeroFormat;
        else if (y === null && P.nullFormat !== null)
          b = P.nullFormat;
        else {
          for (f in L)
            if (v.match(L[f].regexps.format)) {
              h = L[f].format;
              break;
            }
          h = h || c._.numberToFormat, b = h(y, v, u);
        }
        return b;
      },
      value: function() {
        return this._value;
      },
      input: function() {
        return this._input;
      },
      set: function(a) {
        return this._value = Number(a), this;
      },
      add: function(a) {
        var u = _.correctionFactor.call(null, this._value, a);
        function y(v, f, b, h) {
          return v + Math.round(u * f);
        }
        return this._value = _.reduce([this._value, a], y, 0) / u, this;
      },
      subtract: function(a) {
        var u = _.correctionFactor.call(null, this._value, a);
        function y(v, f, b, h) {
          return v - Math.round(u * f);
        }
        return this._value = _.reduce([a], y, Math.round(this._value * u)) / u, this;
      },
      multiply: function(a) {
        function u(y, v, f, b) {
          var h = _.correctionFactor(y, v);
          return Math.round(y * h) * Math.round(v * h) / Math.round(h * h);
        }
        return this._value = _.reduce([this._value, a], u, 1), this;
      },
      divide: function(a) {
        function u(y, v, f, b) {
          var h = _.correctionFactor(y, v);
          return Math.round(y * h) / Math.round(v * h);
        }
        return this._value = _.reduce([this._value, a], u), this;
      },
      difference: function(a) {
        return Math.abs(c(this._value).subtract(a).value());
      }
    }, c.register("locale", "en", {
      delimiters: {
        thousands: ",",
        decimal: "."
      },
      abbreviations: {
        thousand: "k",
        million: "m",
        billion: "b",
        trillion: "t"
      },
      ordinal: function(a) {
        var u = a % 10;
        return ~~(a % 100 / 10) === 1 ? "th" : u === 1 ? "st" : u === 2 ? "nd" : u === 3 ? "rd" : "th";
      },
      currency: {
        symbol: "$"
      }
    }), function() {
      c.register("format", "bps", {
        regexps: {
          format: /(BPS)/,
          unformat: /(BPS)/
        },
        format: function(a, u, y) {
          var v = c._.includes(u, " BPS") ? " " : "", f;
          return a = a * 1e4, u = u.replace(/\s?BPS/, ""), f = c._.numberToFormat(a, u, y), c._.includes(f, ")") ? (f = f.split(""), f.splice(-1, 0, v + "BPS"), f = f.join("")) : f = f + v + "BPS", f;
        },
        unformat: function(a) {
          return +(c._.stringToNumber(a) * 1e-4).toFixed(15);
        }
      });
    }(), function() {
      var a = {
        base: 1e3,
        suffixes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      }, u = {
        base: 1024,
        suffixes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
      }, y = a.suffixes.concat(u.suffixes.filter(function(f) {
        return a.suffixes.indexOf(f) < 0;
      })), v = y.join("|");
      v = "(" + v.replace("B", "B(?!PS)") + ")", c.register("format", "bytes", {
        regexps: {
          format: /([0\s]i?b)/,
          unformat: new RegExp(v)
        },
        format: function(f, b, h) {
          var w, R = c._.includes(b, "ib") ? u : a, $ = c._.includes(b, " b") || c._.includes(b, " ib") ? " " : "", D, V, Y;
          for (b = b.replace(/\s?i?b/, ""), D = 0; D <= R.suffixes.length; D++)
            if (V = Math.pow(R.base, D), Y = Math.pow(R.base, D + 1), f === null || f === 0 || f >= V && f < Y) {
              $ += R.suffixes[D], V > 0 && (f = f / V);
              break;
            }
          return w = c._.numberToFormat(f, b, h), w + $;
        },
        unformat: function(f) {
          var b = c._.stringToNumber(f), h, w;
          if (b) {
            for (h = a.suffixes.length - 1; h >= 0; h--) {
              if (c._.includes(f, a.suffixes[h])) {
                w = Math.pow(a.base, h);
                break;
              }
              if (c._.includes(f, u.suffixes[h])) {
                w = Math.pow(u.base, h);
                break;
              }
            }
            b *= w || 1;
          }
          return b;
        }
      });
    }(), function() {
      c.register("format", "currency", {
        regexps: {
          format: /(\$)/
        },
        format: function(a, u, y) {
          var v = c.locales[c.options.currentLocale], f = {
            before: u.match(/^([\+|\-|\(|\s|\$]*)/)[0],
            after: u.match(/([\+|\-|\)|\s|\$]*)$/)[0]
          }, b, h, w;
          for (u = u.replace(/\s?\$\s?/, ""), b = c._.numberToFormat(a, u, y), a >= 0 ? (f.before = f.before.replace(/[\-\(]/, ""), f.after = f.after.replace(/[\-\)]/, "")) : a < 0 && !c._.includes(f.before, "-") && !c._.includes(f.before, "(") && (f.before = "-" + f.before), w = 0; w < f.before.length; w++)
            switch (h = f.before[w], h) {
              case "$":
                b = c._.insert(b, v.currency.symbol, w);
                break;
              case " ":
                b = c._.insert(b, " ", w + v.currency.symbol.length - 1);
                break;
            }
          for (w = f.after.length - 1; w >= 0; w--)
            switch (h = f.after[w], h) {
              case "$":
                b = w === f.after.length - 1 ? b + v.currency.symbol : c._.insert(b, v.currency.symbol, -(f.after.length - (1 + w)));
                break;
              case " ":
                b = w === f.after.length - 1 ? b + " " : c._.insert(b, " ", -(f.after.length - (1 + w) + v.currency.symbol.length - 1));
                break;
            }
          return b;
        }
      });
    }(), function() {
      c.register("format", "exponential", {
        regexps: {
          format: /(e\+|e-)/,
          unformat: /(e\+|e-)/
        },
        format: function(a, u, y) {
          var v, f = typeof a == "number" && !c._.isNaN(a) ? a.toExponential() : "0e+0", b = f.split("e");
          return u = u.replace(/e[\+|\-]{1}0/, ""), v = c._.numberToFormat(Number(b[0]), u, y), v + "e" + b[1];
        },
        unformat: function(a) {
          var u = c._.includes(a, "e+") ? a.split("e+") : a.split("e-"), y = Number(u[0]), v = Number(u[1]);
          v = c._.includes(a, "e-") ? v *= -1 : v;
          function f(b, h, w, R) {
            var $ = c._.correctionFactor(b, h), D = b * $ * (h * $) / ($ * $);
            return D;
          }
          return c._.reduce([y, Math.pow(10, v)], f, 1);
        }
      });
    }(), function() {
      c.register("format", "ordinal", {
        regexps: {
          format: /(o)/
        },
        format: function(a, u, y) {
          var v = c.locales[c.options.currentLocale], f, b = c._.includes(u, " o") ? " " : "";
          return u = u.replace(/\s?o/, ""), b += v.ordinal(a), f = c._.numberToFormat(a, u, y), f + b;
        }
      });
    }(), function() {
      c.register("format", "percentage", {
        regexps: {
          format: /(%)/,
          unformat: /(%)/
        },
        format: function(a, u, y) {
          var v = c._.includes(u, " %") ? " " : "", f;
          return c.options.scalePercentBy100 && (a = a * 100), u = u.replace(/\s?\%/, ""), f = c._.numberToFormat(a, u, y), c._.includes(f, ")") ? (f = f.split(""), f.splice(-1, 0, v + "%"), f = f.join("")) : f = f + v + "%", f;
        },
        unformat: function(a) {
          var u = c._.stringToNumber(a);
          return c.options.scalePercentBy100 ? u * 0.01 : u;
        }
      });
    }(), function() {
      c.register("format", "time", {
        regexps: {
          format: /(:)/,
          unformat: /(:)/
        },
        format: function(a, u, y) {
          var v = Math.floor(a / 60 / 60), f = Math.floor((a - v * 60 * 60) / 60), b = Math.round(a - v * 60 * 60 - f * 60);
          return v + ":" + (f < 10 ? "0" + f : f) + ":" + (b < 10 ? "0" + b : b);
        },
        unformat: function(a) {
          var u = a.split(":"), y = 0;
          return u.length === 3 ? (y = y + Number(u[0]) * 60 * 60, y = y + Number(u[1]) * 60, y = y + Number(u[2])) : u.length === 2 && (y = y + Number(u[0]) * 60, y = y + Number(u[1])), Number(y);
        }
      });
    }(), c;
  });
})(mr);
var Fo = mr.exports;
const cr = /* @__PURE__ */ dr(Fo);
function Ao(p) {
  const c = yr(p) * 1e3;
  let _ = "m", M = "0,0", L, N = "ft", A = "0,0", P;
  return L = c, c >= 1e3 && (L = c / 1e3, _ = "km", M = "0.00"), P = c * 3.28084, P >= 5280 && (P /= 5280, N = "mi", A = "0.00"), {
    metric: `${cr(L).format(M)} ${_}`,
    standard: `${cr(P).format(
      A
    )} ${N}`
  };
}
function ur(p) {
  const c = p.geometry.coordinates[0], _ = yr(p);
  return So(c, _);
}
const ko = {
  ...hr.modes.draw_line_string,
  clickAnywhere: function(p, c) {
    return p.currentVertexPosition === 1 ? (p.line.addCoordinate(0, c.lngLat.lng, c.lngLat.lat), this.changeMode("simple_select", { featureIds: [p.line.id] })) : (p.line.updateCoordinate(
      p.currentVertexPosition,
      c.lngLat.lng,
      c.lngLat.lat
    ), p.direction === "forward" ? (p.currentVertexPosition += 1, p.line.updateCoordinate(
      p.currentVertexPosition,
      c.lngLat.lng,
      c.lngLat.lat
    )) : p.line.addCoordinate(0, c.lngLat.lng, c.lngLat.lat), null);
  },
  onStop: function(p) {
    if (this.activateUIButton(), this.getFeature(p.line.id) !== void 0)
      if (p.line.removeCoordinate("0"), p.line.isValid()) {
        const c = p.line.toGeoJSON(), _ = ur(c);
        this.map.fire("draw.create", {
          features: [_]
        });
      } else
        this.deleteFeature([p.line.id], { silent: !0 }), this.changeMode("simple_select", {}, { silent: !0 });
  },
  toDisplayFeatures: function(p, c, _) {
    if (c.geometry.coordinates.length < 2)
      return null;
    _({
      type: "Feature",
      properties: {
        active: "true"
      },
      geometry: {
        type: "Point",
        coordinates: c.geometry.coordinates[0]
      }
    }), c.properties.active = "true", _(c);
    const L = {
      type: "Feature",
      properties: {
        meta: "currentPosition",
        radius: `${Ao(c).metric}`,
        parent: p.line.id
      },
      geometry: {
        type: "Point",
        coordinates: c.geometry.coordinates[1]
      }
    };
    _(L);
    const N = ur(c);
    return N.properties = {
      active: "true"
    }, _(N), null;
  }
}, Ro = hr.lib.theme;
Ro.map((p) => p.id === "gl-draw-line-inactive" ? {
  ...p,
  filter: [...p.filter, ["!=", "user_isSnapGuide", "true"]]
} : p);
const Do = [
  {
    id: "gl-draw-line-inactive",
    type: "line",
    filter: ["!=", "user_isSnapGuide", "true"]
  },
  {
    id: "gl-draw-polygon-fill-active",
    type: "fill",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    paint: {
      "fill-color": "#fbb03b",
      "fill-outline-color": "#fbb03b",
      "fill-opacity": 0.1
    }
  },
  {
    id: "gl-draw-polygon-midpoint",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
    paint: {
      "circle-radius": 3,
      "circle-color": "#fbb03b"
    }
  },
  {
    id: "gl-draw-polygon-stroke-inactive",
    type: "line",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["!=", "mode", "static"]
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#3bb2d0",
      "line-width": 2
    }
  },
  {
    id: "gl-draw-polygon-stroke-active",
    type: "line",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#fbb03b",
      "line-dasharray": [0.2, 2],
      "line-width": 2
    }
  },
  {
    id: "gl-draw-line-inactive",
    type: "line",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "LineString"],
      ["!=", "mode", "static"]
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#3bb2d0",
      "line-width": 2
    }
  },
  {
    id: "gl-draw-line-active",
    type: "line",
    filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#fbb03b",
      "line-dasharray": [0.2, 2],
      "line-width": 2
    }
  },
  {
    id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 5,
      "circle-color": "#fff"
    }
  },
  {
    id: "gl-draw-polygon-and-line-vertex-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 3,
      "circle-color": "#fbb03b"
    }
  },
  {
    id: "gl-draw-point-point-stroke-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 5,
      "circle-opacity": 1,
      "circle-color": "#fff"
    }
  },
  {
    id: "gl-draw-point-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 3,
      "circle-color": "#3bb2d0"
    }
  },
  {
    id: "gl-draw-point-stroke-active",
    type: "circle",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "active", "true"],
      ["!=", "meta", "midpoint"]
    ],
    paint: {
      "circle-radius": 7,
      "circle-color": "#fff"
    }
  },
  {
    id: "gl-draw-point-active",
    type: "circle",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["!=", "meta", "midpoint"],
      ["==", "active", "true"]
    ],
    paint: {
      "circle-radius": 5,
      "circle-color": "#fbb03b"
    }
  },
  {
    id: "gl-draw-polygon-fill-static",
    type: "fill",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
    paint: {
      "fill-color": "#404040",
      "fill-outline-color": "#404040",
      "fill-opacity": 0.1
    }
  },
  {
    id: "gl-draw-polygon-stroke-static",
    type: "line",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#404040",
      "line-width": 2
    }
  },
  {
    id: "gl-draw-line-static",
    type: "line",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#404040",
      "line-width": 2
    }
  },
  {
    id: "gl-draw-point-static",
    type: "circle",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
    paint: {
      "circle-radius": 5,
      "circle-color": "#404040"
    }
  },
  {
    id: "gl-draw-symbol",
    type: "symbol",
    layout: {
      "text-line-height": 1.1,
      "text-size": 15,
      "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
      "text-anchor": "left",
      "text-justify": "left",
      "text-offset": [0.8, 0.8],
      "text-field": ["get", "radius"],
      "text-max-width": 7
    },
    paint: {
      "text-color": "hsl(0, 0%, 95%)",
      "text-halo-color": "hsl(0, 5%, 0%)",
      "text-halo-width": 1,
      "text-halo-blur": 1
    },
    filter: ["==", "meta", "currentPosition"]
  },
  {
    id: "guide",
    type: "line",
    filter: [
      "all",
      ["==", "$type", "LineString"],
      ["==", "user_isSnapGuide", "true"]
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#c00c00",
      "line-width": 1,
      "line-dasharray": [5, 5]
    }
  },
  {
    id: "gl-draw-polygon-fill-inactive",
    type: "fill",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["!=", "user_type", "overlay"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "fill-color": "#3bb2d0",
      "fill-outline-color": "#3bb2d0",
      "fill-opacity": 0.2
    }
  },
  {
    id: "gl-draw-polygon-fill-active",
    type: "fill",
    filter: [
      "all",
      ["==", "active", "true"],
      ["==", "$type", "Polygon"],
      ["!=", "user_type", "overlay"]
    ],
    paint: {
      "fill-color": "#fbb03b",
      "fill-outline-color": "#fbb03b",
      "fill-opacity": 0.2
    }
  },
  {
    id: "gl-draw-overlay-polygon-fill-inactive",
    type: "fill",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["==", "user_type", "overlay"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "fill-color": "#3bb2d0",
      "fill-outline-color": "#3bb2d0",
      "fill-opacity": 0.01
    }
  },
  {
    id: "gl-draw-overlay-polygon-fill-active",
    type: "fill",
    filter: [
      "all",
      ["==", "active", "true"],
      ["==", "$type", "Polygon"],
      ["==", "user_type", "overlay"]
    ],
    paint: {
      "fill-color": "#fbb03b",
      "fill-outline-color": "#fbb03b",
      "fill-opacity": 0.01
    }
  },
  {
    id: "gl-draw-polygon-stroke-inactive",
    type: "line",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["!=", "user_type", "overlay"],
      ["!=", "mode", "static"]
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#3bb2d0",
      "line-width": 2
    }
  },
  {
    id: "gl-draw-polygon-stroke-active",
    type: "line",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#fbb03b",
      "line-dasharray": [0.2, 2],
      "line-width": 2
    }
  },
  {
    id: "gl-draw-polygon-midpoint",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
    paint: {
      "circle-radius": 3,
      "circle-color": "#fbb03b"
    }
  },
  {
    id: "gl-draw-line-inactive",
    type: "line",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "LineString"],
      ["!=", "mode", "static"]
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#3bb2d0",
      "line-width": 2
    }
  },
  {
    id: "gl-draw-line-active",
    type: "line",
    filter: ["all", ["==", "$type", "LineString"], ["==", "active", "true"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#fbb03b",
      "line-dasharray": [0.2, 2],
      "line-width": 2
    }
  },
  {
    id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 4,
      "circle-color": "#fff"
    }
  },
  {
    id: "gl-draw-polygon-and-line-vertex-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 2,
      "circle-color": "#fbb03b"
    }
  },
  {
    id: "gl-draw-polygon-and-line-vertex-scale-icon",
    type: "symbol",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"],
      ["has", "heading"]
    ],
    layout: {
      "icon-image": "scale",
      "icon-allow-overlap": !0,
      "icon-ignore-placement": !0,
      "icon-rotation-alignment": "map",
      "icon-rotate": ["get", "heading"]
    },
    paint: {
      "icon-opacity": 1,
      "icon-opacity-transition": {
        delay: 0,
        duration: 0
      }
    }
  },
  {
    id: "gl-draw-point-point-stroke-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 5,
      "circle-opacity": 1,
      "circle-color": "#fff"
    }
  },
  {
    id: "gl-draw-point-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 3,
      "circle-color": "#3bb2d0"
    }
  },
  {
    id: "gl-draw-point-stroke-active",
    type: "circle",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "active", "true"],
      ["!=", "meta", "midpoint"]
    ],
    paint: {
      "circle-radius": 4,
      "circle-color": "#fff"
    }
  },
  {
    id: "gl-draw-point-active",
    type: "circle",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["!=", "meta", "midpoint"],
      ["==", "active", "true"]
    ],
    paint: {
      "circle-radius": 2,
      "circle-color": "#fbb03b"
    }
  },
  {
    id: "gl-draw-polygon-fill-static",
    type: "fill",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
    paint: {
      "fill-color": "#404040",
      "fill-outline-color": "#404040",
      "fill-opacity": 0.1
    }
  },
  {
    id: "gl-draw-polygon-stroke-static",
    type: "line",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#404040",
      "line-width": 2
    }
  },
  {
    id: "gl-draw-line-static",
    type: "line",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "LineString"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#404040",
      "line-width": 2
    }
  },
  {
    id: "gl-draw-point-static",
    type: "circle",
    filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
    paint: {
      "circle-radius": 5,
      "circle-color": "#404040"
    }
  },
  // {
  //     'id': 'gl-draw-polygon-rotate-point',
  //     'type': 'circle',
  //     'filter': ['all',
  //         ['==', '$type', 'Point'],
  //         ['==', 'meta', 'rotate_point']],
  //     'paint': {
  //         'circle-radius': 5,
  //         'circle-color': '#fbb03b'
  //     }
  // },
  {
    id: "gl-draw-line-rotate-point",
    type: "line",
    filter: [
      "all",
      ["==", "meta", "midpoint"],
      ["==", "icon", "rotate"],
      ["==", "$type", "LineString"],
      ["!=", "mode", "static"]
      // ['==', 'active', 'true']
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#fbb03b",
      "line-dasharray": [0.2, 2],
      "line-width": 2
    }
  },
  {
    id: "gl-draw-polygon-rotate-point-stroke",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "midpoint"],
      ["==", "icon", "rotate"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 4,
      "circle-color": "#fff"
    }
  },
  {
    id: "gl-draw-polygon-rotate-point",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "midpoint"],
      ["==", "icon", "rotate"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    paint: {
      "circle-radius": 2,
      "circle-color": "#fbb03b"
    }
  },
  {
    id: "gl-draw-polygon-rotate-point-icon",
    type: "symbol",
    filter: [
      "all",
      ["==", "meta", "midpoint"],
      ["==", "icon", "rotate"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"]
    ],
    layout: {
      "icon-image": "rotate",
      "icon-allow-overlap": !0,
      "icon-ignore-placement": !0,
      "icon-rotation-alignment": "map",
      "icon-rotate": ["get", "heading"]
    },
    paint: {
      "icon-opacity": 1,
      "icon-opacity-transition": {
        delay: 0,
        duration: 0
      }
    }
  },
  {
    id: "gl-draw-line-active-length",
    type: "symbol",
    filter: [
      "all",
      ["==", "$type", "LineString"],
      ["==", "active", "true"],
      ["==", "user_has_length", "true"]
    ],
    layout: {
      "symbol-placement": "line-center",
      "text-rotation-alignment": "map",
      "text-pitch-alignment": "viewport",
      "text-max-angle": 30,
      "text-max-width": 300,
      "text-field": "{user_length} {user_length_unit}",
      "text-size": ["interpolate", ["linear"], ["zoom"], 8, 8, 10, 12, 16, 16],
      "text-allow-overlap": !1
    },
    paint: {
      "text-opacity": ["interpolate", ["linear"], ["zoom"], 8, 1],
      "text-color": "#000",
      "text-halo-color": [
        "interpolate",
        ["linear"],
        ["zoom"],
        2,
        "#ffffff",
        3,
        "#ffffff"
      ],
      "text-halo-width": 0.3,
      "text-halo-blur": 1
    }
  },
  {
    id: "gl-draw-polygon-active-length",
    type: "symbol",
    filter: [
      "all",
      ["==", "$type", "Polygon"],
      ["==", "active", "true"],
      ["==", "user_has_length", "true"]
    ],
    layout: {
      "symbol-placement": "line-center",
      "text-rotation-alignment": "map",
      "text-pitch-alignment": "viewport",
      "text-max-angle": 30,
      "text-max-width": 300,
      "text-field": "{user_length} {user_length_unit}",
      "text-size": ["interpolate", ["linear"], ["zoom"], 8, 8, 10, 12, 16, 16],
      "text-allow-overlap": !1
    },
    paint: {
      "text-opacity": ["interpolate", ["linear"], ["zoom"], 8, 1],
      "text-color": "#000",
      "text-halo-color": [
        "interpolate",
        ["linear"],
        ["zoom"],
        2,
        "#ffffff",
        3,
        "#ffffff"
      ],
      "text-halo-width": 0.3,
      "text-halo-blur": 1
    }
  },
  {
    id: "gl-draw-polygon-active-area",
    type: "symbol",
    filter: [
      "all",
      ["==", "$type", "Polygon"],
      ["==", "active", "true"],
      ["==", "user_has_area", "true"]
    ],
    layout: {
      "symbol-placement": "line",
      "text-rotation-alignment": "map",
      "text-pitch-alignment": "viewport",
      "text-max-angle": 30,
      "text-max-width": 300,
      "text-field": "{user_area} meters^2",
      "text-size": ["interpolate", ["linear"], ["zoom"], 8, 8, 10, 12, 16, 16],
      "text-allow-overlap": !1
    },
    paint: {
      "text-opacity": ["interpolate", ["linear"], ["zoom"], 8, 1],
      "text-color": "#000",
      "text-halo-color": [
        "interpolate",
        ["linear"],
        ["zoom"],
        2,
        "#ffffff",
        3,
        "#ffffff"
      ],
      "text-halo-width": 0.3,
      "text-halo-blur": 1
    }
  }
], Uo = { CircleMode: ko };
export {
  Uo as default,
  Do as drawStyles
};
//# sourceMappingURL=index.es.js.map

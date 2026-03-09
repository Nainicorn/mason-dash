(self["webpackChunkwebpack_template_1_0_0"] = self["webpackChunkwebpack_template_1_0_0"] || []).push([["src_components_map_map_js"],{

/***/ "./src/components/map/buildings.js":
/*!*****************************************!*\
  !*** ./src/components/map/buildings.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildingsData": () => (/* binding */ buildingsData)
/* harmony export */ });
const buildingsData = [{
  id: "b1",
  name: "Enterprise Hall",
  x: -550,
  y: -500,
  scale: 4
}, {
  id: "b2",
  name: "Horizon Hall",
  x: -80,
  y: 280,
  scale: 4
}, {
  id: "b3",
  name: "Innovation Hall",
  x: -200,
  y: -750,
  scale: 4
}, {
  id: "b4",
  name: "Music/Theater Building",
  x: -50,
  y: -450,
  scale: 4
}, {
  id: "b5",
  name: "Nguyen Engineering Building",
  x: -750,
  y: -1050,
  scale: 4
}, {
  id: "b6",
  name: "Planetary Hall",
  x: -550,
  y: -200,
  scale: 4
}];


/***/ }),

/***/ "./src/components/map/map.js":
/*!***********************************!*\
  !*** ./src/components/map/map.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _map_hbs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.hbs */ "./src/components/map/map.hbs");
/* harmony import */ var _map_hbs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_map_hbs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _map_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.scss */ "./src/components/map/map.scss");
/* harmony import */ var _buildings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buildings */ "./src/components/map/buildings.js");



let buildingsLoaded = false;
const map = {
  init() {
    this.element = document.querySelector(".item.map");
    this._renderLayout();
    this._loadBuildings();
    this._bindListeners();
  },
  _renderLayout() {
    let mainHtml = _map_hbs__WEBPACK_IMPORTED_MODULE_0___default()({
      main: true
    });
    this.element.querySelector(".item-body").innerHTML = mainHtml;
    this.mapImage = this.element.querySelector(".map-image img");
    this.mapView = this.element.querySelector(".map-view img");
    this.mapViewContainer = this.element.querySelector(".map-view");
    // set default view
    this._resetMap();
  },
  _loadBuildings() {
    if (buildingsLoaded) return;
    let selectControl = this.element.querySelector(".item-controls select");
    selectControl.insertAdjacentHTML("beforeend", `<option value=''>View Building</option>`);
    _buildings__WEBPACK_IMPORTED_MODULE_2__.buildingsData.forEach(building => {
      selectControl.insertAdjacentHTML("beforeend", `<option value='${building.id}'>${building.name}</option>`);
    });
    buildingsLoaded = true;
  },
  _resetMap() {
    this.mapImage.style.transform = 'translate(-80px, -290px) scale(0.9)';
    this.mapView.setAttribute('src', '');
    this.mapViewContainer.classList.remove('has-image');
  },
  _bindListeners() {
    let selectControl = this.element.querySelector(".item-controls select");
    selectControl.addEventListener("change", () => {
      let buildingId = selectControl.value;
      if (!buildingId) {
        this._resetMap();
        return;
      }
      let building = _buildings__WEBPACK_IMPORTED_MODULE_2__.buildingsData.find(row => row.id === buildingId);
      if (!building) return;
      this.mapImage.style.transform = `translate(${building.x}px, ${building.y}px) scale(${building.scale})`;
      this.mapView.setAttribute('src', `./images/${buildingId}.jpeg`);
      this.mapViewContainer.classList.add('has-image');
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (map);

/***/ }),

/***/ "./src/components/map/map.hbs":
/*!************************************!*\
  !*** ./src/components/map/map.hbs ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "  <div class=\"map-container\">\n    <div class=\"map-image\">\n      <img src=\"./images/masoncampus.png\" />\n    </div>\n    <div class=\"map-view\">\n      <img />\n    </div>\n  </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"main") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":10,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./src/components/map/map.scss":
/*!*************************************!*\
  !*** ./src/components/map/map.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=src_components_map_map_js.js.map?af91e44963da5378400c
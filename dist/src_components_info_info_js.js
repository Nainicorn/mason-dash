(self["webpackChunkwebpack_template_1_0_0"] = self["webpackChunkwebpack_template_1_0_0"] || []).push([["src_components_info_info_js"],{

/***/ "./src/components/info/info.js":
/*!*************************************!*\
  !*** ./src/components/info/info.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _info_hbs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./info.hbs */ "./src/components/info/info.hbs");
/* harmony import */ var _info_hbs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_info_hbs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _info_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./info.scss */ "./src/components/info/info.scss");
/* harmony import */ var services_studentsService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! services/studentsService */ "./src/services/studentsService.js");
// info.js file that handles functionality for the components that use info data
// import html from info.hbs to display custom data in using innerHTML

// import info scss file to style and display the info on the dashboard

// import studentsService that retrieves students data

const info = {
  // asynchronous initialization function for the info object
  async init() {
    // select the DOM element with the class item info
    this.element = document.querySelector('.item.info');
    // render the layout of the info component
    this._renderLayout();
    // load data async
    await this._loadData();
  },
  // private method to render the layout of the info component
  _renderLayout() {
    // generate the HTML using the Handlebars template with main as true
    let mainHtml = _info_hbs__WEBPACK_IMPORTED_MODULE_0___default()({
      main: true
    });

    // set the inner HTML of the selected element to the generated HTML
    this.element.querySelector('.item-body').innerHTML = mainHtml;
  },
  // private method to load data asynchronously for the info component
  async _loadData() {
    // fetch information about the current student info to display in pills
    let studentInfo = await services_studentsService__WEBPACK_IMPORTED_MODULE_2__["default"].getMe();
    let pillHtml = _info_hbs__WEBPACK_IMPORTED_MODULE_0___default()({
      pill: true,
      data: studentInfo
    });
    this.element.querySelector(`.pills`).insertAdjacentHTML('beforeend', pillHtml);
  }
};
// export info object to make it available for other modules to use
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (info);

/***/ }),

/***/ "./src/components/info/info.hbs":
/*!**************************************!*\
  !*** ./src/components/info/info.hbs ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"pills\">\r\n\r\n    </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"pill\">\r\n        <div class=\"pill-title\">Major</div>\r\n        <div class=\"pill-text\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"major") : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"pill\">\r\n        <div class=\"pill-title\">Year</div>\r\n        <div class=\"pill-text\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"year") : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"pill\">\r\n        <div class=\"pill-title\">Term</div>\r\n        <div class=\"pill-text\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"term") : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"pill\">\r\n        <div class=\"pill-title\">GPA</div>\r\n        <div class=\"pill-text\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"gpa") : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"pill\">\r\n        <div class=\"pill-title\">Advisor</div>\r\n        <div class=\"pill-text\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"advisor") : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"pill\">\r\n        <div class=\"pill-title\">Status</div>\r\n        <div class=\"pill-text\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"enrollment") : stack1), depth0))
    + "</div>\r\n    </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"main") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":5,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"pill") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":0},"end":{"line":32,"column":7}}})) != null ? stack1 : "")
    + "\r\n";
},"useData":true});

/***/ }),

/***/ "./src/components/info/info.scss":
/*!***************************************!*\
  !*** ./src/components/info/info.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=src_components_info_info_js.js.map?c2947bc53ccf82e33cb3
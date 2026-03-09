(self["webpackChunkwebpack_template_1_0_0"] = self["webpackChunkwebpack_template_1_0_0"] || []).push([["src_components_credits_credits_js"],{

/***/ "./src/components/credits/credits.js":
/*!*******************************************!*\
  !*** ./src/components/credits/credits.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _credits_hbs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./credits.hbs */ "./src/components/credits/credits.hbs");
/* harmony import */ var _credits_hbs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_credits_hbs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _credits_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./credits.scss */ "./src/components/credits/credits.scss");
/* harmony import */ var services_studentsService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! services/studentsService */ "./src/services/studentsService.js");
/* harmony import */ var services_coursesService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! services/coursesService */ "./src/services/coursesService.js");
// info.js file that handles functionality for the components that use info data
// import html from info.hbs to display custom data in using innerHTML

// import info scss file to style and display the info on the dashboard

// import studentsService that retrieves students data

// import coursesService that retrieves courses data

const credits = {
  // asynchronous initialization function for the info object
  async init() {
    // select the DOM element with the class item info
    this.element = document.querySelector(".item.credits");
    // render the layout of the info component
    await this._renderLayout();
  },
  // private method to render the layout of the info component
  async _renderLayout() {
    let courses = await this._getCourses('courses');
    for (let course of courses) {
      let courseId = course.id.split("-")[0];
      course.courseId = courseId;
    }
    let finishedcourses = await this._getCourses('finishedcourses');
    for (let course of finishedcourses) {
      let courseId = course.id.split("-")[0];
      course.courseId = courseId;
    }
    let futurecourses = await this._getCourses('futurecourses');
    for (let course of futurecourses) {
      let courseId = course.id.split("-")[0];
      course.courseId = courseId;
    }
    let mainHtml = _credits_hbs__WEBPACK_IMPORTED_MODULE_0___default()({
      main: true,
      courses,
      finishedcourses,
      futurecourses
    });

    // set the inner HTML of the selected element to the generated HTML
    this.element.querySelector(".item-body").innerHTML = mainHtml;
  },
  // private method to load data asynchronously for the courses component
  async _getCourses(courseType) {
    // fetch the list of all courses
    this.coursesData = await services_coursesService__WEBPACK_IMPORTED_MODULE_3__["default"].get();
    // fetch information about the current student
    let studentInfo = await services_studentsService__WEBPACK_IMPORTED_MODULE_2__["default"].getMe();
    // initialize an array to store matched courses
    let matchedCourses = [];
    // loop through the courses of the current student
    studentInfo[courseType].forEach(courseId => {
      // filter the courses to find a match based on the course ID
      let match = this.coursesData.filter(course => {
        return course.id === courseId;
      });

      // add the matched courses to the array
      matchedCourses.push(...match);
    });
    return matchedCourses;
  }
};
// export info object to make it available for other modules to use
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (credits);

/***/ }),

/***/ "./src/services/coursesService.js":
/*!****************************************!*\
  !*** ./src/services/coursesService.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _aws__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aws */ "./src/services/aws.js");
// import the aws module for AWS api configuration


// create a courses service object to handle fetching course data
const coursesService = {
  // async method to fetch course data
  async get() {
    // construct the URL by combining the uri from aws module with the /courses path
    let response = await fetch(`${_aws__WEBPACK_IMPORTED_MODULE_0__["default"].uri}/courses`);
    // parse the JSON data from the response
    let data = await response.json();
    // return the fetched course data
    return data;
  }
};

// export courses object to make it available for other modules to use
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (coursesService);

/***/ }),

/***/ "./src/components/credits/credits.hbs":
/*!********************************************!*\
  !*** ./src/components/credits/credits.hbs ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div id=\"wrapper\">\n    <div class=\"column\">\n      <div class=\"course-header\">Finished Courses</div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"finishedcourses") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":6},"end":{"line":10,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"column\">\n      <div class=\"course-header\">Current Courses</div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"courses") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":6},"end":{"line":19,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"column\">\n      <div class=\"course-header\">Future Courses</div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"futurecourses") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":6},"end":{"line":28,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n  </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"course\">\n          <div class=\"course-details\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"courseId") : depth0), depth0))
    + "—"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\n          <div class=\"credits\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"credits") : depth0), depth0))
    + "</div>\n        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"main") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":31,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./src/components/credits/credits.scss":
/*!*********************************************!*\
  !*** ./src/components/credits/credits.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=src_components_credits_credits_js.js.map?031562de7c6687c31271
(self["webpackChunkwebpack_template_1_0_0"] = self["webpackChunkwebpack_template_1_0_0"] || []).push([["src_components_courses_courses_js"],{

/***/ "./src/components/courses/courses.js":
/*!*******************************************!*\
  !*** ./src/components/courses/courses.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _courses_hbs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./courses.hbs */ "./src/components/courses/courses.hbs");
/* harmony import */ var _courses_hbs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_courses_hbs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _courses_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./courses.scss */ "./src/components/courses/courses.scss");
/* harmony import */ var services_coursesService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! services/coursesService */ "./src/services/coursesService.js");
/* harmony import */ var services_studentsService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! services/studentsService */ "./src/services/studentsService.js");
// courses.js file that handles functionality for the components that use courses data
// import html from courses.hbs to display custom data in using innerHTML

// import courses scss file to style and display the courses on the dashboard

// import coursesService that retrieves courses data

// import studentsService that retrieves students data

const courses = {
  // asynchronous initialization function for the courses object
  async init() {
    // select the DOM element with the class item courses
    this.element = document.querySelector(".item.courses");
    // render the layout of the courses component
    this._renderLayout();
    // load data async
    await this._loadData();
    // call method that binds event listeners
    this._bindListeners();
  },
  // private method to render the layout of the courses component
  _renderLayout() {
    // generate the HTML using the Handlebars template with main as true
    let mainHtml = _courses_hbs__WEBPACK_IMPORTED_MODULE_0___default()({
      main: true
    });
    // set the inner HTML of the selected element to the generated HTML
    this.element.querySelector(".item-body").innerHTML = mainHtml;

    // generate the HTML using the Handlebars template with dialog as true
    let dialogHtml = _courses_hbs__WEBPACK_IMPORTED_MODULE_0___default()({
      dialog: true
    });
    // set the inner HTML of the selected element to the generated HTML
    this.element.insertAdjacentHTML("beforeend", dialogHtml);
    this.dialog = this.element.querySelector('#courses-dialog');
  },
  // private method to load data asynchronously for the courses component
  async _loadData() {
    // fetch the list of all courses
    this.coursesData = await services_coursesService__WEBPACK_IMPORTED_MODULE_2__["default"].get();
    // fetch information about the current student
    let studentInfo = await services_studentsService__WEBPACK_IMPORTED_MODULE_3__["default"].getMe();
    // initialize an array to store matched courses
    let matchedCourses = [];
    // loop through the courses of the current student
    studentInfo.courses.forEach(courseId => {
      // filter the courses to find a match based on the course ID
      let match = this.coursesData.filter(course => {
        return course.id === courseId;
      });

      // add the matched courses to the array
      matchedCourses.push(...match);
    });

    // embed each course using absolute position
    matchedCourses.forEach(course => {
      let days = course.days;
      let courseId = course.id.split("-")[0];
      days.forEach(day => {
        for (const [key, value] of Object.entries(day)) {
          let start = value[0];
          let end = value[1];
          let startPos = this._timeDiff(start) / 1.5; //1.5 because of 60px height
          let endPos = this._timeDiff(end) / 1.5; //1.5 because of 60px height
          let height = endPos - startPos;
          let dayElement = this.element.querySelector(`.day.${key.toLowerCase()}`);
          let html = `<div  
                    class='day-event ${course.id}' 
                    style='top: ${startPos}px;height: ${height}px;' 
                    start='${start}' end='${end}'
                    courseid='${course.id}' 
                    >${courseId}</div>`;
          dayElement.querySelector(`.day-events`).insertAdjacentHTML("beforeend", html);
        }
      });
    });
  },
  // private method to bind event listeners for the layout
  _bindListeners() {
    // add a click event for elements with day-event class
    this.element.addEventListener("click", e => {
      let target = e.target;
      if (target.classList.contains("day-event")) {
        // get the dialogtarget attribute value from the clicked link
        let courseId = e.target.getAttribute('courseid');
        let courseData = this.coursesData.filter(row => {
          return row.id.includes(courseId);
        })[0];
        //inject data into dialog 
        let dialogHtml = _courses_hbs__WEBPACK_IMPORTED_MODULE_0___default()({
          dialogcontent: true,
          data: courseData
        });
        this.dialog.querySelector(".dialog-body").innerHTML = dialogHtml;
        this.dialog.querySelector(".dialog-header").innerHTML = courseData.id;
        this.dialog.showModal();
        const closeButton = this.dialog.querySelector(".dialog-footer button");
        closeButton.addEventListener("click", () => {
          this.dialog.close();
        });
      }
    });
  },
  _timeDiff(start) {
    const startTimeString = "8:00 AM";
    const endTimeString = start;

    // Convert time strings to milliseconds
    const startMinutes = this._timeStringToMinutes(startTimeString);
    const endMinutes = this._timeStringToMinutes(endTimeString);

    // Calculate the time difference in milliseconds
    const minutes = endMinutes - startMinutes;
    return minutes;
  },
  _timeStringToMinutes(timeString) {
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    let totalMilliseconds = hours % 12 * 60 * 60 * 1000 + minutes * 60 * 1000;
    if (period.toUpperCase() === "PM") {
      totalMilliseconds += 12 * 60 * 60 * 1000;
    }
    return totalMilliseconds / (1000 * 60);
  }
};
// export courses object to make it available for other modules to use
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (courses);

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

/***/ "./src/components/courses/courses.hbs":
/*!********************************************!*\
  !*** ./src/components/courses/courses.hbs ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"week\">\r\n        <div class=\"time\">\r\n            <div class=\"time-title\">&nbsp;</div>\r\n            <div class=\"time-events\">\r\n                <div class=\"time-event\">08:00 AM</div>\r\n                <div class=\"time-event\">09:00 AM</div>\r\n                <div class=\"time-event\">10:00 AM</div>\r\n                <div class=\"time-event\">11:00 AM</div>\r\n                <div class=\"time-event\">12:00 PM</div>\r\n                <div class=\"time-event\">01:00 PM</div>\r\n                <div class=\"time-event\">02:00 PM</div>\r\n                <div class=\"time-event\">03:00 PM</div>\r\n                <div class=\"time-event\">04:00 PM</div>\r\n                <div class=\"time-event\">05:00 PM</div>\r\n                <div class=\"time-event\">06:00 PM</div>\r\n                <div class=\"time-event\">07:00 PM</div>\r\n                <div class=\"time-event\">08:00 PM</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"day mon\">\r\n            <div class=\"day-title\">Mon</div>\r\n            <div class=\"day-events\"></div>\r\n        </div>\r\n        <div class=\"day tue\">\r\n            <div class=\"day-title\">Tue</div>\r\n            <div class=\"day-events\"></div>\r\n        </div>\r\n        <div class=\"day wed\">\r\n            <div class=\"day-title\">Wed</div>\r\n            <div class=\"day-events\"></div>\r\n        </div>\r\n        <div class=\"day thu\">\r\n            <div class=\"day-title\">Thu</div>\r\n            <div class=\"day-events\"></div>\r\n        </div>\r\n        <div class=\"day fri\">\r\n            <div class=\"day-title\">Fri</div>\r\n            <div class=\"day-events\"></div>\r\n        </div>\r\n    </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<dialog id=\"courses-dialog\">\r\n    <div class=\"dialog-main\">\r\n        <div class=\"dialog-header\">Header</div>\r\n        <div class=\"dialog-body\"></div>\r\n        <div class=\"dialog-footer\">\r\n            <button>Close</button>\r\n        </div>\r\n    </div>\r\n</dialog>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div>ID: "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "</div>\r\n    <div>Course Name: "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</div>\r\n    <div>Location: "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"location") : stack1), depth0))
    + "</div>\r\n    <div>Room: "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"room") : stack1), depth0))
    + "</div>\r\n    <div>Professor: "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"professor") : stack1), depth0))
    + "</div>\r\n    <div>Credits: "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"credits") : stack1), depth0))
    + "</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"main") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":42,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"dialog") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":0},"end":{"line":54,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"dialogcontent") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":56,"column":0},"end":{"line":63,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./src/components/courses/courses.scss":
/*!*********************************************!*\
  !*** ./src/components/courses/courses.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=src_components_courses_courses_js.js.map?6ff3fbac7c26aa9a5c16
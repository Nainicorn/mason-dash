(self["webpackChunkwebpack_template_1_0_0"] = self["webpackChunkwebpack_template_1_0_0"] || []).push([["src_components_future_future_js"],{

/***/ "./src/components/future/future.js":
/*!*****************************************!*\
  !*** ./src/components/future/future.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _future_hbs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./future.hbs */ "./src/components/future/future.hbs");
/* harmony import */ var _future_hbs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_future_hbs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _future_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./future.scss */ "./src/components/future/future.scss");
/* harmony import */ var services_coursesService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! services/coursesService */ "./src/services/coursesService.js");
/* harmony import */ var services_studentsService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! services/studentsService */ "./src/services/studentsService.js");
// courses.js file that handles functionality for the components that use future data
// import html from future.hbs to display custom data in using innerHTML

// import future scss file to style and display the future on the dashboard

// import coursesService that retrieves courses data

// import studentsService that retrieves students data

let coursesLoaded = false;
const future = {
  // asynchronous initialization function for the future object
  async init() {
    // select the DOM element with the class item future
    this.element = document.querySelector(".item.future");
    // render the layout of the future component
    this._renderLayout();
    // load data async
    await this._loadData();
    this._loadCourses();

    // call method that binds event listeners
    this._bindListeners();
  },
  // private method to render the layout of the future component
  _renderLayout() {
    // generate the HTML using the Handlebars template with main as true
    let mainHtml = _future_hbs__WEBPACK_IMPORTED_MODULE_0___default()({
      main: true
    });
    // set the inner HTML of the selected element to the generated HTML
    this.element.querySelector(".item-body").innerHTML = mainHtml;

    // generate the HTML using the Handlebars template with dialog as true
    let dialogHtml = _future_hbs__WEBPACK_IMPORTED_MODULE_0___default()({
      dialog: true
    });
    // set the inner HTML of the selected element to the generated HTML
    this.element.insertAdjacentHTML("beforeend", dialogHtml);
    this.dialog = this.element.querySelector('#future-dialog');
  },
  // private method to load data asynchronously for the future component
  async _loadData() {
    // fetch the list of all courses
    let coursesData = await services_coursesService__WEBPACK_IMPORTED_MODULE_2__["default"].get();
    // fetch information about the current student
    let studentInfo = await services_studentsService__WEBPACK_IMPORTED_MODULE_3__["default"].getMe();
    // loop through the future courses of the current student

    this.matchedCourses = [];
    // loop through the courses of the current student
    studentInfo.futurecourses.forEach(courseId => {
      // filter the courses to find a match based on the course ID
      let match = coursesData.filter(course => {
        return course.id === courseId;
      });

      // add the matched courses to the array
      this.matchedCourses.push(...match);
    });
  },
  _clearSelectOptions() {
    let selectControl = this.element.querySelector(".item-controls select");
    selectControl.innerHTML = "";
    selectControl.insertAdjacentHTML("beforeend", `<option value=''>Add Course</option>`);
  },
  _loadCourses() {
    if (coursesLoaded) {
      return;
    }
    let selectControl = this.element.querySelector(".item-controls select");
    selectControl.insertAdjacentHTML("beforeend", `<option value=''>Add Course</option>`);
    this.matchedCourses.forEach(course => {
      let courseId = course.id.split("-")[0];
      selectControl.insertAdjacentHTML("beforeend", `<option value='${courseId}'>${courseId}</option>`);
    });
    coursesLoaded = true;
  },
  _renderCourse(courseId) {
    const course = this.matchedCourses.find(course => course.id.split("-")[0] === courseId);
    if (!course) return;
    course.days.forEach(day => {
      for (const [key, value] of Object.entries(day)) {
        const [start, end] = value;
        const startPos = this._timeDiff(start) / 1.5; //1.5 because of 60px height
        const endPos = this._timeDiff(end) / 1.5; //1.5 because of 60px height
        const height = endPos - startPos;
        const dayElement = this.element.querySelector(`.day.${key.toLowerCase()}`);
        const html = `
                    <div class='day-event ${course.id}' style='top: ${startPos}px;height: ${height}px;' start='${start}' end='${end}' courseid='${course.id}'>
                        ${courseId}
                        <button class='remove-course' data-courseid='${course.id}'>𐌢</button>
                    </div>`;
        dayElement.querySelector(`.day-events`).insertAdjacentHTML("beforeend", html);
      }
    });
  },
  _removeCourse(courseId) {
    // stops the course from being displayed
    const courseElements = this.element.querySelectorAll(`.${courseId}`);
    courseElements.forEach(courseElement => courseElement.remove());
  },
  // private method to bind event listeners for the layout
  _bindListeners() {
    // select all elements with the class 'header-link' in the layout
    let selectControl = this.element.querySelector(".item-controls select");
    selectControl.addEventListener("change", e => {
      let selectedIndex = selectControl.selectedIndex;
      let courseId = selectControl.options[selectedIndex].value;
      if (courseId) {
        this._renderCourse(courseId);
      }
    });

    // select all elements with the class 'header-link' in the layout
    let events = this.element.querySelectorAll('.day-event');
    this.element.addEventListener("click", e => {
      const target = e.target;
      if (target.classList.contains("day-event") && !target.classList.contains("remove-course")) {
        const courseId = target.getAttribute('courseid');
        const courseData = this.matchedCourses.find(row => row.id.includes(courseId));
        let dialogHtml = _future_hbs__WEBPACK_IMPORTED_MODULE_0___default()({
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
      } else if (target.classList.contains("remove-course")) {
        const courseId = target.dataset.courseid;
        this._removeCourse(courseId);
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
// export future courses object to make it available for other modules to use
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (future);

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

/***/ "./src/components/future/future.hbs":
/*!******************************************!*\
  !*** ./src/components/future/future.hbs ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"week\">\n        <div class=\"time\">\n            <div class=\"time-title\">&nbsp;</div>\n            <div class=\"time-events\">\n                <div class=\"time-event\">08:00 AM</div>\n                <div class=\"time-event\">09:00 AM</div>\n                <div class=\"time-event\">10:00 AM</div>\n                <div class=\"time-event\">11:00 AM</div>\n                <div class=\"time-event\">12:00 PM</div>\n                <div class=\"time-event\">01:00 PM</div>\n                <div class=\"time-event\">02:00 PM</div>\n                <div class=\"time-event\">03:00 PM</div>\n                <div class=\"time-event\">04:00 PM</div>\n                <div class=\"time-event\">05:00 PM</div>\n                <div class=\"time-event\">06:00 PM</div>\n                <div class=\"time-event\">07:00 PM</div>\n                <div class=\"time-event\">08:00 PM</div>\n            </div>\n        </div>\n        <div class=\"day mon\">\n            <div class=\"day-title\">Mon</div>\n            <div class=\"day-events\"></div>\n        </div>\n        <div class=\"day tue\">\n            <div class=\"day-title\">Tue</div>\n            <div class=\"day-events\"></div>\n        </div>\n        <div class=\"day wed\">\n            <div class=\"day-title\">Wed</div>\n            <div class=\"day-events\"></div>\n        </div>\n        <div class=\"day thu\">\n            <div class=\"day-title\">Thu</div>\n            <div class=\"day-events\"></div>\n        </div>\n        <div class=\"day fri\">\n            <div class=\"day-title\">Fri</div>\n            <div class=\"day-events\"></div>\n        </div>\n    </div>\n    <div class=\"courses\"></div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<dialog id=\"future-dialog\">\n    <div class=\"dialog-main\">\n        <div class=\"dialog-header\">Header</div>\n        <div class=\"dialog-body\"></div>\n        <div class=\"dialog-footer\">\n            <button>Close</button>\n        </div>\n    </div>\n</dialog>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div>ID: "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "</div>\n    <div>Course Name: "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</div>\n    <div>Location: "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"location") : stack1), depth0))
    + "</div>\n    <div>Room: "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"room") : stack1), depth0))
    + "</div>\n    <div>Professor: "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"professor") : stack1), depth0))
    + "</div>\n    <div>Credits: "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? lookupProperty(stack1,"credits") : stack1), depth0))
    + "</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"main") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":43,"column":7}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"dialog") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":0},"end":{"line":55,"column":7}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"dialogcontent") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":57,"column":0},"end":{"line":64,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./src/components/future/future.scss":
/*!*******************************************!*\
  !*** ./src/components/future/future.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=src_components_future_future_js.js.map?740952d10bbabed81d8d
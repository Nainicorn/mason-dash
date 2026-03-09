/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var components_layout_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! components/layout/layout */ "./src/components/layout/layout.js");
/* harmony import */ var components_user_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/user/user */ "./src/components/user/user.js");
// app.js components initialization file
// import layout component to render main app

// import user component to render data for in layout

const app = {
  // initialize function for index module
  async init() {
    //initialize the layout component
    components_layout_layout__WEBPACK_IMPORTED_MODULE_0__["default"].init();
    // initialize the user component to load data
    await components_user_user__WEBPACK_IMPORTED_MODULE_1__["default"].init();
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);

/***/ }),

/***/ "./src/components/layout/layout.js":
/*!*****************************************!*\
  !*** ./src/components/layout/layout.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _layout_hbs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout.hbs */ "./src/components/layout/layout.hbs");
/* harmony import */ var _layout_hbs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_layout_hbs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout.scss */ "./src/components/layout/layout.scss");


const THEME_LABELS = {
  default: 'Mason',
  light: 'Light',
  night: 'Night',
  sea: 'Ocean',
  evil: 'Dark'
};
const layout = {
  theme: 'default',
  init() {
    this._getTheme();
    this._renderLayout();
    this._bindListeners();
    // default open courses
    let coursesItem = this.element.querySelector(".item.courses .item-title");
    coursesItem.click();
  },
  _getTheme() {
    this.theme = localStorage.getItem("mason-theme") || this.theme;
    document.body.dataset.theme = this.theme;
  },
  _setTheme(theme) {
    this.theme = theme;
    document.body.dataset.theme = theme;
    localStorage.setItem("mason-theme", theme);
    this._updateThemeLabel();
  },
  _updateThemeLabel() {
    let label = this.element.querySelector(".theme-label");
    if (label) {
      label.textContent = THEME_LABELS[this.theme] || 'Mason';
    }
    // mark active option
    let options = this.element.querySelectorAll(".theme-option");
    options.forEach(opt => {
      opt.classList.toggle("active", opt.dataset.theme === this.theme);
    });
  },
  _renderLayout() {
    this.element = document.querySelector("body");
    this.element.innerHTML = _layout_hbs__WEBPACK_IMPORTED_MODULE_0___default()();
    this._updateThemeLabel();
  },
  _bindListeners() {
    // logout
    let header = document.querySelector(".header");
    header.addEventListener("click", e => {
      let target = e.target;
      if (target.classList.contains("header-link")) {
        let strAction = target.dataset.action;
        if (strAction === "exit") {
          localStorage.removeItem("mason-user");
          top.location = "login.html";
        }
      }
    });

    // custom theme dropdown
    let dropdown = this.element.querySelector(".theme-dropdown");
    let toggle = dropdown.querySelector(".theme-dropdown-toggle");
    let menu = dropdown.querySelector(".theme-dropdown-menu");
    toggle.addEventListener("click", e => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });
    menu.addEventListener("click", e => {
      let option = e.target.closest(".theme-option");
      if (option) {
        let theme = option.dataset.theme;
        this._setTheme(theme);
        dropdown.classList.remove("open");
      }
    });

    // close dropdown when clicking outside
    document.addEventListener("click", () => {
      dropdown.classList.remove("open");
    });

    // accordion section click
    let section = document.querySelector(".section");
    section.addEventListener("click", async e => {
      let target = e.target;
      if (target.classList.contains("item-title")) {
        let item = target.closest(".item");
        this._closeAllItems(item);
        let strType = item.getAttribute("data-type");
        let strState = item.getAttribute("data-state") || "";
        if (strState === "close" || strState === "") {
          item.dataset.state = "open";
          let importModule = await __webpack_require__("./src/components lazy recursive ^\\.\\/.*\\/.*\\.js$")(`./${strType}/${strType}.js`);
          let module = importModule.default;
          module.init();
        } else {
          item.dataset.state = "close";
        }
      }
    });
  },
  _closeAllItems(target) {
    let items = document.querySelectorAll(".item");
    items.forEach(item => {
      if (item.dataset.type === target.dataset.type) return;
      item.setAttribute("data-state", "close");
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (layout);

/***/ }),

/***/ "./src/components/login/login.js":
/*!***************************************!*\
  !*** ./src/components/login/login.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_cookieService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/cookieService */ "./src/services/cookieService.js");
/* harmony import */ var _login_hbs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.hbs */ "./src/components/login/login.hbs");
/* harmony import */ var _login_hbs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_login_hbs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _login_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.scss */ "./src/components/login/login.scss");
// login.js file that handles user login functionality
// import cookieService that handles the cookies

// import html from login.html to render custom data in using innerHTML

// import login scss file to style and display the login page


// create login object to encapsulate login functionality
const login = {
  // initialize function for login module
  init() {
    // call login method that renders login component
    this._render();
    // call login method that binds event listeners
    this._bindListeners();
  },
  // private method to render the login component on the page
  _render() {
    // store body element to render the login component
    this.element = document.querySelector("body");
    // generate the HTML using the Handlebars template with main as true
    let mainHtml = _login_hbs__WEBPACK_IMPORTED_MODULE_1___default()({
      main: true
    });
    // set the inner HTML of the selected element to the generated HTML
    this.element.innerHTML = mainHtml;
  },
  // private method to bind event listeners for the login button
  _bindListeners() {
    // button variable to store login button
    let button = document.querySelector(".login-button");
    // add click event listener to login button
    button.addEventListener("click", () => {
      // store inputName entered by user
      let inputName = document.querySelector(".login-name");
      // store the inputName value and check if value was entered in input field
      let value = inputName.value;
      if (value) {
        // set cookie named 'mason-user' with the entered value and expiration value
        _services_cookieService__WEBPACK_IMPORTED_MODULE_0__["default"].set("mason-user", value, 30);
        // redirect page to index.html after user logs in
        top.location = "index.html";
      }
    });
  }
};
// export login object to make it available for other modules to use
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (login);

/***/ }),

/***/ "./src/components/user/user.js":
/*!*************************************!*\
  !*** ./src/components/user/user.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _user_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user.html */ "./src/components/user/user.html");
/* harmony import */ var _user_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.scss */ "./src/components/user/user.scss");
/* harmony import */ var services_usersService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! services/usersService */ "./src/services/usersService.js");
// user.js file that gets and displays a user's name
// import html from user.html to display custom data in using innerHTML

// import user scss file to style and display the username on the dashboard

// import usersService that handles checking and getting valid user to display details for

const user = {
  // initialize function for user module
  async init() {
    // user variable gets and stores the user using usersService
    let user = await services_usersService__WEBPACK_IMPORTED_MODULE_2__["default"].get();
    // $user is used to differentiate between variables and elements on the screen
    // user details will be displayed in the header of the screen layout
    let $user = document.querySelector('.header-user');
    // set the inner HTML of the selected element to the 'templateHtml'
    $user.innerHTML = _user_html__WEBPACK_IMPORTED_MODULE_0__["default"];
    // $span variable 
    let $span = $user.querySelector('span');
    // setting the inner HTML of the span element to the user's name
    let displayName = user.email.split('@')[0];
    $span.innerHTML = displayName;
  }
};
// export user object to make it available for other modules to use
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (user);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _components_login_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/login/login */ "./src/components/login/login.js");
/* harmony import */ var _services_cookieService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/cookieService */ "./src/services/cookieService.js");
// index.js root JS file
// import app module

// import index scss file to style the dashboard page

// import login component 

// import cookieService that handles setting and getting a cookie to check if user is valid

const index = {
  // initialize function for index module
  async init() {
    // page variable stores the page pathname from the URL
    let page = location.pathname.substring(1);
    // if page is not equal to login.html then the user is logged in
    if (page !== 'login.html') {
      // retrieve the mason-user cookie using cookieService get function
      let masonUser = await _services_cookieService__WEBPACK_IMPORTED_MODULE_3__["default"].get('mason-user');
      if (masonUser) {
        _app__WEBPACK_IMPORTED_MODULE_0__["default"].init();
      } else {
        // if the cookie is not present, redirect to login.html
        top.location = 'login.html';
      }
    } else {
      // page is equal to login.html so user is not logged in and login component is initialized
      _components_login_login__WEBPACK_IMPORTED_MODULE_2__["default"].init();
    }
  }
};
// calling initialize function
index.init();

/***/ }),

/***/ "./src/services/aws.js":
/*!*****************************!*\
  !*** ./src/services/aws.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// aws.js service file that connects to either the production dev environment or localhost
// depending on where the application is being opened

// page variable stores the location hostname
let page = location.hostname;
// the api gateway connects to the friendly link stored below (we have two api custom domain names)
let apigateway = 'https://mdapi.sreenaina.com/api'; // or https://masondashapi.sreenaina.com/api
// ternary operator that includes logic that redirects the uri to either local host or api gateway link
// depending on where the application is being opened
const aws = {
  uri: page === 'localhost' ? '/api' : apigateway // api = https://mdapi.sreenaina.com webpack proxy
};
// export aws service object to make it available for other modules to use
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (aws);

/***/ }),

/***/ "./src/services/cookieService.js":
/*!***************************************!*\
  !*** ./src/services/cookieService.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// cookie service for handling cookies
const cookieService = {
  set: (cname, cvalue, minutes) => {
    // create a new Date object representing the current date and time
    const d = new Date();
    // set the expiration time by adding the specified number of minutes
    d.setTime(d.getTime() + minutes * 60 * 1000);
    // construct the expires string with the UTC representation of the expiration date
    let expires = "expires=" + d.toUTCString();
    // set the cookie with the provided name, value, and expiration information
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },
  get: cname => {
    // construct the string to match for the specified cookie name
    let name = cname + "=";
    // split the document's cookies into an array using ';' as the delimiter
    let ca = document.cookie.split(';');
    // loop through the array of cookies
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      // remove leading whitespaces from the current cookie string
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      // check if the current cookie string starts with the specified name
      if (c.indexOf(name) == 0) {
        // return the substring after the specified name, representing the cookie value
        return c.substring(name.length, c.length);
      }
    }
    // return an empty string if the specified cookie is not found
    return "";
  }
};

// export cookie service to make it available for other modules to use
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cookieService);

//  // method to set a cookie with a specified name, value, and expiration time in minutes
//  set(cname, cvalue, minutes) {
//     //set duration in millseconds
//     const duration = minutes * 60 * 1000;

//     cookieStore.set({
//         name: cname,
//         value: cvalue,
//         expires: Date.now() + duration,
//     });
// },

// // method to get the value of a cookie with a specified name
// async get(cname) {
//     const cookie = await cookieStore.get(cname);
//     let cookieValue = "";
//     if (cookie) {
//         cookieValue = cookie.value;
//     }
//     return cookieValue;
// },

/***/ }),

/***/ "./src/services/studentsService.js":
/*!*****************************************!*\
  !*** ./src/services/studentsService.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cookieService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookieService */ "./src/services/cookieService.js");
/* harmony import */ var _aws__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aws */ "./src/services/aws.js");
// import cookieService for handling cookies

// import the aws module for AWS api configuration


// create a students service object to handle fetching students data
const studentsService = {
  // async method to fetch the current user's student information
  async getMe() {
    // retrieve the 'mason-user' cookie value using 'cookieService'
    let user = await _cookieService__WEBPACK_IMPORTED_MODULE_0__["default"].get('mason-user');
    // construct the URL by combining the 'uri' from 'aws' module with the '/students' path and the user ID
    let response = await fetch(`${_aws__WEBPACK_IMPORTED_MODULE_1__["default"].uri}/students/${user}`);
    // parse the JSON data from the response
    let data = await response.json();
    // return the fetched student data
    return data;
  }
};

// export students object to make it available for other modules to use
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (studentsService);

/***/ }),

/***/ "./src/services/usersService.js":
/*!**************************************!*\
  !*** ./src/services/usersService.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cookieService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookieService */ "./src/services/cookieService.js");
/* harmony import */ var _studentsService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./studentsService */ "./src/services/studentsService.js");
// import cookieService for handling cookies

// import the studentsService for fetching student data

const usersService = {
  // async method to fetch user information
  async get() {
    // retrieve mason-user cookie value using cookieService
    let user = await _cookieService__WEBPACK_IMPORTED_MODULE_0__["default"].get('mason-user');
    // fetch user data using the studentsService and passing the user ID
    let data = await _studentsService__WEBPACK_IMPORTED_MODULE_1__["default"].getMe(user);
    // return the fetched user data
    return data;
  }
};

// export users object to make it available for other modules to use
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (usersService);

/***/ }),

/***/ "./src/components/layout/layout.hbs":
/*!******************************************!*\
  !*** ./src/components/layout/layout.hbs ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header class=\"header\">\r\n  <div class=\"header-logo-title\">\r\n    <div class=\"header-logo\"></div>\r\n    <div class=\"header-title\">Mason<span>Dash</span></div>\r\n  </div>\r\n  <div class=\"header-user\"></div>\r\n  <div class=\"header-actions\">\r\n    <div class=\"theme-dropdown\">\r\n      <button class=\"theme-dropdown-toggle\">\r\n        <span class=\"theme-preview\"></span>\r\n        <span class=\"theme-label\">Mason</span>\r\n        <span class=\"theme-arrow\">&#9662;</span>\r\n      </button>\r\n      <div class=\"theme-dropdown-menu\">\r\n        <div class=\"theme-option\" data-theme=\"default\">\r\n          <span class=\"theme-swatch\" style=\"background: #006633;\"></span>\r\n          <span class=\"theme-option-label\" style=\"color: #e8edf2;\">Mason</span>\r\n        </div>\r\n        <div class=\"theme-option\" data-theme=\"light\">\r\n          <span class=\"theme-swatch\" style=\"background: #ffffff;\"></span>\r\n          <span class=\"theme-option-label\" style=\"color: #ffffff;\">Light</span>\r\n        </div>\r\n        <div class=\"theme-option\" data-theme=\"night\">\r\n          <span class=\"theme-swatch\" style=\"background: #7c3aed;\"></span>\r\n          <span class=\"theme-option-label\" style=\"color: #e2dff0;\">Night</span>\r\n        </div>\r\n        <div class=\"theme-option\" data-theme=\"sea\">\r\n          <span class=\"theme-swatch\" style=\"background: #0ea5e9;\"></span>\r\n          <span class=\"theme-option-label\" style=\"color: #ccd6f6;\">Ocean</span>\r\n        </div>\r\n        <div class=\"theme-option\" data-theme=\"evil\">\r\n          <span class=\"theme-swatch\" style=\"background: #ef4444;\"></span>\r\n          <span class=\"theme-option-label\" style=\"color: #e5e5e5;\">Dark</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <button class=\"header-link\" data-action=\"exit\" title=\"Sign Out\"></button>\r\n  </div>\r\n</header>\r\n<section class=\"section\">\r\n  <div class=\"item courses\" data-type=\"courses\">\r\n    <div class=\"item-header\">\r\n      <div class=\"item-title\">Courses</div>\r\n    </div>\r\n    <div class=\"item-body\"></div>\r\n  </div>\r\n  <div class=\"item info\" data-type=\"info\">\r\n    <div class=\"item-header\">\r\n      <div class=\"item-title\">Info</div>\r\n    </div>\r\n    <div class=\"item-body\"></div>\r\n  </div>\r\n  <div class=\"item future\" data-type=\"future\">\r\n    <div class=\"item-header\">\r\n      <div class=\"item-title\">Future Schedule Builder</div>\r\n      <div class=\"item-controls\">\r\n        <select></select>\r\n      </div>\r\n    </div>\r\n    <div class=\"item-body\"></div>\r\n  </div>\r\n  <div class=\"item map\" data-type=\"map\">\r\n    <div class=\"item-header\">\r\n      <div class=\"item-title\">Campus Map</div>\r\n      <div class=\"item-controls\">\r\n        <select></select>\r\n      </div>\r\n    </div>\r\n    <div class=\"item-body\"></div>\r\n  </div>\r\n  <div class=\"item credits\" data-type=\"credits\">\r\n    <div class=\"item-header\">\r\n      <div class=\"item-title\">Progress</div>\r\n    </div>\r\n    <div class=\"item-body\"></div>\r\n  </div>\r\n</section>\r\n<footer class=\"footer\">\r\n  <p>&copy; 2024 Mason Dash &mdash; George Mason University</p>\r\n</footer>";
},"useData":true});

/***/ }),

/***/ "./src/components/login/login.hbs":
/*!****************************************!*\
  !*** ./src/components/login/login.hbs ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"login-user\">\n        <div class=\"login-card\">\n            <div class=\"login-brand\">\n                <img src=\"../../images/gmu_logo.jpg\" alt=\"Mason Dash\" />\n                <h1>Mason<span>Dash</span></h1>\n                <p>George Mason University Student Portal</p>\n            </div>\n            <div class=\"login-form\">\n                <h2>Welcome Back</h2>\n                <p class=\"login-subtitle\">Sign in to access your dashboard</p>\n                <input\n                    class=\"login-name\"\n                    type=\"password\"\n                    placeholder=\"Enter your GNumber\"\n                />\n                <button class=\"login-button\">Sign In</button>\n            </div>\n        </div>\n    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"main") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":21,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./src/components/user/user.html":
/*!***************************************!*\
  !*** ./src/components/user/user.html ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<span></span>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/components/layout/layout.scss":
/*!*******************************************!*\
  !*** ./src/components/layout/layout.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/login/login.scss":
/*!*****************************************!*\
  !*** ./src/components/login/login.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/user/user.scss":
/*!***************************************!*\
  !*** ./src/components/user/user.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components lazy recursive ^\\.\\/.*\\/.*\\.js$":
/*!****************************************************************!*\
  !*** ./src/components/ lazy ^\.\/.*\/.*\.js$ namespace object ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./courses/courses.js": [
		"./src/components/courses/courses.js",
		"src_components_courses_courses_js"
	],
	"./credits/credits.js": [
		"./src/components/credits/credits.js",
		"src_components_credits_credits_js"
	],
	"./future/future.js": [
		"./src/components/future/future.js",
		"src_components_future_future_js"
	],
	"./info/info.js": [
		"./src/components/info/info.js",
		"src_components_info_info_js"
	],
	"./layout/layout.js": [
		"./src/components/layout/layout.js"
	],
	"./login/login.js": [
		"./src/components/login/login.js"
	],
	"./map/buildings.js": [
		"./src/components/map/buildings.js",
		"src_components_map_buildings_js"
	],
	"./map/map.js": [
		"./src/components/map/map.js",
		"src_components_map_map_js"
	],
	"./user/user.js": [
		"./src/components/user/user.js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = "./src/components lazy recursive ^\\.\\/.*\\/.*\\.js$";
module.exports = webpackAsyncContext;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "./" + chunkId + ".js?" + {"src_components_courses_courses_js":"6ff3fbac7c26aa9a5c16","src_components_credits_credits_js":"031562de7c6687c31271","src_components_future_future_js":"740952d10bbabed81d8d","src_components_info_info_js":"c2947bc53ccf82e33cb3","src_components_map_buildings_js":"e78a95eae451c4b45d98","src_components_map_map_js":"af91e44963da5378400c"}[chunkId] + "";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "./" + chunkId + ".css?" + {"src_components_courses_courses_js":"592ecf3e2ef505ed04bb","src_components_credits_credits_js":"13017b03e50fb4c4ed09","src_components_future_future_js":"9e3f060b4891d5c89de6","src_components_info_info_js":"540993375f5f61112607","src_components_map_map_js":"1dd0234839ef90604eed"}[chunkId] + "";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "webpack-template-1.0.0:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = (chunkId, fullhref, oldTag, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// object to store loaded CSS chunks
/******/ 		var installedCssChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.miniCss = (chunkId, promises) => {
/******/ 			var cssChunks = {"src_components_courses_courses_js":1,"src_components_credits_credits_js":1,"src_components_future_future_js":1,"src_components_info_info_js":1,"src_components_map_map_js":1};
/******/ 			if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 			else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 				promises.push(installedCssChunks[chunkId] = loadStylesheet(chunkId).then(() => {
/******/ 					installedCssChunks[chunkId] = 0;
/******/ 				}, (e) => {
/******/ 					delete installedCssChunks[chunkId];
/******/ 					throw e;
/******/ 				}));
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no hmr
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebpack_template_1_0_0"] = self["webpackChunkwebpack_template_1_0_0"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map?e9939e047452a07dc668
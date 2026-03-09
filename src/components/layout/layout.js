import template from "./layout.hbs";
import "./layout.scss";

const THEME_LABELS = {
    default: 'Mason',
    light: 'Light',
    night: 'Night',
    sea: 'Ocean',
    evil: 'Dark',
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
        options.forEach((opt) => {
            opt.classList.toggle("active", opt.dataset.theme === this.theme);
        });
    },

    _renderLayout() {
        this.element = document.querySelector("body");
        this.element.innerHTML = template();
        this._updateThemeLabel();
    },

    _bindListeners() {
        // logout
        let header = document.querySelector(".header");
        header.addEventListener("click", (e) => {
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

        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("open");
        });

        menu.addEventListener("click", (e) => {
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
        section.addEventListener("click", async (e) => {
            let target = e.target;

            if (target.classList.contains("item-title")) {
                let item = target.closest(".item");
                this._closeAllItems(item);

                let strType = item.getAttribute("data-type");
                let strState = item.getAttribute("data-state") || "";
                if (strState === "close" || strState === "") {
                    item.dataset.state = "open";
                    let importModule = await import(`components/${strType}/${strType}.js`);
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
        items.forEach((item) => {
            if (item.dataset.type === target.dataset.type) return;
            item.setAttribute("data-state", "close");
        });
    },
};

export default layout;

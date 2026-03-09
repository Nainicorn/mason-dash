import template from "./map.hbs";
import "./map.scss";
import { buildingsData } from "./buildings";

let buildingsLoaded = false;

const map = {
    init() {
        this.element = document.querySelector(".item.map");
        this._renderLayout();
        this._loadBuildings();
        this._bindListeners();
    },

    _renderLayout() {
        let mainHtml = template({ main: true });
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
        buildingsData.forEach((building) => {
            selectControl.insertAdjacentHTML(
                "beforeend",
                `<option value='${building.id}'>${building.name}</option>`
            );
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

            let building = buildingsData.find((row) => row.id === buildingId);
            if (!building) return;

            this.mapImage.style.transform =
                `translate(${building.x}px, ${building.y}px) scale(${building.scale})`;
            this.mapView.setAttribute('src', `./images/${buildingId}.jpeg`);
            this.mapViewContainer.classList.add('has-image');
        });
    },
};

export default map;

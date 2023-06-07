import BoardPresenter from './presenter/board-presenter.js';
import ModelWaypoint from './model/model-waypoint.js';
import {mockInit, waypoints} from './mock/point.js';
import ModelOffers from './model/model-offers.js';
import ModelDestinations from './model/model-destinations.js';
import {offersByType} from './mock/const.js';
import {destinations} from './mock/destination.js';
import ModelFilters from './model/model-filter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import {render} from './render.js';
import NewWaypointButton from './view/new-waypoint-button.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');
const placeForButton = document.querySelector('.trip-main');

mockInit(3, 10);
const modelWaypoints = new ModelWaypoint(waypoints);
const modelOffers = new ModelOffers(offersByType);
const modelDestinations = new ModelDestinations(destinations);
const modelFilter = new ModelFilters();

const boardPresenter = new BoardPresenter({
  boardContainer: container,
  waypointsModel: modelWaypoints,
  modelOffers,
  modelDestinations,
  modelFilter,
  onNewWaypointDestroy: handleNewTaskFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  modelFilter,
  modelWaypoints
});

const newWaypointButtonComponent = new NewWaypointButton({
  onClick: handleNewTaskButtonClick
});

function handleNewTaskFormClose() {
  newWaypointButtonComponent.element.disabled = false;
}

function handleNewTaskButtonClick() {
  boardPresenter.createWaypoint();
  newWaypointButtonComponent.element.disabled = true;
}

render(newWaypointButtonComponent, placeForButton);

filterPresenter.init();
boardPresenter.init();

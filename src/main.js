import Filters from './view/filters.js';
import BoardPresenter from './presenter/board-presenter.js';
import ModelWaypoint from './model/model-waypoint.js';
import {mockInit, waypoints} from './mock/point.js';
import {render} from './framework/render.js';
import ModelOffers from './model/offers-model.js';
import ModelDestinations from './model/destinations-model.js';
import {offersByType} from './mock/const.js';
import {destinations} from './mock/destination.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');

mockInit(3, 10);
const modelWaypoints = new ModelWaypoint(waypoints);
const modelOffers = new ModelOffers(offersByType);
const modelDestinations = new ModelDestinations(destinations);

const boardPresenter = new BoardPresenter({
  boardContainer: container,
  waypointsModel: modelWaypoints,
  modelOffers,
  modelDestinations
});
render(new Filters(), siteHeaderElement);

boardPresenter.init();

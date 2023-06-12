import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import {render} from './framework/render.js';
import TripPointModel from './model/model-waypoint';
import DestinationsModel from './model/model-destinations';
import OffersModel from './model/model-offers';
import FilterModel from './model/model-filter';
import NewTripPointButtonView from './view/new-waypoint-button.js';
import TripPointApiService from './waypoints-api-service.js';

const AUTHORIZATION = 'Basic sgkdajgskdas';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const boardContainer = document.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteHeaderElement = document.querySelector('.trip-main');

const tripPointApiService = new TripPointApiService(END_POINT, AUTHORIZATION);

const tripPointsModel = new TripPointModel({
  tripPointApiService
});
const destinationsModel = new DestinationsModel({tripPointApiService});
const offersModel = new OffersModel({tripPointApiService});
const filterModel = new FilterModel();

const newTripPointButtonComponent = new NewTripPointButtonView({
  onClick: handleNewTripPointButtonClick
});

const boardPresenter = new BoardPresenter({
  boardContainer,
  tripPointsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewTripPointDestroy
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteFilterElement,
  filterModel,
  tripPointsModel
});


function handleNewTripPointButtonClick() {
  boardPresenter.createTripPoint();
  newTripPointButtonComponent.element.disabled = true;
}

function onNewTripPointDestroy() {
  newTripPointButtonComponent.element.disabled = false;
}

filterPresenter.init();
boardPresenter.init();
tripPointsModel.init()
  .finally(() => {
    render(newTripPointButtonComponent, siteHeaderElement);
  });

import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewWaypointButton from './view/new-waypoint-button.js';
import WaypointsApiService from './waypoints-api-service.js';
import {render} from './framework/render.js';


const siteHeaderElement = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');
const placeForButton = document.querySelector('.trip-main');

const AUTHORIZATION = 'Basic abcdef9876';
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

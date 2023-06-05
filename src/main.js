import FiltersView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './board-presenter.js';

const SecrionEvent = document.querySelector('.trip-events');
const FiltrControls = document.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter();


render(new FiltersView(), FiltrControls);
boardPresenter.init(SecrionEvent);

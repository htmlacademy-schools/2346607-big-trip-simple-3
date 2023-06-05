import {render} from './render.js';
import ViewPoint from './view/point-view.js';
import ViewSort from './view/sort-view.js';
import ViewListTrip from './view/eventlist-view.js';
import ViewNewPoint from './view/newpoint-view.js';
import ViewEditPoint from './view/edit-view.js';

export default class BoardPresenter {
  eventsList = new ViewListTrip();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(new ViewSort(), this.boardContainer);
    render(this.eventsList, this.boardContainer);
    render(new ViewEditPoint, this.eventsList.getElement());
    render(new ViewNewPoint(), this.eventsList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new ViewPoint(), this.eventsList.getElement());
    }
  };
}

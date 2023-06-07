import {render, RenderPosition} from '../render.js';
import {UpdateType, UserAction} from '../const.js';
import EditForm from '../view/edit-form.js';
import {remove} from '../framework/render.js';
import {isEsc} from '../utils.js';

export default class NewWaypointPresenter {
  #handleDataChange = null;
  #handleDestroy = null;
  #waypointListContainer = null;
  #waypointEditComponent = null;
  constructor({waypointListContainer, onDataChange, onDestroy}) {
    this.#waypointListContainer = waypointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(destinations, offers) {
    if (this.#waypointEditComponent !== null) {
      return;
    }

    this.#waypointEditComponent = new EditForm({
      destinations: destinations,
      offers: offers,
      onSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      isEditForm: false
    });

    render(this.#waypointEditComponent, this.#waypointListContainer,
      RenderPosition.AFTERBEGIN);
    document.body.addEventListener('keydown', this.#ecsKeyDownHandler);
  }

  setSaving() {
    this.#waypointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#waypointEditComponent.updateElement({
        isDisabled: false,
        isSavinf: false,
        isDeleting: false,
      });
    };

    this.#waypointEditComponent.shake(resetFormState);
  }

  destroy() {
    if (this.#waypointEditComponent === null) {
      return;
    }
    this.#handleDestroy();
    remove(this.#waypointEditComponent);
    this.#waypointEditComponent = null;
    document.body.removeEventListener('keydown', this.#ecsKeyDownHandler);
  }

  #ecsKeyDownHandler = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (waypoint) => {
    this.#handleDataChange(
      UserAction.ADD_WAYPOINT,
      UpdateType.MINOR,

      this.#deleteId(waypoint)
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #deleteId = (waypoint) => {
    delete waypoint.id;
    return waypoint;
  };

}

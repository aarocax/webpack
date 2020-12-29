export { FormControl };

class FormControl {

  constructor(formReference, tabsReference, controlReference, controlElementsReference) {
    this.form = document.querySelector(formReference);
    this.formTabs = this.form.querySelectorAll(tabsReference);
    this.tabActive = parseInt(this.formTabs[0].dataset.index);
    this.numTabs = parseInt(this.formTabs.length);
    this.controls = this.form.querySelector(controlReference);
    this.nextButton = this.controls.querySelector(controlElementsReference[0]);
    this.previousButton = this.controls.querySelector(controlElementsReference[1]);
    this.formTabs[this.tabActive].style.display = "block";
    this._setEvents(this.nextButton);
    this._setEvents(this.previousButton);
  }

  _setEvents(element) {
    element.addEventListener('click', this._OnEvent.bind(this));
  }

  _OnEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    this._showFormTab(e.target.id);
  }

  _showFormTab(direction) {
    var tabActual = this.tabActive;
    if (direction === 'next') {
      if (this.tabActive < (this.numTabs -1)) {
        this.tabActive++;
      }
    } else {
      if (this.tabActive > -1) {
        this.tabActive--;
      }
    }
    this.formTabs[tabActual].style.display = "none";
    this.formTabs[this.tabActive].style.display = "block";
    this.nextButton.disabled = (this.formTabs[this.tabActive].dataset.checked === "1") ? false : true;
    this.previousButton.disabled = (this.tabActive > -1) ? false : true;
    this.previousButton.style.display = (this.tabActive > -1) ? "inline" : "none";
  }

}
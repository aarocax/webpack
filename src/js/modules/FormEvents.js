import { FormControl } from './FormControl.js';
import { translator as t } from './Translator.js';
import { CountriesListES } from './CountriesList_ES.js';
import { CountriesList } from './CountriesList.js';

export { FormEvents };

class FormEvents {

	constructor(formReference, tabsReference, controlReference, controlElementsReference) {
		// show and hide form tabs when buttons "next" or "previous" are clicked
		this.formControl = new FormControl(formReference, tabsReference, controlReference, controlElementsReference);
		this.formTabs = document.querySelectorAll('[data-type="form-tab"]');
		this.f1 = this.formTabs[1].querySelectorAll('[data-type="field"]');
		this.f2 = this.formTabs[2].querySelectorAll('[data-type="field"]');
		this.f3 = this.formTabs[3].querySelectorAll('[data-type="field"]');
		this.f4 = this.formTabs[4].querySelectorAll('[data-type="field"]');
		this.f5 = this.formTabs[5].querySelectorAll('[data-type="field"]');

		this.nextButton = document.querySelector('button#next');
		this.previousButton = document.querySelector('button#previous');
		this.dynamicFieldNationalityCounter = 0;

		this.fields1 = [];
		this._prepareFields(this.f1, this.fields1);
		this._setEventsTab1(this.fields1);
		this._fillMobilePhonePrefix(document.querySelector('[name="mobile_phone_prefix"]'), CountriesList.countries);
		this._fillNationality(document.querySelector('[name="country_of_bird"]'), CountriesListES);
		this._fillNationality(document.querySelector('[name="nationality"]'), CountriesListES);

		this.fields2 = [];
		this._prepareFields(this.f2, this.fields2);
		this._setEventsTab2(this.fields2);
		this._fillNationality(document.querySelector('[name="country_you_live_in"]'), CountriesListES);
		this._fillNationality(document.querySelector('[name="tax_residence_country"]'), CountriesListES);

		this.fields3 = [];
		this._prepareFields(this.f3, this.fields3);
		this._setEventsTab3(this.fields3);
		this._fillNationality(document.querySelector('[name="correspondence_address_country_you_live_in"]'), CountriesListES);

		this.fields4 = [];
		this._prepareFields(this.f4, this.fields4);
		this._setEventsTab4(this.fields4);

		this.fields5 = [];
		this._prepareFields(this.f5, this.fields5);
		this._setEventsTab5(this.fields5);
	}

	_prepareFields(fields, fieldsArray) {
		for (var i = 0; i < fields.length; i++) {
			if (fields[i].type === 'radio') {
				fieldsArray[fields[i].id] = [];
				fieldsArray[fields[i].id]['field'] = fields[i];  // field node
				fieldsArray[fields[i].id]['pass'] = false;
			} else {
				fieldsArray[fields[i].name] = [];
				fieldsArray[fields[i].name]['field'] = fields[i];  // field node
				fieldsArray[fields[i].name]['pass'] = false;
			}
			// if (fields[i].type === 'radio') {
			// 	console.log(fields[i].id)
				
			// } else {
				
			// }
			
		}
	}

	// show field error message
	_error(input, message) {
	  input.className = 'error';
	  const error = input.nextElementSibling; // mostar mensaje de error
	  error.innerText = message;
	  return false;
	}

	// hide field error message
	_success(input) {
	  input.className = 'success';
	  const error = input.nextElementSibling; // ocultar mensaje de error
	  error.innerText = '';
	  return true;
	}

	_setEventsTab1(fields) {
		fields.title_salutation.field.addEventListener('change', function(e){
			fields.title_salutation.pass = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			this._checkFields(fields);
		}.bind(this));

		fields.first_name.field.addEventListener('change', function(e){
			let required = false;
			let valid = false;
			// required
			required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
			//validate
			if (required) {
				valid = e.target.value.length < 2 ? this._error(e.target, t("The field must be longer than") + " " + 2 + " " + t("characters")) : this._success(e.target);
			}

			fields.first_name.pass = (required && valid) ? true : false;
			this._checkFields(fields);
		}.bind(this));

		fields['last_name']['field'].addEventListener('change', function(e){
			let required = false;
			let valid = false;
			// required
			required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
			//validate
			if (required) {
				valid = e.target.value.length < 2 ? this._error(e.target, t("The field must be longer than") + " " + 2 + " " + t("characters")) : this._success(e.target);
			}

			fields['last_name']['pass'] = (required && valid) ? true : false;
			this._checkFields(fields);
		}.bind(this));

		fields['email']['field'].addEventListener('change', function(e){
			let required = false;
			let valid = false;
			// required
			required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
			//validate
			if (required) {
				const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				valid = !re.test(e.target.value.trim()) ? this._error(e.target, t("email not valid")) : this._success(e.target);
			}

			fields['email']['pass'] = (required && valid) ? true : false;
			this._checkFields(fields);
		}.bind(this));

		fields['repeat_email']['field'].addEventListener('change', function(e){
			let required = false;
			let valid = false;
			// required
			required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
			//validate
			if (required) {
				const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				valid = !re.test(e.target.value.trim()) ? this._error(e.target, t("email not valid")) : this._success(e.target);
				if (valid) {
					valid = !(fields['email']['field'].value.trim() === e.target.value.trim()) ? this._error(e.target, t("emails do not match")) : this._success(e.target);
				}
				
			}

			fields['repeat_email']['pass'] = (required && valid) ? true : false;
			this._checkFields(fields);
		}.bind(this));

		fields['mobile_phone_prefix']['field'].addEventListener('change', function(e){
			let required = false;
			// required
			required = fields['mobile_phone_prefix']['pass'] = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			if (required) {
				!(fields['mobile_phone']['pass']) ? this._error(fields['mobile_phone']['field'], t("enter a valid phone number")) : this._success(fields['mobile_phone']['field']);
			}
			this._checkFields(fields);
		}.bind(this));

		fields['mobile_phone']['field'].addEventListener('change', function(e){
			let required = false;
			let valid = false;
			// required
			required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
			if (required) {
				valid = (/\D/.test(e.target.value.trim())) ? this._error(e.target, t("enter a valid phone number")) : this._success(e.target);
				if (valid) {
					valid = e.target.value.length < 5 ? this._error(e.target, t("The field must be longer than") + " " + 5 + " " + t("characters")) : this._success(e.target);
				}
				if (valid) {
					!(fields['mobile_phone_prefix']['pass']) ? this._error(fields['mobile_phone_prefix']['field'], t("select country phone code")) : this._success(fields['mobile_phone_prefix']['field']);
				}
			}
			fields['mobile_phone']['pass'] = (required && valid) ? true : false;
			this._checkFields(fields);
		}.bind(this));

		fields['gender']['field'].addEventListener('change', function(e){
			fields['gender']['pass'] = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			this._checkFields(fields);
		}.bind(this));

		fields['country_of_bird']['field'].addEventListener('change', function(e){
			fields['country_of_bird']['pass'] = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			this._checkFields(fields);
		}.bind(this));

		fields['nationality']['field'].addEventListener('change', function(e){
			fields['nationality']['pass'] = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			fields['nationality']['pass'] = this._isValidNationality(e.target.value.trim()) ? this._success(e.target) : this._error(e.target, t('country not allowed (stop process)'));
			this._checkFields(fields);
		}.bind(this));

		document.querySelector('[name="add-nationality"]').addEventListener('click', function(e){
			var group = document.querySelector('[data-id="nationality"]');
			var element = document.createElement('div');
			element.innerHTML += `<select name="other_nationality_${this.dynamicFieldNationalityCounter}" data-type="field" data-group="nationality">
															<option value="">${t("Please choose a option")}</option>
														</select>
														<span class="fielderror"></span>`;
			group.appendChild(element);
			
			this._fillNationality(element.querySelector('select'), CountriesListES);

			fields['other_nationality_' + this.dynamicFieldNationalityCounter] = [];
			fields['other_nationality_' + this.dynamicFieldNationalityCounter]['field'] = element.querySelector('select');
			fields['other_nationality_' + this.dynamicFieldNationalityCounter]['pass'] = false;

			// set event required event
			element.querySelector('select').addEventListener('change', function(e){
				fields[e.currentTarget.name]['pass'] = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
				this._checkFields(fields);
			}.bind(this));

			this.dynamicFieldNationalityCounter++;

			this._checkFields(fields);
		}.bind(this));
	}

	_setEventsTab2(fields) {

		fields['country_you_live_in']['field'].addEventListener('change', function(e){
			fields['country_you_live_in']['pass'] = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			fields['country_you_live_in']['pass'] = this._isValidNationality(e.target.value.trim()) ? this._success(e.target) : this._error(e.target, t('country not allowed (stop process)'));
			this._checkFields(fields);
		}.bind(this));

		fields['street_address']['field'].addEventListener('change', function(e){
			let required = false;
			let valid = false;
			// required
			required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
			//validate
			if (required) {
				valid = e.target.value.length < 5 ? this._error(e.target, t("The field must be longer than") + " " + 2 + " " + t("characters")) : this._success(e.target);
			}

			fields['street_address']['pass'] = (required && valid) ? true : false;
			this._checkFields(fields);
		}.bind(this));

		fields['post_code']['field'].addEventListener('change', function(e){
			let required = false;
			let valid = false;
			// required
			required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
			//validate
			if (required) {
				valid = e.target.value.length < 5 ? this._error(e.target, "el número de caratéres debe ser > 4") : this._success(e.target);
			}

			fields['post_code']['pass'] = (required && valid) ? true : false;
			this._checkFields(fields);
		}.bind(this));

		fields['city']['field'].addEventListener('change', function(e){
			let required = false;
			let valid = false;
			// required
			required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
			//validate
			if (required) {
				valid = e.target.value.length < 5 ? this._error(e.target, "el número de caratéres debe ser > 4") : this._success(e.target);
			}

			fields['city']['pass'] = (required && valid) ? true : false;
			this._checkFields(fields);
		}.bind(this));

		fields['tax_residence_country']['field'].addEventListener('change', function(e){
			fields['tax_residence_country']['pass'] = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			fields['tax_residence_country']['pass'] = this._isValidNationality(e.target.value.trim()) ? this._success(e.target) : this._error(e.target, t('country not allowed (stop process)'));
			this._checkFields(fields);
		}.bind(this));

		fields['do_you_have_a_local_tax_identification_number_yes']['field'].addEventListener('change', function(e){
			//fields['do_you_have_a_local_tax_identification_number_yes']['pass'] = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			this.formTabs[2].querySelector('#local_tax_identification_number').style.display = "inline";
			this.formTabs[2].querySelector('#no_local_tax_identification_number').style.display = "none";
			fields['no_local_tax_identification_number']['pass'] = true;
			this._checkFields(fields);
		}.bind(this));

		fields['do_you_have_a_local_tax_identification_number_no']['field'].addEventListener('change', function(e){
			//fields['do_you_have_a_local_tax_identification_number_no']['pass'] = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			this.formTabs[2].querySelector('#no_local_tax_identification_number').style.display = "inline";
			this.formTabs[2].querySelector('#local_tax_identification_number').style.display = "none";
			fields['local_tax_identification_number']['pass'] = true;
			this._checkFields(fields);
		}.bind(this));

		fields['local_tax_identification_number']['field'].addEventListener('change', function(e){
			let required = false;
			let valid = false;

			// si está oculto, no se valida se pone directamente el pass a true
			if (this.formTabs[2].querySelector('#local_tax_identification_number').style.display === "none") {
				fields['no_local_tax_identification_number']['pass'] = true;
				fields['no_local_tax_identification_number']['field'].value = "";
			} else {
				// required
				required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
				//validate
				if (required) {
					valid = e.target.value.length < 5 ? this._error(e.target, "el número de caratéres debe ser > 4") : this._success(e.target);
				}

				fields['local_tax_identification_number']['pass'] = (required && valid) ? true : false;
			}

			
			this._checkFields(fields);
		}.bind(this));

		fields['no_local_tax_identification_number']['field'].addEventListener('change', function(e){
			let required = false;
			let valid = false;

			if (this.formTabs[2].querySelector('#no_local_tax_identification_number').style.display === "none") {
				fields['local_tax_identification_number']['pass'] = true;
			} else {
				// required
				required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
				//validate
				if (required) {
					valid = e.target.value.length < 5 ? this._success(e.target) : this._error(e.target, "el número de caratéres debe ser > 4");
				}

				fields['no_local_tax_identification_number']['pass'] = (required && valid) ? true : false;
			}

			
			this._checkFields(fields);
		}.bind(this));
	}

	_setEventsTab3(fields) {

		fields['same_permanent_address']['field'].addEventListener('change', function(e){
			fields['same_permanent_address']['pass'] = true;
			if (e.target.checked) {
				document.querySelector('[data-id="correspondence_address"]').style.display = "none";
				fields['correspondence_address_country_you_live_in']['pass'] = true;
				fields['correspondence_address_street_address']['pass'] = true;
				fields['correspondence_address_post_code']['pass'] = true;
				fields['correspondence_address_city']['pass'] = true;
			} else {
				document.querySelector('[data-id="correspondence_address"]').style.display = "block";
			}
			this._checkFields(fields);
		}.bind(this));

		fields['correspondence_address_country_you_live_in']['field'].addEventListener('change', function(e){
			if (!fields['same_permanent_address']['field'].checked) {
				fields['correspondence_address_country_you_live_in']['pass'] = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			} else {
				fields['correspondence_address_country_you_live_in']['pass'] = true;
			}
			this._checkFields(fields);
		}.bind(this));

		fields['correspondence_address_street_address']['field'].addEventListener('change', function(e){
			let required = false;
			let valid = false;

			if (!fields['same_permanent_address']['field'].checked) {
				// required
				required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
				//validate
				if (required) {
					valid = e.target.value.length < 5 ? this._error(e.target, t("The field must be longer than") + " " + 2 + " " + t("characters")) : this._success(e.target);
				}
				fields['correspondence_address_street_address']['pass'] = (required && valid) ? true : false;
			} else {
				fields['correspondence_address_street_address']['pass'] = true;
			}

			this._checkFields(fields);
		}.bind(this));

		fields['correspondence_address_post_code']['field'].addEventListener('change', function(e){
			let required = false;
			let valid = false;
			// required
			required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
			//validate
			if (required) {
				valid = e.target.value.length < 5 ? this._error(e.target, "el número de caratéres debe ser > 4") : this._success(e.target);
			}

			fields['correspondence_address_post_code']['pass'] = (required && valid) ? true : false;
			this._checkFields(fields);
		}.bind(this));

		fields['correspondence_address_city']['field'].addEventListener('change', function(e){
			let required = false;
			let valid = false;
			// required
			required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
			//validate
			if (required) {
				valid = e.target.value.length < 5 ? this._error(e.target, "el número de caratéres debe ser > 7") : this._success(e.target);
			}

			fields['correspondence_address_city']['pass'] = (required && valid) ? true : false;
			this._checkFields(fields);
		}.bind(this));
	}

	_setEventsTab4(fields) {

		fields['occupation']['field'].addEventListener('change', function(e){
			fields['occupation']['pass'] = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			if (e.target.value === 'employee' || e.target.value === 'selfemployed') {
				this.formTabs[4].querySelector('[data-id="professional_information_employee"]').style.display = "block";
				this.formTabs[4].querySelector('[data-id="professional_information_retired"]').style.display = "none";
			}

			if (e.target.value === 'retired' || e.target.value === 'unemployed') {
				this.formTabs[4].querySelector('[data-id="professional_information_employee"]').style.display = "none";
				this.formTabs[4].querySelector('[data-id="professional_information_retired"]').style.display = "block";
			} 
				
			
			this._checkFields(fields);
		}.bind(this));

		fields['linkedin_profile']['field'].addEventListener('change', function(e){
			fields['linkedin_profile']['pass'] = true;
			this._checkFields(fields);
		}.bind(this));

		fields['employer_name']['field'].addEventListener('change', function(e){
			let required = true;
			let valid = true;
			if (fields['occupation']['field'].value === 'employee' || fields['occupation']['field'].value === 'selfemployed') {
				// required
				required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
				//validate
				if (required) {
					valid = e.target.value.length < 5 ? this._error(e.target, t("The field must be longer than") + " " + 2 + " " + t("characters")) : this._success(e.target);
				}
			}
			fields['employer_name']['pass'] = (required && valid) ? true : false;
			this._checkFields(fields);
		}.bind(this));

		fields['nature_of_bussiness']['field'].addEventListener('change', function(e){
			fields['nature_of_bussiness']['pass'] = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			this._checkFields(fields);
		}.bind(this));

		fields['current_job_position']['field'].addEventListener('change', function(e){
			fields['current_job_position']['pass'] = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			this._checkFields(fields);
		}.bind(this));

		fields['job_title']['field'].addEventListener('change', function(e){
			let required = false;
			let valid = false;
			// required
			required = e.target.value.trim() === '' ? this._error(e.target, t("field can\'t be empty")) : this._success(e.target);
			//validate
			if (required) {
				valid = e.target.value.length < 2 ? this._error(e.target, "el número de caratéres debe ser > 2") : this._success(e.target);
			}

			fields['job_title']['pass'] = (required && valid) ? true : false;
			this._checkFields(fields);
		}.bind(this));
	}

	_setEventsTab5(fields) {
		fields.source_of_your_personal_wealth.field.addEventListener('change', function(e){
			fields.source_of_your_personal_wealth.pass = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			this._checkFields(fields);
		}.bind(this));

		fields.base_currency.field.addEventListener('change', function(e){
			fields.base_currency.pass = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			this._checkFields(fields);
		}.bind(this));

		fields.sources_of_income.field.addEventListener('change', function(e){
			fields.sources_of_income.pass = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			this._checkFields(fields);
		}.bind(this));

		fields.gross_annual_income.field.addEventListener('change', function(e){
			fields.gross_annual_income.pass = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			this._checkFields(fields);
		}.bind(this));

		fields.planned_investment.field.addEventListener('change', function(e){
			fields.planned_investment.pass = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			this._checkFields(fields);
		}.bind(this));

		fields.what_do_you_intend_to_use_the_banking_relationship.field.addEventListener('change', function(e){
			fields.what_do_you_intend_to_use_the_banking_relationship.pass = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			this._checkFields(fields);
		}.bind(this));

		fields.which_account_movements_do_you_expect.field.addEventListener('change', function(e){
			fields.which_account_movements_do_you_expect.pass = e.target.value.trim() === '' ? this._error(e.target, t('Please choose a option')) : this._success(e.target);
			this._checkFields(fields);
		}.bind(this));
	}

	// this function should fill the countries selects
	_fillNationality(element, optionsList) {
		var optionsKeys = Object.keys(optionsList);
		for (var i = 0; i < optionsKeys.length; i++) {
			var option = document.createElement('option');
			option.value = optionsKeys[i];
			option.innerText = optionsList[optionsKeys[i]];
			element.appendChild(option);
		}
	}

	_fillMobilePhonePrefix(element, optionsList) {
		for (var i = 0; i < optionsList.length; i++) {
			var option = document.createElement('option');
			option.value = optionsList[i].dial_code;
			option.innerText = optionsList[i].name_es + " " + optionsList[i].dial_code;
			element.appendChild(option);
		}
	}

	// check if all fields are correctly filled
	_checkFields(fields) {
		var response = true;
		Object.keys(fields).forEach(function(e){
			if (!fields[e].pass) {
				response = false;
			}
		});
		this.formTabs[this.formControl.tabActive].dataset.checked = (response) ? 1 : 0; // if tab has all fields filled. This is checked in FormControl class
		this.nextButton.disabled = !response;
	}

	_isValidNationality(countryIsoCode) {
		for (var i = 0; i < CountriesList.countries.length; i++) {
			if (CountriesList.countries[i].code === countryIsoCode) {
				if (CountriesList.countries[i].hasOwnProperty("video_indentity")) {
					return CountriesList.countries[i].video_indentity;
				} else {
					return false;
				}
				
			}
		}
		return false;
	}

}
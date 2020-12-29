import { FormEvents } from './modules/FormEvents.js';

(function(){
	console.log('LLLLLLLLLLLLLLL');
	var application = new FormEvents('#onboarding-form', 'section[data-type="form-tab"]', 'section[data-type="form-controls"]', ['#next', '#previous']);
})();




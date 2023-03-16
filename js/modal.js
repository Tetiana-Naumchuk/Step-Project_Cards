import Requests from './Requests.js';
import { headerBtn } from './main.js';
import { VisitDentist, VisitTherapist, VisitCardiologist } from './Visit.js';

export const cardContainer = document.querySelector('.cards-container');

export default class Modal {
	constructor() {
		const formEnterTemplate = document.querySelector('#form-template').content;
		this.formWrap = formEnterTemplate.querySelector('.form').cloneNode(true);
		this.form = this.formWrap.querySelector('form');
		this.inputsContainer = this.formWrap.querySelector('.inputs-container');
		this.formWrap.classList.add('active-form');
		this.formWrap.addEventListener('click', event => {
			if (
				event.target.classList.contains('form') ||
				event.target.classList.contains('close-form')
			) {
				this.formWrap.classList.remove('active-form');
			}
		});
	}

	enter() {
		const enterFillingTemplate = document.querySelector('#form_enter-filling').content;
		const formEnter = enterFillingTemplate.cloneNode(true);
		this.inputsContainer.append(formEnter);
		this.form.addEventListener('submit', event => {
			event.preventDefault();
			const email = this.form.querySelector('.user-email').value;
			const password = this.form.querySelector('.user-password').value;
			const userData = {
				email,
				password,
			};
			Requests.enter(userData).then(token => localStorage.setItem('token', token));
			headerBtn.textContent = 'Створити візит';
			this.formWrap.classList.remove('active-form');
			this.inputsContainer.innerHTML = '';
		});
		return this.formWrap;
	}

	visit() {
		const formTitle = document.createElement('h3');
		formTitle.textContent = 'Заповніть поля для створення нового запису';

		this.selectDoctor = document.createElement('select');

		let btnSubmit = document.createElement('input');
		btnSubmit.classList.add('submit');
		btnSubmit.type = 'submit';
		btnSubmit.value = 'Зберегти візит';
		btnSubmit.style.pointerEvents = 'none';

		this.selectDoctor.innerHTML = ` 
            <option disabled selected="selected">Оберіть лікаря</option>
            <option value="Кардіолог">Кардіолог</option>
            <option value="Стоматолог">Стоматолог</option>
            <option value="Терапевт">Терапевт</option>`;
		this.selectDoctor.className = 'select-doctor';
		this.selectDoctor.required = true;

		this.dopInfoWrapper = document.createElement('div');
		this.dopInfoWrapper.className = 'additional-info';

		this.selectDoctor.addEventListener('change', () => {
			this.dopInfoWrapper.innerHTML = '';
			switch (this.selectDoctor.value) {
				case 'Кардіолог':
					btnSubmit.style.pointerEvents = 'auto';
					this.pressure = document.createElement('input');
					this.pressure.setAttribute('name', 'pressure');
					this.pressure.placeholder = 'Звичайний тиск';

					this.indexMassa = document.createElement('input');
					this.indexMassa.setAttribute('name', 'indexMassa');
					this.indexMassa.placeholder = 'Індекс маси тіла';

					this.ill = document.createElement('input');
					this.ill.setAttribute('name', 'ill');
					this.ill.placeholder = 'Перенесені захворювання серцево-судинної системи';

					this.age = document.createElement('input');
					this.age.setAttribute('name', 'age');
					this.age.placeholder = 'Вік';

					this.dopInfoWrapper.append(this.pressure, this.indexMassa, this.ill, this.age);
					break;

				case 'Стоматолог':
					btnSubmit.style.pointerEvents = 'auto';
					this.lastVisit = document.createElement('input');
					this.lastVisit.setAttribute('name', 'lastVisit');
					this.lastVisit.placeholder = 'Дата останнього візиту';
					this.dopInfoWrapper.append(this.lastVisit);
					break;

				case 'Терапевт':
					btnSubmit.style.pointerEvents = 'auto';
					this.age = document.createElement('input');
					this.age.setAttribute('name', 'age');
					this.age.placeholder = 'Вік';
					this.dopInfoWrapper.append(this.age);
					break;
			}
		});

		let patientName = document.createElement('input');
		patientName.setAttribute('name', 'patientName');
		patientName.placeholder = 'П.І.Б. пацієнта';
		patientName.required = true;

		let origins = document.createElement('select');
		origins.innerHTML = ` 
            <option value="Звичайна">Звичайна</option>
            <option value="Пріорітетна">Пріорітетна</option>
            <option value="Невідкладна">Невідкладна</option>`;
		origins.setAttribute('name', 'origins');
		origins.id = 'origins';
		origins.classList = 'selectOrigins';
		origins.placeholder = 'Терміновість';
		let labelOrigins = document.createElement('label');
		labelOrigins.textContent = 'Терміновість візиту:';
		labelOrigins.for = 'origins';
		labelOrigins.append(origins);

		let description = document.createElement('input');
		description.setAttribute('name', 'description');
		description.placeholder = 'Короткий опис візиту';
		description.required = true;

		let purposeVisit = document.createElement('input');
		purposeVisit.setAttribute('name', 'purposeVisit');
		purposeVisit.placeholder = 'Мета візиту';
		purposeVisit.required = true;

		this.inputsContainer.append(
			formTitle,
			patientName,
			purposeVisit,
			description,
			labelOrigins,
			this.selectDoctor,
			this.dopInfoWrapper,
			btnSubmit,
		);

		this.form.addEventListener('submit', e => {
			e.preventDefault();

			let visit = {
				name: patientName.value,
				purposeVisit: purposeVisit.value,
				description: description.value,
				origins: origins.value,
				doctor: this.selectDoctor.value,
			};

			switch (this.selectDoctor.value) {
				case 'Кардіолог':
					visit.pressure = this.pressure.value;
					visit.indexMassa = this.indexMassa.value;
					visit.ill = this.ill.value;
					visit.age = this.age.value;
					break;
				case 'Стоматолог':
					visit.lastVisit = this.lastVisit.value;
					break;
				case 'Терапевт':
					visit.age = this.age.value;
					break;
				default:
					break;
			}

			Requests.post(visit).then(data => {
				this.formWrap.classList.remove('active-form');
				this.inputsContainer.innerHTML = '';

				const { doctor } = data;
				if (doctor === 'Стоматолог') {
					new VisitDentist(data).render(cardContainer);
				} else if (doctor === 'Кардіолог') {
					new VisitCardiologist(data).render(cardContainer);
				} else if (doctor === 'Терапевт') {
					new VisitTherapist(data).render(cardContainer);
				}
			});
		});

		return this.formWrap;
	}
}

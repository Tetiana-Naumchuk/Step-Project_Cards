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

	_renderVisit(
		modalTitle,
		{
			doctor = '',
			fullName = '',
			origins = '',
			purposeVisit = '',
			description = '',
			pressure = '',
			indexMassa = '',
			ill = '',
			age = '',
			lastVisit = '',
		} = '',
	) {
		const formTitle = document.createElement('h3');
		formTitle.textContent = modalTitle;

		this.selectDoctor = document.createElement('select');

		const btnSubmit = document.createElement('input');
		btnSubmit.classList.add('submit');
		btnSubmit.type = 'submit';
		btnSubmit.value = 'Зберегти візит';
		btnSubmit.style.pointerEvents = 'none';

		this.selectDoctor.innerHTML = ` 
            <option value='doctor' disabled>Оберіть лікаря</option>
            <option value="Кардіолог">Кардіолог</option>
            <option value="Стоматолог">Стоматолог</option>
            <option value="Терапевт">Терапевт</option>`;
		if (doctor === '') {
			this.selectDoctor.querySelector(`[value='doctor']`).selected = 'selected';
		} else {
			this.selectDoctor.querySelector(`[value='${doctor}']`).selected = 'selected';
		}

		const dopInfoWrapper = document.createElement('div');
		dopInfoWrapper.className = 'additional-info';

		this.selectDoctor.addEventListener('change', () => {
			dopInfoWrapper.innerHTML = '';
			switch (this.selectDoctor.value) {
				case 'Кардіолог':
					btnSubmit.style.pointerEvents = 'auto';
					this.pressure = document.createElement('input');
					this.pressure.placeholder = 'Звичайний тиск';
					this.pressure.textContent = pressure;

					this.indexMassa = document.createElement('input');
					this.indexMassa.setAttribute('type', 'number');
					this.indexMassa.placeholder = 'Індекс маси тіла';
					this.indexMassa.textContent = indexMassa;

					this.ill = document.createElement('input');
					this.ill.placeholder = 'Перенесені захворювання серцево-судинної системи';
					this.ill.textContent = ill;

					this.age = document.createElement('input');
					this.age.setAttribute('type', 'number');
					this.age.placeholder = 'Вік';
					this.age.textContent = age;

					dopInfoWrapper.append(this.pressure, this.indexMassa, this.ill, this.age);
					break;

				case 'Стоматолог':
					btnSubmit.style.pointerEvents = 'auto';
					this.lastVisit = document.createElement('input');
					this.lastVisit.setAttribute('type', 'date');
					this.lastVisit.placeholder = 'Дата останнього візиту';
					this.lastVisit.textContent = lastVisit;
					dopInfoWrapper.append(this.lastVisit);
					break;

				case 'Терапевт':
					btnSubmit.style.pointerEvents = 'auto';
					this.age = document.createElement('input');
					this.age.setAttribute('type', 'number');
					this.age.placeholder = 'Вік';
					this.age.textContent = age;
					dopInfoWrapper.append(this.age);
					break;
			}
		});

		this.patientName = document.createElement('input');
		this.patientName.placeholder = 'П.І.Б. пацієнта';
		this.patientName.textContent = fullName;
		this.patientName.required = true;

		this.origins = document.createElement('select');
		this.origins.innerHTML = ` 
            <option value="Звичайна">Звичайна</option>
            <option value="Пріорітетна">Пріорітетна</option>
            <option value="Невідкладна">Невідкладна</option>`;
		this.origins.id = 'origins';
		this.origins.placeholder = 'Терміновість';
		if (origins !== '') {
			this.origins.querySelector(`[value='${origins}']`).selected = 'selected';
		}

		const labelOrigins = document.createElement('label');
		labelOrigins.textContent = 'Терміновість візиту:';
		labelOrigins.for = 'origins';
		labelOrigins.append(this.origins);

		this.description = document.createElement('input');
		this.description.textContent = description;
		this.description.placeholder = 'Короткий опис візиту';
		this.description.required = true;

		this.purposeVisit = document.createElement('input');
		this.purposeVisit.textContent = purposeVisit;
		this.purposeVisit.placeholder = 'Мета візиту';
		this.purposeVisit.required = true;

		this.inputsContainer.append(
			formTitle,
			this.patientName,
			this.purposeVisit,
			this.description,
			labelOrigins,
			this.selectDoctor,
			dopInfoWrapper,
			btnSubmit,
		);
	}

	visitCreateNew() {
		this._renderVisit('Заповніть поля для створення нового запису');
		this.form.addEventListener('submit', e => {
			e.preventDefault();

			let visit = {
				name: this.patientName.value,
				purposeVisit: this.purposeVisit.value,
				description: this.description.value,
				origins: this.origins.value,
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

	visitEdit(data) {
		this._renderVisit('Відкоригуйте необхідну інформацію про візит', data);
		const { id } = data;
		this.form.addEventListener('submit', e => {
			e.preventDefault();
			let visit = {
				name: this.patientName.value,
				purposeVisit: this.purposeVisit.value,
				description: this.description.value,
				origins: this.origins.value,
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
			this.formWrap.classList.remove('active-form');
			this.inputsContainer.innerHTML = '';

			Requests.put(visit, id).then(data => {
				const cardForEdit = cardContainer.querySelector(`[data-id="${key}"]`);
				return data;
			});
		});
	}
}

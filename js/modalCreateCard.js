import Requests from './requests.js';
import { Visit } from './visit.js';
import { VisitDentist } from './visit.js';
import { VisitTherapist } from './visit.js';
import { VisitCardiologist } from './visit.js';

const cardContainer = document.querySelector('.cards-container');

export default class ModalCreateVisit {
	constructor() {
		this.dopInfoWrapper = document.createElement('div');
		this.dopInfoWrapper.classList = 'dopInfo';
	}
	handleForm() {
		let visit = {
			fio: this.form.fio.value,
			purposeVisit: this.form.purposeVisit.value,
			description: this.form.description.value,
			origins: this.form.origins.value,
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
			if (data.hasOwnProperty('id')) {
				this.modal.remove();
			}
			if (data.length === 0) {
				const noItem = document.createElement('p');
				noItem.innerText = 'No item has been added';
				noItem.id = 'empty';
				cardContainer.append(noItem);
			} else {
				let visitsObjects = Object.keys(data).map(visit => {
					if (data[visit] === 'Стоматолог') {
						const visitCard = new VisitDentist(data);

						visitCard.render(cardContainer);
						return visitCard;
					} else if (data[visit] === 'Кардіолог') {
						const visitCard = new VisitCardiologist(data);

						visitCard.render(cardContainer);
						return visitCard;
					} else if (data[visit] === 'Терапевт') {
						const visitCard = new VisitTherapist(data);
						visitCard.render(cardContainer);
						return visitCard;
					}
				});
				return visitsObjects;
			}
		});
	}

	render() {
		this.form = document.createElement('form');
		this.form.classList.add('createVisit');
		this.modal = document.createElement('div');
		this.modal.classList = 'div-createVisit';
		let formTitle = document.createElement('h4');
		this.selectDoctor = document.createElement('select');
		let btnSubmit = document.createElement('button');
		btnSubmit.classList.add('btnSubmit');

		btnSubmit.textContent = 'Створити візит';

		this.selectDoctor.innerHTML = ` 
        <option value="Лікар" selected="selected">Оберіть лікаря</option>
        <option value="Кардіолог">Кардіолог</option>
        <option value="Стоматолог">Стоматолог</option>
        <option value="Терапевт">Терапевт</option>`;
		this.selectDoctor.classList = 'selectDoctor';

		this.selectDoctor.addEventListener('change', () => {
			this.dopInfoWrapper.innerHTML = '';
			switch (this.selectDoctor.value) {
				case 'Кардіолог':
					this.pressure = document.createElement('input');
					this.pressure.setAttribute('name', 'pressure');
					this.pressure.placeholder = 'Тиск';

					this.indexMassa = document.createElement('input');
					this.indexMassa.setAttribute('name', 'indexMassa');
					this.indexMassa.placeholder = 'Індекс маси';

					this.ill = document.createElement('input');
					this.ill.setAttribute('name', 'ill');
					this.ill.placeholder = 'Перенесені захворювання';

					this.age = document.createElement('input');
					this.age.setAttribute('name', 'age');
					this.age.placeholder = 'Вік';

					this.dopInfoWrapper.append(this.pressure, this.indexMassa, this.ill, this.age);
					break;
				case 'Стоматолог':
					this.lastVisit = document.createElement('input');
					this.lastVisit.setAttribute('name', 'lastVisit');
					this.lastVisit.placeholder = 'Останній візит';
					this.dopInfoWrapper.append(this.lastVisit);
					break;

				case 'Терапевт':
					this.age = document.createElement('input');
					this.age.setAttribute('name', 'age');
					this.age.placeholder = 'Вік';
					this.dopInfoWrapper.append(this.age);
					break;
			}
		});

		let fio = document.createElement('input');
		fio.setAttribute('name', 'fio');
		fio.placeholder = 'ПІБ';

		let origins = document.createElement('select');
		origins.innerHTML = ` 
        <option value="Звичайна">Звичайна</option>
        <option value="Пріорітетна">Пріорітетна</option>
        <option value="Термінова">Термінова</option>`;
		origins.setAttribute('name', 'origins');
		origins.classList = 'selectOrigins';
		origins.placeholder = 'Терміновість';

		let description = document.createElement('input');
		description.setAttribute('name', 'description');
		description.placeholder = 'Короткий опис візиту';

		let purposeVisit = document.createElement('input');
		purposeVisit.setAttribute('name', 'purposeVisit');
		purposeVisit.placeholder = 'Мета візиту';

		this.form.append(
			fio,
			purposeVisit,
			description,
			origins,
			this.selectDoctor,
			this.dopInfoWrapper,
			btnSubmit,
		);

		this.form.addEventListener('submit', e => {
			e.preventDefault();
			this.handleForm();
		});

		this.modal.append(this.form);

		return this.modal;
	}
}

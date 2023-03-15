import Requests from './Requests.js';

export class Visit {
	constructor(data) {
		this.id = data.id;
		this.doctor = data.doctor;
		this.purposeVisit = data.purposeVisit;
		this.description = data.description;
		this.origins = data.origins;
		this.name = data.name;

		const cardTemplate = document.querySelector('#card-template').content;
		this.cardWrap = cardTemplate.querySelector('.card').cloneNode(true);

		this.elem = {
			self: this.cardWrap,
			deleteImg: this.cardWrap.querySelector('.visit__delete'),
			fullName: this.cardWrap.querySelector('.visit__person'),
			doctor: this.cardWrap.querySelector('.visit__text-doctor'),
			origins: this.cardWrap.querySelector('.visit__text-origins'),
			purposeVisit: this.cardWrap.querySelector('.visit__text-purpose'),
			description: this.cardWrap.querySelector('.visit__text-desc'),
			editImg: this.cardWrap.querySelector('.visit__edit'),
			showMoreBtn: this.cardWrap.querySelector('.visit__btn-more'),
			hideBtn: this.cardWrap.querySelector('.visit__btn-hide'),
		};

		this.elem.deleteImg.addEventListener('click', event => {
			const response = Requests.delete(this.id);

			if (response.status === 'Success') {
				this.elem.self.remove();
				const renderedVisits = document.querySelectorAll('.visit');
				if (!renderedVisits || renderedVisits.length === 0) {
					const noItem = document.createElement('p');
					noItem.id = 'empty';
					noItem.textContent = 'No item has been added';
					parent.append(noItem);
				}
			}
			location.reload();
		});
	}

	render(parent) {
		this.elem.deleteImg;
		this.elem.fullName.textContent = this.name;
		this.elem.doctor.textContent = `Лікар: ${this.doctor}`;
		this.elem.origins.textContent = `Терміновість: ${this.origins}`;
		this.elem.purposeVisit.textContent = `Мета візиту: ${this.purposeVisit}`;
		this.elem.description.textContent = `Короткий опис візиту: ${this.description}`;
		this.elem.editImg;
		this.elem.showMoreBtn.textContent = 'Показати більше';
		this.elem.hideBtn.textContent = 'Приховати';

		this.elem.self.dataset.id = this.id;

		this.elem.self.append(
			this.elem.deleteImg,
			this.elem.fullName,
			this.elem.doctor,
			this.elem.editImg,
			this.elem.showMoreBtn,
			this.elem.hideBtn,
		);
	}
}

export class VisitCardiologist extends Visit {
	constructor(data) {
		super(data);
		this.pressure = data.pressure;
		this.indexMassa = data.indexMassa;
		this.ill = data.ill;
		this.age = data.age;
	}

	render(parent) {
		super.render(parent);
		this.elem.pressure = document.createElement('span');
		this.elem.indexMassa = document.createElement('span');
		this.elem.ill = document.createElement('span');
		this.elem.age = document.createElement('span');

		this.elem.pressure.textContent = `Тиск: ${this.pressure}`;
		this.elem.indexMassa.textContent = `Індекс маси тіла: ${this.indexMassa}`;
		this.elem.ill.textContent = `Перенесені захворювання серця: ${this.ill}`;
		this.elem.age.textContent = `Вік: ${this.age}`;

		this.elem.pressure.classList.add('visit__text');
		this.elem.indexMassa.classList.add('visit__text');
		this.elem.ill.classList.add('visit__text');
		this.elem.age.classList.add('visit__text');

		this.elem.showMoreBtn.addEventListener('click', () => {
			this.showMore();
		});
		this.elem.hideBtn.addEventListener('click', () => {
			this.hide();
		});

		if (parent) {
			parent.append(this.elem.self);
		} else {
			return this.elem.self;
		}
	}

	showMore() {
		const moreInfo = [];

		for (let key in this.elem) {
			if (
				key === 'purposeVisit' ||
				key === 'description' ||
				key === 'origins' ||
				key === 'pressure' ||
				key === 'indexMassa' ||
				key === 'ill' ||
				key === 'age'
			) {
				moreInfo.push(this.elem[key]);
			}
		}

		moreInfo.forEach(item => {
			this.elem.self.insertBefore(item, this.elem.showMoreBtn);
		});

		this.elem.showMoreBtn.style.display = 'none';
		this.elem.hideBtn.style.display = 'inline-block';
	}

	hide() {
		this.elem.self.removeChild(this.elem.pressure);
		this.elem.self.removeChild(this.elem.indexMassa);
		this.elem.self.removeChild(this.elem.ill);
		this.elem.self.removeChild(this.elem.age);
		this.elem.hideBtn.style.display = 'none';
		this.elem.showMoreBtn.style.display = 'inline-block';
	}
}

export class VisitDentist extends Visit {
	constructor(data) {
		super(data);
		this.lastVisit = data.lastVisit;
	}

	render(parent) {
		super.render(parent);
		this.elem.lastVisit = document.createElement('span');

		this.elem.lastVisit.textContent = `Дата останнього візиту: ${this.lastVisit}`;

		this.elem.lastVisit.classList.add('visit__text');

		this.elem.showMoreBtn.addEventListener('click', () => {
			this.showMore();
		});
		this.elem.hideBtn.addEventListener('click', () => {
			this.hide();
		});

		if (parent) {
			parent.append(this.elem.self);
		} else {
			return this.elem.self;
		}
	}

	showMore() {
		const moreInfo = [];

		for (let key in this.elem) {
			if (
				key === 'purposeVisit' ||
				key === 'description' ||
				key === 'origins' ||
				key === 'lastVisit'
			) {
				moreInfo.push(this.elem[key]);
			}
		}

		moreInfo.forEach(item => {
			this.elem.self.insertBefore(item, this.elem.showMoreBtn);
		});

		this.elem.showMoreBtn.style.display = 'none';
		this.elem.hideBtn.style.display = 'inline-block';
	}

	hide() {
		this.elem.self.removeChild(this.elem.lastVisit);
		this.elem.hideBtn.style.display = 'none';
		this.elem.showMoreBtn.style.display = 'inline-block';
	}
}

export class VisitTherapist extends Visit {
	constructor(data) {
		super(data);
		this.age = data.age;
	}

	render(parent) {
		super.render(parent);
		this.elem.age = document.createElement('span');

		this.elem.age.textContent = `Вік: ${this.age}`;

		this.elem.age.classList.add('visit__text');

		this.elem.showMoreBtn.addEventListener('click', () => {
			this.showMore();
		});
		this.elem.hideBtn.addEventListener('click', () => {
			this.hide();
		});

		if (parent) {
			parent.append(this.elem.self);
		} else {
			return this.elem.self;
		}
	}

	showMore() {
		const moreInfo = [];

		for (let key in this.elem) {
			if (key === 'purposeVisit' || key === 'description' || key === 'origins' || key === 'age') {
				moreInfo.push(this.elem[key]);
			}
		}

		moreInfo.forEach(item => {
			this.elem.self.insertBefore(item, this.elem.showMoreBtn);
		});

		this.elem.showMoreBtn.style.display = 'none';
		this.elem.hideBtn.style.display = 'inline-block';
	}

	hide() {
		this.elem.self.removeChild(this.elem.age);
		this.elem.hideBtn.style.display = 'none';
		this.elem.showMoreBtn.style.display = 'inline-block';
	}
}

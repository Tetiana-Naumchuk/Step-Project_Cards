export class Visit {
	constructor(data) {
		this.id = data.id;
		this.doctor = data.doctor;
		this.purposeVisit = data.purposeVisit;
		this.description = data.description;
		this.origins = data.origins;
		this.fio = data.fio;

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

		console.log(this.elem);
	}

	render(parent) {
		this.elem.deleteImg;
		this.elem.fullName.textContent = this.fio;
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

export class VisitDentist extends Visit {
	constructor(data) {
		super(data);
		this.lastDateVisit = data.lastDateVisit;
		console.log(this.lastDateVisit);
	}

	render(parent) {
		super.render(parent);
		this.elem.lastDateVisit = document.createElement('span');

		this.elem.lastDateVisit.textContent = `Дата останнього візиту: ${this.lastDateVisit}`;

		this.elem.lastDateVisit.classList.add('visit__text');

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
				key === 'lastDateVisit'
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
		this.elem.self.removeChild(this.elem.lastDateVisit);
		this.elem.hideBtn.style.display = 'none';
		this.elem.showMoreBtn.style.display = 'inline-block';
	}
}

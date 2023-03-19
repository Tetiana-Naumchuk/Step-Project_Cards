import Requests from './Requests.js';
import { cardContainer } from './modal.js';
import Modal from './modal.js';
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
            doctorImg: this.cardWrap.querySelector('.doctor-img'),
            doctor: this.cardWrap.querySelector('.visit__text-doctor'),
            origins: this.cardWrap.querySelector('.visit__text-origins'),
            purposeVisit: this.cardWrap.querySelector('.visit__text-purpose'),
            description: this.cardWrap.querySelector('.visit__text-desc'),
            editImg: this.cardWrap.querySelector('.visit__edit'),
            showMoreBtn: this.cardWrap.querySelector('.visit__btn-more'),
            hideBtn: this.cardWrap.querySelector('.visit__btn-hide'),
        };
        this.elem.editImg.addEventListener('click', event => {
            console.log(data);
            new Modal(document.body).visitEdit(data);
        });
        this.elem.deleteImg.addEventListener('click', event => {
            Requests.delete(this.id).then(response => {
                if (response.status === 200) {
                    this.elem.self.remove();
                    const renderedVisits = document.querySelectorAll('.card');
                    if (!renderedVisits || renderedVisits.length === 0) {
                        const noItem = document.createElement('p');
                        noItem.id = 'empty';
                        noItem.textContent = 'No item has been added';
                        noItem.style.marginTop = '50px';
                        cardContainer.append(noItem);
                    }
                }
            });
        });
    }
    render(parent) {
        this.elem.deleteImg;
        this.elem.fullName.textContent = this.name;
        this.elem.doctor.textContent = `Лікар: ${this.doctor}`;
        this.elem.doctorImg;
        this.elem.origins.textContent = `Терміновість: ${this.origins}`;
        this.elem.purposeVisit.textContent = `Мета візиту: ${this.purposeVisit}`;
        this.elem.description.textContent = `Короткий опис візиту: ${this.description}`;
        this.elem.editImg;
        this.elem.showMoreBtn.textContent = 'Показати більше';
        this.elem.hideBtn.textContent = 'Приховати';
        this.elem.self.dataset.id = this.id;
        parent.append(this.elem.self);
    }
    showMore() {
        const moreInfo = [];
        for (let key in this.elem) {
            if (
                key !== 'self' &&
                key !== 'deleteImg' &&
                key !== 'editImg' &&
                key !== 'showMoreBtn' &&
                key !== 'hideBtn'
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
        this.elem.self.querySelectorAll('.visit__text-add').forEach(item => {
            this.elem.self.removeChild(item);
        });
        this.elem.hideBtn.style.display = 'none';
        this.elem.showMoreBtn.style.display = 'inline-block';
    }
    showHideBtn() {
        this.elem.showMoreBtn.addEventListener('click', () => {
            this.showMore();
        });
        this.elem.hideBtn.addEventListener('click', () => {
            this.hide();
        });
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
        this.elem.self.style.backgroundColor = '#FFCCCC';
        this.elem.pressure = document.createElement('span');
        this.elem.indexMassa = document.createElement('span');
        this.elem.ill = document.createElement('span');
        this.elem.age = document.createElement('span');
        this.elem.pressure.textContent = `Тиск: ${this.pressure}`;
        this.elem.indexMassa.textContent = `Індекс маси тіла: ${this.indexMassa}`;
        this.elem.ill.textContent = `Перенесені захворювання серця: ${this.ill}`;
        this.elem.age.textContent = `Вік: ${this.age}`;
        this.elem.pressure.classList.add('visit__text-add');
        this.elem.indexMassa.classList.add('visit__text-add');
        this.elem.ill.classList.add('visit__text-add');
        this.elem.age.classList.add('visit__text-add');
        this.showHideBtn();
    }
    hide() {
        super.hide();
    }
}
export class VisitDentist extends Visit {
    constructor(data) {
        super(data);
        this.lastVisit = data.lastVisit;
    }
    render(parent) {
        super.render(parent);
        this.elem.self.style.backgroundColor = '#B3FFB3';
        this.elem.lastVisit = document.createElement('span');
        this.elem.lastVisit.textContent = `Дата останнього візиту: ${this.lastVisit}`;
        this.elem.lastVisit.classList.add('visit__text-add');
        this.showHideBtn();
    }
    hide() {
        super.hide();
    }
}
export class VisitTherapist extends Visit {
    constructor(data) {
        super(data);
        this.age = data.age;
    }
    render(parent) {
        super.render(parent);
        this.elem.self.style.backgroundColor = '#CCFFFF';
        this.elem.age = document.createElement('span');
        this.elem.age.textContent = `Вік: ${this.age}`;
        this.elem.age.classList.add('visit__text-add');
        this.showHideBtn();
    }
    hide() {
        super.hide();
    }
}

export class Cards{
    renderAll() {
        Requests.get().then(cardsArray => {
        if (cardsArray.length === 0) {
            cardContainer.textContent = 'Записів до лікарів на цей час немає'
        } else {            
            cardContainer.textContent = ''
            cardsArray.forEach(card => {
                const { doctor } = card
                if (doctor === 'Стоматолог') {
                    new VisitDentist(card).render(cardContainer)
                } else if (doctor === 'Кардіолог') {
                    new VisitCardiologist(card).render(cardContainer)
                } else if (doctor === 'Терапевт') {
                    new VisitTherapist(card).render(cardContainer)
                } 
            })
        }
    })
    }
}





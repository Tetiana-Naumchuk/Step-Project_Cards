import Requests from './Requests.js';
import { cardContainer } from './Modal.js';
import Modal from './Modal.js';

export class Visit {
    constructor(data) {
        this.data = data     
        const cardTemplate = document.querySelector('#card-template').content;
        this.cardWrap = cardTemplate.querySelector('.card').cloneNode(true);
        this.elem = {
            deleteImg: this.cardWrap.querySelector('.visit__delete'),
            editImg: this.cardWrap.querySelector('.visit__edit'),
            fullName: this.cardWrap.querySelector('.visit__person'),
            doctor: this.cardWrap.querySelector('.visit__text-doctor'),
            origins: this.cardWrap.querySelector('.visit__text-origins'),
            purposeVisit: this.cardWrap.querySelector('.visit__text-purpose'),
            description: this.cardWrap.querySelector('.visit__text-desc'),
            showMoreBtn: this.cardWrap.querySelector('.visit__btn'),
            addInfo: this.cardWrap.querySelector('.card__show-more')
        };
    }
    render(parent) {
        const { id, name, doctor, origins, purposeVisit, description } = this.data
        
        this.elem.fullName.textContent = name;
        this.elem.doctor.textContent = doctor;
        this.elem.origins.textContent = origins;
        this.elem.purposeVisit.textContent = purposeVisit;
        this.elem.description.textContent = description;
        this.cardWrap.dataset.id = id;
        
        this.elem.editImg.addEventListener('click', () => {
            new Modal(document.body).visitEdit(this.data);
        });

        this.elem.deleteImg.addEventListener('click', () => {
            Requests.delete(id).then(response => {
                const { ok } = response
                if (ok) {
                    this.cardWrap.remove()
                    const renderedVisits = document.querySelectorAll('.card');
                    if (!renderedVisits || renderedVisits.length === 0) {
                        cardContainer.textContent = 'Записів до лікарів на цей час немає'
                    }
                } else {
                    throw new Error("Наразі неможливо отримати дані з сервера")
                }
            })
        });

        this.elem.showMoreBtn.addEventListener('click', () => {
            if (this.elem.addInfo.classList.contains('active')) {
                this.elem.showMoreBtn.textContent = 'Показати більше'
                this.elem.addInfo.classList.remove('active')
            } else {
                this.elem.addInfo.classList.add('active')
                this.elem.showMoreBtn.textContent = 'Приховати'
            }
        })
        parent.append(this.cardWrap);
    }
}


export class VisitCardiologist extends Visit {
    constructor(data) {
        super(data);
        this.elem.cardioContainer = this.cardWrap.querySelector('.visit__add-info-cardio')
        this.elem.pressure = this.elem.cardioContainer.querySelector('.visit__text-pressure')
        this.elem.indexMassa = this.elem.cardioContainer.querySelector('.visit__text-imassa')
        this.elem.ill = this.elem.cardioContainer.querySelector('.visit__ill')
        this.elem.age = this.elem.cardioContainer.querySelector('.visit__age')
    }
    render(parent) {
        super.render(parent);
        const {pressure, indexMassa, ill, age} = this.data
        this.cardWrap.style.backgroundColor = '#B9C4F7';
        this.elem.pressure.textContent = pressure;
        this.elem.indexMassa.textContent = indexMassa;
        this.elem.ill.textContent = ill;
        this.elem.age.textContent = age;
        this.elem.cardioContainer.classList.add('active')
    }
}

export class VisitDentist extends Visit {
    constructor(data) {
        super(data);
        this.elem.dentistContainer = this.cardWrap.querySelector('.visit__add-info-dentist')
        this.elem.lastVisit = this.elem.dentistContainer.querySelector('.visit__date')
    }
    render(parent) {
        super.render(parent);
        const {lastVisit} = this.data
        this.cardWrap.style.backgroundColor = '#B3FFB3';
        this.elem.lastVisit.textContent = lastVisit;
        this.elem.dentistContainer.classList.add('active')
    }

}

export class VisitTherapist extends Visit {
    constructor(data) {
        super(data);
        this.elem.therapistContainer = this.cardWrap.querySelector('.visit__add-info-therapist')
        this.elem.age = this.elem.therapistContainer.querySelector('.visit__age')
    }
    render(parent) {
        super.render(parent);
        const {age} = this.data
        this.cardWrap.style.backgroundColor = '#CCFFFF';
        this.elem.age.textContent = age;
        this.elem.therapistContainer.classList.add('active')
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





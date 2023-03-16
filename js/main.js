import Modal from "./Modal.js"
import Requests from "./Requests.js"
import { cardContainer } from "./Modal.js"
import { VisitDentist, VisitTherapist, VisitCardiologist } from './Visit.js';
import Filter from "./Filter.js";

export const headerBtn = document.querySelector('.header-btn')
// new Filter().makeFilter()

const filter = document.querySelector('.filter')
filter.addEventListener('submit', (event) => {
    event.preventDefault()
    new Filter().makeFilter()
})

if (localStorage.getItem('token')) {
    headerBtn.textContent = 'Створити візит'
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

headerBtn.addEventListener('click', () => {
    if (headerBtn.textContent === "Вхід") {
        document.body.prepend(new Modal().enter())
    } else{
        document.body.prepend(new Modal().visit())
    }
})
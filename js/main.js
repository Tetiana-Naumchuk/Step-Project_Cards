import Modal from "./modal.js"
import ModalCreateCard from "./modalCreateCard.js"

export const btnEnter = document.querySelector('.enter-btn')

btnEnter.addEventListener('click', () => {
    if (btnEnter.textContent == "Вхід") {
        const modalEnter = new Modal().enter()
    document.body.prepend(modalEnter)
    } else{
        const modalCreateCard = new ModalCreateCard()
        document.body.prepend(modalCreateCard.render())
    }
    

})
import Modal from "./modal.js"
import ModalCreateCard from "./modalCreateCard.js"

export const btnEnter = document.querySelector('.enter-btn')

if (localStorage.getItem('token')) {
    btnEnter.textContent = 'Створити візит'
}

btnEnter.addEventListener('click', () => {
    if (btnEnter.textContent == "Вхід") {
        const modalEnter = new Modal().enter()
    document.body.prepend(modalEnter)
    } else{
        const modalCreateCard = new ModalCreateCard()
        document.body.prepend(modalCreateCard.render())
    }
    

})
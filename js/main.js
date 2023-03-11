import Modal from "./modal.js"

export const btnEnter = document.querySelector('.enter-btn')

btnEnter.addEventListener('click', () => {
    const modalEnter = new Modal().enter()
    document.body.prepend(modalEnter)
})
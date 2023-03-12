import Modal from "./modal.js"

export const btnEnter = document.querySelector('.enter-btn')

if (localStorage.getItem('token')) {
    btnEnter.className = 'create-visit'
    btnEnter.textContent = 'Создать визит'
    
} 

btnEnter.addEventListener('click', () => {
    const modalEnter = new Modal().enter()
    document.body.prepend(modalEnter)
})
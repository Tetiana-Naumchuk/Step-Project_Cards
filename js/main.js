import Modal from "./Modal.js"

export const headerBtn = document.querySelector('.header-btn')

if (localStorage.getItem('token')) {
    headerBtn.textContent = 'Створити візит'
}

headerBtn.addEventListener('click', () => {
    if (headerBtn.textContent === "Вхід") {
        document.body.prepend(new Modal().enter())
    } else{
        document.body.prepend(new Modal().visit())
    }
})
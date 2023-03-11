export default class Modal{
    constructor() {
        const formEnterTemplate = document.querySelector('#form-template').content
        this.form = formEnterTemplate.querySelector('.form').cloneNode(true)
        this.form.classList.add('active-form')
        this.form.addEventListener('click', (event) => {
            if (event.target.classList.contains('form') || event.target.classList.contains('close-form')) {
                this.form.classList.remove('active-form')
            }
        })
    }

    enter() {
        
        return this.form
    }

    card() {
        return this.form
    }
}
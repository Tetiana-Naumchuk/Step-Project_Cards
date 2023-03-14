import Requests from './requests.js';
import { btnEnter } from './main.js';

export default class Modal {
	constructor() {
		const formEnterTemplate = document.querySelector('#form-template').content;
		this.formWrap = formEnterTemplate.querySelector('.form').cloneNode(true);
		this.form = this.formWrap.querySelector('form');
		this.formWrap.classList.add('active-form');
		this.formWrap.addEventListener('click', event => {
			if (
				event.target.classList.contains('form') ||
				event.target.classList.contains('close-form')
			) {
				this.formWrap.classList.remove('active-form');
			}
		});
	}

	enter() {
		const enterFillingTemplate = document.querySelector('#form_enter-filling').content;
		const formEnter = enterFillingTemplate.querySelector('.form_enter').cloneNode(true);
		this.form.append(formEnter);
		this.form.addEventListener('submit', event => {
			event.preventDefault();
			const email = this.form.querySelector('.user-email').value;
			const password = this.form.querySelector('.user-password').value;
			const userData = {
				email,
				password,
			};
			Requests.enter(userData).then(token => localStorage.setItem('token', token));
			console.log(localStorage.getItem('token'));
			btnEnter.className = 'create-visit';
			btnEnter.textContent = 'Створити візит';
			this.formWrap.classList.remove('active-form');
		});
		return this.formWrap;
	}

	card() {
		return this.formWrap;
	}
}

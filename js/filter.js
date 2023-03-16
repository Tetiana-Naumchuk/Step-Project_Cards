export default class Filter{
    constructor() {
        this.text = document.querySelector('#visit-text').value
        this.doctor = document.querySelector('#doctor').value
        this.urgency = document.querySelector('#urgency').value
        this.myfilter = {
            text: this.text,
            doctor: this.doctor,
            urgency: this.urgency,
        }
    }
    makeFilter() {
        const newFilter={}
        for (let key in this.myfilter) {
            if (this.myfilter[key] !== '') {
                console.log(key);
                newFilter[key] = this.myfilter[key]
            }
        }
        console.log(newFilter);
        const cardsCollection = document.getElementsByClassName('card')
        console.log(cardsCollection);
        Array.from(cardsCollection).forEach(card =>console.log(card))
    }
}

import moment from 'moment'

export default class Controllers {
  constructor(date) {
    this.date = date
    this.leftButton
    this.node = this.generate()
  }

  generate() {

    const controllers = document.createElement('section')

    const dateDay = document.createElement('h1')
    dateDay.classList.add('day-header')
    dateDay.innerHTML = this.date.format("dddd DD")

    const dateMonth = document.createElement('h1')
    dateMonth.classList.add('month-header')
    dateMonth.innerHTML = this.date.format("MMMM YYYY")

    this.leftButton = document.createElement('section')
    this.leftButton.classList.add('button-left')
    this.leftButton.innerHTML = '<'

    controllers.classList.add('controllers')

    controllers.appendChild(this.leftButton)
    controllers.appendChild(dateDay)
    controllers.appendChild(dateMonth)

    return controllers
  }

  update(date) {
    // Set date to new date
    this.date = date

    this.node.getElementsByClassName('day-header')[0].innerHTML = this.date.format("dddd DD")
    this.node.getElementsByClassName('month-header')[0].innerHTML = this.date.format("MMMM YYYY")
  }
}

// Import moment.js library
import moment from 'moment'

// Import date scale component
import DateScale from './date-scale'
import Controllers from './controllers'

export default class Calendar {
  constructor() {
    this.today = moment()
    this.date = moment()
    this.controllers
    this.days
    this.node = this.generate()
  }

  generate() {
    const section = document.createElement('section')

    // Generating controllers and date scale
    this.controllers = new Controllers(this.date)
    const dateScale = new DateScale()

    section.appendChild(this.controllers.node)
    section.appendChild(dateScale.node)
    section.classList.add('calendar')

    // Generating days
    this.generateDays()
    section.appendChild(this.days)

    return section
  }

  generateDays() {
    this.days = document.createElement('section')
    this.days.classList.add('days')

    for (let notDay = 0; notDay < moment().month(this.date.month()).date(1).day(); notDay++) {
        let container = document.createElement('section')
        container.classList.add('blank')
        this.days.appendChild(container)
    }

    for (let day = 1; day <= moment().month(this.date.month()).daysInMonth(); day++) {
        let container = document.createElement('section')
        let paragraph = document.createElement('p')
        container.classList.add('day')

        if ( day == this.date.format("DD")) {
          paragraph.classList.add('active')
        }

        paragraph.innerHTML = day
        container.appendChild(paragraph)
        this.days.appendChild(container)
    }

    this.days.childNodes.forEach( node => {node.addEventListener('click', () => {
      for (let i=0; i< this.days.getElementsByClassName('day').length; i++) {

            this.days.getElementsByClassName('day')[i].childNodes[0].classList.remove('active')
        }
      this.changeDay(node.childNodes[0].innerHTML)
      node.childNodes[0].classList.add('active')
    })})
  }

  changeDay(dayNo) {
    this.date = moment().month(this.date.month()).date(dayNo)
    this.controllers.update(this.date)

    for (let i=0; i< this.days.getElementsByClassName('day').length; i++) {
      if(this.days.getElementsByClassName('day')[i].childNodes[0].innerHTML == dayNo) {
        this.days.getElementsByClassName('day')[i].childNodes[0].classList.add('active')
      }
      else {
          this.days.getElementsByClassName('day')[i].childNodes[0].classList.remove('active')
      }
    }
  }

  changeMonth(increase) {
    let value = increase ? 1 : -1

    this.date = this.date.date(1)
    this.date = this.date.add(value,'month')
    this.node.getElementsByClassName('days')[0].remove()
    this.generateDays()
    this.node.appendChild(this.days)
    this.controllers.update(this.date)
  }

  addAppointment() {
    this.node.getElementsByClassName('day')[0].innerHTML = 'added'
  }

}

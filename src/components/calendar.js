// Import external library
import moment from 'moment'

// Import components
import DateScale from './date-scale'
import Controllers from './controllers'

export default class Calendar {
  constructor() {
    this.today = moment()
    this.limit = moment().add(3,'months')
    this.date = moment()
    this.controllers
    this.days
    this.node = this.generate()
  }

  // Generates full calendar
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

  // Generates days
  generateDays() {
    this.days = document.createElement('section')
    this.days.classList.add('days')

    // Adding blank days if month doesn't start with Monday
    for (let blank = 0; blank < moment().month(this.date.month()).date(1).day(); blank++) {

      let container = document.createElement('section')
      container.classList.add('blank')
      this.days.appendChild(container)
    }

    // Adding days
    for (let day = 1; day <= moment().month(this.date.month()).daysInMonth(); day++) {

      let container = document.createElement('section')
      let paragraph = document.createElement('p')
      container.classList.add('day')

      // If today add class today
      if ( moment(this.date).date(day).format("DD-MM") == moment().format("DD-MM")) {
        paragraph.classList.add('today')
      // If day chosen by user add class active
      } else if (moment(this.date).format("D") == day) {
        paragraph.classList.add('active')
      // If a day is a past day add class past
      } else if (moment(this.date).date(day) < moment()) {
        paragraph.classList.add('past')
      }

      paragraph.innerHTML = day
      container.appendChild(paragraph)

      // Checking if there are appointments for certain day in appointments map
      if(this.controllers.appointments.map.get(moment(this.date).date(day).format("DD-MM-YYYY")) != null && this.controllers.appointments.map.get(moment(this.date).date(day).format("DD-MM-YYYY")).length > 0)
      {
        let appointmentIcon = document.createElement('section')
        appointmentIcon.classList.add('appointment')
        container.appendChild(appointmentIcon)
      }

      // Adding event listener when a day is selected by user
      container.addEventListener('click', () => {
          this.changeDay(container.childNodes[0].innerHTML)
      })

      this.days.appendChild(container)
    }

    // Refresh event listeners
    this.updateEventListeners()
  }

  // Changes active day to one selected by user
  changeDay(dayNo) {

    this.date = moment().month(this.date.month()).date(dayNo)
    this.controllers.update(this.date)

    // Adding active class
    for (let i=0; i< this.days.getElementsByClassName('day').length; i++) {
      if(this.days.getElementsByClassName('day')[i].childNodes[0].innerHTML == dayNo) {
        this.days.getElementsByClassName('day')[i].childNodes[0].classList.add('active')
      }
      else {
          this.days.getElementsByClassName('day')[i].childNodes[0].classList.remove('active')
      }
    }

    this.updateEventListeners()
  }

  // Changes month shown in calendar
  changeMonth(increase) {

    const value = increase ? 1 : -1

    // Set date to 1st of month to avoid date confusion (different months lengths)
    this.date = this.date.date(1)
    const next = moment(this.date).add(value,'month')
    const now = moment().date(1)

    // Checking if next month is in between limit boundaries
    if (next.isBetween(now, this.limit, 'days')){
      this.date.add(value,'month')
    // If next month is lower than now, changing date to now
    } else if (next < now){
     this.date = moment()
    }

    // If adding new appointment is opened, close it
    if (! this.controllers.newAppointment.node.classList.contains('hidden') ){
     this.controllers.newAppointment.node.classList.add('hidden')
     this.controllers.newAppointmentButton.node.classList.remove('active')
   }

   this.update()
  }

  // Updates calendar by re-generating days
  update() {
    this.node.getElementsByClassName('days')[0].remove()
    this.generateDays()
    this.node.appendChild(this.days)
    this.controllers.update(this.date)
  }

  // Adds event listener to new/recreated appointment nodes
  updateEventListeners() {
    for(let i =0; i <this.controllers.appointments.node.getElementsByClassName('close').length; i++) {
      this.controllers.appointments.node.getElementsByClassName('close')[i].addEventListener('click', () => {
        this.update()
      })
    }
  }

}

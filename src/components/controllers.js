// Import external library
import moment from 'moment'

// Import components
import Button from './button'
import AppointmentsPane from './appointments-pane'
import NewAppointment from './new-appointment'

export default class Controllers {
  constructor(date) {
    this.date = date
    this.prevMonthButton
    this.nextMonthButton
    this.newAppointmentButton
    this.newAppointment
    this.appointments = new AppointmentsPane(this.date)
    this.node = this.generate()
  }

  // Generates controllers
  generate() {

    const controllers = document.createElement('section')

    const dateDay = document.createElement('h1')
    dateDay.classList.add('day-header')
    dateDay.innerHTML = this.date.format("dddd D")

    const dateMonth = document.createElement('h1')
    dateMonth.classList.add('month-header')
    dateMonth.innerHTML = this.date.format("MMMM YYYY")

    this.prevMonthButton = new Button('left','<')
    this.nextMonthButton = new Button('right','>')

    this.newAppointmentButton = new Button('add-appointment','Schedule an appointment for this day')
    this.newAppointment = new NewAppointment()

    // Add event listener to show/hide adding appointment section
    this.newAppointmentButton.node.addEventListener('click', () => {

      if (this.newAppointment.node.classList.contains('hidden')) {
        this.newAppointment.node.classList.remove('hidden')
        this.newAppointmentButton.node.classList.add('active')
      } else {
        this.newAppointment.node.classList.add('hidden')
        this.newAppointmentButton.node.classList.remove('active')
      }
    })

    controllers.appendChild(this.appointments.node)
    controllers.appendChild(this.newAppointmentButton.node)
    controllers.appendChild(this.newAppointment.node)

    controllers.appendChild(this.nextMonthButton.node)
    controllers.appendChild(this.prevMonthButton.node)
    controllers.classList.add('controllers')

    controllers.appendChild(dateDay)
    controllers.appendChild(dateMonth)

    return controllers
  }

  // Updates controllers
  update(date) {
    // Set date to new date
    this.date = date

    // Update shown date
    this.node.getElementsByClassName('day-header')[0].innerHTML = this.date.format("dddd D")
    this.node.getElementsByClassName('month-header')[0].innerHTML = this.date.format("MMMM YYYY")

    // Delete previous appointments if any
    if ( this.node.getElementsByClassName('appointments')[0] != null )
      this.node.getElementsByClassName('appointments')[0].remove()

    // Check if day is after or today
    if (this.date.isAfter(moment().subtract(1,'day'))) {

      // If yes update and view appointments
      this.appointments.update(date)
      this.node.insertBefore(this.appointments.node,this.node.childNodes[0])
    }
  }

}

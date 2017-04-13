// Import external libraries
import moment from 'moment'

// Import components
import Appointment from './appointment'

export default class AppointmentsPane {
  constructor(date) {
    this.date = date
    this.map = new Map()
    this.addAppointment(moment().format("DD-MM-YYYY"),"12:00","Meeting")
    this.node = this.generate()
  }

  // Generates appointments pane
  generate() {
    const list = document.createElement('ul')
    const appointments = this.map.get(this.date.format("DD-MM-YYYY"))

    // If there are appointments to show
    if (appointments != null && appointments.length> 0) {
      appointments.forEach(appointment => {
        list.appendChild(appointment.node)
        appointment.deleteButton.addEventListener('click', () => {
          this.deleteAppointment(appointment.date,appointment.time)
          console.log('deleting')
        })
      })

    // If not show appropriate message
    } else {
      let container = document.createElement('li')
      let paragraph = document.createElement('p')
      paragraph.innerHTML = 'No appointments scheduled'

      container.appendChild(paragraph)
      list.appendChild(container)
    }

    list.classList.add('appointments')

    return list
  }

  // Updates the pane by re-generating
  update(date) {
    this.date = date
    this.node = this.generate()
  }

  // Adds appointment to the map
  addAppointment(date,time,title) {
    const appointment = new Appointment(date,time,title)

    if (this.map.has(date)) {
      this.map.get(date).push(appointment)
    }
    else {
      this.map.set(date,[appointment])
    }

  }

  // Deletes appointment from the map
  deleteAppointment(date,time)
  {
    if (this.map.has(date)) {

      for (let i=0; i<this.map.get(date).length; i++)
      {
        if (this.map.get(date)[i].date == date && this.map.get(date)[i].time == time) {
          this.map.get(date).splice(i,1);
          break;
        }
      }
    }
  }

}

// Styles import
import './styles/styles.sass'

// Components import
import Calendar from './components/calendar'

document.addEventListener('DOMContentLoaded', () => {


  // Creating Calendar
  const calendar = new Calendar()
  document.body.appendChild(calendar.node)

  // Changing months event handlers
  calendar.controllers.prevMonthButton.node.addEventListener('click', () => {
    calendar.changeMonth(false)
  })

  calendar.controllers.nextMonthButton.node.addEventListener('click', () => {
    calendar.changeMonth(true)
  })

  // Adding new appointment event handler
  calendar.controllers.newAppointment.confirmButton.node.addEventListener('click', () => {

    let timeTest = /^([0-9]|0[0-9]|1?[0-9]|2[0-3]):[0-5]?[0-9]$/
    // Checking if title is provided
    if (calendar.controllers.newAppointment.titleInput.value.length == 0) {

      calendar.controllers.newAppointment.alert.innerHTML = 'Title cannot be empty. '
      calendar.controllers.newAppointment.alert.style.display = 'block'

    // Checking if time is provided
    } else if (calendar.controllers.newAppointment.timeInput.value.length == 0) {

      calendar.controllers.newAppointment.alert.innerHTML = 'Time cannot be empty. '
      calendar.controllers.newAppointment.alert.style.display = 'block'

    // Checking if provided time is valid
    } else if (calendar.controllers.newAppointment.timeInput.value.length > 0 && !calendar.controllers.newAppointment.timeInput.value.match(timeTest)) {

      calendar.controllers.newAppointment.alert.innerHTML = 'Wrong time. Enter the value between 00:00 and 23:59.'
      calendar.controllers.newAppointment.alert.style.display = 'block'

    // If checks not failed, proceed
    } else {

      calendar.controllers.newAppointment.alert.style.display = 'none'
      calendar.controllers.appointments.addAppointment(
      calendar.controllers.date.format("DD-MM-YYYY"),
      calendar.controllers.newAppointment.timeInput.value,
      calendar.controllers.newAppointment.titleInput.value)

      calendar.controllers.newAppointmentButton.node.classList.remove('active')

      calendar.update()
      calendar.updateEventListeners()

      calendar.controllers.newAppointment.node.classList.add('hidden')
      calendar.controllers.newAppointment.clear()
    }
  })
})

document.documentElement.addEventListener('gesturestart', (event) => {
    event.preventDefault()
})

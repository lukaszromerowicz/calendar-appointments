// Styles import
import './styles/styles.sass'

// Components import
import Navigation from './components/navigation'
import Calendar from './components/calendar'

document.addEventListener('DOMContentLoaded', () => {


  // Creating Calendar
  const calendar = new Calendar()
  document.body.appendChild(calendar.node)

  calendar.controllers.leftButton.addEventListener('click', () => {
    calendar.changeMonth(true)
  })

})

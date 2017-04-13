// Import components
import Button from './button'

export default class NewApointment {
  constructor() {
    this.titleInput
    this.timeInput
    this.confirmButton
    this.alert
    this.node = this.generate()
  }

  // Generates appointment add section
  generate() {
    const section = document.createElement('section')
    section.classList.add('new-appointment')
    section.classList.add('hidden')

    this.titleInput = document.createElement('input')
    this.titleInput.placeholder = 'Title'

    this.timeInput = document.createElement('input')
    this.timeInput.placeholder = 'Time (00:00-23:59)'

    this.alert = document.createElement('p')
    this.alert.style.display = 'none'

    this.confirmButton = new Button ('confirm-appointment','Confirm')

    section.appendChild(this.titleInput)
    section.appendChild(this.timeInput)
    section.appendChild(this.alert)
    section.appendChild(this.confirmButton.node)

    return section
  }

  // Clears input values
  clear() {
    this.titleInput.value = ''
    this.timeInput.value = ''
  }
}

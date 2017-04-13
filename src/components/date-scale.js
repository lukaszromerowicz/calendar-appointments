
import moment from 'moment'

export default class DateScale {
  constructor() {
    this.weekDays = moment.weekdays()
    this.node = this.generate()
  }

  // Generates date-scale
  generate() {
    const section = document.createElement('section')

    this.weekDays.forEach(day => {
      let dayParagraph = document.createElement('p')
      dayParagraph.innerHTML = day.substring(0,1)
      section.appendChild(dayParagraph)
    })

    section.classList.add('date-scale')
    return section
  }
}

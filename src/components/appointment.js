export default class Appointment {
  constructor(date,time,title) {
    this.date = date
    this.time = time
    this.title = title
    this.deleteButton
    this.node = this.generate()
  }

  // Generates appointment node
  generate() {
    const container = document.createElement('li')
    const title = document.createElement('p')
    this.deleteButton = document.createElement('p')
    this.deleteButton.innerHTML = 'X'
    this.deleteButton.classList.add('close')

    title.innerHTML = `${this.title} ${this.time}`

    container.appendChild(title)
    container.appendChild(this.deleteButton)

    return container
  }
}

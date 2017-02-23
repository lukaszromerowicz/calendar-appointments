export default class Navigation {
  constructor() {
    this.node = this.generate()
  }

  generate()
  {
    const section = document.createElement('section')
    section.classList.add('navigation')

    return section
  }
}

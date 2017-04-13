export default class Button {
  constructor(styleClass, content, clickEvent) {
    this.styleClass = styleClass
    this.content = content
    this.node = this.generate()

    if (clickEvent !== null)
    {
      this.node.addEventListener('click', clickEvent)
    }
  }

  generate() {
    const container = document.createElement('section')
    container.classList.add('button')
    container.classList.add(this.styleClass)

    if( this.content != null)
      container.innerHTML = this.content

    return container
  }

}

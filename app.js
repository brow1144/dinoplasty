const app = {

  init(selectors) {
    this.dinos = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addDino.bind(this))
  },

  addDino(ev) {
    ev.preventDefault()

    const dino = {
      id: this.max + 1,
      name: ev.target.dinoName.value,
    }

    const listItem = this.renderListItem(dino)
    this.list.appendChild(listItem)

    this.dinos.unshift(dino.name)

    ++ this.max


    ev.target.reset()
  },

  renderListItem(dino) {
    const item = document.createElement('li')

    const buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'button-group')

    const up = document.createElement('a')
    up.setAttribute('class', 'secondary button')
    up.textContent = 'Up'

    const down = document.createElement('a')
    down.setAttribute('class', 'success button')
    down.textContent = 'Down'

    const promote = document.createElement('a')
    promote.setAttribute('class', 'warning button')
    promote.textContent = 'Promote'

    const deleteButton = document.createElement('a')
    deleteButton.setAttribute('class', 'alert button')
    deleteButton.textContent = 'Delete'

    buttonDiv.appendChild(up)
    buttonDiv.appendChild(down)
    buttonDiv.appendChild(promote)
    buttonDiv.appendChild(deleteButton)
    
    item.textContent = dino.name

    item.appendChild(buttonDiv)

    promote.addEventListener('click', this.addFavorite)
    deleteButton.addEventListener('click', this.deleteItem)

    return item
  },

  addFavorite(ev) {
      ev.preventDefault()
      const listHTML = ev.target.parentElement.parentElement
      //console.log(listHTML)
      if(listHTML.style.backgroundColor == 'lightgreen') {
        listHTML.style.backgroundColor = 'whitesmoke'
      } else {
        listHTML.style.backgroundColor = 'lightgreen'
      }
  },
  
  deleteItem(ev) {
      ev.preventDefault()
      const listHTML = ev.target.parentElement.parentElement
      listHTML.remove()
  },

}

app.init({
  formSelector: '#dino-form',
  listSelector: '#dino-list',
})
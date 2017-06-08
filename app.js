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
    item.setAttribute('id', `${item.textContent}`)

    item.appendChild(buttonDiv)

    up.addEventListener('click', this.moveUp.bind(this))
    
    promote.addEventListener('click', this.addFavorite.bind(this))
    deleteButton.addEventListener('click', this.deleteItem.bind(this))

    return item
  },

  addFavorite(ev) {
      ev.preventDefault()
      const listHTML = ev.target.parentElement.parentElement

      if(listHTML.style.backgroundColor == 'lightgreen') {
        listHTML.style.backgroundColor = 'whitesmoke'
      } else {
        listHTML.style.backgroundColor = 'lightgreen'
      }
  },
  
  deleteItem(ev) {
      ev.preventDefault()
      const listHTML = ev.target.parentElement.parentElement
      
      for(let i = 0; i < this.dinos.length; i++) {
        if(`i${this.dinos[i]}` == `${listHTML.getAttribute('id')}`) {
             this.dinos.splice(i, 1);
        }
      }
      listHTML.remove()
  },

  buttonGroup() {
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

    up.addEventListener('click', this.moveUp.bind(this))
    promote.addEventListener('click', this.addFavorite.bind(this))
    deleteButton.addEventListener('click', this.deleteItem.bind(this))

    return buttonDiv
  },

  moveUp(ev) {
    ev.preventDefault()
    const listHTML = ev.target.parentElement.parentElement
    const upper = listHTML.previousSibling

    listHTML.innerText = upper.getAttribute('id')
    upper.innerText = listHTML.getAttribute('id')
    const listHTMLColor = listHTML.style.backgroundColor
    const upperHTMLColor = upper.style.backgroundColor

    const next = upper.nextSibling
    
    listHTML.setAttribute('id', `${upper.innerText}`)
    upper.setAttribute('id', `${upper.innerText}`)
    next.setAttribute('id', `${next.innerText}`)

    const firstButtonGroup = this.buttonGroup()
    listHTML.appendChild(firstButtonGroup)

    const secondButtonGroup = this.buttonGroup()
    upper.appendChild(secondButtonGroup)

    if(listHTMLColor == 'lightgreen' && upperHTMLColor == 'lightgreen') {
      next.style.backgroundColor = 'lightgreen'
      upper.style.backgroundColor = 'lightgreen'
    } else if (listHTMLColor == 'lightgreen') {
      upper.style.backgroundColor = 'lightgreen'
      next.style.backgroundColor = 'white'
    } else if (upperHTMLColor == 'lightgreen') {
      upper.style.backgroundColor = 'white'
      next.style.backgroundColor = 'lightgreen'
    } else {
      upper.style.backgroundColor = 'white'
      next.style.backgroundColor = 'white'
    }
  
  },

}

app.init({
  formSelector: '#dino-form',
  listSelector: '#dino-list',
})
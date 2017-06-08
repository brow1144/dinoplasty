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

  moveUp(ev) {
    ev.preventDefault()
    const listHTML = ev.target.parentElement.parentElement
    //console.log(listHTML)

    const upper = listHTML.previousSibling
    //console.log(upper)
    listHTML.innerText = upper.getAttribute('id')
    upper.innerText = listHTML.getAttribute('id')

    listHTML.setAttribute('id', `${upper.innerText}`)
    upper.setAttribute('id', `${upper.innerText}`)


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



    listHTML.appendChild(buttonDiv)

    up.addEventListener('click', this.moveUp.bind(this))
    promote.addEventListener('click', this.addFavorite.bind(this))
    deleteButton.addEventListener('click', this.deleteItem.bind(this))




    const buttonDiv2 = document.createElement('div')
    buttonDiv2.setAttribute('class', 'button-group')

    const up2 = document.createElement('a')
    up2.setAttribute('class', 'secondary button')
    up2.textContent = 'Up'

    const down2 = document.createElement('a')
    down2.setAttribute('class', 'success button')
    down2.textContent = 'Down'

    const promote2 = document.createElement('a')
    promote2.setAttribute('class', 'warning button')
    promote2.textContent = 'Promote'

    const deleteButton2 = document.createElement('a')
    deleteButton2.setAttribute('class', 'alert button')
    deleteButton2.textContent = 'Delete'

    buttonDiv2.appendChild(up2)
    buttonDiv2.appendChild(down2)
    buttonDiv2.appendChild(promote2)
    buttonDiv2.appendChild(deleteButton2)




    upper.appendChild(buttonDiv2)

    up2.addEventListener('click', this.moveUp.bind(this))
    promote2.addEventListener('click', this.addFavorite.bind(this))
    deleteButton2.addEventListener('click', this.deleteItem.bind(this))







  },

}

app.init({
  formSelector: '#dino-form',
  listSelector: '#dino-list',
})
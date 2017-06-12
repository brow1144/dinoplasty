const app = {

  init(selectors) {
    this.dinos = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addDinoFromForm.bind(this))

    this.load(selectors)
  },

  addDino(dino) {
    const listItem = this.renderListItem(dino)
    this.list.insertBefore(listItem, this.list.firstElementChild)

    this.dinos.unshift(dino)
    this.save()

    ++ this.max

    for(let i = 0; i < this.dinos.length; i++) {
      if(this.dinos[i].name === listItem.getAttribute('id')) {
        if(this.dinos[i].favorite == true) {
          listItem.style.backgroundColor = 'lightgreen'
        } else {
          listItem.style.backgroundColor = '#E9E581'
        }
      }
    }

  },



  addDinoFromForm(ev) {
    ev.preventDefault()
    const dino = {
      id: this.max + 1,
      name: ev.target.dinoName.value,
      favorite: false,
    }

    this.addDino(dino)
    ev.target.reset()
  },

  load() {
    // load the JSON from localStorage
    const dinoJSON = localStorage.getItem('dinos')

    // convert the JSON back into an array
    const dinoArray = JSON.parse(dinoJSON)

    // set this.dinos with the dinos from that array
    if (dinoArray) {
      dinoArray
        .reverse()
        .map(this.addDino.bind(this))
    }
  },

  save() {
    localStorage.setItem('dinos', JSON.stringify(this.dinos))
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

    
    const span = document.createElement('span')
    span.setAttribute('contenteditable', '')
    item.appendChild(span)
    span.addEventListener('mouseout', this.refreshID.bind(this))
    span.addEventListener('click', this.refreshID.bind(this))
    span.addEventListener('mouseover', this.refreshID.bind(this))


    span.textContent = dino.name

    item.setAttribute('id', `${span.innerText}`)

    item.appendChild(buttonDiv)

    up.addEventListener('click', this.moveUp.bind(this))
    down.addEventListener('click', this.moveDown.bind(this))
    promote.addEventListener('click', this.addFavorite.bind(this))
    deleteButton.addEventListener('click', this.deleteItem.bind(this))

    return item
  },

  addFavorite(ev) {
      ev.preventDefault()
      const listHTML = ev.target.parentElement.parentElement

      if(listHTML.style.backgroundColor === 'lightgreen') {
        listHTML.style.backgroundColor = '#E9E581'
        for(let i = 0; i < this.dinos.length; i++) {
          if(`${listHTML.getAttribute('id')}` == this.dinos[i].name) {
              this.dinos[i].favorite = false;
              //console.log(this.dinos[i].favorite)
              break    
          }
        }
      } else {
        listHTML.style.backgroundColor = 'lightgreen'
        for(let i = 0; i < this.dinos.length; i++) {
          console.log(this.dinos.length)
          if(`${listHTML.getAttribute('id')}` == this.dinos[i].name) {
              this.dinos[i].favorite = true;
              //console.log(this.dinos[i].favorite)
              break
          }
        }
      }
      this.save()
  },
  
  deleteItem(ev) {
      ev.preventDefault()
      const listHTML = ev.target.parentElement.parentElement
      
      for(let i = 0; i < this.dinos.length; i++) {
        if(`${this.dinos[i].name}` === `${listHTML.getAttribute('id')}`) {
            this.dinos.splice(i, 1);
            break
        }
      }
      this.save()
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
    down.addEventListener('click', this.moveDown.bind(this))
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

    if(listHTMLColor === 'lightgreen' && upperHTMLColor === 'lightgreen') {
      next.style.backgroundColor = 'lightgreen'
      upper.style.backgroundColor = 'lightgreen'
    } else if (listHTMLColor === 'lightgreen') {
      upper.style.backgroundColor = 'lightgreen'
      next.style.backgroundColor = '#E9E581'
    } else if (upperHTMLColor === 'lightgreen') {
      upper.style.backgroundColor = '#E9E581'
      next.style.backgroundColor = 'lightgreen'
    } else {
      upper.style.backgroundColor = '#E9E581'
      next.style.backgroundColor = '#E9E581'
    }

    const newNext = next.previousSibling

    //ListHTML is the top item that is being switched to the bottom one
    //newNext is the bottom item thati s being switch to the top one 

    for(let i = 0; i < this.dinos.length; i++) {
      if (this.dinos[i].name === newNext.getAttribute('id')) {
        this.dinos[i].name = `${listHTML.getAttribute('id')}`
        this.dinos[i-1].name = `${newNext.getAttribute('id')}`
      }
    }
    this.save()
  },
  
  moveDown(ev) {
    ev.preventDefault()
    const listHTML = ev.target.parentElement.parentElement
    const lower = listHTML.nextSibling

    listHTML.innerText = lower.getAttribute('id')
    lower.innerText = listHTML.getAttribute('id')
    const listHTMLColor = listHTML.style.backgroundColor
    const lowerHTMLColor = lower.style.backgroundColor

    const upper = lower.previousSibling

    listHTML.setAttribute('id', `${lower.innerText}`)
    lower.setAttribute('id', `${lower.innerText}`)
    upper.setAttribute('id', `${upper.innerText}`)

    const firstButtonGroup = this.buttonGroup()
    listHTML.appendChild(firstButtonGroup)

    const secondButtonGroup = this.buttonGroup()
    lower.appendChild(secondButtonGroup)

    if(listHTMLColor === 'lightgreen' && lowerHTMLColor === 'lightgreen') { 
      upper.style.backgroundColor = 'lightgreen'
      lower.style.backgroundColor = 'lightgreen'
    } else if (listHTMLColor === 'lightgreen') {
      lower.style.backgroundColor = 'lightgreen'
      upper.style.backgroundColor = '#E9E581'
    } else if (lowerHTMLColor === 'lightgreen') {
      lower.style.backgroundColor = '#E9E581'
      upper.style.backgroundColor = 'lightgreen'
    } else {
      lower.style.backgroundColor = '#E9E581'
      upper.style.backgroundColor = '#E9E581'
    }

    //ListHTML is the top item that is being switched to the bottom one
    //lower is the bottom item that is being switch to the top one 

    for(let i = 0; i < this.dinos.length; i++) {
      if (this.dinos[i].name === listHTML.getAttribute('id')) {
        this.dinos[i].name = `${lower.getAttribute('id')}`
        this.dinos[i-1].name = `${listHTML.getAttribute('id')}`
      }
    }
    this.save()
  },

  refreshID(ev) {
    ev.preventDefault()
    const listHTML = ev.target.parentElement
    const lower = listHTML.childNodes[0]
     
    for(let i = 0; i < this.dinos.length; i++) {
      if (this.dinos[i].name == listHTML.getAttribute('id')) {
        this.dinos[i].name = lower.innerText
      }
    }

    listHTML.setAttribute('id', `${lower.innerText}`)

    this.save()
  }

}

app.init({
  formSelector: '#dino-form',
  listSelector: '#dino-list',
})
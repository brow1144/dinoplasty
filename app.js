const app = {

    init(formSelector) {
        document
            .querySelector(formSelector)
            .addEventListener('submit', this.addDino)
    },

    addDino(e) {
        e.preventDefault()
        const dino = e.target.dinoName.value
        console.log(dino)
    },

}

app.init('#dino-form')



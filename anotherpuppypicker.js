class App {
    constructor(selectors) {
      this.puppies = []
      this.max = 0
      this.list = document.querySelector(selectors.listSelector)
      this.template = document.querySelector(selectors.templateSelector)
  
      document
        .querySelector(selectors.formSelector)
        .addEventListener('submit', ev => {
          ev.preventDefault()
          this.handleSubmit(ev)
        })

    }

    renderListItem(puppy) {
      const item = this.template.cloneNode(true)
      item.classList.remove('template')
      item.dataset.id = puppy.id
      item 
        .querySelector('.puppyName')
        .textContent = puppy.name

      item
        .querySelector('.remove.button')
        .addEventListener('click', this.removePuppy.bind(this, puppy))

      item
        .querySelector('.fav.button')
        .addEventListener('click', this.favoritePuppy.bind(this, puppy))

      item
        .querySelector('.edit.button')
        .addEventListener('click', this.toggleEditable.bind(this, puppy))

      item 
        .querySelector('.up.button')
        .addEventListener('click', this.moveUp.bind(this.puppy))

      item 
        .querySelector('.down.button')
        .addEventListener('click', this.moveDown.bind(this.puppy))

      return item

    }
  
    handleSubmit(ev) {
      const f = ev.target
      const puppy = {
        id: ++this.max,
        name: f.puppyName.value,
        fav: false,
      }

      this.puppies.unshift(puppy)
  
      const item = this.renderListItem(puppy)
      this.list.insertBefore(item, this.list.firstElementChild)
  
      f.reset()
    }


    removePuppy(puppy, ev){
        const listItem = ev.target.closest('.puppy')
        const i = this.puppies.indexOf(puppy)
        this.puppies.splice(i, 1)
        listItem.remove() 
    }

    favoritePuppy(puppy, ev){
        const listItem = ev.target.closest('.puppy')
        puppy.fav = listItem.classList.toggle('fav')
    }

    toggleEditable(puppy, ev){
        const btn = ev.target
        const listItem = btn.closest('.puppy')
        const nameField = listItem.querySelector('.puppyName')

        if (nameField.isContentEditable){
            nameField.contentEditable = false
            btn.textContent = "Edit"
            btn.classList.remove('success')

            puppy.name = nameField.textContent

        } else {
            nameField.contentEditable = true
            nameField.focus()
            btn.textContent = "Save"
            btn.classList.add('success')
        }  
    }

    moveUp(puppy, ev){
        const listItem = ev.target.closest('.puppy')
        const puppyArray = this.puppies

        const index = puppyArray.findIndex((currentPuppy, i) =>{
            return currentPuppy.id === puppy.id
        })

        if(index > 0){
            this.list.insertBefore(listItem, listItem.previousElementSibling)
            const temp = puppyArray[index - 1]
            puppyArray[index - 1] = puppy
            puppyArray[index] = temp
        }
    }

    moveDown(puppy, ev){
        const listItem = ev.target.closest('.puppy')
        const puppyArray = this.puppies

        const index = puppyArray.findIndex((currentPuppy, i) =>{
            return currentPuppy.id === puppy.id
        })

        if(index < puppyArray.length - 1){
            this.list.insertBefore(listItem, listItem.nextElementSibling)
            const temp = puppyArray[index + 1]
            puppyArray[index + 1] = puppy
            puppyArray[index] = temp
        }
    }

  }
  
  const app = new App({
    formSelector: '#puppyForm',
    listSelector: '#puppyList',
    templateSelector: '.puppy.template',
  })
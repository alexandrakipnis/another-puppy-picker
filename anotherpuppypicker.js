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

      const nameSpan = item .querySelector('.puppyName')
      nameSpan.textContent = puppy.name
      nameSpan.addEventListener('keypress', this.saveOnEnter.bind(this, puppy))

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
        .querySelector('button.move-up')
        .addEventListener('click', this.moveUp.bind(this, puppy, item))

      item 
        .querySelector('button.move-down')
        .addEventListener('click', this.moveDown.bind(this, puppy, item))

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
        const listItem = ev.target.closest('.puppy')
        const nameField = listItem.querySelector('.puppyName')
        const btn = listItem.querySelector('.edit.button')

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

    saveOnEnter(puppy, ev){
        if(ev.key === 'Enter'){
            this.toggleEditable(puppy, ev)
        }
    }

    moveDown(puppy, item) {
        const i = this.puppies.indexOf(puppy)
    
        if (i < this.puppies.length - 1) {
          this.moveUp(this.puppies[i + 1], item.nextElementSibling)
        }
      }
    
      moveUp(puppy, item) {
        const i = this.puppies.indexOf(puppy)
    
        if (i > 0) {
          this.list.insertBefore(item, item.previousElementSibling)
    
          const previousPuppy = this.puppies[i - 1]
          this.puppies[i - 1] = puppy
          this.puppies[i] = previousPuppy
        }
      }

}
  
  const app = new App({
    formSelector: '#puppyForm',
    listSelector: '#puppyList',
    templateSelector: '.puppy.template',
  })
const app = {
    init: function(selectors) {
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
      document
        .querySelector(selectors.listSelector)
        .addEventListener('click', ev => {
            ev.preventDefault()
            //this.removeElements(ev)
            //come back to this line below
            this.removePuppies(this, ev)
        })
    },
  
    renderListItem: function(puppy) {
      const item = this.template.cloneNode(true)
      item.classList.remove('template')
      item.dataset.id = puppy.id
      item 
        .querySelector('.puppyName')
        .textContent = puppy.name
      return item
    },
  
    handleSubmit: function(ev) {
      const f = ev.target
      const puppy = {
        id: ++this.max,
        name: f.puppyName.value,
      }

      this.puppies.unshift(puppy)
  
      const item = this.renderListItem(puppy)
      this.list.insertBefore(item, this.list.firstElementChild)
  
      f.reset()
    },

    removeElements: function(puppyArray){
        puppyArray.map(element => {
            const parent = element.parentNode
            while(element.firstChild){
                parent.insertBefore(element.firstChild, element)
            }
            element.remove()
        })

    },

    removePuppies: function(puppy, ev){
        const listItem = ev.target.closest('.puppy')
        const puppyArray = this.puppies
        for(var i = 0; i < puppyArray.length; i++){
            const current = puppyArray[i].id.toString()
            if(listItem.dataset.id === current){
                puppyArray.splice(i, 1)
                break
            }
        }
        listItem.remove()
    },
  }
  
  app.init({
    formSelector: '#puppyForm',
    listSelector: '#puppyList',
    templateSelector: '.puppy.template',
  })
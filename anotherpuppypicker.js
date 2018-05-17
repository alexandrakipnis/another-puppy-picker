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

    },

    renderListItem: function(puppy) {
      const item = this.template.cloneNode(true)
      item.classList.remove('template')
      item.dataset.id = puppy.id
      item 
        .querySelector('.puppyName')
        .textContent = puppy.name

      item
        .querySelector('.alert')
        .addEventListener('click', ev => { 
            ev.preventDefault()
            this.removePuppies(this, ev)
        })

    
      if (puppy.fav) {
            item.classList.add('fav')
      }

      item
        .querySelector('.warning')
        .addEventListener('click', ev => { 
            ev.preventDefault()
            this.favoritePuppy(this, ev)
            puppy.fav = !puppy.fav
        })
      return item
    },
  
    handleSubmit: function(ev) {
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

    favoritePuppy: function(puppy, ev){
        const listItem = ev.target.closest('.puppy')
        puppy.fav = !puppy.fav
        if (puppy.fav) {
            listItem.classList.add('fav')
            //puppy.fav = true
        } else {
            listItem.classList.remove('fav')
            //puppy.fav = false
        }


    },

  }
  
  app.init({
    formSelector: '#puppyForm',
    listSelector: '#puppyList',
    templateSelector: '.puppy.template',
  })
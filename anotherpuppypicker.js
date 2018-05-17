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
  }
  
  app.init({
    formSelector: '#puppyForm',
    listSelector: '#puppyList',
    templateSelector: '.puppy.template',
  })
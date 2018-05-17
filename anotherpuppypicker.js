const app = {
    init: function(selectors) {
      this.max = 0
      this.list = document.querySelector(selectors.listSelector)
  
      document
        .querySelector(selectors.formSelector)
        .addEventListener('submit', ev => {
          ev.preventDefault()
          this.handleSubmit(ev)
        })
    },
  
    renderListItem: function(puppy) {
      const item = document.createElement('li')
      item.textContent = puppy.name
      return item
    },
  
    handleSubmit: function(ev) {
      const f = ev.target
      const puppy = {
        id: ++this.max,
        name: f.puppyName.value,
      }
  
      const item = this.renderListItem(puppy)
      this.list.appendChild(item)
  
      f.reset()
    },
  }
  
  app.init({
    formSelector: '#puppyForm',
    listSelector: '#puppyList',
  })
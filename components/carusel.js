(function(App) {
  'use strict';
  
  class Carusel extends App {
    constructor () {
      super();
      this.el = document.createElement('div');
      this.el.className = "carusel";
      this.items = [];
      this.liWidth = 113;
      
      this.el.addEventListener("click", this.onLeft.bind(this));
      this.el.addEventListener("click", this.onRight.bind(this));
      this.el.addEventListener("click", this.onRemoveItem.bind(this));
      
    }
    
    addItem (li) {
      
      //this.liWidth = parseInt(getComputedStyle(this.el.querySelector(".ul-wrapper")).width, 10)/3;
      let list = this.el.querySelector("ul");
      list.style.width = parseInt(getComputedStyle(list).width, 10) + this.liWidth + "px";
      list.innerHTML += li;
      this.items.push(list.lastElementChild);
      
      this.items.forEach((item) => {
        item.style.width = this.liWidth + "px";
        item.querySelector(".li-inner").style.width = this.liWidth + "px";
      });
      
    }
    
    createItem (opts) {
      let li = `<li>
        <div class="li-inner">
          <p class="title">${opts.title}</p>
          <span class="content">${opts.content}</span>
          <span class="remove-item">[X]</span>
        </div>`;
        return li;
    }
    
    insertItem (opts) {
      this.addItem(this.createItem(opts));
    }
    removeItem (item) {
      let list = item.closest("ul");
      list.style.width = parseInt(list.style.width, 10) - this.liWidth + "px";
      this.items.splice(this.items.valueOf(item), 1);
      list.removeChild(item);
      
    }
    render () {
      this.el.innerHTML = `<button class="arrow btn-left item">&lArr;</button>
      <div class="ul-wrapper item">
        <ul class="card-list"></ul>
      </div>
      <button class="arrow btn-right item">&rArr;</button>`;
    }
    
    onLeft (e) {
      if (this.items.length === 0) {return;}
      
      if (e.target.classList.contains("btn-left")) {
        
        let list = this.el.querySelector(".card-list");
        let curMargin = parseInt(list.style.marginLeft, 10) || 0;
        let width = list.offsetWidth + curMargin;
        let parentWidth = list.parentNode.clientWidth;
        
        if (width - parentWidth <= 0) {return;}
        
        list.style.marginLeft = curMargin - this.liWidth + "px";
      }
    }
    
    onRight (e) {
      if (this.items.length === 0) {return;}
      
      if (e.target.classList.contains("btn-right")) {
        
        let list = this.el.querySelector(".card-list");
        let curMargin = parseInt(list.style.marginLeft, 10) || 0;
        
        if (curMargin >= 0) {return;}
        list.style.marginLeft = curMargin + this.liWidth + "px";
        
      } 
    }
    
    onRemoveItem (e) {
      let {target} = e;
      
      if (target.classList.contains("remove-item")) {
        
        this.removeItem(target.closest("li"));
      }
    }
  }
  
  
  window.Carusel = Carusel;
})(window.AppComponent);
(function (App) {
  "use strict";
  
  class Menu extends App {
    
    constructor (param = {}) {
      super();
      this.el = document.createElement('div');
      this.el.className = "menu";
      this.param = param;
      this.submenu = {};
      this.data = param.data || [];
      
      if (param.title) {
        this.el.append(this.renderTitle(param));
      }
      this.overMenuItem = null;
      this.res;
      
      this.el.addEventListener("mouseover", this.onMouseover.bind(this));
      this.el.addEventListener("click", this.onClick.bind(this));
      
      window.addEventListener("mousemove", this.onMousemove.bind(this));
    }
    
    renderTitle (param) {
       let title = document.createElement('span');
       title.textContent = param.title;
       title.className = "title";
          
       return title;
    }
    
    
    renderUl (data, cClass = "list") {
      let ul = document.createElement('ul');
      ul.innerHTML = `${this.renderLi(data)}`;
      ul.className = cClass;
      return ul;
    }
    
    render (el = this.el) {
      let ul = this.renderUl(this.data);
      
      el.append(ul);
      
      setTimeout(function(){
        this.menuRect = ul.getBoundingClientRect();
        this.menuRect.addWidth = null;
      }.bind(this), 0);
      
    }
    
    renderLi (data) {
      let lis = ``;
      let idx = 0;
      for (let i of data) {
        lis += `<li class="menu-item" data-parent="${i.parent}" data-level="${i.level}" data-name="${i.name}" data-idx="${idx}">${i.title}</li>`
        idx++;
      }
      return lis;
    }
    
    renderSubMenu (data, name, coords) {
      
      if (!this.submenu[name]) {
    
        let html = this.renderUl(data, "list sub-list");
        html.style.top = coords.top + "px";
        html.style.left = coords.right + "px";
        html.classList.add("hide");
        this.el.append(html);
        this.submenu[name] = html;
        
      }
      
      setTimeout(function() {
         this.submenu[name].classList.remove("hide");
         this.menuRect.addWidth += this.submenu[name].offsetWidth;
      }.bind(this), 0);
      
      
    }
    
    
    onMouseover (e) {
     
      let target = e.target;
      let coords = target.parentNode.children[0].getBoundingClientRect();
      let {name, level, parent, title} = target.dataset;
      
      let data = this.getData(this.param.data, level, name);
      
      let oldItem = this.overMenuItem;
      let {level:oldLevel, name:oldItemName, parent: oldItemParent} = oldItem ? oldItem.dataset : {level: 1, name: "", parent: ""};
      
      let bList = target.parentNode.classList.contains("list");
      let bSubList = target.parentNode.classList.contains("sub-list");
      let bMenuItem = target.classList.contains("menu-item");
      
      if (bMenuItem) {
        if (parent === 'null') {
          this.who = target.textContent;
          
        }
        
        let minusWidth = 0;
          for (let sub in this.submenu) {
            
            let currParent = this.submenu[sub].querySelector("li").dataset.parent;
            
            if ( (oldLevel >= level && oldItemName === currParent) || (oldLevel > level && parent === 'null') ) {
              minusWidth = minusWidth === 0 ? this.submenu[sub].offsetWidth : minusWidth;
              this.submenu[sub].classList.add("hide");
            }
          }
          
          this.menuRect.addWidth -= minusWidth;
          this.menuRect.addWidth = this.menuRect.addWidth <= 0 ? null: this.menuRect.addWidth;
          
        if (data && data.length && data.length !== 0) {
          this.renderSubMenu(data, name, coords);
        }
        
        this.overMenuItem = e.target;
      }
    }
    
    getData (arr, level, name) {
      
      if (arr.length === 0) {
        return [];
      }
      for (let item of arr) {
        
        if (parseInt(level,10) === item.level && item.name === name && item.data) {
          
          this.res = item.data;
          break;
          
        } else {
          this.getData(item.data, level, name);
          
        }
      }
      
    return this.res;
    }
    
    onClick (e) {
      let target = e.target;
      let bSubList = target.parentNode.classList.contains("sub-list");
      let bMenuItem = target.classList.contains("menu-item");
      
      if (bSubList && bMenuItem) {
        let clickTarget = this.param.clickTarget;
        
        /*if (typeof clickTarget === "object") {
          let newItem = clickTarget.createItem({title: this.who, content: target.textContent});
          clickTarget.addItem(newItem);
        } else {
          let text = document.querySelector("#" + clickTarget);
          text.textContent += this.who + " - " + target.textContent + "\n";
        }*/
        for (let sub in this.submenu) {
          this.submenu[sub].classList.add("hide");
        }
        this.menuRect.addWidth = null;
        
        this.setActiveSub.call(this.parent, {title: this.who, content: target.textContent}, "onClick");
      }
    }
    
    onMousemove (e) {
      let {clientX, clientY} = e;
      let {top, bottom, left} = this.menuRect;
      let right = this.menuRect.addWidth ? this.menuRect.right + this.menuRect.addWidth : this.menuRect.right;
      
      if (clientY >= top && clientY <= bottom && clientX >= left && clientX <= right) {
        //empty
      } else {
        
        for (let sub in this.submenu) {
          this.submenu[sub].classList.add("hide");
        }
        this.menuRect.addWidth = null;
      }
    }
    
    
    
  }
  
  window.Menu = Menu;
})(window.AppComponent);
(function() {
  "use strict";
  
  class AppComponent {
    constructor () {
      this.subscribers = {};
    }
    setParentComponent (parent) {
      this.parent = parent;
    }
    subscribe (fn, type) {
      if (this.subscribers[type] === undefined) {
        this.subscribers[type] = [];
      }
      this.subscribers[type].push(fn);
    }
    
    setActiveSub (params, type) {
      this.startActiveSub('active', params, type);
    }
    
    startActiveSub (action, arg, type) {
      if (this.subscribers[type] === undefined) {
        throw new Error("Type of subscribe not exist!", type);
      }
      
      let subscribers = this.subscribers[type]
      for (let sub of subscribers) {
        
        if (action === "active") {
          sub(arg);
        }
      }
    }
  }
  
  window.AppComponent = AppComponent;
})();
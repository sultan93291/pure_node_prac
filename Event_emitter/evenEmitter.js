module.exports = class eventEmitter {
  listeners = {};

  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
  }
  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }

  once(eventName, fn) {
    this.listeners = this.listeners[eventName] || [];
    const onceWrapper = () => {
      fn();
      this.off(eventName, onceWrapper);
    };
    this.listeners[eventName].push(onceWrapper)
    return this
  }

  off(eventName, fn) {
    this.removeListeners(eventName,fn)
  }

  removeListeners(eventName,fn) {
    let list = this.listeners[eventName];
    if (!list) return this

    for (let i = list.length; i > 0; i--){
      if (list[i] === fn) {
        list.splice(i, 1);
        break;
      }
      return this
    }

  }

  emit(eventName, ...args) {
    let fns = this.listeners[eventName];
    if (!fns) return false;
    fns.forEach(f => {
      f(...args);
    });
    return true;
  }

  listenersCount(eventName) {
    let fns = this.listeners[eventName] || [];
    return fns.length;
  }

  rawListeners(eventName) {
    return this.listeners[eventName];
  }
};

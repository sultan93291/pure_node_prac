module.exports = class evenEmitter {
  listeners = {};

  addEventListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
  }

  on(eventName, fn) {
    this.addEventListener(eventName, fn);
  }

  off(eventName, fn) {
    this.removeEventListener(eventName, fn);
  }

  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceWrapper = () => {
      this.off(eventName, fn);
    };
    this.listeners[eventName].push(onceWrapper);
    return this;
  }

  removeEventListener(eventName, fn) {
    let list = this.listeners[eventName];
    if (!list) return this;
    for (let i = list.length; i > 0; i--) {
      if (list[i] === fn) {
        list.splice(i, 1);
        break;
      }
    }
    return this;
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
    let list = this.listeners[eventName];
    return list ? list.length : 0;
  }

  rawListeners(eventName) {
    return this.listeners[eventName];
  }
};

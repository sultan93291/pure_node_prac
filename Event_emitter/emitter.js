// const eventEmitter = require("events");
const eventEmitter = require("./cloneevenEmitter.js");

const myEvents = new eventEmitter();

myEvents.on("msg", msg => {
  console.log(`This is your message : ${msg}`);
});
myEvents.off("msg", msg => {
  console.log(`offing msg emitter : ${msg} `);
});

myEvents.emit("msg", "hello world");
myEvents.emit("msg", "this is a another message");
myEvents.emit("msg", "this is a another method");
myEvents.emit("msg", "this is a another message");

console.log(myEvents.listenersCount("msg"));

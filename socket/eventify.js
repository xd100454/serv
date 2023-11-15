/* LIB : EVENTIFY ANY OBJECT */
const eventify = (self) => {
    self.events = {}

    self.on = function () {
        var i,event,length = arguments.length,listener=arguments[length-1]
        
        for(i=0;length-1>i;i++){
            event = arguments[i]
            if (typeof self.events[event] !== 'object') {
                self.events[event] = []
            }
    
            self.events[event].push(listener)
           
        }
        

        return listener
    }

    self.removeListener = function (event, listener) {
        let idx

        if (typeof self.events[event] === 'object') {
            idx = self.events[event].indexOf(listener)

            if (idx > -1) {
                self.events[event].splice(idx, 1)
            }
        }
    }

    self.emit = function (event) {
        var i, listeners, length, args = [].slice.call(arguments, 1);

        if (typeof self.events[event] === 'object') {
            listeners = self.events[event].slice()
            length = listeners.length

            for (i = 0; i < length; i++) {
                listeners[i].apply(self, args)
            }
        }
    }

    self.once = function (event, listener) {
        self.on(event, function g () {
            self.removeListener(event, g)
            listener.apply(self, arguments)
        })
    }
}

module.exports = eventify
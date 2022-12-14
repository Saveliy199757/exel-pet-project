import {capitalize} from '@core/utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('Not provide params root for DomListener')
        }
        this.$root = $root
        this.listeners = listeners
    }
    initDomListeners() {
       this.listeners.forEach((listener) => {
           const method = getMethodName(listener)
           if (!this[method]) {
               throw new Error(`Method ${method} is not implemented in ${this.name} component`)
           }
           this[method] = this[method].bind(this)
           this.$root.on(listener, this[method])
       })
    }
    removeDomListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name} component`)
            }
            this.$root.off(listener, this[method])
        })
    }
}
function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}

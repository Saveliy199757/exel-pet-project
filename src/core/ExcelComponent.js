import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name
        this.emmiter = options.emmiter
        this.store = options.store
        this.subscribe = options.subscribe || []
        this.unsubscriptions = []
        this.prepare()
    }
    prepare() {}

    toHTML() {
        return ''
    }
    $emmit(event, ...args) {
        this.emmiter.emmit(event, ...args)
    }
    $on(event, fn) {
        const unsub = this.emmiter.subscribe(event, fn)
        this.unsubscriptions.push(unsub)
    }
    $dispatch(action) {
        this.store.dispatch(action)
    }
    storeChanged() {
    }
    isWatching(key) {
        return this.subscribe.includes(key)
    }
    init() {
        this.initDomListeners()
    }
    destroy() {
        this.removeDomListeners()
        this.unsubscriptions.forEach((unsub) => unsub())
    }
}

import {$} from '@core/dom';
import {ActiveRoute} from '@core/router/ActiveRoute';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('selector is not provided Router')
        }
        this.routes = routes
        this.$appContainer = $(selector)
        this.changePageHandler = this.changePageHandler.bind(this)
        this.init()
    }
    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }
    changePageHandler() {
        console.log('hash change', ActiveRoute.path)
        this.$appContainer.html('<h1>'+ActiveRoute.path+'</h1>')
    }
    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}

import {$} from '@core/dom';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('selector is not provided Router')
        }
        this.routes = routes
        this.$tagContainer = $(selector)
        this.changePageHandler = this.changePageHandler.bind(this)
        this.init()
    }
    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }
    changePageHandler() {
        const Page = this.routes.excel
        const page = new Page('')
        this.$tagContainer.append(page.getRoot())

        page.afterRender()
    }
    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}

import {$} from '@core/dom';
import {ActiveRoute} from '@core/router/ActiveRoute';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('selector is not provided Router')
        }
        this.routes = routes
        this.page = null
        this.$tagContainer = $(selector)
        this.changePageHandler = this.changePageHandler.bind(this)
        this.init()
    }
    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }
    changePageHandler() {
        if (this.page) {
            this.page.destroy()
        }
        this.$tagContainer.clear()
        const Page = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard
        this.page = new Page()
        this.$tagContainer.append(this.page.getRoot())

        this.page.afterRender()
    }
    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}

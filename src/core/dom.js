class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector
    }
    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }
    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
           return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }
    clear() {
        this.html('')
        return this
    }
    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }
    on(method, callback) {
        this.$el.addEventListener(method, callback)
        return this
    }
    off(method, callback) {
        this.$el.removeEventListener(method, callback)
        return this
    }
    closest(selector) {
        return $(this.$el.closest(selector))
    }
    get data() {
        return this.$el.dataset
    }
    id(parse) {
        if (parse) {
            const parse = this.id().split(':')
            return {
                row: +parse[0],
                col: +parse[1]
            }
        }
        return this.data.id
    }
    getCoords() {
        // console.log('goords', this.$el.getBoundingClientRect()) дебаг
        return this.$el.getBoundingClientRect()
    }
    focus() {
        this.$el.focus()
        return this
    }
    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }
    find(selector) {
       return $(this.$el.querySelector(selector))
    }
    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }
    addClass(className) {
        this.$el.classList.add(className)
    }
    removeClass(className) {
        this.$el.classList.remove(className)
    }
    css(styles = {}) {
        Object.keys(styles).forEach((key) => {
            this.$el.style[key] = styles[key]
        })
    }
    getStyles(styles = []) {
        return styles.reduce((acc, style) => {
            acc[style] = this.$el.style[style]
            return acc
        }, {})
    }
}
export function $(selector) {
    return new Dom(selector)
}
$.create = (tagName, classes) => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}

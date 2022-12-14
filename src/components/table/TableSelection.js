export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = [];
        this.current = null
    }
    get selectedIds() {
        return this.group.map(($el) => $el.id())
    }
    select($el) {
        this.clear()
        this.group.push($el)
        $el.focus().addClass(TableSelection.className)
        this.current = $el
    }
    selectGroup($cellGroup = []) {
        this.clear()
        this.group = $cellGroup
        this.group.forEach(($el) => $el.addClass(TableSelection.className))
    }
    clear() {
        this.group.forEach(($el) => $el.removeClass(TableSelection.className) )
        this.group = []
    }
    applyStyle(style) {
        this.group.forEach(($el) => {
            $el.css(style)
        })
    }
}

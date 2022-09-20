import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.temlate';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {getMatrix, isCell, nextSelectorCell, shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }
    toHTML() {
        return createTable()
    }
    prepare() {
        this.selection = new TableSelection()
    }
    init() {
        super.init();
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)
        this.$emmit('table:select', $cell)
        this.$on('Formula:text', (text) => {
            this.selection.current.text(text)
        })
        this.$on('Formula:enter', () => {
            this.selection.current.focus()
        })
        this.$subscribe((state) => {
            console.log('TableState', state)
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emmit('table:select', $cell)
        this.$dispatch({ type: 'TEST' })
    }
    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            console.log('data', data)
            this.$dispatch({ type: 'COL_RESIZE', data })
        } catch (e) {
            console.warn(e.message)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
          this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $selectedCells = getMatrix($target, this.selection.current)
                    .map((id) => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($selectedCells)
            } else {
                this.selectCell($target)
            }
        }
    }
    onKeydown(event) {
        const keys = [
            'Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'
        ]
        const {key} = event
        if (keys.includes(event.key) && !event.shiftKey) {
            event.preventDefault()
            const currentId = this.selection.current.id(true)
            const $next = this.$root.find(nextSelectorCell(key, currentId))
            this.selection.select($next)
            this.$emmit('table:select', $next)
        }
    }
    onInput(event) {
        this.$emmit('Table:input', $(event.target))
    }
}

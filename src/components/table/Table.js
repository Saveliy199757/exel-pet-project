import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.temlate';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {getMatrix, isCell, nextSelectorCell, shouldResize} from '@/components/table/table.functions';
import * as actions from '@/store/actions'
import {defaultStyles} from '@/constans';
import {parse} from '@core/utils';

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
        return createTable(20, this.store.getState())
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
            this.selection.current.attr('data-value', text).text(parse(text))
            this.updateTextInStore(text)
        })
        this.$on('Formula:enter', () => {
            this.selection.current.focus()
        })
        this.$on('Toolbar:applyStyle', (style) => {
            this.selection.applyStyle(style)
            this.$dispatch(actions.applyStyle({
                value: style,
                ids: this.selection.selectedIds
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.updateTextInStore($cell.data.value)
        this.$emmit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }
    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
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
    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }
    onInput(event) {
       this.updateTextInStore($(event.target).text())
    }
}

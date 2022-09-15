import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.temlate';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {getMatrix, isCell, shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }
    static className = 'excel__table'
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
    }

    onMousedown(event) {
        if (shouldResize(event)) {
          resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $selectedCells = getMatrix($target, this.selection.current)
                    .map((id) => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($selectedCells)
            } else {
                this.selection.select($target)
            }
        }
    }
}

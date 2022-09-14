import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.temlate';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';

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
        if (event.target.dataset.resize) {
          resizeHandler(this.$root, event)
        }
    }
}

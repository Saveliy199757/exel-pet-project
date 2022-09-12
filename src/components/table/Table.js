import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.temlate';
import {$} from '@core/dom';

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
    onMousedown(event) {
        if (event.target.dataset) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizeble"]')
            const coords = $parent.getCoords()
            document.onmousemove = (e) => {
                const delta = e.pageX - coords.right
                $parent.$el.style.width = coords.width + delta + 'px'
            }
            document.onmouseup = () => {
                document.onmousemove = null
            }
        }
        console.log(event.target.dataset)
    }
}

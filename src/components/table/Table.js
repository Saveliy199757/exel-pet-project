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
        if (event.target.dataset.resize) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizeble"]')
            const coords = $parent.getCoords()
            const type = $resizer.data.resize
            const cols = this.$root.findAll(`[data-key="${$parent.data.key}"]`)
            document.onmousemove = (e) => {
                if (type === 'col') {
                    const delta = e.pageX - coords.right
                    const valueResize = coords.width + delta
                    $parent.$el.style.width = valueResize + 'px'
                    cols.forEach((element) => element.style.width = valueResize + 'px')
                } else {
                    const delta = Math.floor(e.pageY - coords.bottom)
                    const valueResize = coords.height + delta
                    $parent.$el.style.height = valueResize + 'px'
                }
            }
            document.onmouseup = () => {
                document.onmousemove = null
            }
        }
    }
}

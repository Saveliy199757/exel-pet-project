import {range} from '@core/utils';
import {defaultRowsCount} from '@/components/table/table.constans';

export function shouldResize(event) {
    return event.target.dataset.resize
}
export function isCell(event) {
    return event.target.dataset.type === 'cell'
}
export function getMatrix($target, $current) {
    const target = $target.id(true)
    const current = $current.id(true)
    const colsId = range(current.col, target.col)
    const rowsId = range(current.row, target.row)
    return colsId.reduce((acc, colId) => {
        rowsId.forEach((rowId) => acc.push(`${rowId}:${colId}`))
        return acc
    }, [])
}
export function nextSelectorCell(key, {row, col}) {
    const MIN_VALUE = 0
    const MAX_VALUE = defaultRowsCount - 1
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row = row + 1 > MAX_VALUE ? MAX_VALUE : row + 1
            break;
        case 'Tab':
            break;
        case 'ArrowUp':
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
            break;
        case 'ArrowRight':
            col++
            break;
        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
            break;
    }
    return `[data-id="${row}:${col}"]`
}

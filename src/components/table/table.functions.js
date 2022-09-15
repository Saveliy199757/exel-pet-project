import {range} from '@core/utils';

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

import {CODE, DEFAULT_HEIGHT_ROW, DEFAULT_WIDTH_CELL, defaultRowsCount} from '@/components/table/table.constans';
import {defaultStyles} from '@/constans';
import {camelToDashCase} from '@core/utils';

function createRow(content, index, state) {
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
    const number = index ? index : ''
    const height = getHeightRow(state, number)
    return `<div class="row" data-type="resizeble" data-key="${number}" style="height: ${height}">
                <div class="row-info unselectable">
                  ${number}
                  ${resize}
                </div>
                <div class="row-data">${content}</div>
            </div>
           `
}

function createColl(contentColl, index, width) {
    return `<div class="column unselectable" data-type="resizeble" data-key="${index}" style="width: ${width}">
              ${contentColl}
              <div class="col-resize" data-resize="col"></div>
            </div>`
}

function createCell(row, state) {
    return function(_, col) {
       const id = `${row}:${col}`
       const width = getWidthCell(state.colState, col)
       const content = state.cellText[id]
       const styles = Object.keys(defaultStyles)
           .map((key) => `${camelToDashCase(key)}: ${defaultStyles[key]}`)
           .join(';')
       return `<div 
                 class="cell"
                 contenteditable
                 data-key="${col}"
                 data-type="cell"
                 data-id="${id}"
                 style="${styles}; width: ${width}"
                 >
                 ${content || ''}
                 </div>`
    }
}

function toChar(_, index) {
     return String.fromCharCode(CODE.A + index)
}

function getWidthCell(state, index) {
    return (state[index] || DEFAULT_WIDTH_CELL) + 'px'
}
function getHeightRow(state, index) {
    return (state[index] || DEFAULT_HEIGHT_ROW) + 'px'
}

export function createTable(rowsCount = defaultRowsCount, state = {}) {
    const colsCount = CODE.Z - CODE.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map((contentColl, index) => {
            const width = getWidthCell(state.colState, index)
            return createColl(contentColl, index, width)
        })
        .join('')
    rows.push(createRow(cols, null, {}))
    for (let row = 0; row < rowsCount; row++ ) {
        const cell = new Array(colsCount)
            .fill('')
            .map(createCell(row, state))
            .join('')
        rows.push(createRow(cell, row + 1, state.rowState))
    }
    return rows.join('');
}

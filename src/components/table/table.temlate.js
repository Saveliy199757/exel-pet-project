import {CODE, defaultRowsCount} from '@/components/table/table.constans';

function createRow(content, index) {
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
    return `<div class="row" data-type="resizeble" >
                <div class="row-info unselectable">
                  ${index ? index : ''}
                  ${resize}
                </div>
                <div class="row-data">${content}</div>
            </div>
           `
}

function createColl(contentColl, index) {
    return `<div class="column unselectable" data-type="resizeble" data-key="${index}">
              ${contentColl}
              <div class="col-resize" data-resize="col"></div>
            </div>`
}

function createCell(row) {
    return function(_, col) {
       return `<div 
                 class="cell"
                 contenteditable
                 data-key="${col}"
                 data-type="cell"
                 data-id="${row}:${col}">
                 </div>`
    }
}

function toChar(_, index) {
     return String.fromCharCode(CODE.A + index)
}

export function createTable(rowsCount = defaultRowsCount) {
    const colsCount = CODE.Z - CODE.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createColl)
        .join('')
    rows.push(createRow(cols))
    for (let row = 0; row < rowsCount; row++ ) {
        const cell = new Array(colsCount)
            .fill('')
            .map(createCell(row))
            .join('')
        rows.push(createRow(cell, row + 1))
    }
    return rows.join('');
}

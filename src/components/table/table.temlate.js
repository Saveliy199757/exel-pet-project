 const CODE = {
    A: 65,
    Z: 90
}

function createRow(content, index) {
    const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
    return `<div class="row" data-type="resizeble" >
                <div class="row-info">
                  ${index ? index : ''}
                  ${resize}
                </div>
                <div class="row-data">${content}</div>
            </div>
           `
}

function createColl(contentColl, index) {
    return `<div class="column" data-type="resizeble" data-key="${index}">
              ${contentColl}
              <div class="col-resize" data-resize="col"></div>
            </div>`
}

function createCell(_, index) {
    return `<div class="cell" contenteditable data-key="${index}"></div>`
}

function toChar(_, index) {
     return String.fromCharCode(CODE.A + index)
}

export function createTable(rowsCount = 15) {
    const colsCount = CODE.Z - CODE.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createColl)
        .join('')
    const cell = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')
    rows.push(createRow(cols))
    for (let i = 0; i < rowsCount; i++ ) {
        rows.push(createRow(cell, i + 1))
    }
    return rows.join('');
}

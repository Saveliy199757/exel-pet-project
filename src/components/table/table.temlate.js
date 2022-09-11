 const CODE = {
    A: 65,
    Z: 90
}

function createRow(content, index) {
    return `<div class="row">
                <div class="row-info">${index ? index : ''}</div>
                <div class="row-data">${content}</div>
            </div>
           `
}

function createColl(contentColl) {
    return `<div class="column">${contentColl}</div>`
}

function createCell() {
    return `<div class="cell" contenteditable></div>`
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

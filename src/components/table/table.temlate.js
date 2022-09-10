 const CODE = {
    A: 65,
    Z: 90
}

function createRow(content) {
    return `
           <div class="row">
                <div class="row-info">
                </div>
                <div class="row-data">
                ${content}
                </div>
            </div>
           `
}

function createColl() {
    return `
     <div class="column">
     </div>
    `
}

function createCell() {
    return `
    <div class="cell selected" contenteditable>
    </div>
    `
}

export function createTable(rowsCount) {
    const colsCount = CODE.Z - CODE.A
    const rows = []
    rows.push(createRow())
    for (let i; i < rowsCount; i++ ) {
        rows.push(createRow())
    }
    return '<h1>Table</h1>';
}

import {storage} from '@core/utils';

function toHtml(key) {
    const model = storage(key)
    const id = key.split(':')[1]
    return `
     <li class="record">
        <a href="#excel/${id}">${model.title}</a>
        <strong>
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
        </strong>
     </li>
    `
}
function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}
export function createRecords() {
    const keys = getAllKeys()
    if (!keys.length) {
        return `<p>Вы не создали ни одной таблицы</p>`
    }
    return `
      <div class="table__header">
         <span>Название</span>
         <span>Дата открытия</span>
      </div>
      <ul class="table__list">
      ${keys.map(toHtml).join('')}
      </ul>
    `
}

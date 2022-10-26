function toHtml() {
    return `
     <li class="record">
        <a href="#">Таблица номер 1</a>
        <strong>07.09.2022</strong>
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

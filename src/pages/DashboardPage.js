import {Page} from '@core/Page';
import {$} from '@core/dom';

export class DashboardPage extends Page {
    getRoot() {
        $.create('div', 'dashboard').html(`
         <div class="dashboard__header">
            <h1>Dashboard Excel</h1>
        </div>
        <div class="dashboard__create">
            <div class="dashboard__container">
                <a href="#" class="dashboard__button">
                    Новая таблица
                </a>
            </div>
        </div>
        <div class="dashboard__table">
            <div class="dashboard__container">
                <div class="table__header">
                    <span>Название</span>
                    <span>Дата открытия</span>
                </div>
                <ul class="table__list">
                    <li class="record">
                        <a href="#">Таблица номер 1</a>
                        <strong>07.09.2022</strong>
                    </li>
                    <li class="record">
                        <a href="#">Таблица номер 23</a>
                        <strong>07.09.2022</strong>
                    </li>
                </ul>
            </div>
        </div>
        `)
    }
}

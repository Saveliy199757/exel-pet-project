import {Page} from '@core/Page';
import {$} from '@core/dom';
import {createRecords} from './dashboard.functions';

export class DashboardPage extends Page {
    getRoot() {
        const now = Date.now().toString()
       return $.create('div', 'dashboard').html(`
         <div class="dashboard__header">
            <h1>Панель Управления</h1>
        </div>
        <div class="dashboard__create">
            <div class="dashboard__container">
                <a href="#/excel/${now}" class="dashboard__button">
                    Новая таблица
                </a>
            </div>
        </div>
        <div class="dashboard__table">
            <div class="dashboard__container">
               ${createRecords()}
            </div>
        </div>
        `)
    }
}

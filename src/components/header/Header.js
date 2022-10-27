import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/store/actions';
import {defaultTitle} from '@/constans';
import {ActiveRoute} from '@core/router/ActiveRoute';

export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        });
    }
    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `
            <input type="text" class="input" value="${title}">

            <div>
                <div class="button" data-button="exit">
                    <span class="material-icons" data-button="exit">logout</span>
                </div>
                <div class="button" data-button="delete">
                    <span class="material-icons" data-button="delete">delete</span>
                </div>
            </div>
        `
    }
    onClick(event) {
        const $target = $(event.target)
        if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        } else if ($target.data.button === 'delete') {
            const decision = confirm('Вы действительно хотите удалить эту таблицу ?')
            if (decision) {
                localStorage.removeItem('excel:'+ActiveRoute.param)
                ActiveRoute.navigate('')
            }
        }
    }
    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }
}

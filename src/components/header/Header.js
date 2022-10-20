import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/store/actions';
import {defaultTitle} from '@/constans';

export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }
    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `
            <input type="text" class="input" value="${title}">

            <div>
                <div class="button">
                    <span class="material-icons">logout</span>
                </div>
                <div class="button">
                    <span class="material-icons">delete</span>
                </div>
            </div>
        `
    }
    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }
}

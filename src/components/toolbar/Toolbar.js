import {createToolbar} from '@/components/toolbar/toolbar.temlate';
import {$} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultStyles} from '@/constans';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'
    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        });
    }
    prepare() {
        this.initState(Object.keys(defaultStyles))
    }
    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }
    storeChanged(change) {
        this.setState(change.currentStyles)
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            this.$emmit('Toolbar:applyStyle', value)
            this.setState(value)
            console.log(this.state)
        }
    }
}

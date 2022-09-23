import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText', 'colState'],
            ...options
        });
    }
    toHTML() {
        return `
            <div class="icon">
                Fx
            </div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>
        `
    }
    init() {
        super.init()
        this.$formula = this.$root.find('#formula')
        this.$on('table:select', ($cell) => {
            this.$formula.text($cell.text())
        })
    }
    storeChanged({currentText}) {
        this.$formula.text(currentText)
    }

    onInput(event) {
        this.$emmit('Formula:text', $(event.target).text())
    }
    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
         event.preventDefault()
         this.$emmit('Formula:enter')
        }
    }
}

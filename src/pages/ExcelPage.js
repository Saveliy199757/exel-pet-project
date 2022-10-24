import {Page} from '@core/Page';
import {createStore} from '@/components/table/createStore';
import {rootReducer} from '@/store/rootReducer';
import {initialState} from '@/store/initialState';
import {debounce, storage} from '@core/utils';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';

export class ExcelPage extends Page {
    getRoot() {
        const store = createStore(rootReducer, initialState)

        const stateListener = (state) => {
            console.log('app', state)
            storage('excel-state', state)
        }

        store.subscribe(debounce(stateListener, 300))

        this.excel = new Excel( {
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }
    afterRender() {
        this.excel.init()
    }
    destroy() {
        this.excel.destroy()
    }
}

import {Page} from '@core/Page';
import {createStore} from '@/components/table/createStore';
import {rootReducer} from '@/store/rootReducer';
import {normalizeInitialState} from '@/store/initialState';
import {debounce, storage} from '@core/utils';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';

function storageName(param) {
    return 'excel:'+param
}

export class ExcelPage extends Page {
    getRoot() {
        const state = storage(storageName(this.params))
        const store = createStore(rootReducer, normalizeInitialState(state))

        const stateListener = (state) => {
            storage(storageName(this.params), state)
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

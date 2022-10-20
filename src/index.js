import './scss/index.scss'
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {rootReducer} from '@/store/rootReducer';
import {createStore} from '@/components/table/createStore';
import {debounce, storage} from '@core/utils';
import {initialState} from '@/store/initialState';

const store = createStore(rootReducer, initialState)

const stateListener = (state) => {
    console.log('app', state)
    storage('excel-state', state)
}

store.subscribe(debounce(stateListener, 300))

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

excel.render()

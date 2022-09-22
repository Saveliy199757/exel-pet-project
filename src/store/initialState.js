import {storage} from '@core/utils';

const defaultState = {
    colState: {},
    rowState: {},
    cellText: {},
    currentText: ''
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState

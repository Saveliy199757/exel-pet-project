import {storage} from '@core/utils';
import {defaultStyles} from '@/constans';

const defaultState = {
    colState: {},
    rowState: {},
    cellText: {},
    currentText: '',
    currentStyles: defaultStyles
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState

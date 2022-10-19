import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constans';

const defaultState = {
    title: defaultTitle,
    colState: {},
    rowState: {},
    cellText: {},
    currentText: '',
    currentStyles: defaultStyles,
    stylesState: {}
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState

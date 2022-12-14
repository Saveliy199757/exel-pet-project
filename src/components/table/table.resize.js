import {$} from '@core/dom';

export function resizeHandler($root, event) {
    return new Promise((resolve) => {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizeble"]')
        const id = $parent.data.key
        const coords = $parent.getCoords()
        const type = $resizer.data.resize
        const cols = $root.findAll(`[data-key="${$parent.data.key}"]`)
        const sideProp = type === 'col' ? 'bottom' : 'right'
        let valueResize
        $resizer.css({
            opacity: 1,
            [sideProp]: '-5000px'
        })
        document.onmousemove = (e) => {
            if (type === 'col') {
                const delta = e.clientX - coords.right
                valueResize = coords.width + delta
                $resizer.css({right: -delta + 'px'})
            } else {
                const delta = e.clientY - Math.round(coords.bottom)
                valueResize = coords.height + delta
                $resizer.css({bottom: -delta + 'px'})
            }
        }
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
            if (type === 'col') {
                $parent.css({width: valueResize + 'px'})
                cols.forEach((element) => element.style.width = valueResize + 'px')
            } else {
                $parent.css({height: valueResize + 'px'})
            }
            resolve({
                value: valueResize,
                type,
                id
            })
            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            })
        }
    })
}

export class DomListener {
    constructor($root) {
        if (!$root) {
            throw new Error('Not provide params root for DomListener')
        }
        this.$root = $root
    }
}

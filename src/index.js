import './module'
import './scss/index.scss'

console.log('Index work');
async function start() {
    return await Promise.resolve('async work !!!!!!!!!!!!')
}

start().then(console.log)

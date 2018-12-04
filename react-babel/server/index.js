global.document = {
    getElementsByTagName(str) {
        if (str === 'head') {
            return [{
                appendChild(obj) {
                    obj.onload()
                }
            }]
        }
        return []
    },
    createElement(str) {
        return {}
    }
}

const Koa = require('koa')
const koaStatic = require('koa-static')
const { join } = require('path')
const { readFile } = require('fs')
const stats = require('../manifest/react-loadable.json')
const { getBundles } = require('react-loadable/webpack')
const App = require('../serverDist').default

let template

const app = new Koa()


const indexPaths = ['/', '/index.html']

app.use(async (ctx, next) => {
    if (indexPaths.indexOf(ctx.path) !== -1) {
        await next()
        return
    }
    await koaStatic(join(__dirname, '../dist'))(ctx, next)
})


readFile(join(__dirname, '../dist/index.html'), (err, data) => {
    if (err) {
        console.error('请先完成打包步骤')
        return
    }
    template = data.toString()

    app.listen(8080, () => console.log('启动成功'))
})

app.use(async (ctx) => {
    const oMain = new App()
    await oMain.init(ctx)
    const bundles = getBundles(stats, oMain.modules)
    ctx.body = replaceTemplate(oMain.html, oMain.states, bundles, template)
})

function replaceTemplate(content, data, bundles, template) {
    
    if (!Array.isArray(bundles) || !template) {
        return
    }

    let [link, script, only] = ['', '', []]

    const state = `<script>window.__INITIAL_STATE__= ${(data ? JSON.stringify(data) : 'undefined')}</script>`

    bundles.forEach(item => {
        if (only.indexOf(item.publicPath) != -1) {
            return
        }
        else {
            only.push(item.publicPath)
        }
        if (/\.css$/.test(item.publicPath)) {
            link += `<link href="${item.publicPath}" rel="stylesheet">`
        }
        else {
            script += `<script type="text/javascript" src="${item.publicPath}"></script>`
        }
    });

    const html = template
        .replace('<!-- is link template -->', link)
        .replace('<!-- is script template -->', script)
        .replace('<!-- is initial state template -->', state)
        .replace('<!-- is component template -->', content)
    
    return html
}
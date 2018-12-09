const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const app = new Koa()
const appRoute = new Router()

appRoute.post('/api-title', async (ctx) => {
    ctx.body = { title: '你好世界', success: true }
})

appRoute.post('/api-demoa', async (ctx) => {
    ctx.body = { data: ['武科大治艾滋', '郭兴逝世', '乐视被查封', '少年心脏停3小时', '22年前凶案告破'], success: true }
})

appRoute.post('/api-demob', async (ctx) => {
    ctx.body = { data: ['女子火车站霸窗', '班达海发生地震', '雄安站外观曝光', '存5万只剩500', '王励勤乒协副主席'], success: true }
})

appRoute.post('/api-index', async (ctx) => {
    ctx.body = { data: ['金沙江堰塞湖抢险', '蜘蛛哺乳行为', '中国女足10-0蒙古', '特朗普悼念老布什', '北京民办学校新规'], success: true }
})

app.use(cors({
    origin: (ctx) => ctx.header.origin,
    credentials: true
}))

app.use(appRoute.routes())

app.listen(8000, () => console.log('启动成功'))
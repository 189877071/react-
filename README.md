# react + redux + react-router + ts 脚手架
一直使用旧版的webpack配置，这两天准备升级到webpack4，所以在网上查了些资料，整合了一下配置代码。
做了es6与ts两个版本的脚手架。折腾了一下服务器端渲染。

### 遇到的问题：
js版本的脚手架还算顺利，服务器端渲染花了点时间。

1.ts版借助babel实现了赖加载，但可能是编译顺序的问题导致“`react-loadable/babel`”模块不起作用，所以使用` react-loadlable` 的时候需要手动添加 module 与 webpack 属性。

2.在ts中 `import()` 方法会被 ts编译成 `new Promise.resolve().then(() => require('...'))`所以要使用`require.ensure`


    	import * as Loadable from 'react-loadable'
        
    	const loading = () => (<div className={styles.loading}> 正在加载…</div>)
        
    	const DemoA = Loadable({ 
            loading, 
        	// 因为 import() 方法在ts中会自动的被编译成 一个 Promise方法 所以只能使用 require.ensure来代替
            loader: () => new Promise(resolve => require.ensure([], (require) => resolve(require('../DemoA')))),
        	// 需要手动添加 modules 与 webpack属性
            modules: ['../DemoA'],
            webpack: () => [require.resolveWeak('../DemoA')]
        })

 3.服务器端渲染数据获取，我的思路是修改 `redux-thunk` 模块，拦截所有的action函数，包装到` Promise.all() `中，然后提供一个api接口，在组件初始化化后通过列队执行，这里有一个问题就是怎样让组件初始化，我找到了一个模块`react-async-bootstrapper`，该模块可以深遍历react组件。



    import * as bootstrapper from 'react-async-bootstrapper'
    import ReduxSsrThunk from 'redux-ssr-thunk'
    
    const Thunk = new ReduxSsrThunk(true)
    
    const store = createStore(reducers, applyMiddleware(Thunk.thunk))
    
    const modules = []
    
    class App extends React.Component {
        render() {
            <Provider store={store}>
                <StaticRouter location={url} context={{}}>
                    <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
                        <App></App>
                    </Loadable.Capture>
                </StaticRouter>
            </Provider>
        }
    }
    
    await bootstrapper(App)
    // 调用 execute() 异步执行所有的action函数
    this.states = await Thunk.execute()


------------

### 目录
#### ECMAScript 为js版的脚手架
命令：
1. `npm run dll `  先打包公共文件
2. `npm run dev`   开发模式
3. `npm run build` 打包SPA（单页面）
4. `npm run ssr` 服务器端渲染
5. `npm run server` 启动服务器端渲染程序

##### server 目录下有两个文件
		index.js 服务器端渲染执行文件
		server.js 一些请求数据

#### TypeScript
命令：
1. `npm run dll `  先打包公共文件
2. `npm run dev`   开发模式
3. `npm run build` 打包SPA（单页面）
4. `npm run ssr` 服务器端渲染
5. `npm run server` 启动服务器端渲染程序
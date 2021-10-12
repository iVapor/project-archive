// Page 会自动运行, 自动渲染
// 注意观察 data 参数
const log = console.log.bind(console)

Page({
    // data 是页面第一次渲染使用的数据
    data: {
        blue: '',
        red: '',
        yellow: '',
        statusBarHeight: 0,
    },
    onReady() {
        let system = wx.getSystemInfoSync()
        log('--system', system)
        log('我变更了')

        this.setTitleLocation()
        wx.nextTick(() => {
            this.setScrollOffset('.blue', 'blue')
            this.setScrollOffset('.red', 'red')
            this.setScrollOffset('.yellow', 'yellow')

        })

        setTimeout(() =>{
            log('y', this.data.yellow)
        }, 500)
    },
    setTitleLocation() {
        let height = wx.getSystemInfoSync().statusBarHeight
        log('height', height)
        this.setData({
            statusBarHeight: height,
        })

    },
    setScrollOffset: function(sel, varKey){
        let height = wx.getSystemInfoSync().statusBarHeight
        // height = 20
        // 标题的高度 + 状态栏的高度 + 导航栏的高度
        let offset = 40 + height + 20
        log('offset', offset)
        wx.createSelectorQuery().select(sel).boundingClientRect( (rect) => {
            let top = rect.top - offset
            log('top', top)
            this.setData({
                [varKey]: top,
            })
        }).exec()
    },

    scrollCard: function(e){
        let type = e.currentTarget.dataset.type
        log('type', type)
        let offset = {
            blue: this.data.blue,
            red: this.data.red,
            yellow: this.data.yellow,
        }
        log('in scroll', offset[type])
        setTimeout(() => {
            wx.pageScrollTo({
                // scrollTop: 500,
                // scrollTop: 1274,
                scrollTop: offset[type] ,
                duration: 0,
            })
        }, 10)
    }
})
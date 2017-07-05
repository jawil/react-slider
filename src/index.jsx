import React from 'react'
import {render} from 'react-dom'
import Slider from './Slider/Slider.jsx'

const data = [
    {
        link: 'javascript:;',
        src: 'http://ww1.sinaimg.cn/large/a660cab2gy1fdeop4kdmpj20ms0e83z6'
    }, {
        link: 'javascript:;',
        src: 'http://ww1.sinaimg.cn/large/a660cab2gy1fdeophraf0j20ms0e8ab1'
    }, {
        link: 'javascript:;',
        src: 'http://ww1.sinaimg.cn/large/a660cab2gy1fdeopsmhmnj20ms0e8weq'
    }
]

const opts = {
    auto: 1, // 自动播放 1或0
    interval: 3000, // 停顿时间
    transition: '0.5s', // 单位时间
    effect: 'ease-out' // transition运动效果，也可以是贝塞尔曲线
}

render(
    <Slider data={data} opts={opts}/>, document.getElementById('root'))

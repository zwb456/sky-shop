import React, { useState, useEffect, StrictMode } from "react";
import style from './index.module.less'
// import { Popup } from 'antd-mobile'
import { useLocation } from "react-router-dom";
import { getorder } from '@/api/order'
import { store } from '@/store'
import { Popup, Cell } from '@nutui/nutui-react';
import '@nutui/nutui-react/dist/style.css'
// import Alipay from '@uiw/react-native-alipay';
import { payOrder } from '@/api/payOrder'
const index: React.FC = () => {


    const [showBottom, setShowBottom] = useState(false)
    //订单数据
    let [str, setstr]: any = useState([])
    let [juan, setjuan]: any = useState(1.5)
    let location = useLocation()


    const price = (arr: any) => {
        let sum = 0
        arr.forEach((item: { num: number; special_price: number; }) => {
            sum = sum + item.num * item.special_price
        });
        return sum
    }


    const pri = (arr: any) => {
        let sum = 0
        arr.forEach((item: { num: number; price: number; }) => {
            sum = sum + item.num * item.price
        });
        return sum
    }


    const alipay = () => {

    }
    const wechat = () => {
        const stores = store.getState()
        console.log(str[0].money)
        payOrder({
            outTradeNo: str[0].code,
            totalAmount: price(str[0].skus)-juan,
            subject: stores.user.user.name + "'s shopping order",
            body: stores.user.user.name + `is paying for ...`,
        }).then((res: any) => {
            if (res.code == 200) {
                console.log(res)
                // this.$message.success('jumping to alipay page');
                setTimeout(() => window.location.replace(res.data), 500)
            }
        })
    }
    //获取个人订单，
    const oreder = async (id: number) => {
        const result: any = await getorder({ customer_id: id })

        str = result.data.filter((item: any) => item.code == location.state.code)
        // console.log(str, '--***')
        setstr([...str])

    }
    //删选订单

    useEffect(() => {
        // console.log(path)




        const id = store.getState()
        // console.log(id.user.user.id)
        oreder(id.user.user.id)
        // getAddress(datas).then((res) => {
        //     if (res.code == 200) {
        //         setStr(res.data.slice(0, 1))
        //     }
        // })
    }, [])

    const image = (item: any) => {
        let a = ''
        a = JSON.parse(item)[0].small
        // console.log(item)
        return a
    }
    const manys = () => {
        setShowBottom(true)

    }
    //支付宝

    // ⚠️ 目前不可用，设置支付宝沙箱环境，仅 Android 支持
    // Alipay.setAlipaySandbox(isSandbox);



    return (
        <div className={style.commodity}>
            <div className={style['pay']}>
                <ul>
                    <li>
                        <span>支付方式</span>
                        <span>支付宝(仅支持)</span>
                    </li>
                    <li>
                        <span>配送方式</span>
                        <span>雷电快送：200⚡值(江浙沪包邮)</span>
                    </li>
                    <li>
                        <span>送货时间</span>
                        <span>365days(地球不爆炸我们不放假)</span>
                    </li>
                </ul>
            </div>
            <div>
                {str.map((item: any, i: number) => {
                    return (
                        <div key={item.id}>
                            <p>订单号：{item.code}</p>
                            <ul className={style.list}>

                                {
                                    item.skus.map((item: any) => {
                                        return (
                                            <li key={item.id}>
                                                <div className={style.left}>
                                                    <div className={style.imim}>
                                                        <img src={image(item.imgs)} alt="" />
                                                    </div>
                                                    <div className={style.shop}>
                                                        <p>商品名称：{item.title}</p>
                                                        <p className={style.price}>商品原价：<span>￥{item.price}元</span></p>
                                                        <p>商品价格：<span style={{ color: 'red' }}>￥{item.special_price}元</span></p>
                                                        <p>{JSON.parse(item.param)}</p>
                                                    </div>
                                                </div>
                                                <div className={style.quantity}>数量：{item.num}</div>
                                            </li>)
                                    })}

                            </ul>
                            <div className={style['money']}>
                                <ul>
                                    <li>
                                        <span>商品金额</span>
                                        {/* <span>￥{shop.special_price}</span> */}
                                    </li>
                                    <li>
                                        <span>运费</span>
                                        <span>包邮⚡</span>
                                    </li>
                                    <li>
                                        <span>优惠券</span>
                                        <span>￥{juan}</span>
                                    </li>
                                 
                                </ul>
                            </div>
                            <div className={style.subtotal}>
                                <ul>
                                    <li>
                                        <p>商品总价格：</p>
                                        <p>￥{pri(item.skus)}元</p>
                                    </li>
                                    <li>
                                        <p>优惠：</p>
                                        <p>￥ {pri(item.skus) - price(item.skus)}元</p>
                                    </li>
                                    <li>
                                        <p>其他</p>
                                        <p>￥0元</p>
                                    </li>
                                    <li>
                                        <span>实付金额</span>
                                        <span className={style['fact']}>￥{price(item.skus)-juan}</span>
                                    </li>
                                </ul>

                            </div>
                            <div className={style.buttom}>
                                <div>
                                    <p>总计</p>
                                    <p className={style.price}>￥{price(item.skus)-juan}元</p>
                                </div>
                                <div className={style.btn}>
                                    <button onClick={() => manys()}>结算</button>

                                </div>
                            </div>
                        </div>

                    )

                })}



            </div>

            <div>

            </div>
            <Popup visible={showBottom} style={{ height: '200px' }} position="bottom" onClose={() => { setShowBottom(false) }}>
                <div className={style.payment}>
                    <div onClick={e => wechat()}>
                        <img src="https://stride.fun/static/img/alipay.3eb09b48.jpeg" alt="" />
                    </div>
                    <div onClick={e => alipay()}>
                        <img src="https://stride.fun/static/img/wecart.76711447.jpeg" alt="" />
                    </div>
                </div>
            </Popup>

        </div>
    )
}
export default index
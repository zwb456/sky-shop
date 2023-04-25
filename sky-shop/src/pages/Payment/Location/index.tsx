import React, { useState, useEffect, } from "react";
// import { getorder } from '@/api/order'
import style from './index.module.less'
import { useNavigate, useLocation } from "react-router-dom";
import { store } from '@/store'
import { getAddress, getDefaultAddress } from '@/api/use'
import '@nutui/nutui-react/dist/style.css'
import { Popup, Cell } from '@nutui/nutui-react';
import List from '../li'
const index = () => {
    let [str, setStr] = useState([])
    const location = useLocation()
    console.log(location)
    let Ids = localStorage.getItem('userInfo')

    let datas = {
        customer_id: Ids
    }
    //地址
    const [showBottom, setShowBottom] = useState(false)
    //地址列表
    const [list, setList]: any = useState([])
    //默认收获地址列表
    let [listone, setListone]: any = useState([])
    //地址显示隐藏
    let [dree, setdree] = useState(true)
    let push = useNavigate()
    //获取地址列表
    const get = async () => {
        const stores = store.getState()
        // let a = stores.user.user.id
        const result: any = await getAddress({ customer_id: stores.user.user.id })
        if (result.code == 402) {
            setdree(false)
        }
        let a: any = result.data
        console.log(result, stores.user.user.id)
        if (a) {

            if (a.length > 0) {

                list.splice(0)

                a.forEach((item: any) => {
                    list.push(item)
                });
                setList([...list])
                console.log(list)
                // let b = a.filter((item: any) => item.state == 0)
                // console.log(b)
            }
        }
    }
    //
    //获取默认地址
    const DefaultAddress = async () => {
        const stores = store.getState()
        // let a = stores.user.user.id
        const result: any = await getDefaultAddress({ customer_id: stores.user.user.id })
        if (result.code == 402) {
            setdree(false)
        }
        if (result.code == 402) {
            setdree(false)
        }
        let a: any = result.data
        console.log(result, stores.user.user.id)
        if (a) {

            if (a.length > 0) {

                listone.splice(0)

                a.forEach((item: any) => {
                    listone.push(item)
                });
                setListone([...listone])
                console.log(listone)
                // let b = a.filter((item: any) => item.state == 0)
                // console.log(b)
            }
        }

    }
    useEffect(() => {
        get()
        DefaultAddress()
    }, [])

    const del = () => {

    }
    const edit = () => {

    }
    //图片处理函数
    const image = (item: any) => {
        let a = ''
        a = JSON.parse(item)[0].small
        // console.log(item)
        return a
    }
    const click = (item: any) => {
        console.log(item)

        // 
        setShowBottom(false)
        listone.splice(0)
        listone.push(item)
        console.log(listone)
        setListone([...listone])

    }
    return (
        <div>
            <div className={style['addInfo']}>
                <div className={style.addtile} style={{ display: dree ? 'none' : 'block' }}>
                    <p>您未设置收货地址请添加收获地址</p>
                    <button onClick={() => push('/selectAdd')}>添加地址</button>
                </div>
                <div className={style.addtile} style={{ display: !dree ? 'none' : 'block' }}>
                    {listone.map((item: any, i: number) => {
                        return (
                            <div key={item.id}>
                                <List del={del} edit={edit} list={listone}></List>
                            </div>
                        )
                    })}
                    <div>
                        <button onClick={() => setShowBottom(true)}>选择其他收获地址</button>
                    </div>
                </div>
                {str.map((item: any, i: number) => {
                    return (
                        <div key={item.id}>
                            <p>请选择收获地址</p>
                        </div>
                    )
                })}

            </div>
            <Popup visible={showBottom} style={{ height: '200px' }} position="bottom" onClose={() => { setShowBottom(false) }}>
                <div className={style.payment}>
                    <List del={del} edit={edit} list={list} clickto={click}></List>
                </div>
            </Popup>

        </div>
    )
}
export default index
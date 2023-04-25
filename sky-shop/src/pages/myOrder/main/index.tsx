import style from './index.module.less'

import '@nutui/nutui-react/dist/style.css'
import { useState, useEffect, useRef } from "react";
import img from '@/pages/myOrder/image/default.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { getorder } from '@/api/order'
import { store } from '@/store'
import { Checkbox, InputNumber, } from '@nutui/nutui-react';
interface props {
    toclick?: any
}
//

const index = (props: props) => {
    const path = useLocation()

    const Navigate = useNavigate()
    const id = store.getState()
    const many = (arr: any) => {
        let a = 0
        arr.forEach((t: any) => {
            a += t.money
        });
        return a
    }
    let [list, setlist]: any = useState([])
    let [list2, setlist2]: any = useState([])
    //定义路由
    let [paths, setPath] = useState('c1')
    let [mesage, setmesage] = useState('您还没有订单')
    //待付款
    let [listm1, setlitm1]: any = useState([])
    //待发货
    let [listm2, setlitm2]: any = useState([])
    //待收货
    let [listm3, setlitm3]: any = useState([])
    //图片处理函数
    const image = (item: any) => {
        let a = ''
        a = JSON.parse(item)[0].small
        return a
    }
    //型号处理函数
    const mag = (item: any) => {
        let a = ''
        a = item.JSON.parse(a)[0]
        return a
    }
    const oreder = async (id: number) => {
        const result: any = await getorder({ customer_id: id })
        console.log(result, '--***')
        let a = result.data[2].skus[0].param
        // console.log(a)
        let b = JSON.parse(a)
        console.log(b[0])
        // console.log(result.data[0].skus[0].imgs.split(',')[0].split('":')[1])
        list = [...result.data]

        setlist([...list])
    }
    useEffect(() => {
        console.log(path)




        const id = store.getState()
        console.log(id.user.user.id)
        oreder(id.user.user.id)

    }, [])
    // const flter = () => {
    //     if (list) {
    //         if (path.search == '?c1') {
    //             // condition
    //             setmesage('您还没有订单')
    //             list2 = [...list]
    //             listm2 = [...list]
    //             setlist2([...list2])
    //             setlitm2([...listm2])
    //         }
    //         if (path.search == '?c2') {
    //             // condition
    //             let a = list.filter(((item: any) => item.status == 0))
    //             list2 = [...a]
    //             listm1 = [...a]
    //             setlist2([...list2])
    //             setlitm1([...listm1])
    //             setmesage('您没有待付款商品')
    //         }
    //         if (path.search == '?c3') {
    //             setmesage('您没有待发货商品')
    //             // condition
    //             let a = list.filter(((item: any) => item.status == 1))
    //             list2 = [...a]
    //             listm2 = [...a]
    //             setlist2([...list2])
    //             setlitm2([...listm2])
    //         }
    //         if (path.search == '?c4') {
    //             setmesage('您没有待收货商品')
    //             // condition
    //             let a = list.filter(((item: any) => item.status == 3))
    //             list2 = [...a]
    //             listm3 = [...a]
    //             setlist2([...list2])
    //             setlitm3([...listm3])
    //         }
    //     }
    // }
    const flter = () => {
        if (list) {

            // condition
            let a: any = list.filter(((item: any) => item.status == 0))
            listm1 = [...a]
            setlitm1([...listm1])


            // condition
            let b = list.filter(((item: any) => item.status == 1))
            listm2 = [...b]

            setlitm2([...listm2])

            let c = list.filter(((item: any) => item.status == 3))

            listm3 = [...c]
            setlitm3([...listm3])
        }
    }
    useEffect(() => {
        flter()
        console.log(list)
    }, [list])
    //监听路由
    useEffect(() => {
        let b = path.search.split('?')[1]
        if (b == 'c1') {
            setPath('c1')
            setmesage('随便逛逛')
        }
        if (b == 'c2') {
            setPath('c2')
            setmesage('你未有待付款商品')
          
        }
        if (b == 'c3') {
            setPath('c3')
            setmesage('你未有待发货商品')
           
        }
        if (b == 'c4') {
            setPath('c4')
            setmesage('你未有代收货商品')
        }
        console.log(paths)
    }, [path])
    const dis = (istrue: any) => {
        let a = false;

        number8.forEach((t: number) => {
            if (istrue == t - 1) {

                a = true
            }

        });


        return a

    }

    const [number8, setnumber8]: any = useState([])

    const single = (a: any, item: any) => {

    }
    const del = async (item: any, index: any) => {

        // let a = await deleteShopCar({ id: item.id });
        // addgetShopCar()


    }
    const [checkboxgroup2, setCheckboxgroup2]: any = useState([])
    const checkboxgroup2Ref = useRef(null)
    const [checkbox1, setCheckbox1] = useState(false)
    const [indeterminate, setIndeterminate] = useState(false)
    const updata = async (num1: any, id1: any) => {
        //    number6()

        // let a = await updataShopCar({ num: num1, id: id1 });
        // console.log('aaaaaaaa', a);

        //    addgetShopCar()

    }
    // 购物车加减
    const stop = (e: any) => {
        e.stopPropagation();

    }
    const onadd = (item: any) => {
        let num
        num = item.num += 1
        updata(num, item.id)
    }

    const onReduce = (item: any) => {

        let num: any;
        if (item.num > 1) {
            num = item.num -= 1

            updata(num, item.id)

        }
        //    number6()

        // addShopList(item1)



    }

    // useEffect(() => {
    //     flter()
    //     // console.log(list, list2)
    // }, [list])
    return (
        <div className={style.order}>
            {
                <div >

                    <div style={{ display: paths == 'c1' || paths == 'c2' ? 'block' : 'none' }}>
                        <p>待付款</p>
                        {

                            listm1.map((item: any, index: any) => {
                                return (

                                    <ul key={index}>
                                        <li>
                                            <div className={style.prce}>
                                                <div className={style.title}>
                                                    <p>单号:{item.code}</p>
                                                    <p>价格:${item.money}</p>
                                                    <p>下单时间:{item.update_time}</p>
                                                    <button >去支付</button>
                                                </div>
                                                <div>

                                                </div>
                                                <ul>
                                                    {item.skus.map((item: any, i: number) => {
                                                        return (
                                                            <li className={style['addshoping']} key={i}>
                                                                <div className={style['addshoping-1']} >
                                                                    <div className={style['left']}>
                                                                        <img src={image(item.imgs)} alt="" />
                                                                    </div>
                                                                    <div className={style['right']}>
                                                                        <div className={style['right-1']}> <p>{item.title}</p>
                                                                            <p>{item.params}</p>
                                                                        </div>
                                                                        <div className={style['right-2']}>
                                                                            <div>
                                                                                <p>￥{item.price}</p>

                                                                            </div>
                                                                            <div onClick={(e) => { stop(e) }}>

                                                                                <InputNumber modelValue={item.num
                                                                                }
                                                                                    onAdd={() => {
                                                                                        onadd(item)
                                                                                    }}
                                                                                    onReduce={() => {
                                                                                        onReduce(item)
                                                                                    }}
                                                                                />
                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </li>

                                                        )
                                                    })}

                                                </ul>


                                            </div>
                                        </li>
                                    </ul>

                                )
                            })
                        }
                    </div>
                    <div style={{ display: paths == 'c1' || paths == 'c3' ? 'block' : 'none' }}>
                        <p>待收货</p>
                        {
                            listm2.map((item: any, index: any) => {
                                return (


                                    <ul key={index}>

                                        <li>
                                            <div>
                                                <div className={style.title}>
                                                    <p>单号:{item.code}</p>
                                                    <p>价格:${item.money}</p>
                                                    <p>下单时间:{item.update_time}</p>
                                                </div>

                                                <ul>
                                                    {item.skus.map((item: any, i: number) => {
                                                        return (
                                                            <li className={style['addshoping']} key={i}>
                                                                <div className={style['addshoping-1']} >
                                                                    <div className={style['left']}>
                                                                        <img src={image(item.imgs)} alt="" />
                                                                    </div>
                                                                    <div className={style['right']}>
                                                                        <div className={style['right-1']}> <p>{item.title}</p>
                                                                            <p>{item.params}</p>
                                                                        </div>
                                                                        <div className={style['right-2']}>
                                                                            <div>
                                                                                <p>￥{item.price}</p>

                                                                            </div>
                                                                            <div onClick={(e) => { stop(e) }}>

                                                                                <InputNumber modelValue={item.num
                                                                                }
                                                                                    onAdd={() => {
                                                                                        onadd(item)
                                                                                    }}
                                                                                    onReduce={() => {
                                                                                        onReduce(item)
                                                                                    }}
                                                                                />
                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </li>

                                                        )
                                                    })}

                                                </ul>


                                            </div>
                                        </li>

                                    </ul>

                                )
                            })
                        }
                    </div>
                    <div style={{ display: paths == 'c1' || paths == 'c4' ? 'block' : 'none' }}>
                        <p>待发货</p>
                        {
                            listm3.map((item: any, index: any) => {
                                return (
                                    <ul key={index}>

                                        <li>
                                            <div>

                                                <div className={style.title}>
                                                    <p>单号:{item.code}</p>
                                                    <p>价格:${item.money}</p>
                                                    <p>下单时间:{item.update_time}</p>
                                                </div>

                                                <ul>
                                                    {item.skus.map((item: any, i: number) => {
                                                        return (
                                                            <li className={style['addshoping']} key={i}>
                                                                <div className={style['addshoping-1']} >
                                                                    <div className={style['left']}>
                                                                        <img src={image(item.imgs)} alt="" />
                                                                    </div>
                                                                    <div className={style['right']}>
                                                                        <div className={style['right-1']}> <p>{item.title}</p>
                                                                            <p>{item.params}</p>
                                                                        </div>
                                                                        <div className={style['right-2']}>
                                                                            <div>
                                                                                <p>￥{item.price}</p>

                                                                            </div>
                                                                            <div onClick={(e) => { stop(e) }}>

                                                                                <InputNumber modelValue={item.num
                                                                                }
                                                                                    onAdd={() => {
                                                                                        onadd(item)
                                                                                    }}
                                                                                    onReduce={() => {
                                                                                        onReduce(item)
                                                                                    }}
                                                                                />
                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </li>

                                                        )
                                                    })}

                                                </ul>


                                            </div>
                                        </li>

                                    </ul>

                                )
                            })
                        }
                    </div>



                    <div className={style.orderdefult} style={{ display: paths == 'c1' && listm1.length == 0 && listm2.length == 0 && listm3.length == 0 || paths == 'c2' && listm1.length == 0 || paths == 'c3' && listm2.length == 0 || paths == 'c4' && listm3.length == 0 ? 'block' : 'none' }}>
                        <div>
                            <img src={img} alt="" />
                        </div>
                        <div>

                            <p>{mesage}</p>
                        </div>
                        <div>
                            <button onClick={() => Navigate('/home')}>
                                随便逛逛
                            </button>
                        </div>
                    </div>
                </div>

            }

            <div>

            </div>
        </div >
    );


}
export default index

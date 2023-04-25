import React, { useState } from 'react';
import { NavBar } from '@nutui/nutui-react';
import { createBrowserHistory } from 'history';
import '@nutui/nutui-react/dist/style.css';
import styles from './index.module.less';


const WrapperStyle = {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
}
const ContentStyle = {
    display: 'flex',
    width: '150px',
    height: '150px',
    background: '#fff',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red'
}
const coupon: React.FC = () => {

    const [visible2, setVisible2] = useState(false)
    const handleToggleShow2 = () => {
        setVisible2(true)
    }
    const onClose2 = () => {
        setVisible2(false)
    }
    let couponList: any = [
        {
            price: 50,
            title: '随机立减券',
            expiration: '2023/4/ 28',
            backgroundColor: '#ff9c61'
        },
        {
            price: 100,
            title: '满减券',
            expiration: '2023/6/ 22',
            backgroundColor: '#88d1fe'
        },
        {
            price: 50,
            title: '折扣券',
            expiration: '2024/5/ 1',
            backgroundColor: '#c09bfe'
        },
        {
            price: 50,
            title: '抵扣券',
            expiration: '2023/6/ 1',
            backgroundColor: '#fe9fa9'
        },
    ]
    const history = createBrowserHistory();
    const historyGo = () => {
        history.go(-1);
    }
    return (
        <div className={styles.box}>
            {/* 顶部导航 */}
            <div className={styles.topNav}>
                <NavBar
                    title="优惠券"
                    leftShow
                    onClickTitle={(e) => alert("标题")}
                    onClickBack={(e) => historyGo()}
                >
                </NavBar>
            </div>


            <div className={styles.mainbox}>
                {
                    couponList.map((item: any) => {
                        return (

                            <div className={styles.card} key={item.expiration}>
                                <div className={styles.couponCard} style={{ backgroundColor: item.backgroundColor }}>
                                    <span>{item.price}元</span>
                                    <span>{item.title}</span>
                                    <button>领取</button>
                                </div>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <div className={styles.couponbut}>
                                    <p>有效日期至:{item.expiration}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    );
};

export default coupon;
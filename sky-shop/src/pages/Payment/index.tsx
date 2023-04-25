import React from 'react'
import style from './index.module.less'
import Navbar from './Navbar'
import Location from './Location'
import Commodity from './Commodity'

const index: React.FC = () => {
    return (
        <div className={style.payment}>

            <Navbar></Navbar>
            <div className={style.Nav}>

            <Location ></Location>
            </div>
            <Commodity></Commodity>
        </div>
    )
}

export default index
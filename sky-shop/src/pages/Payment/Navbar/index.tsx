import { useState, } from 'react'
import Style from './index.module.less'
import { useNavigate } from 'react-router-dom'
import {
    FormPrevious
} from 'grommet-icons';
import { NavLink } from 'react-router-dom'



const index: () => JSX.Element = () => {
    let push = useNavigate()
    let [lin, getLin] = useState(false)

    const back = () => {
        push(-1)
    }

    const forget = () => {
        getLin(!lin)
    }

    return (
        <div className={Style.stroll}>
            <nav>
                <div className={Style.icon} onClick={e => back()}>

                    <FormPrevious />
                    {/* <span>注册</span> */}
                </div>
                <p>结算</p>
            </nav>
        </div>
    )
}

export default index
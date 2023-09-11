import { Input } from "antd"
import { useState } from "react"
import {useContractReads} from "wagmi";

const BalanceOf = (props: any) => {

    const [address, setAddress] = useState('')
    
    const {
        data,
        error,
        isError,
        isLoading,
    } = useContractReads({
    contracts: [
        { 
            ...props.contract,
            functionName: "balanceOf",
            args: [address],
            enabled: address !== "",
        },
    ],
    })
    console.log(data)
    console.log(isLoading)

    return (
        <div style={{width: '100%',padding: '20px'}}>
            <h1 style={{ paddingBottom: '10px'}}>查询代币余额</h1>
            <Input
                placeholder="输入钱包地址自动查询代币余额"
                value={address}
                allowClear
                onChange={(e) => { setAddress(e.target.value) }}
                style={{width: '100%',height: '40px'}}
            />
        </div>
    )
}

export default BalanceOf
import {useContractReads} from "wagmi";

const Details = (props: any) => {
    console.log(props)
    const { data } = useContractReads({
    contracts: [
        { 
            ...props.contract,
            functionName: "name",
            },
        { 
            ...props.contract,
            functionName: "symbol",
        },
        { 
            ...props.contract,
            functionName: "decimals",
        },
        { 
            ...props.contract,
            functionName: "totalSupply",
        },
    ],
    })
    
    console.log(data)

    return (
        <div style={{display: 'flex',flexDirection: 'column'}}>
            <h1>代币信息</h1>
            {
                data ?
                    <div style={{display: 'flex',flexDirection: 'column'}}>
                        <text>代币名称：{data[0]?.result}</text>
                        <text>代币符号：{data[1]?.result}</text>
                        <text>代币精度：{data[2]?.result}</text>
                        <text>代币总量：{data[3]?.result}</text>
                    </div>
                    : null
            }
            
        </div>
    )
}

export default Details
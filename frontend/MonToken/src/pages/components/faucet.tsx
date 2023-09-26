import { Button,message } from "antd"
import { useState,useEffect } from "react";
import { useContractReads,usePrepareContractWrite,useContractWrite,useWaitForTransaction } from 'wagmi'
import {getContract} from '@wagmi/core'


const Faucet = (props: any) => {

    const [messageApi, contextHolder] = message.useMessage();

    const [amountEachTime, setAmountEachTime] = useState(1)
    const contract = getContract(props.contract)

    console.log('contract', contract)

    const { data: res } = useContractReads({
            contracts: [
                { 
                    ...props.contract,
                    functionName: "amountEachTime",
                },
            ],
        })
    
    useEffect(() => {
        if (res && res[0].result) {
            setAmountEachTime(parseInt(res[0].result.toString()))
        }
    },[res])

      // 领币
    const { config: withdrawConfig, isError: isPrepareError } = usePrepareContractWrite({
        address: contract.address,
        abi: contract.abi,
        functionName: "withdraw",
        onSettled(data, error) {
            console.log('Settled', { data, error })
        },
        onError(error) {
            console.log('Error', error)
        },
    });

    const { write, data, isError: isWriteError,isLoading: isWriteLoading } = useContractWrite(withdrawConfig);

    const { isLoading: isTransactionLoading,isError: isWaitTransactionError } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess: () => { messageApi.success('领取成功') }
    });

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            {contextHolder}
            <h1 style={{ paddingBottom: '10px'}}>领取代币</h1>
            <Button
                disabled={!write}
                loading={isWriteLoading || isTransactionLoading}
                onClick={() => {
                console.log('111')
                write?.()
            }}>领取</Button>
            <div>{isWriteError}</div>
        </div>
    )
}

export default Faucet
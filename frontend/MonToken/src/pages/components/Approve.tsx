import { Input,Button,message } from "antd"
import { useState } from "react"
import {usePrepareContractWrite,useContractWrite,useWaitForTransaction} from "wagmi";

const Approve = (props) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [address, setAddress] = useState('')
    const [value, setValue] = useState(0)

    const success = () => {
        messageApi.open({
        type: 'success',
        content: `授权成功，交易哈希：${data?.hash}`,
        });
    };
    
    const { config } = usePrepareContractWrite({
        ...props.contract,
        functionName: "approve",
        args: [address, value],
        enabled: address !== "" && value > 0,
        onError(error) {
            console.log('Error', error)
        },
    });

    const {
        data,
        isLoading: isWriteLoading,
        error: writeError,
        write,
        isError: isWriteError,
    } = useContractWrite(config);

    console.log('isWriteError',isWriteError)

    const {
        error: transactionError,
        isLoading: isTransactionLoading,
        isError: isTransactionError,
    } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess: () => {success()},
    });

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            {contextHolder}
            <h1 style={{ paddingBottom: '10px'}}>授权</h1>
            <Input
                placeholder="输入授权地址"
                value={address}
                allowClear
                onChange={(e) => { setAddress(e.target.value) }}
                style={{width: '100%',height: '40px'}}
            />
            <Input
                placeholder="输入授权数量"
                value={value}
                allowClear
                onChange={(e) => { setValue(parseInt(e.target.value)) }}
                style={{width: '100%',height: '40px'}}
            />
            <Button
                disabled={!write || isWriteLoading || isTransactionLoading}
                onClick={() => {
                write?.();
                }}
            >
                授权
            </Button>

            {isWriteError || isTransactionError ? (
                <text>
                {`授权失败，失败原因：${writeError || transactionError}`}
                </text>
            ) : null}
        </div>
    )
}

export default Approve
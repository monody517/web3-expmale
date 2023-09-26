import { Input,Button,message } from "antd"
import { useState } from "react"
import {usePrepareContractWrite,useContractWrite,useWaitForTransaction} from "wagmi";

const Approve = (props) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [address, setAddress] = useState([''])
    const { TextArea } = Input
    const [value, setValue] = useState(0)

    const success = () => {
        messageApi.open({
        type: 'success',
        content: `空投成功，交易哈希：${data?.hash}`,
        });
    };

    const setAddr = (value:string) => {
        setAddress(value.split("\n"))
    }
    
    const { config } = usePrepareContractWrite({
        ...props.contract,
        functionName: "oneToMany",
        args: [address, value],
        onError(error) {
            console.log('Error', error)
        },
    });

    console.log('config', config)
    console.log('props.contract',props.contract)

    const {
        data,
        isLoading: isWriteLoading,
        error: writeError,
        write,
        isError: isWriteError,
    } = useContractWrite(
        {
            ...config,
            onError(error) {
                console.log('Error', error)
            }
        }
    );


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
            <h1 style={{ paddingBottom: '10px'}}>多个地址使用相同的数量进行空投</h1>
            <TextArea  rows={5} onChange={(e)=>{setAddr(e.target.value)}} />
            <Input
                placeholder="输入数量"
                value={value}
                allowClear
                onChange={(e) => { setValue(parseInt(e.target.value)) }}
                style={{width: '100%',height: '40px'}}
            />
            <Button
                disabled={!write}
                loading={isWriteLoading || isTransactionLoading}
                onClick={() => {
                write?.()
                }}
            >
                发送
            </Button>

            {isWriteError || isTransactionError ? (
                <text>
                {`空投失败，失败原因：${writeError || transactionError}`}
                </text>
            ) : null}
        </div>
    )
}

export default Approve
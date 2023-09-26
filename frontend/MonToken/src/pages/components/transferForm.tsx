import { Input,Button,message } from "antd"
import { useState } from "react"
import {usePrepareContractWrite,useContractWrite,useWaitForTransaction} from "wagmi";

const TransferForm = (props) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [form, setForm] = useState('')
    const [to ,setTo] = useState('')
    const [amount, setAmount] = useState(0)

    const success = () => {
        messageApi.open({
        type: 'success',
        content: '转账成功',
        });
    };
    
    const { config } = usePrepareContractWrite({
        ...props.contract,
        functionName: "transferFrom",
        args: [form, to, amount],
        enabled: form !== "" && to !== "" && amount > 0,
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
            <h1 style={{ paddingBottom: '10px' }}>通过授权账户转账</h1>
            <Input
                placeholder="输入转出地址"
                value={form}
                allowClear
                onChange={(e) => { setForm(e.target.value) }}
                style={{width: '100%',height: '40px'}}
            />
            <Input
                placeholder="输入转入地址"
                value={to}
                allowClear
                onChange={(e) => { setTo(e.target.value) }}
                style={{width: '100%',height: '40px'}}
            />
            <Input
                placeholder="输入转账数量"
                value={amount}
                allowClear
                onChange={(e) => { setAmount(parseInt(e.target.value)) }}
                style={{width: '100%',height: '40px'}}
            />
            <Button
                disabled={!write}
                loading={isWriteLoading || isTransactionLoading}
                onClick={() => {
                write?.();
                }}
            >
                转账
            </Button>
        </div>
    )
}

export default TransferForm
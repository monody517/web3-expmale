import { Input,Button } from "antd"
import { useState } from "react"
import {usePrepareContractWrite,useContractWrite,useWaitForTransaction} from "wagmi";

const Transfer = (props: any) => {

    const [address, setAddress] = useState('')
    const [amount, setAmount] = useState(0)
    
    const { config } = usePrepareContractWrite({
        ...props.contract,
        functionName: "transfer",
        args: [address, amount],
        enabled: address !== "" && amount > 0,
        onError(error) {
            console.log('Error', error)
        },
    });
    
    console.log('config',config)

    const {
        data,
        isLoading: isWriteLoading,
        error: writeError,
        write,
        isError: isWriteError,
    } = useContractWrite(config);

    const {
        error: transactionError,
        isLoading: isTransactionLoading,
        isError: isTransactionError,
    } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess: () => {
        toast({
            title: "转账成功",
            description: `转账成功，交易哈希：${data?.hash}`,
            status: "success",
        });
        },
  });

    return (
        <div style={{width: '100%',padding: '20px'}}>
            <h1 style={{ paddingBottom: '10px'}}>转账</h1>
            <Input
                placeholder="输入转账地址"
                value={address}
                allowClear
                onChange={(e) => { setAddress(e.target.value) }}
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
                disabled={!write || isWriteLoading || isTransactionLoading}
                onClick={() => {
                write?.();
                }}
            >
        转账
      </Button>

      {isWriteError || isTransactionError ? (
        <text>
          {`转账失败，失败原因：${writeError || transactionError}`}
        </text>
      ) : null}
        </div>
    )
}

export default Transfer
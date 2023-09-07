import React from 'react';
import { abi } from '../../../../../data/MonToken.json'
import { Counter } from '../../../../../data/contract-address.json'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
  useContractReads,
  useContractEvent,
} from "wagmi";

const MonTokenInfo = () => {

    const contract = {
        address: Counter,
        abi: abi,
    } as const

    console.log(contract)

    const { data, error, isError, isLoading } = useContractReads({
        contracts: [
        { 
            ...contract,
            functionName: "name",
        },
    ],
    }) as any;
    
    console.log(data)

    return (
        <div>
            <h1></h1>
        </div>
    )
}


export default MonTokenInfo
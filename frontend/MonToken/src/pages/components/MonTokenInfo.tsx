import { abi } from '../../../../../data/MonToken.json'
import { FaucetAbi } from '../../../../../data/Faucet.json'
import { Counter } from '../../../../../data/MonToken-contract-address.json'
import { FaucetCounter } from '../../../../../data/Faucet-contract-address.json'
import Details from '../components/details'
import BalanceOf from '../components/BalanceOf'
import Transfer from '../components/transfer'
import TransferForm from '../components/transferForm'
import Faucet from '../components/faucet'
import Approve from './Approve'

const MonTokenInfo = () => {

    const MonTokenContract = {
        address: Counter,
        abi: abi,
    } as const

    const FaucetContract = {
        address: FaucetCounter,
        abi: FaucetAbi,
    } as const

    console.log('FaucetContract',FaucetContract)

    return (
        <div style={{display: 'flex',flexDirection: 'column',padding: '40px'}}>
            <Details contract={MonTokenContract} />
            <BalanceOf contract={MonTokenContract} />
            <Transfer contract={MonTokenContract} />
            <Approve contract={MonTokenContract} />
            <TransferForm contract={MonTokenContract} />
            <Faucet contract={FaucetContract} />
        </div>
    )
}


export default MonTokenInfo
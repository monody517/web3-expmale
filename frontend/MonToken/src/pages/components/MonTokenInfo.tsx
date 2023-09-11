import { abi } from '../../../../../data/MonToken.json'
import { Counter } from '../../../../../data/contract-address.json'
import Details from '../components/details'
import BalanceOf from '../components/BalanceOf'

const MonTokenInfo = () => {

    const contract = {
        address: Counter,
        abi: abi,
    } as const

    console.log(contract)

    return (
        <div style={{display: 'flex',flexDirection: 'column',padding: '40px'}}>
            <Details contract={contract} />
            <BalanceOf contract={contract} />
        </div>
    )
}


export default MonTokenInfo
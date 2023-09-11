import { abi } from '../../../../../data/MonToken.json'
import { Counter } from '../../../../../data/contract-address.json'
import Details from '../components/details'

const MonTokenInfo = () => {

    const contract = {
        address: Counter,
        abi: abi,
    } as const

    console.log(contract)

    return (
        <div style={{display: 'flex',flexDirection: 'column'}}>
            <Details contract={contract} />
        </div>
    )
}


export default MonTokenInfo
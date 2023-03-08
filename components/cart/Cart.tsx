import {useRouter} from 'next/router'
import {useAppSelector} from '../../static/store'
import {selectCartInfo} from '../../static/store/cart-slice'
import CartItem from './CartItem'
const Cart = () => {
    const router = useRouter()
    const {products, totalCost, quantityAllItems} = useAppSelector(store => selectCartInfo(store))
    return(
        <div className='grid md:grid-cols-4 md:gap-5'>
            <div className='overflow-x-auto md:col-span-3'>
                <table className='min-w-full'>
                    <thead className='border-b'>
                    <tr>
                        <th className='text-left px-5'>Item</th>
                        <th className='text-center p-5'>Quantity</th>
                        <th className='text-center p-5'>Price</th>
                        <th className='p-5'>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {products && products.map(i => <CartItem key={i.slug} item={i}/>)}
                    </tbody>
                </table>
            </div>

            <ul className='total-card flex-col justify-between card p-5' style={{display: 'flex'}}>
                <li className='text-xl text-gray-700 pb-3'>
                    Subtotal ({quantityAllItems}): <span className='font-bold text-black'>${totalCost}</span>
                </li>
                <li>
                    <button className='primary-button w-full' onClick={() => router.push('login?redirect=/shipping')}>Check Out</button>
                </li>
            </ul>
        </div>
    )
}
export default Cart

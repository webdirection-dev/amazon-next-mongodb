import dynamic from 'next/dynamic'
import {useAppSelector} from '../static/store'
import {selectCartInfo} from '../static/store/cart-slice'

import General from '../layout/General'
import Cart from '../components/cart/Cart'
import CartEmpty from '../components/cart/CartEmpty'

const CartScreen = () => {
    const {productsLength} = useAppSelector(store => selectCartInfo(store))

    return(
        <General title='Shopping Cart | NextJS'>
            <h1 className='text-xl mb-4'>Shopping Cart</h1>
            { productsLength > 0 ? <Cart /> : <CartEmpty /> }
        </General>
    )
}
export default dynamic(() => Promise.resolve(CartScreen), {ssr: false})

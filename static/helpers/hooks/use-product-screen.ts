import {useRouter} from 'next/router'
import {useAppDispatch} from '../../store'
import {addProductToCart} from '../../store/cart-slice'
import {useEffect, useState} from 'react'
import {products} from '../../dblocal/dbproducts'

export const useProductScreen = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [product, setProduct] = useState<any>({})

    const addToCartHandler = () => {
        dispatch(addProductToCart(product))
    }

    useEffect(() => {
        const queryData = router.query

        if (queryData.slug) {
            setProduct(queryData)
        } else {
            const localPath = window.location.pathname.split('/').reverse()[0]
            const localProduct = products.find(i => i.slug === localPath)
            setProduct(localProduct)
        }
    }, [router])

    return {query: product, back: router.back, addToCartHandler}
}

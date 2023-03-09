import {useAppDispatch, useAppSelector} from '../../static/store'
import {useEffect, useState} from 'react'
import {selectCartInfo, resetCart} from '../../static/store/cart-slice'
import {useRouter} from 'next/router'
import {useSession, signOut} from 'next-auth/react'

export const useHeader = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {data: session} = useSession()
    const {quantityAllItems} = useAppSelector(store => selectCartInfo(store))
    const [itemsLength, setItemsLength] = useState(0)

    const checkPathname = (path: string) => {
        return router.pathname.endsWith(path)
    }

    const handlerLogout = () => {
        dispatch(resetCart())
        signOut({callbackUrl: '/login'})
    }

    useEffect(() => {setItemsLength(quantityAllItems)
    }, [quantityAllItems])

    return {itemsLength, session, checkPathname, handlerLogout}
}

import {useAppSelector} from '../../static/store'
import {selectCartInfo} from '../../static/store/cart-slice'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'

export const useHeader = () => {
    const router = useRouter()
    const {quantityAllItems} = useAppSelector(store => selectCartInfo(store))
    const [itemsLength, setItemsLength] = useState(0)

    const checkPathname = (path: string) => {
        return router.pathname.endsWith(path)
    }

    useEffect(() => {setItemsLength(quantityAllItems)
    }, [quantityAllItems])

    return {itemsLength, checkPathname}
}

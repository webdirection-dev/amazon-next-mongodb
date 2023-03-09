import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {IObject} from '../../static/types/types-app'
import {useform} from '../../static/lib/useform'
import {signIn, useSession} from 'next-auth/react'
import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {getErrorLocal} from '../../static/helpers/error'

export const useAuth = () => {
    const router = useRouter()
    const {redirect} = router.query
    const {handleSubmit, register, formState: {errors}} = useForm<IObject>()
    const {email, password} = useform
    const {data: session, status} = useSession()
    const [isLoading, setIsLoading] = useState(false)

    const submitHandler = async ({email, password}: IObject) => {
        setIsLoading(true)
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            })
            setIsLoading(false)
            result && result.error && toast(result.error)
        } catch (e) {
            setIsLoading(false)
            toast.error(getErrorLocal(e))
        }
    }

    useEffect(() => {
        session?.user && router.push(redirect as string || '/')
    }, [session])

    return {isLoading, status, handleSubmit, submitHandler, register, email, password, errors}
}

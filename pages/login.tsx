import General from '../layout/General'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import {IObject} from '../static/types/types-app'
import {useform} from '../static/lib/useform'

const LoginScreen = () => {
    const {handleSubmit, register, formState: {errors}} = useForm<IObject>()
    const {email, password} = useform
    const submitHandler = ({email, password}: IObject) => {
        console.log(email)
        console.log(password)
    }

    return(
        <General title='Login Page | NextJS'>
            <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
                <h1 className='text-xl mb-4'>Login</h1>

                <div className='mb-4'>
                    <label htmlFor="email">Email</label>
                    <input
                        className='w-full'
                        id='email'
                        type="email"
                        autoFocus={true}
                        {...register(email.name, email.options)}
                    />
                    {errors?.email && <div className='text-red-500'>{errors.email.message}</div>}
                </div>

                <div className='mb-4'>
                    <label htmlFor="password">Password</label>
                    <input
                        className='w-full'
                        id='password'
                        type="password"
                        {...register(password.name, password.options)}
                    />
                    {errors?.password && <div className='text-red-500'>{errors.password.message}</div>}
                </div>

                <button className='primary-button'>Login</button>
                <p className='mt-4'>
                    Don&apos;t have an account? &nbsp;
                    <Link href='/register'>Register</Link>
                </p>
            </form>
        </General>
    )
}
export default LoginScreen

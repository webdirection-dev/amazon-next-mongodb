import Link from 'next/link'
import {useAuth} from './use-auth'

const LoginForm = () => {
    const {isLoading, status, handleSubmit, submitHandler, register, email, password, errors} = useAuth()

    return(
        <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
            {!isLoading && status === 'unauthenticated' ? (
                <>
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
                </>
            ) : <h1 className='text-xl mb-4'>Loading....</h1>}
        </form>
    )
}
export default LoginForm

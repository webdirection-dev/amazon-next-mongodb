import Image from 'next/image'
import General from '../../layout/General'
import {useProductScreen} from '../../static/helpers/hooks/use-product-screen'
import Link from 'next/link'

const ProductScreen = () => {
    const {query, back, addToCartHandler} = useProductScreen()

    return(
        <General title={query.name + ' | NextJS'}>
            {query.name && (
                <>
                    <div className="py-2">
                        <button className='btn-navigation' onClick={() => back()}>back to product</button>
                    </div>

                    <div className='grid md:grid-cols-4 md:gap-3'>
                        <Image
                            className='md:col-span-2'
                            src={query.image as string}
                            alt={query.name as string}
                            width={640}
                            height={640}
                        />

                        <ul className='list-card'>
                            <li> <h1 className='text-lg'>{query.name}</h1> </li>
                            <li>
                                <span>Category:</span>
                                <h2>{query.category}</h2>
                            </li>
                            <li>
                                <span>Brand:</span>
                                <h2>{query.brand}</h2>
                            </li>
                            <li>
                                {query.rating} of {query.numReviews} reviews
                            </li>
                            <li>
                                Description: {query.description}
                            </li>
                        </ul>

                        <div>
                            <div className='card p-5'>
                                <div className='mb-2 flex justify-between'>
                                    <h2>Price</h2>
                                    <span>${query.price}</span>
                                </div>
                                <div className='mb-2 flex justify-between'>
                                    <h2>Status</h2>
                                    <span>{Number(query.countInStock) > 0 ? 'In stock' : 'Unavailable'}</span>
                                </div>

                                <button className='primary-button w-full' onClick={addToCartHandler}>Add to cart</button>
                                <Link href='/cart'>
                                    <button className='to-cart-button w-full' style={{marginTop: '5px'}} onClick={addToCartHandler}>Add and Go to cart</button>
                                </Link>

                            </div>
                        </div>

                    </div>
                </>
            )}
        </General>
    )
}
export default ProductScreen

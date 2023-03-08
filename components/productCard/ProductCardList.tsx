import {products} from '../../static/dblocal/dbproducts'
import ProductCardItem from './ProductCardItem'
const ProductCardList = () => (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        { products.map(i => <ProductCardItem key={i.slug} item={i} /> ) }
</div>
)
export default ProductCardList

import General from '../layout/General'
import {products} from '../static/db-local/db-products'
import ProductItem from '../components/ProductItem'
const Home = () => (
    <General title='Shop | NextJS'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
            { products.map(i => <ProductItem key={i.slug} item={i} /> ) }
        </div>
    </General>
)
export default Home

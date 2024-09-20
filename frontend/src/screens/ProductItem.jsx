import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import { useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../slices/productsApiSlice'

const ProductItem = () => {
  
  const { pageNumber, keyword } = useParams();

  const { data, } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  return (
    <div>
  <Row>
    <h1>Latest Products</h1>
    {data?.products?.length > 0 ? data.products?.map((product) => (
      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
        <Product product={product} />
      </Col>
    )
    ) : (
      <p className='text-center py-5' >Products Not Found !!!!</p>
    )}
  </Row>
  <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
  </div>
  )
}

export default ProductItem
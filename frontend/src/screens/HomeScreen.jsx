import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import ProductItem from './ProductItem';

const HomeScreen = () => {
  const { isLoading,} = useGetProductsQuery({
  });
  return (
    <>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Meta />
          <HeroSection />
          <Features />
         
          <ProductItem/>
        </>
      )}
    </>
  );
};

export default HomeScreen;

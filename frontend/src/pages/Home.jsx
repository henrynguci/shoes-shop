import React from 'react';
import HeroBanner from "../components/HeroBanner";
import Wrapper from "../components/Wrapper";
import ProductCard from "../components/ProductCard";
import products from './data.js'

const Home = () => {
  /* const products = {
    data: [
      {
        id: 1,
        attributes: {
          name: "Sample Product 1",
          slug: "sample-product-1",
          price: 999,
          original_price: 1299,
          thumbnail: {
            data: {
              attributes: {
                url: "https://via.placeholder.com/500",
              },
            },
          },
        },
      },
      {
        id: 2,
        attributes: {
          name: "Sample Product 2",
          slug: "sample-product-2",
          price: 799,
          original_price: 999,
          thumbnail: {
            data: {
              attributes: {
                url: "https://via.placeholder.com/500",
              },
            },
          },
        },
      },
      {
        id: 3,
        attributes: {
          name: "Sample Product 3",
          slug: "sample-product-3",
          price: 799,
          original_price: 999,
          thumbnail: {
            data: {
              attributes: {
                url: "https://via.placeholder.com/500",
              },
            },
          },
        },
      },
      {
        id: 4,
        attributes: {
          name: "Sample Product 4",
          slug: "sample-product-4",
          price: 799,
          original_price: 999,
          thumbnail: {
            data: {
              attributes: {
                url: "https://via.placeholder.com/500",
              },
            },
          },
        },
      },
      {
        id: 5,
        attributes: {
          name: "Sample Product 5",
          slug: "sample-product-5",
          price: 799,
          original_price: 999,
          thumbnail: {
            data: {
              attributes: {
                url: "https://via.placeholder.com/500",
              },
            },
          },
        },
      },
    ],
  }; */
  
  return ( 
    <>
      <HeroBanner />
      <Wrapper>
          {/* heading and paragaph start */}
          <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                  Cushioning for Your Miles
              </div>
              <div className="text-md md:text-xl">
                  A lightweight Nike ZoomX midsole is combined with
                  increased stack heights to help provide cushioning
                  during extended stretches of running.
              </div>
          </div>
          {/* heading and paragaph end */}

          {/* products grid start */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
              {products?.data?.map((product) => (
                  <ProductCard key={product?.id} data={product} />
              ))}
          </div>
          {/* products grid end */}
      </Wrapper>
    </>

  );
};

export default Home;
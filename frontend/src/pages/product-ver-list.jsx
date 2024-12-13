import React, { useEffect, useState } from 'react';
import Wrapper from '../components/Wrapper';
import getProduct from '../services/product';
import { useParams } from 'react-router-dom';
import StarRateIcon from '@mui/icons-material/StarRate';
import ProductVersion from '../components/ProductVersion'
import ProductDetailsCarousel from "../components/ProductDetailsCarousel";


const VerList = () => {
  const [verList, setVerList] = useState([]);
  const [desc, setDescr] = useState([]);
  const [img, setImg] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProduct.getDetail(id);
      setDescr(res.data.data.product);
      setVerList(res.data.data.version);
      setImg(res.data.data.img);
    };
    fetchProduct();
  }, [id]); // Ensure id changes trigger the effect

  

    

  return (
    <>
      <Wrapper>
        {/* Heading and paragraph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
            <div className='absolute mt-[10px] ml-[60%]'>
                {desc[0]?.Star}
                <StarRateIcon />
            </div>
            {/* <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                <ProductDetailsCarousel images={img} />
            </div> */}
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {desc[0]?.Name}-{desc[0]?.Brand}
          </div>
          <div className="text-md md:text-xl">
            {desc[0]?.Description}
          </div>
        </div>
        {/* Heading and paragraph end */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {verList.map((version) => (
            <ProductVersion key={version.Product_ID} version={version} />
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default VerList;

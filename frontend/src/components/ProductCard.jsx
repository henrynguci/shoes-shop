import { Link } from "react-router-dom";
import React from "react";

const ProductCard = ({ data }) => {
    return (
        <Link
            to={`/product/${data.Product_ID}`}
            state={{ data }} 
            className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
        >
            <img
                width={500}
                height={500}
                alt={data.name}
                src={data.Img_url}
                loading="lazy"
            />
            <div className="p-4 text-black/[0.9]">
                <h2 className="text-lg font-medium">{data.Name}</h2>
                <div className="flex items-center text-black/[0.5]">
                    <p className="mr-2 text-lg font-semibold">
                        &#8377;{data.Price}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;

import { useEffect, useState } from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../types";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const getProductDetail = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProductDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center w-full">
        <p className="text-lg text-slate-600">
          Loading product details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center w-full">
        <p className="text-lg text-slate-600">
          Product not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 w-full">
      <div className="mx-auto max-w-7xl bg-white p-6 shadow-sm">
        {/* Back Button */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          <FaArrowLeft className="text-xs" />
          Back
        </Link>

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <img
              src={product.images?.[0] || product.thumbnail}
              alt={product.title}
              className="h-[500px] object-contain"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              {product.title}
            </h1>

            <div className="mt-3 flex items-center gap-4">
              <span className="text-4xl font-bold text-slate-800">
                ${product.price}
              </span>

              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-sm ${
                      index < Math.round(product.rating)
                        ? "text-yellow-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}

                <span className="ml-1 text-sm text-slate-500">
                  ({product.rating?.toFixed(1)})
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-slate-700">
              <p>
                <span className="font-semibold">
                  Brand:
                </span>{" "}
                {product.brand}
              </p>

              <p>
                <span className="font-semibold">
                  Category:
                </span>{" "}
                {product.category}
              </p>
            </div>

            <hr className="my-8" />

            {/* Description */}
            <div>
              <h2 className="mb-4 text-3xl font-semibold text-slate-800">
                Description
              </h2>

              <p className="leading-8 text-slate-600">
                {product.description}
              </p>
            </div>

            <hr className="my-8" />

            {/* Reviews */}
            <div>
              <h2 className="mb-6 text-3xl font-semibold text-slate-800">
                Reviews
              </h2>

              {product.reviews?.length ? (
                product.reviews.map((review) => (
                  <div
                    key={`${review.reviewerEmail}-${review.date}`}
                    className="mb-8"
                  >
                    <div className="flex gap-4">
                      <h3 className="font-semibold text-lg text-slate-800">
                        {review.reviewerName}
                      </h3>

                      <div className="mt-1 flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={`text-sm ${
                              index < Math.round(
                                review.rating
                              )
                                ? "text-yellow-400"
                                : "text-slate-200"
                            }`}
                          />
                        ))}

                        <span className="ml-2 text-sm text-slate-500">
                          ({review.rating?.toFixed(1)})
                        </span>
                      </div>
                    </div>

                    <p className="mt-2 text-slate-600 leading-7">
                      {review.comment}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">
                  No reviews available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
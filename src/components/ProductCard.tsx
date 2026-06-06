import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  rating: number;
  id: string | number;
}

const ProductCard = ({
  id,
  image,
  title,
  price,
  rating,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const navigateToProductDeail = () => {
    navigate(`/product/${id}`)
    return;
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg" onClick={navigateToProductDeail}>
      <div className="flex h-52 items-center justify-center overflow-hidden bg-slate-50 p-4">
        <img src={image} alt={title} className="h-full w-auto object-contain" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            ${price}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-2 text-sm text-slate-500">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`h-3.5 w-3.5 ${
                  index < Math.floor(rating)
                    ? "text-amber-400"
                    : "text-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="font-medium text-slate-700">{rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

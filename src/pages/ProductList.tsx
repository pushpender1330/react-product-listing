import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useContextStore } from "../contextStore/store";
import ProductSidebar from "../components/ProductSidebar";

const ProductList = () => {
  
  const {products, page, setPage, getAllProducts, productsInSinglePage,total} = useContextStore();

  useEffect(() => {
    getAllProducts();
  },[page])

  const goToPage = (page : number) => {
    setPage(page);
  }

  const nextPage = () => {
    setPage(page => {
      let lastPage = Math.ceil(total/productsInSinglePage);
      if(page>=lastPage){
        return page;
      }
      return page+1;
    });
  }

  const isNextBtnDisabled = () => {
    let lastPage = Math.ceil(total/productsInSinglePage);
      if(page>=lastPage){
        return true;
      }
      return false;
  }

  const isPrevBtnDisabled = () => {
    if(page<=1){
      return true;
    }
    return false;
  }

  const prevPage = () => {
    setPage(page => {
      if(page<=1){
        return page;
      }
      return page-1;
    });
  }

  const paginationBtns = () => {
    let buttons = [];
    let lastPage = Math.ceil(total/productsInSinglePage);
    for(let i=1;i<=lastPage;i++){
      if(page === i){
        const btn = <button key={i} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-200" onClick={() => goToPage(i)}>
          {i}
        </button>
        buttons.push(btn);
        continue;
      }
      const btn = <button key={i} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50" onClick={() => goToPage(i)}>
            {i}
          </button>
      buttons.push(btn);
    }
    return buttons;
  }


  return (
    <>
      <ProductSidebar />
      <main className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8 max-w-300">
        <div className="grid gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.images?.[0]}
                title={product.title}
                price={product.price}
                rating={product.rating}
              />
            ))}
          </div>

          <div className="flex justify-center items-center flex-wrap gap-2">
            <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed"
            onClick={prevPage} disabled={isPrevBtnDisabled()}>
              ← Previous
            </button>

            {
              paginationBtns()?.filter((btn,i) => {
                if(page-2 <= i+1 && page+2 >= i+1){
                  return btn;
                }
              })
            }

            <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed"
            onClick={nextPage} disabled={isNextBtnDisabled()}>
              Next →
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductList;

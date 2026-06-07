import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useContextStore } from "../contextStore/store";


const ProductSidebar = () => {
  // const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const {selectedCategory, setSelectedCategory, setPage, allProducts} = useContextStore();
  const {search, setSearch, applyFilter} = useContextStore();


  useEffect(()=>{
    async function getCategories(){
      const categories: string[] = await fetch('https://dummyjson.com/products/category-list')
      .then(res => res.json())

      setCategories(['all',...(categories || [])])
    }
    getCategories();

  },[])
  
  useEffect(()=>{
    setBrands([...new Set((allProducts?.map(item => item.brand) || []).filter(item => !!item))]);
  },[allProducts])

  const handleApply = async () => {
    setPage(1);
    applyFilter(parseInt(minPrice || "0"),parseInt(maxPrice || "100000"), selectedBrands);
  }

  return (
    <aside className=" rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3 text-slate-900">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
          <span className="text-lg font-semibold">F</span>
        </div>
        <div>
          <p className="text-sm font-semibold">Filters</p>
          <p className="text-xs text-slate-500">Refine your search</p>
        </div>
      </div>

      <div className="relative mb-6">
        <FaSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={14}
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
          onChange={(e) => {setSearch(e.target.value)}}
          value={search}
        />
      </div>

      <div className="mb-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
          Categories
        </h3>

        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 text-sm text-slate-700"
            >
              <input
                type="radio"
                checked={selectedCategory === category}
                value={category}
                onChange={() => setSelectedCategory(category)}
                className="h-4 w-4 accent-blue-600"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
          Price Range
        </h3>

        <div className="grid gap-3">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
          />
        </div>


        <div className="mt-4">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
            Brands
          </h3>
          {
            brands?.map((brand,i) => {
              return <div key={`${brand}-${i}`}>
                <input 
                  type="checkbox"
                  value={brand}
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => setSelectedBrands(prev => {
                    if(prev.includes(brand)){
                      //remove
                      return prev.filter(item => item !== brand);
                    }
                    else{
                      return [...prev,brand]
                    }
                  })}
                /> 
                <label htmlFor={brand} className="text-sm text-slate-700"> {brand}</label>
              </div> 
            })
          }
        </div>

        <button
          onClick={handleApply}
          className="mt-5 w-full rounded-2xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Apply
        </button>
      </div>

    </aside>
  );
};

export default ProductSidebar;

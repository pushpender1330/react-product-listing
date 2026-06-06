import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "../types";
import useDebounce from "../hooks/debounce";

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  getAllProducts: () => void;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  productsInSinglePage: number;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
  applyFilter: (min: number,max: number) => void
}

export const AppContext = createContext<AppContextType>({
  products: [],
  setProducts: () => {},
  getAllProducts: () => {},
  total: 0,
  setTotal: () => {},
  page: 0,
  setPage: () => {},
  productsInSinglePage: 8,
  selectedCategory: "",
  setSelectedCategory: () => {},
  search: "",
  setSearch: () => {},
  applyFilter: (min: number,max: number) => {}
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const {input : searchValue} = useDebounce(search,500);

  const productsInSinglePage = 8;

  async function getAllProducts() {
      if (!selectedCategory || selectedCategory === "all") {
        const response: { products: Product[]; total: number } | void = await fetch(
          `https://dummyjson.com/products?limit=${productsInSinglePage}&skip=${(page - 1) * productsInSinglePage}`,
        ).then((res) => res.json());
    
        setProducts(response?.products || []);
        setTotal(response?.total || 0);
    } else {
      const response: { products: Product[], total: number } = await fetch(
        `https://dummyjson.com/products/category/${selectedCategory}?limit=${productsInSinglePage}&skip=${(page - 1) * productsInSinglePage}`,
      ).then((res) => res.json());

        setTotal(response?.total || 0);
        setProducts(response?.products || []);
    }
  }

  async function applyFilter(min: number, max: number) {
    let response:{ products: Product[], total: number };
    if (!selectedCategory || selectedCategory === "all") {
      response = await fetch('https://dummyjson.com/products')
      .then(res => res.json())
    }
    else{
      response = await fetch(`https://dummyjson.com/products/category/${selectedCategory}`)
      .then(res => res.json())
    }

    const filterdProduct = response?.products?.filter(product=>{
      return product.price >= min && product?.price <= max;
    })

    setProducts(filterdProduct || []);
    setTotal(filterdProduct?.length || 0);

  }

  async function searchProduct(){
    if(!search){
        getAllProducts();
        return;
    }
    
    const response: { products: Product[]; total: number} = await fetch(`https://dummyjson.com/products/search?q=${search}&limit=${productsInSinglePage}`)
    .then(res => res.json())
    setPage(1);

    setProducts(response?.products || []);

    setTotal(response?.total || 0);

  }

  useEffect(() => {
    searchProduct();
  },[searchValue])

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        getAllProducts,
        total,
        setTotal,
        page,
        setPage,
        productsInSinglePage,
        selectedCategory,
        setSelectedCategory,
        search,
        setSearch,
        applyFilter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useContextStore = () => {
  return useContext(AppContext);
};

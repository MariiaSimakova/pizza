import axios from "axios";
import { Pagination } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCategoryId } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = ({ searchValue }) => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  // const orderType = useSelector((state) => state.filter.orderType);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderType, setOrderType] = useState(true);

  // current page
  const [page, setPage] = useState(1);
  //Pizza total cause MockApi doesn give you the number for free
  const pizzaSum = 10;
  const limit = 4;
  // Общее количество страниц для пагинации
  const pageSum = Math.ceil(pizzaSum / limit);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://6811c5a73ac96f7119a58412.mockapi.io/items?page=${page}&limit=${limit}&category=${categoryId}&sortBy=${sortType}&order=${
          orderType ? "desc" : "asc"
        }
        `
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, orderType, page]);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort orderType={orderType} setOrderType={setOrderType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>

      <Pagination
        count={pageSum}
        page={page}
        onChange={(_, num) => setPage(num)}
        size="large"
      />
    </div>
  );
};

export default Home;

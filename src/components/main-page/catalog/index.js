import { useCallback, useEffect, useReducer, useState } from 'preact/hooks';

import { catalogReducer, catalogInitialState } from './catalogReducer';
import Filters from './filters';
import ProductsLoop from './productsLoop';
import Sort from './sort';
import style from './style.scss';

import { getBooks } from '../../../api/books';
import throttle from '../../../helpers/throttle';
import Pagination from '../../pagination';
import SearchInput from '../../search-input';
import SectionTemplate from '../section-template';

const Catalog = ({}) => {
    const [products, setProducts] = useState([]);
    const [catalogState, catalogDispatch] = useReducer(catalogReducer, catalogInitialState);
    const [isLoading, setIsLoading] = useState(false);

    const fetchBooksRaw = useCallback(async queryParams => {
        const response = await getBooks(queryParams);

        setProducts(response.books);

        if (response.booksPriceRange) catalogDispatch({ type: 'setPriceRange', payload: response.booksPriceRange });

        setIsLoading(false);
    }, []);

    const fetchBooks = useCallback(throttle(fetchBooksRaw, 1000), []);

    const setSearch = useCallback(payload => catalogDispatch({ type: 'setSearch', payload }), []);
    const setSort = useCallback(payload => catalogDispatch({ type: 'setSort', payload }), []);

    useEffect(() => {
        setIsLoading(true);
        fetchBooks(catalogState);
    }, [catalogState.search, catalogState.sortType, catalogState.filters]);

    return (
        <SectionTemplate className={style.catalog} title="Каталог">
            <div class={style.catalog__grid}>
                <div class={style.catalog__filtersWrapper}>
                    <span class={`${style.catalog__filtersTitle} ${style.filtersTitle}`}>Фильтры</span>

                    <Filters
                        className={`${style.catalog__filters} ${style.filters}`}
                        reducer={[catalogState, catalogDispatch]}
                    />
                </div>

                <div class={style.catalog__productsWrapper}>
                    <div class={style.searchSort}>
                        <Sort sort={catalogState.sortType} setSort={setSort} />

                        <SearchInput
                            className={style.searchSort__search}
                            search={catalogState.search}
                            setSearch={setSearch}
                        />
                    </div>

                    <div class={`${style.catalog__productsGrid} ${style.productsGrid}`}>
                        <ProductsLoop isLoading={isLoading} products={products} />
                    </div>
                </div>
            </div>

            <Pagination className={style.catalog__pagination} />
        </SectionTemplate>
    );
};

export default Catalog;

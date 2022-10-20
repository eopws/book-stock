import GenresForm from './genres-form';
import PriceForm from './price-form';
import style from './style.scss';

const Filters = ({ className, genres, setGenres, priceValues, setPriceValues }) => {
    function gonnaOpenModal() {
        const beforeOpenModalEvent = new Event('beforeOpenModal');

        window.dispatchEvent(beforeOpenModalEvent);
    }

    return (
        <form class={`${className} ${style.filters}`} onSubmit={e => e.preventDefault()}>
            <PriceForm
                className={style.filters__item}
                gonnaOpenModal={gonnaOpenModal}
                minPrice={300}
                maxPrice={4300}
                rangeValues={priceValues}
                setRangeValues={setPriceValues}
            />

            <GenresForm
                className={style.filters__item}
                gonnaOpenModal={gonnaOpenModal}
                genres={genres}
                setGenres={setGenres}
            />
        </form>
    );
};

export default Filters;

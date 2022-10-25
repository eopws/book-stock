import style from './style.scss';

import IBG from '../ibg';

const BookCard = ({ className, number = 0, book }) => {
    let ratingStars = [];

    const isStock = book.salePrice;

    for (let i = 0; i < 5; i++) {
        if (i < book.rating) {
            ratingStars.push(<i class={`icon-star ${style.card__star}`} />);
        } else {
            ratingStars.push(<i class={`icon-star-empty ${style.card__star} ${style['card__star--empty']}`} />);
        }
    }

    return (
        <article class={`${className} ${style.card}`}>
            <IBG className={style.card__img} img={book.img} />

            <div class={style.card__content}>
                <div class={style.card__rating}>
                    <div class={style.card__starWrapper}>{ratingStars.map(item => item)}</div>

                    {isStock ? (
                        <i class={`icon-heart-empty ${style.card__heart}`} />
                    ) : (
                        <span class="rating-number">{number}</span>
                    )}
                </div>

                <div class={style.card__metaWrapper}>
                    <span class={style.card__name}>{book.name}</span>
                    <span class={style.card__author}>Автор: {book.author}</span>
                    <span class={style.card__year}>{book.year} г</span>
                </div>

                <div class={style.card__footer}>
                    <button class={style.card__buyBtn}>Купить</button>

                    <span class={`${style.card__price} ${isStock ? style['card__price--old'] : ''}`}>
                        {book.price} Р
                    </span>

                    {isStock ? (
                        <span class={style.card__newPrice}>{book.salePrice} Р</span>
                    ) : (
                        <i class={`${style.card__heart} icon-heart-empty`} />
                    )}
                </div>
            </div>
        </article>
    );
};

export default BookCard;

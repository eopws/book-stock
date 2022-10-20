import { useState, useEffect, useCallback } from 'preact/hooks';
import style from './style.scss';

/**
 * @TODO move genres to another file
 */
const standardGenres = {
    detective: 'Детективы',
    roman: 'Романы',
    science: 'Научные',
    classic: 'Классика',
    history: 'Исторические',
    psychological: 'Психологические',
};

const GenresForm = ({ className, genres, setGenres, gonnaOpenModal }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const beforeOpenModalListener = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    useEffect(() => {
        window.addEventListener('beforeOpenModal', beforeOpenModalListener);

        return () => {
            window.removeEventListener('beforeOpenModal', beforeOpenModalListener);
        };
    }, []);

    const onSetGenre = useCallback(genre => {
        if (genres.includes(genre)) {
            const newGenres = JSON.parse(JSON.stringify(genres)).filter(item => item !== genre);

            setGenres(newGenres);
        } else {
            setGenres([...genres, genre]);
        }
    });

    return (
        <div
            class={`
                ${className}
                ${style.genreForm}
                ${style.formOption}
                ${isModalOpen ? style['formOption--open'] : ''}
                `}
        >
            <div class={style.formOption__header}>
                <button
                    class={`${style.formTitle} ${style.genreForm__title}`}
                    type="button"
                    onClick={() => {
                        gonnaOpenModal();
                        setIsModalOpen(true);
                    }}
                >
                    <span>Жанр</span>
                    <svg width="11" height="8" viewBox="0 0 9 7" fill="none">
                        <path d="M7.53109 0.75L4.5 6L1.46891 0.749999L7.53109 0.75Z" stroke="black" />
                    </svg>
                </button>

                <button class={style.formOption__closeModal} onClick={() => setIsModalOpen(false)} />
            </div>

            <div class={`${style.genreForm__list} ${style.formOption__content}`}>
                {Object.keys(standardGenres).map(key => (
                    <label key={key} class={style.genreForm__item} onClick={() => onSetGenre(key)}>
                        <input type="checkbox" />
                        <i class="icon-checkmark" />

                        {standardGenres[key]}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default GenresForm;

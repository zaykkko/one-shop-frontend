import HomeStyles from "./home.scss";

import {CategoryExposer} from "./categoryExposer";

const DEMOSTRATION_DATA = [
    {
        id: 1,
        categoryName: "Star Wars",
        categoryGroupId: "star-wars",
        products: [
            {
                id: 1,
                preview_id: "6FDXGY9J6y4",
                title: "Producto XYZ",
                price: "564.56",
            },
            {
                id: 2,
                preview_id: "epRFE_hBNjo",
                title: "Producto XYZ",
                price: "564.56",
            },
            {
                id: 3,
                preview_id: "KeGToDVN0l4",
                title: "Producto XYZ",
                price: "564.56",
            },
            {
                id: 4,
                preview_id: "4OHkK555s1A",
                title: "Producto XYZ",
                price: "564.56",
            },
        ],
    },
    {
        id: 2,
        categoryName: "Consolas",
        categoryGroupId: "consoles",
        products: [
            {
                id: 5,
                preview_id: "0POwK6iAiRQ",
                title: "Control XYZ",
                price: "564.56",
            },
            {
                id: 6,
                preview_id: "caNzzoxls8Q",
                title: "Consola XYZ",
                price: "564.56",
            },
            {
                id: 7,
                preview_id: "ZV7lnfyQLmA",
                title: "Producto XYZ",
                price: "564.56",
            },
            {
                id: 8,
                preview_id: "wa5z9o9fgjw",
                title: "Producto XYZ",
                price: "564.56",
            },
        ],
    },
    {
        id: 3,
        categoryName: "Diversos",
        categoryGroupId: "others",
        products: [
            {
                id: 9,
                preview_id: "fMP-oCze3AY",
                title: "Control XYZ",
                price: "564.56",
            },
            {
                id: 10,
                preview_id: "bUgaIaZysH0",
                title: "Consola XYZ",
                price: "564.56",
            },
            {
                id: 11,
                preview_id: "sYVY_ZKwaxU",
                title: "Producto XYZ",
                price: "564.56",
            },
            {
                id: 12,
                preview_id: "jMT6BrgBuXU",
                title: "Producto XYZ",
                price: "564.56",
            },
        ],
    },
];

const Home = () => (
    <main role="main" id={HomeStyles["main-content"]}>
        <section id={HomeStyles["promotion-view"]}>
            <ul className={HomeStyles["container"]}>
                <li className={HomeStyles["promotion"]}>
                    <div className={HomeStyles["promotion-banner-wrapper"]}>
                        <img
                            draggable="false"
                            src="./assets/img/carrousel-img-1.jpg"
                        />
                    </div>
                    <div className={HomeStyles["promotion-body"]}>
                        <div className={HomeStyles["promotion-title"]}>
                            <span>Febrero Promocional</span>
                        </div>
                        <div className={HomeStyles["promotion-description"]}>
                            <p>Productos seleccionados con 33% de descuento</p>
                        </div>
                        <a
                            className={HomeStyles["promotion-btn"]}
                            href="./console-sale-2022"
                        >
                            Ver consolas
                        </a>
                    </div>
                </li>
            </ul>
        </section>
        <section id={HomeStyles["outstanding-products"]}>
            <div className={HomeStyles["container"]}>
                {DEMOSTRATION_DATA.map((categoryData) => (
                    <CategoryExposer
                        key={categoryData.id}
                        data={categoryData}
                    />
                ))}
            </div>
        </section>
    </main>
);

export default Home;

import {Title} from "@util/title";
import PromotionBanner from "./promotionBanner";
import {CategoryList} from "./productCategories";

const Home = () => (
    <>
        <Title>Inicio | AluraGeek</Title>
        <PromotionBanner />
        <CategoryList />
    </>
);

export default Home;

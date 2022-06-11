import PromotionBanner from "./promotionBanner";
import {CategoryList} from "./productCategories";
import Navigation from "./navigation";

const Home = () => (
    <main role="main">
        <PromotionBanner />
        <CategoryList />
        <Navigation />
    </main>
);

export default Home;

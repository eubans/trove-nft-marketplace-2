import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header";
import Footer from "@layout/footer/footer";
import HeroArea from "@containers/hero/layout";
import LiveExploreArea from "@containers/live-explore/layout";
import ServiceArea from "@containers/services/layout";
import ExploreProductArea from "@containers/explore-product/layout";
import TopSellerArea from "@containers/top-seller/layout";
import CollectionArea from "@containers/collection/layout";
import { normalizedData } from "@utils/methods";

// Demo data
import homepageData from "../data/homepages/home.json";
import sellerData from "../data/sellers.json";
import productData from "../data/products.json";
import collectionsData from "../data/collections.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home02 = () => {
    const content = normalizedData(homepageData?.content || []);
    const liveAuctionData = productData
        .filter(
            (prod) =>
                prod?.auction_date && new Date() <= new Date(prod?.auction_date)
        )
        .sort(
            (a, b) =>
                Number(new Date(b.published_at)) -
                Number(new Date(a.published_at))
        )
        .slice(0, 5);
    return (
        <Wrapper>
            <SEO pageTitle="Home" />
            <Header />
            <main id="main-content">
                <HeroArea data={content["hero-section"]} />
                <LiveExploreArea
                    data={{
                        ...content["live-explore-section"],
                        products: liveAuctionData,
                    }}
                />
                <ServiceArea data={content["service-section"]} />
                <ExploreProductArea
                    data={{
                        ...content["explore-product-section"],
                        products: productData,
                    }}
                />
                <TopSellerArea
                    data={{
                        ...content["top-sller-section"],
                        sellers: sellerData,
                    }}
                />
                <CollectionArea
                    data={{
                        ...content["collection-section"],
                        collections: collectionsData.slice(0, 4),
                    }}
                />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Home02;

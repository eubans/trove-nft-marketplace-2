import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header";
import Footer from "@layout/footer/footer";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog/layout-05";
import { getPostsByCategory, getAllPosts } from "../../../lib/api";

const BlogTwoColumn = ({ posts, title }) => (
    <Wrapper>
        <SEO pageTitle="Blog Three Column" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle={title} currentPage="Blog Three Column" />
            <BlogArea data={{ posts }} rootPage="/blog-col-three" />
        </main>
        <Footer />
    </Wrapper>
);

export async function getStaticPaths() {
    const posts = getAllPosts(["category"]);
    return {
        paths: posts.map(({ category }) => ({
            params: {
                category: category.slug,
            },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const posts = getPostsByCategory(params.category, [
        "title",
        "date",
        "slug",
        "image",
        "category",
        "timeToRead",
    ]);

    return {
        props: {
            posts,
            title: params.category,
            className: "template-color-1",
        },
    };
}

BlogTwoColumn.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({})),
    title: PropTypes.string,
};

export default BlogTwoColumn;

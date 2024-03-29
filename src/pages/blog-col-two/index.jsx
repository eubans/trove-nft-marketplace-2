import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header";
import Footer from "@layout/footer/footer";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog/layout-04";
import { getAllPosts } from "../../lib/api";

const POSTS_PER_PAGE = 8;

const BlogTwoColumn = ({ posts, pagiData }) => (
    <Wrapper>
        <SEO pageTitle="Blog Two Column" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Blog Two Column"
                currentPage="Blog Two Column"
            />
            <BlogArea data={{ posts, pagiData }} rootPage="/blog-col-two" />
        </main>
        <Footer />
    </Wrapper>
);
export async function getStaticProps() {
    const posts = getAllPosts([
        "title",
        "date",
        "slug",
        "image",
        "category",
        "tags",
        "timeToRead",
    ]);

    return {
        props: {
            posts: posts.slice(0, POSTS_PER_PAGE),
            className: "template-color-1",
            pagiData: {
                currentPage: 1,
                numberOfPages: Math.ceil(posts.length / POSTS_PER_PAGE),
            },
        },
    };
}

BlogTwoColumn.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({})),
    pagiData: PropTypes.shape({}),
};

export default BlogTwoColumn;

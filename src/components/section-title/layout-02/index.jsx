import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitle = ({ title, className, disableanimation, ...restProps }) => (
    <h3
        className={clsx("title", className)}
        data-sal-delay="150"
        data-sal={!disableanimation && "slide-up"}
        data-sal-duration="800"
        {...restProps}
        dangerouslySetInnerHTML={{ __html: title }}
    />
);

SectionTitle.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    disableanimation: PropTypes.bool,
};

export default SectionTitle;

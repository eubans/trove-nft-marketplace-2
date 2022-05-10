import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { motion } from "framer-motion";
import SectionTitle from "@components/section-title/layout";
import Product from "@components/product/layout";
import FilterButtons from "@components/filter-buttons";
import { flatDeep } from "@utils/methods";
import { SectionTitleType, ProductType } from "@utils/types";

/* web3 */
import { ethers } from 'ethers'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
    marketplaceAddress
} from '/smart_contract/config'

import NFTMarketplace from '../../../utils/json/NFTMarketplace.json'

const ExploreProductArea = ({ className, space, data }) => {
    const filters = [
        ...new Set(
            flatDeep(data?.products.map((item) => item.categories) || [])
        ),
    ];
    const [products, setProducts] = useState([]);

    /* web3 */
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        setProducts(data?.products);
        
        /* web3 */
        loadNFTs()
    }, [data?.products]);


    /* web3 */
    async function loadNFTs() {
        const web3Modal = new Web3Modal({
            network: 'mainnet',
            cacheProvider: true,
        })
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
    
        const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        const data = await contract.fetchItemsListed()
    
        const items = await Promise.all(data.map(async i => {
            const tokenUri = await contract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            // let item = {
            //     price,
            //     tokenId: i.tokenId.toNumber(),
            //     seller: i.seller,
            //     owner: i.owner,
            //     image: meta.data.image,
            // }
            let item = {
                ...i,
                image: meta.data
            }
            return item
        }))
        
        console.log(items)
        setNfts(items)
        setLoadingState('loaded') 
    }

    const filterHandler = (filterKey) => {
        const prods = data?.products ? [...data.products] : [];
        if (filterKey === "all") {
            setProducts(data?.products);
            return;
        }
        const filterProds = prods.filter((prod) =>
            prod.categories.includes(filterKey)
        );
        setProducts(filterProds);
    };
    return (
        <div
            className={clsx(
                "rn-product-area masonary-wrapper-activation",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row align-items-center mb--60">
                    <div className="col-lg-4">
                        {data?.section_title && (
                            <SectionTitle
                                className="mb--0"
                                disableAnimation
                                {...data.section_title}
                            />
                        )}
                    </div>
                    <div className="col-lg-8">
                        <FilterButtons
                            buttons={filters}
                            filterHandler={filterHandler}
                        />
                    </div>
                </div>
                <div className="col-lg-12">
                    <motion.div layout className="isotope-list item-5">
                        {products?.slice(0, 10)?.map((prod) => (
                            <motion.div
                                key={prod.id}
                                className={clsx("grid-item")}
                                layout
                            >
                                <Product
                                    placeBid={!!data.placeBid}
                                    title={prod.title}
                                    slug={prod.slug}
                                    latestBid={prod.latestBid}
                                    price={prod.price}
                                    likeCount={prod.likeCount}
                                    image={prod.images?.[0]}
                                    authors={prod.authors}
                                    bitCount={prod.bitCount}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

ExploreProductArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        products: PropTypes.arrayOf(ProductType),
        placeBid: PropTypes.bool,
    }),
};

ExploreProductArea.defaultProps = {
    space: 1,
};

export default ExploreProductArea;

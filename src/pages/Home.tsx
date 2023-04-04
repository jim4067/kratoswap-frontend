import { Box, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NFTCard from "../components/NFTCard";
import { fetchCollections } from "../services/collection";


function Home() {
	const [collections, setCollections] = useState<any>();

	useEffect(() => {
		fetchCollections().then(res => { console.log(res); setCollections(res.collections) });
	}, [])


	return <div>
		<Box display="flex" flexDirection="column" minHeight="88vh">
			<Box>
				<Text textAlign="center" my="20" fontSize="6vw" lineHeight={2} fontWeight="semibold">
					Decentralized <span style={{ color: "#ED64A6" }}>NFT Swapping</span> <br />
					marketplace on <span style={{ color: "purple" }}>POLYGON</span>
				</Text>
			</Box>
			<Box>
				<Box>
					<Text textAlign="center" marginTop="-10" fontSize="2xl" fontWeight="extrabold">
						your favourite collections
					</Text>
				</Box>
				<Box display="flex" my="9" justifyContent="center" flexWrap="wrap">
					{collections?.slice(0, 7).map((collection: any, _index: any) => (
						<div style={{ margin: "20px" }} key={_index}>
							<Link
								to={`/collection/${collection.id}`}
								state={collection}
							>
								<NFTCard
									title={collection.name}
									image={collection.image}
									floor={collection?.floorAsk?.price?.amount.native}
								/>
							</Link>
						</div>
					))}
				</Box>

			</Box>
		</Box>
		<Box display="flex" justifyContent="center" fontSize="3xl">
			<ChakraLink _hover={{ color: "#ED64A6" }} href="https://github.com/jim4067/kratoswap-frontend">
				<FaGithub />
			</ChakraLink>
		</Box>
	</div>
}

export default Home;
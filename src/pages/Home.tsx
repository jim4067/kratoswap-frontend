import { Box, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Link } from "@chakra-ui/react";

import NFTCard from "../components/NFTCard";

function Home() {
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
					{new Array(7).fill(0).map(card => (
						<div style={{margin: "20px"}}>
							<NFTCard />
						</div>
					))}
				</Box>

			</Box>
		</Box>
		<Box display="flex" justifyContent="center" fontSize="3xl">
			<Link _hover={{ color: "#ED64A6" }} href="https://github.com/jim4067/kratoswap-frontend">
				<FaGithub />
			</Link>
		</Box>
	</div>
}

export default Home;
// the modal body

import { Box, Heading, Text } from "@chakra-ui/react";
import { AddIcon, ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { EthereumSVGIcon } from "../common/ui";

export function PoolTypeCard({ type, image }: { type: string, image?: string }) {

	return <Box border="2px solid black">
		<Box display='flex' justifyContent="center">
			{
				type === "buy" ? <Box display="flex" my={2}>
					<Box>
						<Box border="1px solid black">
							<img
								height={28}
								width={28}
								src={image}
							/>
						</Box>
					</Box>
					<Box marginLeft={3} my="auto">
						<ArrowForwardIcon boxSize={6} />
					</Box>
					<Box my="auto" marginLeft={3} >
						<EthereumSVGIcon fill="#ED64A6" />
					</Box>
				</Box>
					: type === "sell" ? <Box display="flex" my={2}>
						<Box my="auto" marginLeft={3} >
							<EthereumSVGIcon fill="#ED64A6" />
						</Box>
						<Box my="auto" mx={3}>
							<ArrowForwardIcon boxSize={6} />
						</Box>
						<Box>
							<Box border="1px solid black">
								<img
									height={28}
									width={28}
									src={image}
								/>
							</Box>
						</Box>
					</Box>
						: type === "trade" ? <Box display="flex" my={2}>
							<Box display="flex">
								<Box border="1px solid black" my="auto">
									<img
										height={28}
										width={28}
										src={image}
									/>
								</Box>
								<Box my="auto" mx={2}>
									<AddIcon boxSize={4} />
								</Box>
								<Box my="auto">
									<EthereumSVGIcon fill="#ED64A6" />
								</Box>
							</Box>
							<Box marginLeft={3} my="auto">
								<ArrowForwardIcon boxSize={6} />
							</Box>
							<Box my="auto" marginLeft={3} >
								<Box border="1px solid black" paddingX={2} bgColor="#ed64a6">
									fees
								</Box>
							</Box>
						</Box>
							: "invalid choice"
			}
		</Box>
		<Box mx={2} textAlign="center" fontWeight="black" opacity={0.8}>
			{
				type === "buy" ? "buy nfts with Eth"
					: type === "sell" ? "sell nfts for Eth"
						: type === "trade" ? "trade nfts and earn fees"
							: "invalid choice"
			}
		</Box>

	</Box>
}

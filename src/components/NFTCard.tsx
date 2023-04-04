import { Box, Text } from "@chakra-ui/react"
import { EthereumSVGIcon } from "../common/ui";

function NFTCard({ title, image, floor }: { title: string, image: string, floor: number }) {

	return <Box>
		<Box border="1px solid black" width="200px" /* height={320} */>
			<Box marginBottom={4}>
				<img
					// src="https://i.seadn.io/gae/wfTzs4q-MoAkzsjcLwBHbG5CoaJL5lpIapph99lhGYnJh2AmZTwDAAfXZkx2tpatL0n4LpGiti87R8GeB6fqW5quu047Fj8nG8aU?auto=format&w=2048"
					src={image}
					alt="Card Picture"
					height="120px"
				/>
			</Box>
			<Box mx="3" marginBottom={3} display="flex" justifyContent="flex-end" flexDirection="column" /*  marginTop={10} display="flex" justifyContent="space-between" flexDirection="column" */ >
				<Box>
					<Text marginLeft="0" fontSize="xl" fontWeight="bold">
						{title}
					</Text>
				</Box>

				<Box fontWeight="semibold" opacity="0.7" fontSize="sm">
					floor
				</Box>

				<Box>
					<Box display="flex">
						<Box margin="auto 0">
							<EthereumSVGIcon fill="#ED64A6" />
						</Box>
						<Box margin="auto 8px">
							<Text fontWeight="semibold" opacity="0.2">
								{floor}
							</Text>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	</Box>
}

export default NFTCard;
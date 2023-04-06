import {
	Box,
	Heading,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Link as ChakraLink

} from '@chakra-ui/react';
import { Key, useEffect, useState } from "react";
import { fetchCollections } from "../services/collection";

import { Link } from 'react-router-dom';

import { formatLargeNum } from '../common/utils';
import { EthereumSVGIcon } from '../common/ui';

function CollectionPage() {
	const [collections, setCollections] = useState<any>();

	let multifaucetNft = {
		image: "https://i.seadn.io/gcs/files/b4d419a67bc7dc52000e6d1336b24c46.png?auto=format&w=1000",
		banner: "https://i.seadn.io/gcs/files/b4d419a67bc7dc52000e6d1336b24c46.png?auto=format&w=1000",
		id: "0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b",
		name: "MultiFaucet NFT (MFNFT)",
		floorAsk: {
			price: {
				amount: {
					native: "0.1"
				}
			}
		},
		volume: {
			allTime: 0.046
		}
	}


	useEffect(() => {
		fetchCollections().then(res => { console.log(res); setCollections([multifaucetNft, ...res.collections]) });
	}, []);

	

	return <div>
		<Box my={10}>
			<Heading as='h3' size='xl' noOfLines={1} textAlign="center">
				Collections
			</Heading>
		</Box>

		<Box>
			<TableContainer border="1px solid black" borderRadius="0">
				<Table variant='striped' colorScheme='red'>
					<TableCaption>list of kratoswap collections</TableCaption>
					<Thead>
						<Tr>
							<Th>name</Th>
							<Th >floor price</Th>
							<Th>volume</Th>
						</Tr>
					</Thead>

					<Tbody>
						{
							collections?.map((collection: any, _index: Key | null | undefined) => (
								<Tr key={_index}>
									<Td>
										<Link
											to={`/collection/${collection.id}`}
											state={collection}
										>
											<Box display="flex">
												<Box border="1px solid black">
													<img
														height={25}
														width={25}
														src={collection.image}
													/>
												</Box>
												<Box marginLeft="2" my="auto">
													{collection?.name}
												</Box>
											</Box>
										</Link>
									</Td>
									<Td>
										<Box display="flex">
											<Box>
												<EthereumSVGIcon fill="#ED64A6" />
											</Box>
											<Box marginLeft="3">
												{collection?.floorAsk?.price?.amount.native}
											</Box>

										</Box>
									</Td>{/*  //! does this check out when using polygon testnet */}
									<Td> {formatLargeNum(collection?.volume?.allTime)}</Td>
								</Tr>
							))
						}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	</div>
}

export default CollectionPage;
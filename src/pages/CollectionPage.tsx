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
} from '@chakra-ui/react';
import { Key, useEffect, useState } from "react";
import { fetchCollections } from "../services/collection";

function CollectionPage() {
	const [collections, setCollections] = useState<any>();

	useEffect(() => {
		fetchCollections().then(res => { console.log(res); setCollections(res.collections) });
	}, [])


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
									<Td> {collection?.name} </Td>
									<Td> {collection?.floorAsk?.price?.currency?.decimals} </Td>{/*  //! does this check out when using polygon testnet */}
									<Td> {collection?.volume?.allTime} </Td>
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
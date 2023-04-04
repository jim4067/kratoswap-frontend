import { useLocation, useParams } from "react-router-dom";
import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Text,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

import { EthereumSVGIcon, PrimaryBtn, SecondaryBtn } from "../common/ui";
import NFTCard from "../components/NFTCard";

function ViewCollection() {
	const { state } = useLocation();
	const { isOpen, onOpen, onClose } = useDisclosure()

	console.log('state', state);

	return <div>
		<Box>
			<Box my={2}>
				<img
					style={{ width: "100vw", maxHeight: "50vh", border: "1px solid black" }}
					src={state?.banner}
				/>
			</Box>

			<Box display="flex" flexDirection="column"> {/* the headings */}
				<Box> {/* left side */}
					<Box marginTop="-12vw">
						<img
							src={state?.image}
							style={{ border: "1px solid black", width: "15vw" }}
						/>
					</Box>
				</Box>

				<Box display="flex" my={5}>
					<Box textAlign="left">
						<Heading as='h3' size='xl' noOfLines={1} textAlign="center">
							{state?.name}
						</Heading>
					</Box>
				</Box>
				<Box display="flex" flexWrap="wrap">
					<GenericBox title="floor" value={parseFloat(state.floorAsk.price.amount.decimal).toFixed(2)} />
					<GenericBox title="volume" value={parseFloat(state.volume.allTime).toFixed(2)} />
					<GenericBox title="listed" value={0} />
				</Box>
			</Box>

			<Box display="flex" justifyContent="center" my={10}>{/* CTA Buttons */}
				<Box>
					<PrimaryBtn
						onClick={() => {
							onOpen()
						}}
						name="create pool"
					/>
				</Box>
				<Box style={{ marginLeft: "23px" }}>
					<SecondaryBtn disabled={true} name={"buy / sell"} />
				</Box>
			</Box>
			{/* the modal */}
			<Modal isCentered isOpen={isOpen} size="xl" onClose={onClose}>
				<ModalOverlay
					bg='none'
					backdropFilter='auto'
					backdropInvert='80%'
					backdropBlur='2px'
				/>
				<ModalContent>
					<ModalHeader>Create Pool</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{
							new Array(20).fill(0).map(() => (
								<Text>Create your pool...!</Text>
							))
						}
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Box display="flex" justifyContent="center">
				<Tabs position="relative" variant="unstyled">
					<TabList>
						<Tab
							width="20vw"
							_focus={{
								border: "none",
								outline: "none"
							}}
							_hover={{
								borderColor: "pink.400"
							}}
						>
							buy {4}
						</Tab>
						<Tab
							width="20vw"
							_focus={{
								border: "none",
								outline: "none"
							}}
							_hover={{
								borderColor: "pink.400",
							}}
						>
							sell {0}
						</Tab>
						<Tab
							width="20vw"
							_focus={{
								border: "none",
								outline: "none"
							}}
							_hover={{
								borderColor: "pink.400",
							}}
						>
							<Box as="span">pools</Box> <Box as="span">{0}</Box>
						</Tab>
					</TabList>
					<TabIndicator
						mt="-1.5px"
						height="2px"
						bg="pink.400"
						borderRadius="1px"
					/>
					<TabPanels>
						<TabPanel>
							<Box display="flex" my="9" justifyContent="left" flexWrap="wrap">
								{new Array(4).fill(0).map(card => (
									<div style={{ margin: "20px" }}>
										<NFTCard
											image="https://i.seadn.io/gae/wfTzs4q-MoAkzsjcLwBHbG5CoaJL5lpIapph99lhGYnJh2AmZTwDAAfXZkx2tpatL0n4LpGiti87R8GeB6fqW5quu047Fj8nG8aU?auto=format&w=2048"
											title="dummy title"
											floor={23}
										/>
									</div>
								))}
							</Box>
						</TabPanel>
						<TabPanel>
							<Box my="20">
								No Suitable NFTs found
							</Box>
						</TabPanel>
						<TabPanel>
							<Box my="20">
								No pools available
							</Box>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Box>
	</div >
}

function GenericBox({ title, value }: { title: string, value: string | number }) {
	return <Box border="1px solid black" paddingY={2} paddingX={8} marginRight={3} my={2}>
		<Box opacity={0.7} fontWeight="semibold" fontSize="sm">
			{title}
		</Box>
		<Box fontSize="xl" display="flex">
			<Box my="auto">
				<EthereumSVGIcon fill="#ED64A6" />
			</Box>
			<Box marginLeft={2} my="auto">
				{value}
			</Box>
		</Box>
	</Box>
}

export default ViewCollection;
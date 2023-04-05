import { useLocation, useParams } from "react-router-dom";
import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Text, InputGroup, Input, InputRightAddon, MenuList, MenuButton, Menu, MenuItem } from "@chakra-ui/react";
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useState } from "react";

import { DangerBtn, EthereumSVGIcon, PrimaryBtn, SecondaryBtn } from "../common/ui";
import NFTCard from "../components/NFTCard";
import { PoolTypeCard } from "../components/CreatePool";

function ViewCollection() {
	const { state } = useLocation();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [createPair, setCreatePair] = useState<string>("");
	const [curve, setCurve] = useState<string>(); //set default to exponential 

	const [price, setPrice] = useState<string>("0");
	const [delta, setDelta] = useState<string>("0");
	const [noNfts, setNoNfts] = useState<string>("1");
	const [fee, setFee] = useState<string>("0");

	console.log("this is the curve", curve);

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
					<ModalHeader textAlign="center" fontWeight="bold" fontSize="2xl">Create Pool</ModalHeader>
					<ModalCloseButton />
					<ModalBody display="flex" justifyContent="center" flexWrap="wrap">
						{
							createPair === "" && ["buy", "sell", "trade"].map((type, _index) => <Box
								as="button"
								key={_index}
								_hover={{
									borderColor: "transparent"
								}}
								onClick={() => setCreatePair(type)}
								marginLeft={2}>
								<PoolTypeCard type={type} image={state.image} />
							</Box>)
						}
						{
							createPair === "buy" && <Box width={500}>
								<Box border="1px solid black" display="flex" flexDirection="column">
									<Box mx={2}>
										<Box my={2}>
											<Box>
												<Text color="gray.700" fontWeight="bold" fontSize="xl">
													pricing
												</Text>
											</Box>
											<Box fontSize="sm" display="flex" fontWeight="bold" justifyContent="space-between" >
												<Box as="span">Start price</Box>
												<Box as="span">
													<Box as="span">
														<Box as="span">Floor: </Box>{" "}
														<Box as="span">{parseFloat(state.floorAsk.price.amount.decimal).toFixed(2)}</Box>
													</Box>
												</Box>
											</Box>
											<Box>
												<InputGroup size="sm" >
													<Input value={price} onChange={({ target: { value } }) => setPrice(value)} type="number" />
													<InputRightAddon children="eth" />
												</InputGroup>
											</Box>
										</Box>

										<Box my={2}>
											<Box>
												<Text color="gray.700" fontWeight="bold" fontSize="xl">
													bonding curve
												</Text>
											</Box>

											<Box display="flex" justifyContent="space-between">
												<Tabs width="full" variant='unstyled' onChange={(index) => {
													index === 0 ? setCurve("exponential") : index === 1 ? setCurve("linear") : index === 2 ? setCurve("quadratic") : setCurve("")
												}}>
													<TabList>
														<Tab
															id="curve"
															// onClick={() => setCurve("exponential")}
															borderRadius="none"
															padding="0 2"
															_hover={{ borderColor: "pink.400" }}
															_selected={{ color: 'black', bg: 'gray.100', outline: "none", borderBottomColor: "pink.400" }}
														>
															exponential curve
														</Tab>
														<Tab
															// onClick={() => setCurve("linear")}
															borderRadius="none"
															padding="0 2"
															_hover={{ borderColor: "pink.400" }}
															_selected={{ color: 'black', bg: 'gray.100', outline: "none", borderBottomColor: "pink.400" }}
														>
															linear curve
														</Tab>
														<Tab
															// onClick={() => setCurve("one")}
															borderRadius="none"
															padding="0 2"
															_hover={{ borderColor: "pink.400" }}
															_selected={{ color: 'black', bg: 'gray.100', outline: "none", borderBottomColor: "pink.400" }}
														>
															quadratic curve
														</Tab>
													</TabList>
													<TabPanels>
														<TabPanel padding={-2}>
															<Box fontSize="sm" display="flex" fontWeight="bold" my={2} justifyContent="space-between" >
																<Box as="span">delta</Box>
															</Box>
															<Box>
																<InputGroup size="sm" >
																	<Input value={delta} onChange={({ target: { value } }) => setDelta(value)} type="number" />
																	<InputRightAddon children="eth" />
																</InputGroup>
															</Box>
															<Box marginTop={2} fontSize="xs">
																<Text>
																	starting price {price}
																</Text>
																<Text>
																	Each time your pool buys an NFT, the price will <Box as="span" fontWeight="bold">go down</Box> by {delta} ETH
																</Text>
															</Box>
														</TabPanel>

														<TabPanel padding={-2}>
															<Box fontSize="sm" display="flex" fontWeight="bold" my={2} justifyContent="space-between" >
																<Box as="span">delta</Box>
															</Box>
															<Box>
																<InputGroup size="sm" >
																	<Input value={delta} onChange={({ target: { value } }) => setDelta(value)} type="number" />
																	<InputRightAddon children="eth" />
																</InputGroup>
															</Box>
															<Box marginTop={2} fontSize="xs">
																<Text>
																	starting price {price}
																</Text>
																<Text>
																	Each time your pool buys an NFT, the price will <Box as="span" fontWeight="bold">go down</Box> by {delta} ETH
																</Text>
															</Box>
														</TabPanel>


														<TabPanel padding={-2}>
															{/* <Box fontSize="sm" display="flex" fontWeight="bold" my={2} justifyContent="space-between" >
																<Box as="span">delta</Box>
															</Box>
															<Box>
																<InputGroup size="sm" >
																	<Input value={delta} onChange={({ target: { value } }) => setDelta(value)} type="number" />
																	<InputRightAddon children="eth" />
																</InputGroup>
															</Box> */}
															<Box marginTop={2} fontSize="xs">
																<Text>
																	starting price {price}
																</Text>
																<Text>
																	Each time your pool buys an NFT, the price will <Box as="span" fontWeight="bold">go down</Box> by {delta} ETH
																</Text>
															</Box>
														</TabPanel>

													</TabPanels>
												</Tabs>
											</Box>
										</Box>

									</Box>
								</Box>
								<Box border="1px solid black" marginTop={2}>
									<Box mx={2}>
										<Box>
											<Text color="gray.700" fontWeight="bold" fontSize="xl">
												assets
											</Text>
										</Box>
										<Box>
											Number of of Nfts
										</Box>
										<Box marginBottom={2}>
											<Input value={noNfts} onChange={({ target: { value } }) => setNoNfts(value)} size="sm" width="20vw" />
										</Box>
									</Box>
								</Box>
							</Box>
						}
						{
							createPair === "sell" && <Box>
								<Box border="1px solid black" display="flex" flexDirection="column">
									<Box mx={2}>
										<Box my={2}>
											<Box>
												<Text color="gray.700" fontWeight="bold" fontSize="xl">
													pricing
												</Text>
											</Box>
											<Box fontSize="sm" display="flex" fontWeight="bold" justifyContent="space-between" >
												<Box as="span">Start price</Box>
												<Box as="span">
													<Box as="span">
														<Box as="span">Floor: </Box>{" "}
														<Box as="span">{parseFloat(state.floorAsk.price.amount.decimal).toFixed(2)}</Box>
													</Box>
												</Box>
											</Box>
											<Box>
												<InputGroup size="sm" >
													<Input value={price} onChange={({ target: { value } }) => setPrice(value)} type="number" />
													<InputRightAddon children="eth" />
												</InputGroup>
											</Box>
										</Box>

										<Box my={2}>
											<Box>
												<Text color="gray.700" fontWeight="bold" fontSize="xl">
													bonding curve
												</Text>
											</Box>

											<Box display="flex" justifyContent="space-between">
												<Tabs width="full" variant='unstyled' onChange={(index) => {
													index === 0 ? setCurve("exponential") : index === 1 ? setCurve("linear") : index === 2 ? setCurve("quadratic") : setCurve("")
												}}>
													<TabList>
														<Tab
															id="curve"
															// onClick={() => setCurve("exponential")}
															fontSize="sm"
															borderRadius="none"
															padding="0 2"
															_hover={{ borderColor: "pink.400" }}
															_selected={{ color: 'black', bg: 'gray.100', outline: "none", borderBottomColor: "pink.400" }}
														>
															exponential curve
														</Tab>
														<Tab
															// onClick={() => setCurve("linear")}
															fontSize="sm"
															borderRadius="none"
															padding="0 2"
															_hover={{ borderColor: "pink.400" }}
															_selected={{ color: 'black', bg: 'gray.100', outline: "none", borderBottomColor: "pink.400" }}
														>
															linear curve
														</Tab>
														<Tab
															// onClick={() => setCurve("one")}
															fontSize="sm"
															// width={00}
															borderRadius="none"
															padding="0 2"
															_hover={{ borderColor: "pink.400" }}
															_selected={{ color: 'black', bg: 'gray.100', outline: "none", borderBottomColor: "pink.400" }}
														>
															quadratic curve
														</Tab>
													</TabList>
													<TabPanels>
														<TabPanel padding={-2}>
															<Box fontSize="sm" display="flex" fontWeight="bold" my={2} justifyContent="space-between" >
																<Box as="span">delta</Box>
															</Box>
															<Box>
																<InputGroup size="sm" >
																	<Input value={delta} onChange={({ target: { value } }) => setDelta(value)} type="number" />
																	<InputRightAddon children="eth" />
																</InputGroup>
															</Box>
															<Box marginTop={2} fontSize="xs">
																<Text>
																	starting price {price}
																</Text>
																<Text>
																	Each time your pools sells an NFT, the price will <Box as="span" fontWeight="bold">go up</Box> by {delta} ETH
																</Text>
															</Box>
														</TabPanel>

														<TabPanel padding={-2}>
															<Box fontSize="sm" display="flex" fontWeight="bold" my={2} justifyContent="space-between" >
																<Box as="span">delta</Box>
															</Box>
															<Box>
																<InputGroup size="sm" >
																	<Input value={delta} onChange={({ target: { value } }) => setDelta(value)} type="number" />
																	<InputRightAddon children="eth" />
																</InputGroup>
															</Box>
															<Box marginTop={2} fontSize="xs">
																<Text>
																	starting price {price}
																</Text>
																<Text>
																	Each time your pools sells an NFT, the price will <Box as="span" fontWeight="bold">go up</Box> by {delta} ETH
																</Text>
															</Box>
														</TabPanel>


														<TabPanel padding={-2}>
															{/* <Box fontSize="sm" display="flex" fontWeight="bold" my={2} justifyContent="space-between" >
																<Box as="span">delta</Box>
															</Box>
															<Box>
																<InputGroup size="sm" >
																	<Input value={delta} onChange={({ target: { value } }) => setDelta(value)} type="number" />
																	<InputRightAddon children="eth" />
																</InputGroup>
															</Box> */}
															<Box marginTop={2} fontSize="xs">
																<Text>
																	starting price {price}
																</Text>
																<Text>
																	Each time your pools sells an NFT, the price will <Box as="span" fontWeight="bold">go up</Box> by {delta} ETH
																</Text>
															</Box>
														</TabPanel>
													</TabPanels>
												</Tabs>
											</Box>
										</Box>

									</Box>
								</Box>
								<Box border="1px solid black" marginTop={2}>
									<Box mx={2}>
										<Box>
											<Text color="gray.700" fontWeight="bold" fontSize="xl">
												assets
											</Text>
										</Box>
										<Box>
											Number of of Nfts
										</Box>
										<Box marginBottom={2}>
											<Input value={noNfts} onChange={({ target: { value } }) => setNoNfts(value)} size="sm" width="20vw" />
										</Box>
									</Box>
								</Box>
							</Box>
						}
						{
							createPair === "trade" && <Box>
								<Box border="1px solid black" display="flex" flexDirection="column">
									<Box mx={2}>
										<Box my={2}>
											<Box>
												<Text color="gray.700" fontWeight="bold" fontSize="xl">
													pricing
												</Text>
											</Box>
											<Box>
												<Box fontWeight="bold" >fee</Box>
												<InputGroup size="sm" >
													<Input value={fee} onChange={({ target: { value } }) => setFee(value)} type="number" />
													<InputRightAddon children="%" />
												</InputGroup>
											</Box>

											<Box fontSize="sm" display="flex" fontWeight="bold" justifyContent="space-between" >
												<Box as="span">Spot price</Box>
												<Box as="span">
													<Box as="span">
														<Box as="span">best price: </Box>{" "}
														{/* <Box as="span">{parseFloat(state.floorAsk.price.amount.decimal).toFixed(2)}</Box> */}
														<Box as="span">?</Box>
													</Box>{", "}
													<Box as="span">
														<Box as="span">floor: </Box>{" "}
														<Box as="span">{parseFloat(state.floorAsk.price.amount.decimal).toFixed(2)}</Box>
														{/* <Box as="span">?</Box> */}
													</Box>
												</Box>
											</Box>
											<Box>
												<InputGroup size="sm" >
													<Input value={price} onChange={({ target: { value } }) => setPrice(value)} type="number" />
													<InputRightAddon children="eth" />
												</InputGroup>
											</Box>
										</Box>

										<Box my={2}>
											<Box>
												<Text color="gray.700" fontWeight="bold" fontSize="xl">
													bonding curve
												</Text>
											</Box>

											<Box display="flex" justifyContent="space-between">
												<Tabs width="full" variant='unstyled' onChange={(index) => {
													index === 0 ? setCurve("exponential") : index === 1 ? setCurve("linear") : index === 2 ? setCurve("quadratic") : setCurve("")
												}}>
													<TabList>
														<Tab
															id="curve"
															// onClick={() => setCurve("exponential")}
															fontSize="sm"
															borderRadius="none"
															padding="0 2"
															_hover={{ borderColor: "pink.400" }}
															_selected={{ color: 'black', bg: 'gray.100', outline: "none", borderBottomColor: "pink.400" }}
														>
															exponential curve
														</Tab>
														<Tab
															// onClick={() => setCurve("linear")}
															fontSize="sm"
															borderRadius="none"
															padding="0 2"
															_hover={{ borderColor: "pink.400" }}
															_selected={{ color: 'black', bg: 'gray.100', outline: "none", borderBottomColor: "pink.400" }}
														>
															linear curve
														</Tab>
														<Tab
															// onClick={() => setCurve("one")}
															fontSize="sm"
															// width={00}
															borderRadius="none"
															padding="0 2"
															_hover={{ borderColor: "pink.400" }}
															_selected={{ color: 'black', bg: 'gray.100', outline: "none", borderBottomColor: "pink.400" }}
														>
															quadratic curve
														</Tab>
													</TabList>
													<TabPanels>
														<TabPanel padding={-2}>
															<Box fontSize="sm" display="flex" fontWeight="bold" my={2} justifyContent="space-between" >
																<Box as="span">delta</Box>
															</Box>
															<Box>
																<InputGroup size="sm" >
																	<Input value={delta} onChange={({ target: { value } }) => setDelta(value)} type="number" />
																	<InputRightAddon children="eth" />
																</InputGroup>
															</Box>
															<Box marginTop={2} fontSize="xs">
																<Text>
																	starting price {price}
																</Text>
																<Text>
																	Each time your pools sells an NFT, the price will <Box as="span" fontWeight="bold">go up</Box> by {delta} ETH
																</Text>
															</Box>
														</TabPanel>

														<TabPanel padding={-2}>
															<Box fontSize="sm" display="flex" fontWeight="bold" my={2} justifyContent="space-between" >
																<Box as="span">delta</Box>
															</Box>
															<Box>
																<InputGroup size="sm" >
																	<Input value={delta} onChange={({ target: { value } }) => setDelta(value)} type="number" />
																	<InputRightAddon children="eth" />
																</InputGroup>
															</Box>
															<Box marginTop={2} fontSize="xs">
																<Text>
																	starting price {price}
																</Text>
																<Text>
																	Each time your pools sells an NFT, the price will <Box as="span" fontWeight="bold">go up</Box> by {delta} ETH
																</Text>
															</Box>
														</TabPanel>


														<TabPanel padding={-2}>
															{/* <Box fontSize="sm" display="flex" fontWeight="bold" my={2} justifyContent="space-between" >
																<Box as="span">delta</Box>
															</Box>
															<Box>
																<InputGroup size="sm" >
																	<Input value={delta} onChange={({ target: { value } }) => setDelta(value)} type="number" />
																	<InputRightAddon children="eth" />
																</InputGroup>
															</Box> */}
															<Box marginTop={2} fontSize="xs">
																<Text>
																	starting price {price}
																</Text>
																<Text>
																	Each time your pools sells an NFT, the price will <Box as="span" fontWeight="bold">go up</Box> by {delta} ETH
																</Text>
															</Box>
														</TabPanel>
													</TabPanels>
												</Tabs>
											</Box>
										</Box>

									</Box>
								</Box>
								<Box border="1px solid black" marginTop={2}>
									<Box mx={2}>
										<Box>
											<Text color="gray.700" fontWeight="bold" fontSize="xl">
												assets
											</Text>
										</Box>
										<Box>
											Number of of Nfts
										</Box>
										<Box marginBottom={2}>
											<Input value={noNfts} onChange={({ target: { value } }) => setNoNfts(value)} size="sm" width="20vw" />
										</Box>
									</Box>
								</Box>
							</Box>
						}
					</ModalBody>
					<ModalFooter>
						<SecondaryBtn
							disabled={createPair === ""}
							name="back"
							onClick={() => setCreatePair("")}
						/>
						<DangerBtn
							onClick={onClose}
							name="Close"
							style={{
								marginLeft: "23px"
							}}
						/>
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
							display="flex"
							width="20vw"
							_focus={{
								border: "none",
								outline: "none"
							}}
							_hover={{
								borderColor: "pink.400",
							}}
						>
							<Box as="span">pools</Box> <Box marginLeft="2" as="span">{0}</Box>
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
								{new Array(4).fill(0).map((card, _index) => (
									<div style={{ margin: "20px" }} key={_index}>
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
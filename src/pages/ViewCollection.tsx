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
import { useEffect, useState } from "react";
import { usePrepareContractWrite, useContractWrite, useNetwork, useProvider } from 'wagmi';

import { DangerBtn, EthereumSVGIcon, PrimaryBtn, SecondaryBtn } from "../common/ui";
import NFTCard from "../components/NFTCard";
import { PoolTypeCard } from "../components/CreatePool";
import { abi } from "../assets/contracts/LSSVMPairFactory.sol/LSSVMPairFactory.json";
import { ethers } from "ethers";


function ViewCollection() {
	const { state } = useLocation();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [createPair, setCreatePair] = useState<string>("");
	const [curve, setCurve] = useState<string>(); //set default to exponential 

	const [price, setPrice] = useState<string>("0");
	const [delta, setDelta] = useState<string>("0");
	const [noNfts, setNoNfts] = useState<string>("1");
	const [fee, setFee] = useState<string>("0");

	const { chain, chains } = useNetwork()
	const provider = useProvider();
	console.log("the chain", chain, chains);
	console.log("the provider", provider);

	console.log("state", state)


	// let args = [
	// 	"0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b", //nft address
	// 	"0x3D26E7FB6e8A1258e87C9Ecdb7D820AF4C370cb2",// linear curve address
	// 	"0xdAa00502352c62F6c82208aDdB9Bdf2efD687032", //asset recipient
	// 	"1", //eth pool type, '0' for tokens and 2 for trade
	// 	"1", //delta
	// 	"0", //fee
	// 	ethers.utils.parseEther("0.002"),  //spot price
	// 	[911956] // nft ids
	// ]

	let args = [
		state.id, //nft address
		// "0x3D26E7FB6e8A1258e87C9Ecdb7D820AF4C370cb2",// linear curve address
		"0x339B77Ce4ecA6C7e074dE7026EF4c6B0D7372011", //quadratic curve address
		"0xdAa00502352c62F6c82208aDdB9Bdf2efD687032", //asset recipient
		"1", //eth pool type, '0' for tokens and 2 for trade
		delta, //delta
		"0", //fee
		ethers.utils.parseEther("0.00002"),  //spot price
		[911957] // nft ids
	]

	const { config } = usePrepareContractWrite({
		address: '0x9435EA9378F9FaDB62767b10c52ed9eC76Ff6c1B',
		abi: abi,
		functionName: 'createPairETH',
		args
	})
	const { data, isLoading, isSuccess, write } = useContractWrite(config)

	// //! confirming transfer of my assets to the pair factory contract
	// const { config } = usePrepareContractWrite({
	// 	address: '0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b',
	// 	abi: [{ "inputs": [{ "internalType": "address", "name": "_DAI", "type": "address" }, { "internalType": "address", "name": "_WETH", "type": "address" }, { "internalType": "string", "name": "_URI", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }], "name": "FaucetDrained", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }], "name": "FaucetDripped", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "status", "type": "bool" }], "name": "OperatorUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "status", "type": "bool" }], "name": "SuperOperatorUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DAI", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DAI_AMOUNT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ETH_AMOUNT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "NFT_COUNT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "URI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WETH", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WETH_AMOUNT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "approvedOperators", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "availableDrips", "outputs": [{ "internalType": "uint256", "name": "ethDrips", "type": "uint256" }, { "internalType": "uint256", "name": "daiDrips", "type": "uint256" }, { "internalType": "uint256", "name": "wethDrips", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_recipient", "type": "address" }], "name": "drain", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_recipient", "type": "address" }], "name": "drip", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nftsMinted", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "superOperators", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_operator", "type": "address" }, { "internalType": "bool", "name": "_status", "type": "bool" }], "name": "updateApprovedOperator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_nftCount", "type": "uint256" }, { "internalType": "uint256", "name": "_ethAmount", "type": "uint256" }, { "internalType": "uint256", "name": "_daiAmount", "type": "uint256" }, { "internalType": "uint256", "name": "_wethAmount", "type": "uint256" }], "name": "updateDripAmounts", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_operator", "type": "address" }, { "internalType": "bool", "name": "_status", "type": "bool" }], "name": "updateSuperOperator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_URI", "type": "string" }], "name": "updateTokenURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }],
	// 	functionName: 'setApprovalForAll',
	// 	args: ["0x9435EA9378F9FaDB62767b10c52ed9eC76Ff6c1B", true]
	// })
	// const { write } = useContractWrite(config);

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
					<GenericBox title="floor" value={parseFloat(state.floorAsk.price.amount.native).toFixed(2)} />
					<GenericBox title="volume" value={parseFloat(state.volume.allTime).toFixed(2)} />
					<GenericBox title="listed" value={0} />
				</Box>
			</Box>

			{/* <div>
				<button disabled={!write} onClick={() => write?.()}>
					approve nft transfer
				</button>
			</div> */}
			{/* 
			<div>
				<button disabled={!write} onClick={() => write?.()}>
					approve create pair eth
				</button>
			</div> */}

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
														<Box as="span">{parseFloat(state.floorAsk.price.amount.native).toFixed(2)}</Box>
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
								<Box my={4} textAlign="center">
									<PrimaryBtn
										disabled={!write}
										onClick={() => write?.()}
										name="create pool"
									/>
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
								<Box my={4} textAlign="center">
									<PrimaryBtn
										disabled={!write}
										onClick={() => write?.()}
										name="create pool"
									/>
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
											image="https://i.seadn.io/gcs/files/b4d419a67bc7dc52000e6d1336b24c46.png?auto=format&w=1000"
											title="MultiFaucet Test NFT"
											floor={0.1}
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
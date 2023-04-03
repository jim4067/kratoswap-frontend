import { useLocation, useParams } from "react-router-dom";
import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";

import { PrimaryBtn, SecondaryBtn } from "../common/ui";
import NFTCard from "../components/NFTCard";

function ViewCollection() {
	const { state } = useLocation();

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
					<PrimaryBtn name="create pool" />
				</Box>
				<Box style={{ marginLeft: "23px" }}>
					<SecondaryBtn name={"buy / sell"} />
				</Box>
			</Box>

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
							pools {0}
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
										<NFTCard />
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
		<Box fontSize="2xl">
			{value}
		</Box>
	</Box>
}

export default ViewCollection;
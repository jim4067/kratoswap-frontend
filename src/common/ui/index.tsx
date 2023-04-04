import { Box, Button } from "@chakra-ui/react";

export function PrimaryBtn({ name, onClick }: { name: string, onClick?: () => void }) {
	return <Box>
		<Button
			onClick={onClick}
			border={"0.5px solid black"}
			borderRadius={"none"}
			// as={'a'}
			// display={{ base: 'none', md: 'inline-flex' }}
			fontSize={'sm'}
			fontWeight={600}
			bg={"none"}
			color={"black"}
			// href={'#'}
			bgColor="pink.400"
			opacity={.8}
			width="140px"
			_focus={{
				outline: "none"
			}}
			_hover={{
				bg: 'pink.400',
				opacity: "1",
				color: 'black',
			}}>
			{name}
		</Button>
	</Box>
}


export function SecondaryBtn({ name, onClick, disabled }: { name: string, onClick?: () => void, disabled: boolean }) {
	return <Box>
		<Button
			onClick={onClick}
			disabled={disabled}
			isDisabled={disabled}

			border={"0.5px solid black"}
			borderRadius={"none"}
			// as={'a'}
			// display={{ base: 'none', md: 'inline-flex' }}
			fontSize={'sm'}
			fontWeight={600}
			bg={"none"}
			color={"black"}
			// href={'#'}
			width="140px"
			_focus={{
				outline: "none"
			}}
			_hover={{
				bg: 'pink.400',
				color: 'black',
			}}>
			{name}
		</Button>
	</Box>
}

export const EthereumSVGIcon = ({ fill }: { fill: string }) => (<svg width="11" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 10.216 5.5 18 0 10.216l5.5 3.263 5.5-3.262ZM5.5 0l5.496 9.169L5.5 12.43 0 9.17 5.5 0Z" fill={fill} /></svg>)

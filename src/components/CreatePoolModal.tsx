export {}

// import {
// 	Button,
// 	Modal,
// 	ModalOverlay,
// 	ModalContent,
// 	ModalHeader,
// 	ModalFooter,
// 	ModalBody,
// 	ModalCloseButton,
// 	Text,
// } from '@chakra-ui/react'


// import { useDisclosure } from '@chakra-ui/react'
// import { useState } from 'react'


// function CreatePoolModal({ onOpen }: { onOpen: () => void }) {
// 	// const OverlayOne = () => (
// 	// 	<ModalOverlay
// 	// 		bg='blackAlpha.300'
// 	// 		backdropFilter='blur(10px) hue-rotate(90deg)'
// 	// 	/>
// 	// )

// 	const OverlayTwo = () => (
// 		<ModalOverlay
// 			bg='none'
// 			backdropFilter='auto'
// 			backdropInvert='80%'
// 			backdropBlur='2px'
// 		/>
// 	)

// 	const { isOpen,/*  onOpen, */ onClose } = useDisclosure()
// 	// const [overlay, setOverlay] = React.useState(<OverlayOne />)
// 	const [overlay, setOverlay] = useState(<OverlayTwo />);

// 	return (
// 		<>
// 			{/* <Button
// 				onClick={() => {
// 					setOverlay(<OverlayOne />)
// 					onOpen()
// 				}}
// 			>
// 				Use Overlay one
// 			</Button> */}
// 			<Button
// 				ml='4'
// 				onClick={() => {
// 					setOverlay(<OverlayTwo />)
// 					onOpen()
// 				}}
// 			>
// 				Use Overlay two
// 			</Button>
// 			<Modal isCentered isOpen={isOpen} onClose={onClose}>
// 				{overlay}
// 				<ModalContent>
// 					<ModalHeader>Create Pool</ModalHeader>
// 					<ModalCloseButton />
// 					<ModalBody>
// 						<Text>Create your pool...!</Text>
// 					</ModalBody>
// 					<ModalFooter>
// 						<Button onClick={onClose}>Close</Button>
// 					</ModalFooter>
// 				</ModalContent>
// 			</Modal>
// 		</>
// 	)
// }

// export default CreatePoolModal;
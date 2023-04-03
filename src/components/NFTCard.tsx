import { Box, Text } from "@chakra-ui/react"
import PolygonLogo from '../assets/polygonLogo.svg';

function NFTCard() {

    return <Box display="flex" justifyContent="center">
        <Box border="1px solid black" width="200px">
            <Box display="flex">
                <img
                    src="https://i.seadn.io/gae/wfTzs4q-MoAkzsjcLwBHbG5CoaJL5lpIapph99lhGYnJh2AmZTwDAAfXZkx2tpatL0n4LpGiti87R8GeB6fqW5quu047Fj8nG8aU?auto=format&w=2048"
                    alt="Card Picture"
                    height={300}
                />
            </Box>
            <Box mx="3">
                <Box my="2">
                    <Text marginLeft="0" fontSize="xl" fontWeight="bold">
                        dummy title
                    </Text>
                </Box>

                <Box fontWeight="semibold" opacity="0.7" fontSize="sm">
                    floor
                </Box>

                <Box>
                    <Box display="flex">
                        <Box margin="auto 0">
                            <img src={PolygonLogo} />
                        </Box>
                        <Box margin="auto 8px">
                            <Text fontWeight="semibold" opacity="0.2">
                                0.14
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
}

export default NFTCard;
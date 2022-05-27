import { Box, Container, VStack, Flex, Text, HStack, Center } from "@chakra-ui/react";
import Image from 'next/image'
import { useEffect } from "react";
// require("dot-env")

const Main = () => {
    const api_key = process.env.API_KEY
    const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${api_key}`
    const oneEthToUSDurl = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${api_key}`


    useEffect(() => {
        let date = new Date().toUTCString().slice(5,16)
        document.getElementById("date").innerHTML = date

        function parseTo(string) {
            return parseFloat(string).toFixed(2)
        }
        function callAPI() {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data.message != "OK") throw new Error("URL not fetched!")
                    const result = data.result
                    var baseFee = result.suggestBaseFee
                    var lowFee = result.SafeGasPrice
                    var marketFee = result.ProposeGasPrice
                    var aggressiveFee = result.FastGasPrice

                    baseFee = parseTo(baseFee)
                    document.getElementById("baseFees").innerHTML = baseFee

                    lowFee = parseTo(lowFee)
                    document.getElementById("lowFees").innerHTML = lowFee

                    marketFee = parseTo(marketFee)
                    document.getElementById("marketFees").innerHTML = marketFee

                    aggressiveFee = parseTo(aggressiveFee)
                    document.getElementById("aggressiveFees").innerHTML = aggressiveFee

                    var timeLeft = 14
                    var timer = setInterval(() => {
                        if (timeLeft <= 0) {
                            clearInterval(timer)
                        }
                        document.getElementById("timer").innerHTML = (timeLeft).toString() + 's' + ' ...'
                        timeLeft -= 1
                    }, 1000)

                    fetch(oneEthToUSDurl)
                        .then(res => res.json())
                        .then(data => {
                            if (data.message != "OK") throw new Error("URL not fetched!")
                            const oneEthToUSD = data.result.ethusd
                            const oneGWEItoEth = 0.00000000155
                            const baseFeeInEth = parseFloat(baseFee) * oneGWEItoEth
                            const baseFeeInUSD = baseFeeInEth * oneEthToUSD

                            document.getElementById("baseFeesUSD").innerHTML = (baseFeeInUSD.toString()).substring(0, 10)
                        }).catch(err => {
                            console.log(err)
                        })
                }).catch(err => {
                    console.log(err)
                })
        }
        callAPI()
        setInterval(callAPI, 15000)
    }, [])

    return (
        <Container maxW="100vw" bgColor="background" minHeight="100vh" centerContent="true" justifyContent="center">
            <Box bgColor="white" height="80vh" width="80%" borderRadius="25px">
                <VStack spacing={6} fontFamily="primary" mt="3%">
                    <Flex h="100px" color="greeting" alignItems="center" w="70%" justifyContent="space-between" borderRadius="25px">
                        <Text fontSize="2xl">Welcome back <b>CryptoNerd!</b></Text>
                        <HStack>
                            <Image src="/images/calendar.png" height={20} width={20} alt="calendar" />
                            <Text fontSize="lg" id="date">27 May 2022</Text>
                        </HStack>
                    </Flex>
                    <Flex w="70%" h="100px" bgColor="baseBg" alignItems="center" borderRadius="10px">
                        <HStack justifyContent="space-evenly" w="100%">
                            <Flex h="100px" w="45%" alignItems="center" justifyContent="space-between">
                                <Image src="/images/ethereum.svg" width={40} height={40} />
                                <Text>Ethereum Mainnet</Text>
                                <Text><b>Base Fee</b></Text>
                            </Flex>
                            <Box h="40px" w="1px" bgColor="gray.400"></Box>
                            <Flex h="100px" w="45%" alignItems="center" justifyContent="space-between">
                                <Text><b id="baseFees">19.23</b> GWEI</Text>
                                <Text><b id="baseFeesUSD">0.00004913</b> USD</Text>
                                <Text id="timer" w="50px">15s ...</Text>
                            </Flex>
                        </HStack>
                    </Flex>
                    <Flex w="70%" alignItems="center" h="100px">
                        <HStack w="100%" justifyContent="space-between">
                            <Center bgColor="lowBg" h="100px" w="30%" justifyContent="space-evenly" borderRadius="5px">
                                <Image src="/images/Turtle.svg" height={50} width={50} alt="turtle" />
                                <Flex color="lowText" flexDir="column">
                                    <Text>LOW</Text>
                                    <Text><b id="lowFees">20</b> <b>GWEI</b></Text>
                                </Flex>
                            </Center>
                            <Center bgColor="marketBg" h="100px" w="30%" justifyContent="space-evenly" borderRadius="5px">
                                <Image src="/images/Fox.svg" height={50} width={50} alt="turtle" />
                                <Flex color="marketText" flexDir="column">
                                    <Text>MARKET</Text>
                                    <Text><b id="marketFees">20</b> <b>GWEI</b></Text>
                                </Flex>
                            </Center>
                            <Center bgColor="aggressiveBg" h="100px" w="30%" justifyContent="space-evenly" borderRadius="5px">
                                <Image src="/images/Gorilla.svg" height={50} width={50} alt="turtle" />
                                <Flex color="aggressiveText" flexDir="column">
                                    <Text>AGGRESSIVE</Text>
                                    <Text><b id="aggressiveFees">20</b> <b>GWEI</b></Text>
                                </Flex>
                            </Center>
                        </HStack>
                    </Flex>
                </VStack>
            </Box>
        </Container>
    );
}

export default Main;
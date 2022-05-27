import { extendTheme } from '@chakra-ui/react'

const theme = {
    colors: {
        background: "#F2ECDB",
        white: "#FFFFFF",
        greeting: "#3629B7",
        baseBg: "#F7F9FD",
        baseText: "#11263C",
        lowBg: "#EDFFEF",
        lowText: "#55A55E",
        marketBg: "#F4F2FF",
        marketText: "#5E5498",
        aggressiveBg: "#FFF2EC",
        aggressiveText: "#9B715D",
        divider: "##EFEFF1"
    },
    fonts: {
        primary: "Poppins, sans-serif"
    },
    config: {
        useSystemColorMode: false
    }
}

export default extendTheme(theme);
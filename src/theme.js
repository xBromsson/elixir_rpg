import { extendTheme } from '@chakra-ui/react'

const colors = {
    main: 'yellow'
}

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

const theme = extendTheme({colors, config})

export default theme;
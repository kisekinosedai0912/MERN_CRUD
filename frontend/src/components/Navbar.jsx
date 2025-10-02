import React from 'react'
import { BsCart4, BsPlusSquare } from "react-icons/bs"
import { MdOutlineLightMode } from "react-icons/md"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <h1>Navbar</h1>
    // <Container maxW="1140px" px={4}>
    //   <Flex
    //     h={16}
    //     alignItems="center"
    //     justifyContent="space-between"
    //     flexDir={{ base: "column", sm: "row" }}
    //   >
    //     <Text
    //       bgGradient="linear(to-r, cyan.400, blue.500)"
    //       bgClip="text"
    //       fontSize={{ base: "22px", sm: "28px" }}
    //       fontWeight="bold"
    //       textTransform="uppercase"
    //       textAlign="center"
    //     >
    //       <Link to="/">
    //         Products Page <BsCart4 style={{ display: "inline" }} />
    //       </Link>
    //     </Text>

    //     <HStack spacing={4}>
    //       <Button>
    //         <BsPlusSquare />
    //       </Button>
    //       <Button>
    //         <MdOutlineLightMode />
    //       </Button>
    //     </HStack>
    //   </Flex>
    // </Container>
  )
}

export default Navbar
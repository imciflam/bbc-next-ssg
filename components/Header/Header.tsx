import React, { FunctionComponent } from "react"
import Link from "next/link"
import { Center } from "../Center"
import { Container, Logo } from "./style"

export const Header: FunctionComponent = () => {
  return (
    <Container>
      <Center>
        <Logo>
          {/*link should be used only for navigation between application routes*/}
          <Link href="/">
            <a>What's Next?!</a>
          </Link>
        </Logo>
      </Center>
    </Container>
  )
}

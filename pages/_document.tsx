import React from "react"
import { ServerStyleSheet } from "styled-components"
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from "next/document"

export default class MyDocument extends Document {
  // ctx contains a lot - pathname of a page URL, req for request, res for response and error object err
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      // initial props + theme
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      // so the object is gonna be available for garbage collector
      sheet.seal()
    }
  }

  render() {
    const description = "The Next generation of a news feed"
    const fontsUrl =
      "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"

    return (
      <Html>
        <Head>
          <meta name="description" content={description} />
          <link href={fontsUrl} rel="stylesheet" />
          {/*styles collected using ServerStyleSheet*/}
          {this.props.styles}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

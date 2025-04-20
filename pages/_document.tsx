import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
  } from 'next/document'
  
  class MyDocument extends Document<{ nonce: string }> {
    static async getInitialProps(ctx: DocumentContext) {
      const initialProps = await Document.getInitialProps(ctx)
  
      const nonceHeader = ctx.res?.getHeader('x-nonce')
      const nonce = Array.isArray(nonceHeader) ? nonceHeader[0] : nonceHeader || ''
  
      return { ...initialProps, nonce: String(nonce) }
    }
  
    render() {
      const { nonce } = this.props
  
      return (
        <Html>
          <Head>
            <script
              nonce={nonce}
              dangerouslySetInnerHTML={{
                __html: `console.log("CSP nonce OK");`,
              }}
            />
          </Head>
          <body>
            <Main />
            <NextScript nonce={nonce} />
          </body>
        </Html>
      )
    }
  }
  
  export default MyDocument
  
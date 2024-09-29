import '@styles/globals.css';
import Provider from '@components/Provider';
import Nav from '@components/Nav';

// change metadata
export const metadata = {
    title : 'Promptopia',
    description: 'Discover & Share AI prompts'
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
        <div className='gradient' />
    </div>
    <main className='app'>
        {/* render all the children within the app */}
        <Nav />
    {children}
    </main>
    </Provider>
    </body> 
    </html>
  )
}

export default RootLayout;
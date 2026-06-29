import { HashLoader } from 'react-spinners'

const Loader = () => {
  return (
    <>
        <div className={`bg-white absolute top-0 z-10 w-screen h-screen flex justify-center items-center`}>
            <div>
            <HashLoader size={100} color='#000000' speedMultiplier={1.6} />
            </div>
        </div>
    </>
  )
}

export default Loader
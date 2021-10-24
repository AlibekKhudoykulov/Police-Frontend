import Header from "../components/Header";
import './css/Home.css'
import HomeCarousel from "../components/HomeCarousel";
import Footer from "../components/Footer";
import {requestGet} from "../utils/Requests";
import {useContext, useEffect} from "react";
import {TOKEN} from "../utils/constants";
import {GlobalContext} from "../App";
function Home() {

    const value = useContext(GlobalContext);

    return <div>
        <h2 className={'text-center my-4'}>Welcome to smart city!</h2>
        <HomeCarousel/>
        <div className={'mt-5'}>
            <div className='article a-1'>
                <div><img className="images" src="resources/id-card.png" alt="id-card"/></div>
                <div>
                    <p>Everywhere just use one card number!</p>
                </div>
            </div>

            <div className='article a-2'>
                <div className={'word'}><p>
                    Take advantage of a wide range of options living in a smart city!
                </p></div>
                <div><img className="images" src="resources/facilities.png" alt="id-card"/></div>
            </div>

            <div className='article a-1'>
                <div><img className="images" src="resources/life.webp" alt="id-card"/></div>
                <div><p>
                    Enjoy smart facilities and life!
                </p></div>
            </div>
        </div>
        <Footer/>
    </div>
}

export default Home;


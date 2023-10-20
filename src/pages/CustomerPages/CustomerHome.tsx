import CustomerFooter from "../../components/CustomerComponents/CustomerFooter";
import {customerStyles} from "../../styles/styles";
import React, {useState} from "react";
import {useUserType} from "../../components/UserTypeContext";
import CustomerHeader from "../../components/CustomerComponents/CustomerHeader";
import image from '/src/assets/customer-homepage-picture.png';
import { CSSProperties } from 'react';
import {BookingComponent} from "../../components/CustomerComponents/BookingComponent";


const styles: {
    container: CSSProperties;
    halfContainer: CSSProperties;
    imageSection: CSSProperties;
    bookingSection: CSSProperties;
    whiteSection: CSSProperties;
    textContainer: CSSProperties;
    headerText: CSSProperties;
    subText: CSSProperties;
} = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop : "5%",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)'
    },
    halfContainer: {
        width: '100%',
        display: 'flex',
        height: '50vh',
    },
    imageSection: {
        flex: 1,
        backgroundImage: `url(${image})`,
        backgroundSize: '676px 738px',
        backgroundPosition: 'center',
        margin: '0 2px',
    },
    whiteSection: {
        flex: 1,
        background: 'white',
    },
    textContainer: {
        marginTop :'100px',
        textAlign: 'center',
        color : 'black',

    },
    headerText: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: '0',
    },
    subText: {
        fontSize: '1rem',
        padding: "5px 20px",
        margin: "0"
    },
    bookingSection: {
    },
};

export const CustomerHomePage: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const { userType ,id} = useUserType();
    const selectedStyles =
        userType === "Customer" ? customerStyles : {};

    console.log(id + "check check 1-2-1-2-1, yeeeeabuddy")

    return (
        <>
            <CustomerHeader showLoggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <div style={{ ...selectedStyles }}>
                <div style={styles.container}>
                    <div style={styles.halfContainer}>
                        <div style={styles.whiteSection}>
                            <div style={styles.textContainer}>
                                <h2 style={styles.headerText}>Välkommen till Städafint AB <br /> - Där renhet möter kvalitet och hållbarhet.</h2>
                                <p style={styles.subText}><br />Sedan vår grundning för nästan ett och ett halvt sekel sedan har vi varit en pålitlig partner inom städtjänster. Vi står för tradition, erfarenhet och kvalitet, värden som har tjänat oss och våra kunder väl genom tiderna.</p>
                                <p style={styles.subText}><br />Vi är inte bara en städfirma; vi är en del av de samhällen vi betjänar. Med en engagerad arbetsstyrka, vars kompetens spänner över flera decennier, levererar vi inte bara städtjänster, vi levererar trygghet och livskvalitet. Vårt team består av passionerade, erfarna och engagerade medarbetare som är mästare på sitt område.</p>
                                <p style={styles.subText}><br />Hållbarhet är inte bara ett modeord för oss; det är en del av vår affärsfilosofi. Vi använder miljövänliga rengöringsprodukter och arbetar ständigt med att minimera vårt ekologiska fotavtryck. Detta innebär också att vi har effektiva arbetsprocesser som inte bara sparar tid men också resurser.</p>
                                <p style={styles.subText}><br />Vår styrka ligger i vår förmåga att förstå våra kunders unika behov och erbjuda skräddarsydda lösningar. Vi tror att varje utrymme, litet som stort, förtjänar den bästa möjliga omsorgen. Vare sig det är ett kontor, ett hem eller ett kommersiellt utrymme, kan du lita på att StädaAB kommer att göra jobbet med största omsorg och professionalism..</p>
                                <p style={styles.subText}><br />Tack för att du överväger StädaAB som din partner i renhet och hållbarhet. Vi ser fram emot att vara en del av din vardag och att fortsätta sätta standarden för utmärkt och hållbar städning i generationer framöver.                                </p>

                            </div>
                        </div>
                        <div style={styles.imageSection}></div>
                    </div>
                    <div style={styles.bookingSection}>
                        <BookingComponent />
                    </div>
                </div>
            </div>

            <CustomerFooter />
        </>
    );
};
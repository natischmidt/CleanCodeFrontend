import React, {useEffect, useState} from 'react';
import KlarnaCheckout from './KlarnaCheckout';
import axios from "axios";
interface KlarnaModalPaymentProp {
    jobId: number | null
}

interface OrderDetails {
    name: string;
    ordAmout: number;
    taxAmout: number;
}
const KlarnaModalPayment: React.FC<KlarnaModalPaymentProp> = ({jobId}) => {
    const [htmlSnippet, setHtmlSnippet] = useState("");
    const [orderDetails, setOrderDetails] = useState<OrderDetails>({
        name: "" ,
        ordAmout: 0,
        taxAmout: 0,
    });


    useEffect(() => {
        if (jobId !== null) {
            const getJobType = async () => {
                try {
                    const url = `http://localhost:8080/api/jobs/getJob`;
                    const headers = {
                        'jobId': jobId.toString(),
                    };
                    const response = await axios.get(url, { headers });
                    const data = response.data;
                    if (data && data.jobtype) {
                        let newOrderDetails: OrderDetails | null = null;
                        if (data.jobtype === 'BASIC') {
                            newOrderDetails = { name: 'BASIC', ordAmout: 100000, taxAmout: 20000 };
                        } else if (data.jobtype === 'ADVANCED') {
                            newOrderDetails = { name: 'ADVANCED', ordAmout: 150000, taxAmout: 30000 };
                        } else if (data.jobtype === "DIAMOND"){
                            newOrderDetails = { name: 'DIAMOND', ordAmout: 200000, taxAmout: 40000 };
                        } else if (data.jobtype === "WINDOW"){
                            newOrderDetails = { name: 'WINDOW', ordAmout: 100000, taxAmout: 20000 };
                        }
                        if (newOrderDetails){
                            setOrderDetails(newOrderDetails)
                        }

                    }
                } catch (error) {
                    console.error(error);
                }
            };
            getJobType();
        }
    }, []);


    useEffect(() => {
       if (orderDetails.name){
            const fetchData = async () => {


                const Payload = {
                    "purchase_country": "SE",
                    "purchase_currency": "SEK",
                    "locale": "sv-SE",
                    "order_amount": orderDetails.ordAmout,
                    "order_tax_amount": orderDetails.taxAmout,
                    "order_lines": [
                        {
                            "name": orderDetails.name,
                            "quantity": 1,
                            "unit_price": orderDetails.ordAmout,
                            "tax_rate": 2500,
                            "total_amount": orderDetails.ordAmout,
                            "total_discount_amount": 0,
                            "total_tax_amount": orderDetails.taxAmout
                        }
                    ],
                    "merchant_urls": {
                        "terms": "https://www.example.com/terms.html",
                        "checkout": "https://www.example.com/checkout.html?order_id={checkout.order.id}",
                        "confirmation": "http://localhost/",
                        "push": "https://www.example.com/api/push?order_id={checkout.order.id}"
                    }
                };
                // http://localhost:5173/KlarnaConfirmation?order_id={checkout.order.id}
                //"confirmation": "https://www.example.com/confirmation.html?order_id={checkout.order.id}",


                const response = await fetch("http://localhost:8080/api/klarna/createOrder", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Payload),
                });

                const data = await response.json();

                if (data.htmlSnippet) {
                    setHtmlSnippet(data.htmlSnippet);
                } else {
                    console.error("HTML snippet not found in response");
                }
            };
            fetchData();
       }

    }, [orderDetails]);

    return (
        <div className="bodyCont" style={styles.modalContainer}>
            <div style={styles.modalInnerContainer}>
                <KlarnaCheckout htmlSnippet={htmlSnippet} />
            </div>
        </div>
    );
}
export default KlarnaModalPayment

const styles = {
    modalContainer: {
        width: "100vw",
        height: "100vh",
        zIndex: 333,
        position: "absolute" as 'absolute',
        top: 0,
        left: 0,
        backgroundColor: "rgba(9,6,6,0.65)",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    modalInnerContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
}

import {useEffect, useState} from 'react';
import KlarnaCheckout from './KlarnaCheckout';

export default function AdvancedCleanPayment() {
    const [htmlSnippet, setHtmlSnippet] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const AdvancedPayload = {
                "purchase_country": "SE",
                "purchase_currency": "SEK",
                "locale": "sv-SE",
                "order_amount": 150000,
                "order_tax_amount": 150000*0.0909,
                "order_lines": [
                    {
                        "name": "ADVANCED",
                        "quantity": 1,
                        "unit_price": 150000,
                        "tax_rate": 1000,
                        "total_amount": 150000,
                        "total_discount_amount": 0,
                        "total_tax_amount": 150000*0.0909
                    }
                ],
                "merchant_urls": {
                    "terms": "https://www.example.com/terms.html",
                    "checkout": "https://www.example.com/checkout.html?order_id={checkout.order.id}",
                    "confirmation": "https://www.example.com/confirmation.html?order_id={checkout.order.id}",
                    "push": "https://www.example.com/api/push?order_id={checkout.order.id}"
                }
            };

            const response = await fetch("http://localhost:8080/api/klarna/createAdvancedOrder", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
                },
                body: JSON.stringify(AdvancedPayload),
            });

            const data = await response.json();

            if (data.htmlSnippet) {
                setHtmlSnippet(data.htmlSnippet);
            } else {
                console.error("HTML snippet not found in response");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bodyCont" style={styles.bodyCont}>

            <KlarnaCheckout htmlSnippet={htmlSnippet} />
        </div>
    );
}

const styles = {
    bodyCont: {
        display: "flex",
        justifyContent: "center" as "center",
        alignItems: "center"as "center",
        flexDirection: "column" as "column",
        width: "100vw",
        marginTop: "2%"
    },
}

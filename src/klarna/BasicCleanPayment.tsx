import {useEffect, useState} from 'react';
import KlarnaCheckout from './KlarnaCheckout';

export default function BasicCleanPayment() {
    const [htmlSnippet, setHtmlSnippet] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const BasicPayload = {
                "purchase_country": "SE",
                "purchase_currency": "SEK",
                "locale": "sv-SE",
                "order_amount": 100000,
                "order_tax_amount": 100000 * 0.0909,
                "order_lines": [
                    {
                        "name": "BASIC",
                        "quantity": 1,
                        "unit_price": 100000,
                        "tax_rate": 1000,
                        "total_amount": 100000,
                        "total_discount_amount": 0,
                        "total_tax_amount": 100000 * 0.0909
                    }
                ],
                "merchant_urls": {
                    "terms": "https://www.example.com/terms.html",
                    "checkout": "https://www.example.com/checkout.html?order_id={checkout.order.id}",
                    "confirmation": "https://www.example.com/confirmation.html?order_id={checkout.order.id}",
                    "push": "https://www.example.com/api/push?order_id={checkout.order.id}"
                }
            };

            const response = await fetch("http://localhost:8080/api/klarna/createBasicOrder", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(BasicPayload),
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

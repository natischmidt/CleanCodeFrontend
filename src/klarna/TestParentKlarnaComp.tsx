import { useState } from 'react';
import KlarnaCheckout from './KlarnaCheckout';

export default function TestParentKlarnaComp() {
    const [htmlSnippet, setHtmlSnippet] = useState("");

    const handleBasicClean = async () => {
        const payload = {
            "purchase_country": "SE",
            "purchase_currency": "SEK",
            "locale": "sv-SE",
            "order_amount": 60000,
            "order_tax_amount": 60000*0.0909,
            "order_lines": [
                {
                    "name": "NALLEBJÖRN",
                    "quantity": 6,
                    "unit_price": 10000,
                    "tax_rate": 1000,
                    "total_amount": 60000,
                    "total_discount_amount": 0,
                    "total_tax_amount": 60000*0.0909
                }
            ],
            "merchant_urls": {
                "terms": "https://www.example.com/terms.html",
                "checkout": "https://www.example.com/checkout.html?order_id={checkout.order.id}",
                "confirmation": "https://www.example.com/confirmation.html?order_id={checkout.order.id}",
                "push": "https://www.example.com/api/push?order_id={checkout.order.id}"
            }
            // "confirmation": "http://localhost:5173/KConfirmation?order_id={checkout.order.id}"
           // "confirmation": "https://www.example.com/confirmation.html?order_id={checkout.order.id}",
        };
        const response = await fetch("http://localhost:8080/api/klarna/createOrder", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();

        if (data.htmlSnippet) {
            setHtmlSnippet(data.htmlSnippet);
        } else {
            console.error("HTML snippet not found in response");
        }
    };

    const handleAdvancedClean = async () => {
        const response = await fetch("http://localhost:8080/api/klarna/getOrder", {
            method: "GET",
            //body: JSON.stringify({ type: "advanced" }),
        });
        const data = await response.json();

        if (data.htmlSnippet) {
            setHtmlSnippet(data.htmlSnippet);
        } else {
            console.error("HTML snippet not found in response");
        }
    };

    return (
        <div className="bodyCont" style={styles.bodyCont}>
            <div style={styles.btnCont}>
                <button onClick={handleBasicClean}>Basic Clean</button>
                <button onClick={handleAdvancedClean}>Advanced Clean</button>
            </div>
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
        width: "100vw"
    },
    btnCont: {

    }
}
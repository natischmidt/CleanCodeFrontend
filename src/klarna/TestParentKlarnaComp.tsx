import { useState } from 'react';
import KlarnaCheckout from './KlarnaCheckout';

export default function TestParentKlarnaComp() {
    const [htmlSnippet, setHtmlSnippet] = useState("");
    const [checkoutUrl, setCheckoutUrl] = useState("")
    const handleBasicClean = async () => {

        const BasicPayload = {
            "purchase_country": "SE",
            "purchase_currency": "SEK",
            "locale": "sv-SE",
            "order_amount": 100000,
            "order_tax_amount": 20000,
            "order_lines": [
                {
                    "name": "BASIC",
                    "quantity": 1,
                    "unit_price": 100000,
                    "tax_rate": 2500,
                    "total_amount": 100000,
                    "total_discount_amount": 0,
                    "total_tax_amount": 20000
                }
            ],
            "merchant_urls": {
                "terms": "https://www.example.com/terms.html",
                "checkout": "https://www.example.com/checkout.html?order_id={checkout.order.id}",
                "confirmation": `https://www.example.com/confirmation.html?order_id={checkout.order.id}`,
                "push": "https://www.example.com/api/push?order_id={checkout.order.id}"
            }
            // "confirmation": "http://localhost:5173/KlarnaConfirmation?order_id={checkout.order.id}"
           // "confirmation": "https://www.example.com/confirmation.html?order_id={checkout.order.id}",
        };
        const response = await fetch("http://localhost:8080/api/klarna/createOrder", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
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

    const handleAdvancedClean = async () => {
        const AdvancedPayload = {
            "purchase_country": "SE",
            "purchase_currency": "SEK",
            "locale": "sv-SE",
            "order_amount": 150000,
            "order_tax_amount": 30000,
            "order_lines": [
                {
                    "name": "ADVANCED",
                    "quantity": 1,
                    "unit_price": 150000,
                    "tax_rate": 2500,
                    "total_amount": 150000,
                    "total_discount_amount": 0,
                    "total_tax_amount": 30000
                }
            ],
            "merchant_urls": {
                "terms": "https://www.example.com/terms.html",
                "checkout": "https://www.example.com/checkout.html?order_id={checkout.order.id}",
                "confirmation": "https://www.example.com/confirmation.html?order_id={checkout.order.id}",
                "push": "https://www.example.com/api/push?order_id={checkout.order.id}"
            }
            // "confirmation": "http://7localhost:513/KConfirmation?order_id={checkout.order.id}"
            // "confirmation": "https://www.example.com/confirmation.html?order_id={checkout.order.id}",
        };
        const response = await fetch("http://localhost:8080/api/klarna/createOrder", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,

                'Content-Type': 'application/json'
            },
            body: JSON.stringify(AdvancedPayload),
        });
        const data = await response.json();



        if (data.htmlSnippet) {
            console.log(data)
            setHtmlSnippet(data.htmlSnippet);
        } else {
            console.error("HTML snippet not found in response");
        }
    };

    const handleDiamondClean = async () => {
        const DiamondPayload = {
            "purchase_country": "SE",
            "purchase_currency": "SEK",
            "locale": "sv-SE",
            "order_amount": 200000,
            "order_tax_amount": 40000,
            "order_lines": [
                {
                    "name": "DIAMOND",
                    "quantity": 1,
                    "unit_price": 200000,
                    "tax_rate": 2500,
                    "total_amount": 200000,
                    "total_discount_amount": 0,
                    "total_tax_amount": 40000
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
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DiamondPayload),
        });
        const data = await response.json();

        if (data.htmlSnippet) {
            setHtmlSnippet(data.htmlSnippet);
        } else {
            console.error("HTML snippet not found in response");
        }
    };

    const handleWindowClean = async () => {
        const WindowPayload = {
            "purchase_country": "SE",
            "purchase_currency": "SEK",
            "locale": "sv-SE",
            "order_amount": 100000,
            "order_tax_amount": 20000,
            "order_lines": [
                {
                    "name": "WINDOW",
                    "quantity": 1,
                    "unit_price": 100000,
                    "tax_rate": 2500,
                    "total_amount": 100000,
                    "total_discount_amount": 0,
                    "total_tax_amount": 20000
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
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(WindowPayload),
        });
        const data = await response.json();

        if (data.htmlSnippet) {
            setHtmlSnippet(data.htmlSnippet);
        } else {
            console.error("HTML snippet not found in response");
        }
    };

    const handleGetOrder = async () => {
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
                <button onClick={handleBasicClean}>Basic</button>
                <button onClick={handleAdvancedClean}>Advanced</button>
                <button onClick={handleDiamondClean}>Diamond</button>
                <button onClick={handleWindowClean}>Window</button>
                <button onClick={handleGetOrder}>Get order</button>
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
        width: "100vw",
        marginTop: "2%"
    },
    btnCont: {

    }
}
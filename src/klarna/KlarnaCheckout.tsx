import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

interface KlarnaCheckoutProps {
    htmlSnippet: string;
}

const KlarnaCheckout: React.FC<KlarnaCheckoutProps> = ({ htmlSnippet }) => {

    const navigate = useNavigate()

    useEffect(() => {
        const handleIframeMessage = (event: MessageEvent) => {
            if (event.data === "navigateToCustomerMyPages") {
                navigate("/CustomerMyPages");
            }
        };
        window.addEventListener("message", handleIframeMessage);
        return () => {
            window.removeEventListener("message", handleIframeMessage);
        };
    }, []);

    return (
        <div className="checkOut">
            <iframe
                srcDoc={htmlSnippet}
                width="500"
                height="800"
            ></iframe>
        </div>
    );
};

export default KlarnaCheckout;
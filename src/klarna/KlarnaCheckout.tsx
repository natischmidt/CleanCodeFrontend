import React from "react";

interface KlarnaCheckoutProps {
    htmlSnippet: string;
}

const KlarnaCheckout: React.FC<KlarnaCheckoutProps> = ({ htmlSnippet }) => {
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
  "use client";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

// Razorpay response type
type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
};

// Add Razorpay type to window
declare global {
  interface Window {
    Razorpay: any;
  }
}

function Header() {
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  const handlePayment = async () => {
    try {
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500, currency: "INR" }),
      });

      if (!res.ok) throw new Error("Order creation failed");
      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Your Company Name",
        description: "Test Transaction",
        handler: (response: RazorpaySuccessResponse) => {
          alert(
            `Payment successful!\nPayment ID: ${response.razorpay_payment_id}`
          );
          // You can send response to your backend for verification here
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: RazorpayFailureResponse) => {
        alert(
          `Payment failed: ${response.error.description}\nReason: ${response.error.reason}`
        );
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment initialization failed");
    }
  };

  return (
    <div className="p-4 shadow-sm border-b-2 bg-white flex justify-between items-center">
      <div className="flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white">
        <Search />
        <input
          type="text"
          placeholder="search..."
          className="outline-none"
        />
      </div>
      <div>
        <Button onClick={handlePayment}>Go for Premium</Button>
      </div>
    </div>
  );
}

export default Header;

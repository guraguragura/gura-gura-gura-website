
import React from "react";

const faqs = [
  {
    question: "How long does the application process take?",
    answer: "Typically, the application review process takes 3-5 business days. Once approved, you can start setting up your store immediately."
  },
  {
    question: "When and how will I get paid?",
    answer: "Payments are processed weekly or bi-weekly depending on your seller level. You'll receive payments directly to your registered bank account."
  },
  {
    question: "Can I sell internationally through Gura?",
    answer: "Currently, Gura focuses on the Rwandan market, but we're expanding to neighboring countries soon. Stay tuned for international selling opportunities."
  },
  {
    question: "How do I manage shipping and delivery?",
    answer: "You can choose to handle shipping yourself or use Gura's fulfillment services. We provide integrated shipping labels and tracking for all sellers."
  }
];

export default function FaqSection() {
  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 font-semibold">{faq.question}</div>
            <div className="p-4">{faq.answer}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

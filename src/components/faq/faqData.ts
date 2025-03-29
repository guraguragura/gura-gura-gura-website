
import { FaqItem } from './FaqAccordion';

interface FaqCategory {
  title: string;
  description?: string;
  items: FaqItem[];
}

export const faqData: FaqCategory[] = [
  {
    title: "Orders & Shipping",
    description: "Learn about placing orders and shipping information",
    items: [
      {
        question: "How do I track my order?",
        answer: "You can track your order by logging into your account and navigating to 'My Orders'. Click on the specific order you want to track and you'll find the tracking information there. Alternatively, you can use the tracking link sent to your email after your order has been shipped."
      },
      {
        question: "What shipping options do you offer?",
        answer: "We offer Standard Shipping (3-5 business days), Express Shipping (1-2 business days), and Same-Day Delivery for select areas. Shipping costs vary based on your location and the shipping method selected at checkout."
      },
      {
        question: "How long will it take to receive my order?",
        answer: "Standard shipping usually takes 3-5 business days after the order is processed. Express shipping takes 1-2 business days. Please note that order processing can take up to 24 hours before shipping begins."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days depending on the destination country. Additional customs fees and import duties may apply and are the responsibility of the recipient."
      },
      {
        question: "Can I change or cancel my order?",
        answer: "You can change or cancel your order within 1 hour of placing it. After that, we begin processing orders and changes may not be possible. Please contact our customer service immediately if you need to make changes."
      }
    ]
  },
  {
    title: "Returns & Refunds",
    description: "Information about our return policy and refund process",
    items: [
      {
        question: "What is your return policy?",
        answer: "We accept returns within 30 days of delivery for most items in new, unused condition with original packaging and tags. Some products like personalized items, intimate apparel, and clearance items may not be eligible for return."
      },
      {
        question: "How do I return an item?",
        answer: "To initiate a return, log into your account, go to 'My Orders', select the order containing the item you wish to return, and click 'Return Items'. Follow the instructions to complete the return process. You'll receive a return shipping label via email."
      },
      {
        question: "When will I receive my refund?",
        answer: "Once we receive and inspect your return, we'll process your refund. This typically takes 3-5 business days. Refunds are issued to the original payment method. You'll receive an email confirmation when your refund has been processed."
      },
      {
        question: "Can I exchange an item instead of returning it?",
        answer: "Yes, you can request an exchange for a different size, color, or even a different item of equal value. During the return process, select 'Exchange' instead of 'Return' and follow the instructions to select your desired replacement item."
      },
      {
        question: "Do I have to pay for return shipping?",
        answer: "For standard returns, there is a small fee deducted from your refund to cover return shipping costs. If you're returning due to a defect, damage, or incorrect item, we'll cover the return shipping costs. Free returns are also available for premium members."
      }
    ]
  },
  {
    title: "Account & Payment",
    description: "Answers to account-related questions and payment methods",
    items: [
      {
        question: "How do I create an account?",
        answer: "You can create an account by clicking on the 'Sign Up' button at the top of the page. You'll need to provide your email address and create a password. You can also sign up using your Google, Facebook, or Apple accounts for a faster registration process."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers. In some regions, we also offer cash on delivery and installment payment options."
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes, all payment information is encrypted using industry-standard SSL technology. We do not store your complete credit card information on our servers. Our payment processing complies with PCI DSS standards to ensure maximum security for your financial data."
      },
      {
        question: "How do I reset my password?",
        answer: "To reset your password, click on 'Sign In', then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you a link to reset your password. The link is valid for 24 hours."
      },
      {
        question: "Can I use multiple payment methods for a single order?",
        answer: "Currently, we only support using one payment method per order. If you have store credit or gift cards, you can apply these to your order first, and then pay the remaining balance with your preferred payment method."
      }
    ]
  },
  {
    title: "Products & Availability",
    description: "Information about our products and availability",
    items: [
      {
        question: "How can I check if an item is in stock?",
        answer: "Product pages display real-time inventory status. If an item is in stock, you'll see the available quantity or simply 'In Stock'. For out-of-stock items, you can sign up for notifications when the item becomes available again."
      },
      {
        question: "Are your products authentic and genuine?",
        answer: "Yes, all products sold on our platform are 100% authentic and sourced directly from official brands or authorized distributors. We have a strict zero-tolerance policy for counterfeit items and verify all our suppliers thoroughly."
      },
      {
        question: "Do you offer warranties on products?",
        answer: "Warranty coverage varies by product and manufacturer. Most electronics and appliances come with the manufacturer's warranty, which is typically 1-2 years. Warranty information is listed on each product page under 'Specifications'."
      },
      {
        question: "What if I receive a defective product?",
        answer: "If you receive a defective product, please contact our customer service within 48 hours of delivery. We'll arrange for a replacement or refund. You may be asked to provide photos of the defect to help with the process."
      },
      {
        question: "Can I pre-order upcoming products?",
        answer: "Yes, some products are available for pre-order before their official release date. These items are clearly marked as 'Pre-Order' on the product page with an estimated shipping date. Your card will only be charged when the item ships."
      }
    ]
  },
  {
    title: "Promotions & Discounts",
    description: "Details about our promotional offers and discount programs",
    items: [
      {
        question: "How do I apply a promo code?",
        answer: "During checkout, you'll see a field labeled 'Promo Code' or 'Discount Code'. Enter your code and click 'Apply' to see the discount reflected in your order total. Make sure to check the terms and conditions of the promo code, as some may have restrictions."
      },
      {
        question: "Why isn't my promo code working?",
        answer: "Promo codes may not work for several reasons: the code might be expired, you may not meet the minimum purchase requirement, the items in your cart might be excluded from the promotion, or you might be trying to use the code more times than allowed."
      },
      {
        question: "Do you have a loyalty program?",
        answer: "Yes, we have a loyalty program called Gura Rewards. You earn points with every purchase that can be redeemed for discounts on future orders. You also get special perks like early access to sales, birthday rewards, and exclusive offers."
      },
      {
        question: "Can I use multiple promo codes on one order?",
        answer: "Generally, only one promo code can be applied per order. However, you can combine a promo code with loyalty points, gift cards, and ongoing site-wide sales. Special promotional events may occasionally allow stacking of specific codes."
      },
      {
        question: "Do you offer student or military discounts?",
        answer: "Yes, we offer a 10% discount for verified students and military personnel. To receive the discount, you'll need to verify your status through our verification partner. Once verified, the discount will be automatically applied to your orders for one year."
      }
    ]
  }
];

export class RazorpayService {
  constructor() {
    this.isLoaded = false;
    this.loadingPromise = null;
    this.razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
  }

  isRazorpayAvailable() {
    return typeof window !== 'undefined' && window.Razorpay;
  }

  async waitForRazorpay() {
    if (this.isRazorpayAvailable()) {
      this.isLoaded = true;
      return true;
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        this.isLoaded = true;
        resolve(true);
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Razorpay script'));
      };
      
      document.head.appendChild(script);
    });

    return this.loadingPromise;
  }

  createPaymentOptions({
    amount,
    orderId, // This might be undefined now
    currency = 'INR',
    name = 'GreenNest',
    description,
    customerName,
    customerEmail,
    customerPhone,
    onSuccess,
    onFailure,
    onCancel
  }) {
    if (!this.razorpayKeyId) {
      throw new Error('Razorpay Key ID not configured');
    }

    const options = {
      key: this.razorpayKeyId,
      amount: Math.round(amount * 100), // Convert to paisa
      currency,
      name,
      description,
      // FIXED: Only include order_id if it exists and is valid
      ...(orderId && { order_id: orderId }),
      handler: function(response) {
        if (onSuccess) {
          onSuccess({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature
          });
        }
      },
      prefill: {
        name: customerName || '',
        email: customerEmail || '',
        contact: customerPhone || ''
      },
      theme: {
        color: '#2e7d32'
      },
      modal: {
        ondismiss: function() {
          if (onCancel) onCancel();
        }
      }
    };

    return options;
  }

  async openCheckout(options) {
    if (!this.isLoaded) {
      await this.waitForRazorpay();
    }

    if (!this.isRazorpayAvailable()) {
      throw new Error('Razorpay SDK not available');
    }

    const rzp = new window.Razorpay(options);
    
    rzp.on('payment.failed', function(response) {
      if (options.onFailure) {
        options.onFailure(response.error);
      }
    });

    rzp.open();
    return rzp;
  }
}

export const razorpayService = new RazorpayService();

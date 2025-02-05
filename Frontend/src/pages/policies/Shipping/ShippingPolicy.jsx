import "./ShippingPolicy.css";

const ShippingPolicy = () => {
  const titles = [
    {
      id: 1,
      title: "1. Shipping Overview",
      content:
        "At Charm Emporium, we strive to ensure your orders are delivered promptly and efficiently. Kindly refer to our shipping policy for information regarding shipping times and processes, as outlined by Charm Emporium.",
    },
    {
      id: 2,
      title: "2. Domestic Shipping",
      content:
        "Orders within India are processed and dispatched within 1 to 3 business days after the order is confirmed.",
    },
    {
      id: 3,
      title: "3. Domestic Shipping",
      content:
        "After dispatch, domestic orders generally reach you within 3 to 7 business days, depending on your location and the chosen courier service.",
    },

    {
      id: 4,
      title: "4. Shipping Costs",
      content:
        "Shipping fees are determined by your location and the weight of your order. The total shipping cost will be shown at checkout before you finalize your purchase.",
    },

    {
      id: 5,
      title: "5. Order Processing",
      content:
        "Orders are processed on business days, from Monday to Friday, excluding weekends and public holidays. Kindly allow extra time for processing during busy periods or promotional events.",
    },
    {
      id: 6,
      title: "6. Tracking Your Order",
      content:
        "After your order is dispatched, you'll receive a confirmation email containing a tracking number. You can use this number to track your shipment on the courier's website.",
    },
    {
      id: 7,
      title: "7. Delivery Issues",
      content:
        "If you encounter any issues with your delivery or haven't received your order within the expected time frame. We are committed to resolving any concerns and ensuring you receive your order.",
    },
    {
      id: 8,
      title: "8. Address Accuracy",
      content:
        "Make sure your shipping address is correct and complete. We are not liable for any delays or delivery problems caused by inaccurate or incomplete addresses entered at checkout.",
    },
  ];
  return (
    <div className="policy">
      <div className="privacy-breadcrumb-title-wrapper">
        <div className="policy-breadcrumb-content">
          <div className="policy-breadcrumb-title">
            <div className="policy-breadcrumbs-container">
              <span className="policy-breadcrumb-item">
                <a href="/">Home</a>
              </span>
              <span className="policy-brn_arrow"> / </span>
              <span className="policy-breadcrumb-item policy-current">
                Shipping Policy
              </span>
            </div>
            <h1 className="privacy-heading-title">Shipping Policy</h1>
          </div>
        </div>
      </div>

      <div className="shipping-container">
        <p className="shipping-intro">
          Website Name: Charm Emporium
          <br />
          Website URL:
          <a className="website" href="#">
            {" "}
            https://Charmemporium.com
          </a>
          <br />
          Company Name: The Entrepreneurship Network
          <br />
          Address: India Accelerator, Noida 201301 UP, India
          <br />
          Email Address:
          <a href="mailto:marketing@entrepreneurshipnetwork.net">
            <strong> marketing@entrepreneurshipnetwork</strong>
          </a>
        </p>

        {titles.map((title) => (
          <section key={title.id} className="shipping-section">
            <h2 className="shipping-title">{title.title}</h2>
            <p>{title.content}</p>
          </section>
        ))}
        <div>
          <p>
            "Thank you for choosing Charm Emporium! We value your business and
            look forward to serving you again."
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;

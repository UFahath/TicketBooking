import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";

import { Heading } from "../styles/Styled";

//table datas
let contactInfo = [
  [
    {
      text1: "Email",
      mode1: "cussupport@savvy.com",
      subject: "Customer Support",
      body: "Hello, I need help with my booking",
    },
    { text2: "PhoneNo", mode2: "+91 1234567890" },
  ],
  [
    { text1: "Facebook", mode1: "https://facebook.com" },
    { text2: "Instagram", mode2: "https://instagram.com" },
  ],
];

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Heading className="fw-bold mt-5">Contact Us</Heading>
        <div className="row fs-3">
          <div className="col">
            <h1 className="my-3">We are Here to Help</h1>
            <p className="fs-4 ms-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio,
              delectus fuga. Alias, dolor officia sint vitae vero accusantium
              libero nam architecto quos, quod illum placeat, inventore
              assumenda esse eveniet veritatis.
            </p>
          </div>
        </div>

        <Heading className="fw-bold mt-5">How To Reach Us</Heading>
        <div className="row fs-3">
          <div className="col">
            <h1 className="my-3">Customer Support</h1>
            <p className="fs-4 ms-5">
              Our dedicated support team is available 24/7 to assist you with
              any queries or issues you might have. Reach out to us via:
            </p>

            {/* //table */}

            <Table first={1} />
          </div>
        </div>

        <div className="row fs-3">
          <div className="col">
            <h1 className="my-3">Live Chat</h1>
            <p className="fs-4 ms-5 mb-5">
              For immediate assistance,you can chat with our support agents
              directly through our website. Click the chat icon at the bottom
              right corner of your screen to start a conversation.
            </p>
          </div>
        </div>

        <div className="row fs-3">
          <div className="col">
            <h1 className="my-3">Social Media</h1>
            <p className="fs-4 ms-5 mb-5">
              Stay connected with us and get the latest updates by following us
              on social media:
            </p>
            <Table first={2} />
          </div>
        </div>

        <div className="row fs-3">
          <div className="col">
            <h1 className="my-3">Feedback And Suggestions</h1>
            <p className="fs-4 ms-5 mb-5">
              We value your feedback and suggestions as they help us improve our
              services. Feel free to share your thoughts with us at
              <span className="my-2 text-center">
                {" "}
                <a href="mailto:feedback@brand.com?subject=feedback&body=Type Your FeedBack here" className="mx-2">
                  feedback@brand.com
                </a>
              </span>
              Thank you for choosing Brand! We're excited to make your booking
              experience as smooth as possible.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

function Table({ first }) {
  return (
    <table className="table table-warning table-striped  border border-primary table-hover my-4  w-50 fs-5 text-center mx-auto">
      <thead>
        <tr>
          <th scope="col">Mode of Contacts</th>
          <th scope="col">Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {first == 1 ? contactInfo[0][0].text1 : contactInfo[1][0].text1}
          </td>
          <td>
            <a
              href={
                first === 1
                  ? `mailto:${
                      contactInfo[0][0].mode1
                    }?subject=${encodeURIComponent(
                      contactInfo[0][0].subject
                    )}&body=${encodeURIComponent(contactInfo[0][0].body)}`
                  : `${contactInfo[1][0].mode1}`
              }
            >
              {first == 1 ? contactInfo[0][0].mode1 : contactInfo[1][0].mode1}
            </a>
          </td>
        </tr>
        <tr>
          <td>
            {first == 1 ? contactInfo[0][1].text2 : contactInfo[1][1].text2}
          </td>
          <td>
            {first == 1 ? (
              contactInfo[0][1].mode2
            ) : (
              <a href={first!==1&&contactInfo[1][1].mode2}>{contactInfo[1][1].mode2}</a>
            )}{" "}
            {first == 1 && "(Available 24x7)"}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ContactUs;

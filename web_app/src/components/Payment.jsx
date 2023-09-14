import "../routes/Booking.css";
import "../routes/Login.css";

function Payment() {
  return (
    <div style={{ width: "100%" }}>
      <h5 style={{ color: "white", fontWeight: "bold" }} className="mt-4 word">
        PAYMENT
      </h5>
      <form>
        <div className="mb-3" style={{ color: "white" }}>
          <p>
            <i>(It is required to deposit $25 to secure the banquet)</i>
          </p>
        </div>
        <div className="mb-3">
          <label
            style={{ color: "white" }}
            for="exampleInputEmail1"
            className="label-style form-label"
          >
            Name
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Card Owner Name"
          ></input>
        </div>

        <div className="mb-3">
          <label
            style={{ color: "white" }}
            for="exampleInputEmail1"
            className="label-style form-label"
          >
            Card Number
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Valid card number"
          ></input>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label
              style={{ color: "white" }}
              for="exampleInputPassword1"
              className="label-style form-label"
            >
              Expiration
            </label>
            <input
              type="password"
              className="form-control"
              style={{ float: "none", marginRight: 50 + "px" }}
              id="exampleInputPassword1"
              placeholder="MM/YY"
            ></input>
          </div>

          <div className="col-md-6 mb-3">
            <label
              style={{ color: "white" }}
              for="exampleInputPassword1"
              className="label-style form-label"
            >
              CVC
            </label>
            <input
              type="password"
              className="form-control"
              style={{ float: "none", marginRight: 50 + "px" }}
              id="exampleInputPassword1"
              placeholder="XXX"
            ></input>
          </div>
        </div>

        <div style={{ color: "white" }} className="form-text">
          We'll never share your bank details with anyone else.
        </div>
        <button className="mt-3 btn btn-success" type="submit">
          Pay
        </button>
      </form>
    </div>
  );
}

export default Payment;

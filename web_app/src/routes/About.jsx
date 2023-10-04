import './About.css'

function About() {
  document.body.id = 'H';
  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3"></div>
          <div className=" col-6">
            <div className="card border-0">
              <img src="http://localhost:6060/images/about-us.avif" alt="About us" style={{borderRadius: 4+"px"}} ></img>
              
            </div>
          </div>

          <div className="mt-5" style={{color:'white'}} id="fade-in">
            <h2>Soylent Green Ventures: Our Story</h2>
            <p><i>Grab Life By The Fork</i></p>
            <p style={{marginTop: "30px"}}>
            From helping restaurants of all sizes thrive, to enabling diners to find and book the perfect table for every occasion, our story is one of human connection—among diners and restaurants, and between restaurants and their communities.

            Now, we are growing globally like never before, and continuing to lead the conversation in the tech and restaurant spaces with products that anticipate the ever-evolving needs of both restaurants and diners.

            With our passion for hospitality, we take pride in bringing together people and the restaurants they love in the moments that matter. Book with us to secure a sitting at your favorite restaurant.
            </p>
          </div>

        </div>

      </div>
    </>
  )
}

export default About

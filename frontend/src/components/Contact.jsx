import React from 'react'

const Contact = () => {
    return (
        <div className="container-fluid contact  ">
            <div className="container py-5 ">
                <div className="p-5 bg-light rounded">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="text-center mx-auto px-5" /*style="max-width: 700px;"*/>
                                <h1 className="text-primary">Get in touch</h1>

                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="ratio ratio-16x9">
                                <iframe title='google-map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d293.0945623408087!2d73.54086205315102!3d17.211036942172733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1fd1eb9ee2cc1%3A0x4211ab7f61b2a403!2sNarayan%20vishram%20mestri!5e1!3m2!1sen!2sin!4v1725090714457!5m2!1sen!2sin" loading="lazy" />
                            </div>

                        </div>
                        <div className="col-lg-7">
                            <form action="" className="">
                                <input type="text" className="w-100 form-control border-0 py-3 mb-4" placeholder="Your Name"></input>
                                <input type="email" className="w-100 form-control border-0 py-3 mb-4" placeholder="Enter Your Email"></input>
                                <textarea className="w-100 form-control border-0 mb-4" /*</input>rows="5" cols="10"*/ placeholder="Your Message"></textarea>
                                <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary " type="submit">Submit</button>
                            </form>
                        </div>
                        <div className="col-lg-5">
                            <div className="d-flex p-4 rounded mb-4 bg-white">
                                <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                                <div>
                                    <h4>Address</h4>
                                    <p className="mb-2">At Post Dhamani Taluka Sangameshwar Dist Ratnagiri</p>
                                </div>
                            </div>
                            <div className="d-flex p-4 rounded mb-4 bg-white">
                                <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                                <div>
                                    <h4>Mail Us</h4>
                                    <p className="mb-2">mangohub@gmail.com</p>
                                </div>
                            </div>
                            <div className="d-flex p-4 rounded bg-white">
                                <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                                <div>
                                    <h4>Telephone</h4>
                                    <p className="mb-2">+91 9860176395</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
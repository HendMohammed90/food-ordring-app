import MainHeading from "../main-heading"

const Contact = () => {
    return (
        <section className="container mx-auto text-center section-gap">
            <MainHeading subTitle="don't Hesitate" title="Contact Us" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg">📍 Address</h3>
                            <p className="text-muted-foreground">
                                123 Pizza Street<br />
                                Food City, FC 12345<br />
                                United States
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg">📞 Phone</h3>
                            <p className="text-muted-foreground">
                                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                                    +1 (234) 567-8900
                                </a>
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg">✉️ Email</h3>
                            <p className="text-muted-foreground">
                                <a href="mailto:info@pizzapalace.com" className="hover:text-primary transition-colors">
                                    info@pizzapalace.com
                                </a>
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg">🕒 Hours</h3>
                            <div className="text-muted-foreground">
                                <p>Monday - Thursday: 11:00 AM - 10:00 PM</p>
                                <p>Friday - Saturday: 11:00 AM - 11:00 PM</p>
                                <p>Sunday: 12:00 PM - 9:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                    <form className="space-y-4 text-left">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="What's this about?"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Your message..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
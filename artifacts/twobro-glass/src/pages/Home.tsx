import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const WHATSAPP_LINK = "https://wa.me/9779800000000?text=Hello%2C%20I%20want%20to%20order%20plywood";
// NOTE: The business owner needs to update the phone number in the above link.
const EMAIL_ADDRESS = "twobroglasscentre@gmail.com";

const THICKNESSES = ["6mm", "10mm", "12mm", "18mm"];
const GRADES = [
  { label: "A", name: "Premium", desc: "Furniture-grade" },
  { label: "B", name: "Standard", desc: "Construction" },
  { label: "C", name: "Economy", desc: "General use" },
];

const PRODUCTS = THICKNESSES.flatMap(thickness => 
  GRADES.map(grade => ({
    id: `${thickness}-grade-${grade.label}`,
    thickness,
    gradeLabel: grade.label,
    gradeName: grade.name,
    gradeDesc: grade.desc
  }))
);

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: "",
    quantity: "",
    message: ""
  });

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Plywood Order - Twobro Glass Centre");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nProduct: ${formData.product}\nQuantity: ${formData.quantity}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
  };

  const scrollToOrder = (product?: string) => {
    if (product) {
      setFormData(prev => ({ ...prev, product }));
    }
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
        data-testid="btn-floating-whatsapp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Navigation / Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
            Twobro Glass Centre
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="#products" className="hover:text-primary transition-colors">Products</a>
            <a href="#order" className="hover:text-primary transition-colors">Order</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
          </nav>
          <Button 
            asChild 
            variant="default" 
            className="hidden md:inline-flex bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold"
            data-testid="btn-nav-whatsapp"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Order
            </a>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-40 bg-card border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
          
          <div className="container mx-auto max-w-6xl px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6" data-testid="badge-location">
                <MapPin className="mr-1.5 h-4 w-4" /> Panitanki, Birgunj 44300
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                Quality Plywood, <br />
                <span className="text-primary">Trusted Supply.</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                The reliable local choice for contractors, builders, and homeowners in Birgunj. Solid materials for solid builds.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  asChild 
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-lg h-14 px-8"
                  data-testid="btn-hero-whatsapp"
                >
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    Order on WhatsApp <ChevronRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => scrollToOrder()}
                  className="h-14 px-8 text-lg font-medium border-primary/20 hover:bg-primary/5"
                  data-testid="btn-hero-email"
                >
                  Request a Quote
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 bg-background">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Plywood Range</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Available in multiple thicknesses and grades to suit every project requirement, from premium furniture to general construction.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {PRODUCTS.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
                  data-testid={`card-product-${product.id}`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <span className="text-3xl font-bold text-foreground">{product.thickness}</span>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xl">
                      {product.gradeLabel}
                    </div>
                  </div>
                  
                  <div className="mb-6 flex-grow">
                    <h3 className="font-semibold text-lg text-foreground">{product.gradeName} Grade</h3>
                    <p className="text-muted-foreground text-sm mt-1">{product.gradeDesc}</p>
                  </div>
                  
                  <Button 
                    variant="secondary" 
                    className="w-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => scrollToOrder(`${product.thickness} - Grade ${product.gradeLabel} (${product.gradeName})`)}
                    data-testid={`btn-order-${product.id}`}
                  >
                    Order Now
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Order Section */}
        <section id="order" className="py-24 bg-card border-y border-border relative">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Order?</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Get in touch with us instantly via WhatsApp for the fastest response, or fill out the form to send us a detailed email order.
                </p>

                <div className="rounded-2xl border border-border bg-background p-8 mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Fastest: WhatsApp</h3>
                      <p className="text-muted-foreground text-sm">Direct message to owner</p>
                    </div>
                  </div>
                  <Button 
                    asChild 
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold h-12 text-lg mt-4"
                    data-testid="btn-order-section-whatsapp"
                  >
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6 md:p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" /> Email Order Form
                </h3>
                
                <form onSubmit={handleOrderSubmit} className="space-y-5" data-testid="form-email-order">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        required 
                        value={formData.name} 
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        placeholder="John Doe"
                        data-testid="input-order-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        required 
                        value={formData.phone} 
                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                        placeholder="98XXXXXXXX"
                        data-testid="input-order-phone"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-5">
                    <div className="sm:col-span-2 space-y-2">
                      <Label htmlFor="product">Product</Label>
                      <Select value={formData.product} onValueChange={v => setFormData(p => ({ ...p, product: v }))}>
                        <SelectTrigger id="product" data-testid="select-order-product">
                          <SelectValue placeholder="Select plywood type" />
                        </SelectTrigger>
                        <SelectContent>
                          {PRODUCTS.map(p => (
                            <SelectItem key={p.id} value={`${p.thickness} - Grade ${p.gradeLabel} (${p.gradeName})`}>
                              {p.thickness} - Grade {p.gradeLabel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input 
                        id="quantity" 
                        required 
                        value={formData.quantity} 
                        onChange={e => setFormData(p => ({ ...p, quantity: e.target.value }))}
                        placeholder="e.g. 50 sheets"
                        data-testid="input-order-quantity"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Details (Optional)</Label>
                    <Textarea 
                      id="message" 
                      rows={4}
                      value={formData.message} 
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder="Delivery instructions, specific requirements..."
                      data-testid="input-order-message"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full text-lg h-12" data-testid="btn-submit-email-order">
                    Prepare Email
                  </Button>
                </form>
              </div>

            </div>
          </div>
        </section>

        {/* About & Location Section */}
        <section id="about" className="py-24 bg-background">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Visit Our Yard</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Conveniently located in Panitanki, Birgunj. We maintain a robust stock of all grades and thicknesses to fulfill your orders quickly.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Location</h4>
                      <p className="text-muted-foreground mt-1">Panitanki, Birgunj 44300, Nepal</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Business Hours</h4>
                      <p className="text-muted-foreground mt-1">Open daily<br/>Closes at 2:00 AM</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Contact</h4>
                      <p className="text-muted-foreground mt-1">Owner will update number</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-border h-[400px] bg-muted relative">
                {/* Embed Map for Panitanki, Birgunj */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14217.51860012975!2d84.85698370000002!3d27.018260799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993544c68060803%3A0xc3f2cba04edc07!2sPanitanki%2C%20Birgunj%2044300%2C%20Nepal!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Twobro Glass Centre Location Map"
                  data-testid="iframe-map"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="font-bold text-2xl tracking-tight text-primary mb-2 text-center md:text-left">
                Twobro Glass Centre
              </div>
              <p className="text-muted-foreground text-sm text-center md:text-left">
                Quality Plywood, Trusted Supply.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
              </a>
              <a 
                href={`mailto:${EMAIL_ADDRESS}`}
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" /> Email Us
              </a>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" /> Panitanki, Birgunj
              </div>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Twobro Glass Centre. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

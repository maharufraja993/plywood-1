import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, ChevronRight, ShoppingCart, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const WHATSAPP_LINK = "https://wa.me/9779807296911?text=Hello%2C%20I%20want%20to%20order%20plywood%20from%20Twobro%20Glass%20Centre";
const PHONE_NUMBER = "9807296911";
const EMAIL_ADDRESS = "maharufraja078@gmail.com";

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

const FORMICA_PRODUCTS = [
  { id: "formica-plain",     name: "Plain / Solid",  desc: "Single-colour matte finish"    },
  { id: "formica-woodgrain", name: "Woodgrain",       desc: "Natural wood-look laminate"    },
  { id: "formica-marble",    name: "Marble / Stone",  desc: "Stone-pattern decorative sheet"},
  { id: "formica-glossy",    name: "High Gloss",      desc: "Glossy finish, modern look"   },
];

export default function Home() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const [qty, setQty] = useState<Record<string, string>>(
    Object.fromEntries([...PRODUCTS, ...FORMICA_PRODUCTS].map(p => [p.id, ""]))
  );

  const selectedPlywood = PRODUCTS.filter(p => Number(qty[p.id]) > 0);
  const selectedFormica = FORMICA_PRODUCTS.filter(p => Number(qty[p.id]) > 0);
  const selectedItems = [...selectedPlywood, ...selectedFormica];
  const totalSheets = selectedItems.reduce((sum, p) => sum + Number(qty[p.id]), 0);

  const sendBulkWhatsApp = () => {
    const plywoodLines = selectedPlywood
      .map(p => `• ${p.thickness} Grade ${p.gradeLabel} (${p.gradeName}): ${qty[p.id]} sheets`)
      .join("\n");
    const formicaLines = selectedFormica
      .map(p => `• Formica ${p.name}: ${qty[p.id]} sheets`)
      .join("\n");
    const sections = [
      plywoodLines && `*Plywood:*\n${plywoodLines}`,
      formicaLines && `*Formica:*\n${formicaLines}`,
    ].filter(Boolean).join("\n\n");
    const msg = `Hello, I would like to place an order from Twobro Glass Centre.\n\n*Order Details:*\n${sections}\n\n*Total: ${totalSheets} sheets*`;
    window.open(`https://wa.me/9779807296911?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const plywoodLines = selectedPlywood.map(p => `${p.thickness} Grade ${p.gradeLabel} (${p.gradeName}): ${qty[p.id]} sheets`).join("\n");
    const formicaLines = selectedFormica.map(p => `Formica ${p.name}: ${qty[p.id]} sheets`).join("\n");
    const allLines = [plywoodLines, formicaLines].filter(Boolean).join("\n") || "(no products selected)";
    const subject = encodeURIComponent("Order - Twobro Glass Centre");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\n\nOrder:\n${allLines}\n\nNotes:\n${formData.message}`
    );
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
  };

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
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
                  onClick={scrollToProducts}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg h-14 px-8"
                  data-testid="btn-hero-order"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Place an Order
                </Button>
                <Button 
                  size="lg" 
                  asChild
                  variant="outline" 
                  className="h-14 px-8 text-lg font-medium border-primary/20 hover:bg-primary/5 bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20"
                  data-testid="btn-hero-whatsapp"
                >
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Order Sheet Section */}
        <section id="products" className="py-20 bg-background">
          <div className="container mx-auto max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Place Your Order</h2>
                <p className="text-muted-foreground text-lg">
                  Enter quantities for the plywood you need, then send everything at once on WhatsApp.
                </p>
              </div>

              {/* Grade legend */}
              <div className="flex flex-wrap gap-3 mb-6">
                {GRADES.map(g => (
                  <div key={g.label} className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">{g.label}</span>
                    <span className="font-medium text-foreground">{g.name}</span>
                    <span className="text-muted-foreground">— {g.desc}</span>
                  </div>
                ))}
              </div>

              {/* Order table */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                {/* Table header */}
                <div className="grid grid-cols-12 gap-0 border-b border-border bg-muted/50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <div className="col-span-2">Size</div>
                  <div className="col-span-2">Grade</div>
                  <div className="col-span-4">Type</div>
                  <div className="col-span-4 text-right">Qty (sheets)</div>
                </div>

                {/* Rows grouped by thickness */}
                {THICKNESSES.map((thickness, tIdx) => (
                  <div key={thickness}>
                    {GRADES.map((grade, gIdx) => {
                      const product = PRODUCTS.find(p => p.thickness === thickness && p.gradeLabel === grade.label)!;
                      const isLast = tIdx === THICKNESSES.length - 1 && gIdx === GRADES.length - 1;
                      const hasQty = Number(qty[product.id]) > 0;
                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: (tIdx * 3 + gIdx) * 0.04 }}
                          className={`grid grid-cols-12 items-center gap-0 px-4 py-3 transition-colors ${!isLast ? "border-b border-border/60" : ""} ${hasQty ? "bg-primary/5" : "hover:bg-muted/30"}`}
                          data-testid={`row-product-${product.id}`}
                        >
                          {/* Size — only show for first grade in group */}
                          <div className="col-span-2">
                            {gIdx === 0 ? (
                              <span className="text-lg font-bold text-foreground">{thickness}</span>
                            ) : (
                              <span className="text-muted-foreground/30 text-sm pl-1">╰</span>
                            )}
                          </div>

                          {/* Grade badge */}
                          <div className="col-span-2">
                            <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg font-bold text-sm
                              ${grade.label === "A" ? "bg-amber-100 text-amber-700" : ""}
                              ${grade.label === "B" ? "bg-blue-100 text-blue-700" : ""}
                              ${grade.label === "C" ? "bg-slate-100 text-slate-600" : ""}
                            `}>
                              {grade.label}
                            </span>
                          </div>

                          {/* Description */}
                          <div className="col-span-4">
                            <span className="text-sm font-medium text-foreground">{grade.name}</span>
                            <span className="ml-2 text-xs text-muted-foreground hidden sm:inline">— {grade.desc}</span>
                          </div>

                          {/* Qty input */}
                          <div className="col-span-4 flex justify-end">
                            <Input
                              type="number"
                              min="0"
                              placeholder="0"
                              value={qty[product.id]}
                              onChange={e => setQty(prev => ({ ...prev, [product.id]: e.target.value }))}
                              className={`w-24 text-right h-9 text-sm font-semibold transition-colors ${hasQty ? "border-primary text-primary" : ""}`}
                              data-testid={`input-qty-${product.id}`}
                            />
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Thickness divider */}
                    {tIdx < THICKNESSES.length - 1 && (
                      <div className="border-b-2 border-border/80" />
                    )}
                  </div>
                ))}

                {/* Formica section divider */}
                <div className="border-t-2 border-border bg-muted/40 px-4 py-2 flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Formica / Laminate</span>
                </div>

                {/* Formica rows */}
                {FORMICA_PRODUCTS.map((fp, idx) => {
                  const hasQty = Number(qty[fp.id]) > 0;
                  return (
                    <motion.div
                      key={fp.id}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className={`grid grid-cols-12 items-center gap-0 px-4 py-3 transition-colors ${idx < FORMICA_PRODUCTS.length - 1 ? "border-b border-border/60" : ""} ${hasQty ? "bg-violet-50 dark:bg-violet-950/20" : "hover:bg-muted/30"}`}
                      data-testid={`row-product-${fp.id}`}
                    >
                      {/* Name */}
                      <div className="col-span-2">
                        {idx === 0 ? (
                          <span className="text-sm font-bold text-foreground">Sheet</span>
                        ) : (
                          <span className="text-muted-foreground/30 text-sm pl-1">╰</span>
                        )}
                      </div>

                      {/* Formica badge */}
                      <div className="col-span-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-700 font-bold text-xs">F</span>
                      </div>

                      {/* Description */}
                      <div className="col-span-4">
                        <span className="text-sm font-medium text-foreground">{fp.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground hidden sm:inline">— {fp.desc}</span>
                      </div>

                      {/* Qty input */}
                      <div className="col-span-4 flex justify-end">
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={qty[fp.id]}
                          onChange={e => setQty(prev => ({ ...prev, [fp.id]: e.target.value }))}
                          className={`w-24 text-right h-9 text-sm font-semibold transition-colors ${hasQty ? "border-violet-400 text-violet-600" : ""}`}
                          data-testid={`input-qty-${fp.id}`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Order summary + send button */}
              <div className="mt-6 rounded-2xl border-2 border-primary/20 bg-primary/5 p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    {selectedItems.length === 0 ? (
                      <p className="text-muted-foreground text-sm">Enter quantities above to build your order.</p>
                    ) : (
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">
                          {selectedItems.length} product{selectedItems.length > 1 ? "s" : ""} selected — <span className="text-primary">{totalSheets} sheets total</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedItems.map(p => (
                            <Badge key={p.id} variant="secondary" className="text-xs bg-background border border-primary/20">
                              {p.thickness} Grade {p.gradeLabel}: {qty[p.id]}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    size="lg"
                    disabled={selectedItems.length === 0}
                    onClick={sendBulkWhatsApp}
                    className="shrink-0 bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-40 text-white font-bold h-12 px-6 text-base"
                    data-testid="btn-send-bulk-whatsapp"
                  >
                    <Send className="mr-2 h-5 w-5" /> Send Order on WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="order" className="py-20 bg-card border-y border-border">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">

              {/* Contact box */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-3">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">Call, WhatsApp, or email — we respond fast.</p>

                <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 space-y-3" data-testid="box-order-contact">
                  <a href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center gap-4 rounded-xl border border-border bg-background px-5 py-4 hover:border-primary/50 hover:bg-primary/5 transition-all"
                    data-testid="link-order-phone">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Call / WhatsApp</p>
                      <p className="text-xl font-bold text-foreground">{PHONE_NUMBER}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </a>

                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 px-5 py-4 hover:bg-[#25D366]/10 hover:border-[#25D366]/60 transition-all"
                    data-testid="btn-order-section-whatsapp">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">WhatsApp</p>
                      <p className="text-lg font-bold text-[#25D366]">Chat on WhatsApp</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </a>

                  <a href={`mailto:${EMAIL_ADDRESS}`}
                    className="flex items-center gap-4 rounded-xl border border-border bg-background px-5 py-4 hover:border-primary/50 hover:bg-primary/5 transition-all"
                    data-testid="link-order-email">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</p>
                      <p className="text-sm font-semibold text-foreground break-all">{EMAIL_ADDRESS}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </a>
                </div>
              </div>

              {/* Email form — picks up order from the sheet above */}
              <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" /> Send by Email
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  Your order sheet selections will be included automatically.
                </p>

                <form onSubmit={handleEmailSubmit} className="space-y-4" data-testid="form-email-order">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" required value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        placeholder="Your name" data-testid="input-order-name" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" required value={formData.phone}
                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                        placeholder="98XXXXXXXX" data-testid="input-order-phone" />
                    </div>
                  </div>

                  {selectedItems.length > 0 && (
                    <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
                      <p className="font-semibold text-foreground mb-1">Order from sheet ({totalSheets} sheets):</p>
                      {selectedItems.map(p => (
                        <p key={p.id} className="text-muted-foreground">
                          {p.thickness} Grade {p.gradeLabel} — {qty[p.id]} sheets
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <Label htmlFor="message">Notes (optional)</Label>
                    <Textarea id="message" rows={3} value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder="Delivery address, special requirements..."
                      data-testid="input-order-message" />
                  </div>

                  <Button type="submit" size="lg" className="w-full h-11" data-testid="btn-submit-email-order">
                    <Mail className="mr-2 h-4 w-4" /> Send via Email
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
                      <h4 className="text-lg font-bold">Phone / WhatsApp</h4>
                      <a href={`tel:${PHONE_NUMBER}`} className="text-primary font-semibold hover:underline mt-1 block" data-testid="link-phone">{PHONE_NUMBER}</a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Email</h4>
                      <a href={`mailto:${EMAIL_ADDRESS}`} className="text-primary font-semibold hover:underline mt-1 block" data-testid="link-email">{EMAIL_ADDRESS}</a>
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

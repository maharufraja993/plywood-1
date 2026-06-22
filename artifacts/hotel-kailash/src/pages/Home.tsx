import { motion } from "framer-motion";
import {
  Wifi, Car, Waves, Wind, WashingMachine, UtensilsCrossed,
  Phone, MapPin, Mail, Star, Clock, ChevronRight, CheckCircle2,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PHONE = "051-522384";
const PHONE_DIAL = "tel:051522384";
const EMAIL = "hotel.kailash.birgunj@gmail.com";
const LOCATION = "Aadarsh Nagar, Birgunj 44300, Nepal";
const PLUS_CODE = "2V6F+7H Birgunj";
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(PLUS_CODE)}&output=embed&z=17`;
const WHATSAPP = "https://wa.me/977051522384";

const AMENITIES = [
  { icon: Wifi,             label: "Free Wi-Fi",       desc: "High-speed in all rooms" },
  { icon: Car,              label: "Free Parking",      desc: "Secure on-site parking"  },
  { icon: Waves,            label: "Swimming Pool",     desc: "Outdoor pool"            },
  { icon: Wind,             label: "Air-Conditioned",   desc: "All rooms climate-controlled" },
  { icon: WashingMachine,   label: "Laundry Service",   desc: "Same-day laundry"        },
  { icon: UtensilsCrossed,  label: "Room Service",      desc: "Available daily"         },
];

const ROOMS = [
  {
    name: "Standard Room",
    desc: "Comfortable, air-conditioned room with modern amenities — ideal for business travellers.",
    price: "NPR 4,710",
    beds: "1 Double Bed",
    features: ["Free Wi-Fi", "Air-conditioning", "TV", "Private Bathroom"],
  },
  {
    name: "Deluxe Room",
    desc: "Spacious deluxe room with premium furnishings, perfect for a relaxing stay.",
    price: "NPR 5,800",
    beds: "1 King Bed",
    features: ["Free Wi-Fi", "Air-conditioning", "TV", "Mini-fridge", "Room Service"],
  },
  {
    name: "Suite",
    desc: "Expansive suite with separate sitting area and elevated city views.",
    price: "NPR 7,500",
    beds: "1 King Bed + Sitting Area",
    features: ["Free Wi-Fi", "Air-conditioning", "Smart TV", "Mini-fridge", "24/7 Room Service", "Complimentary Breakfast"],
  },
];

const REVIEWS = [
  {
    platform: "Google Reviews",
    score: "3.9",
    max: "5",
    count: "738 reviews",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    quote: "Kailash Hotel is a piece of Birganj's history, having served travellers for over half a century.",
    author: "Alok N.",
    via: "TripAdvisor",
  },
  {
    platform: "TripAdvisor",
    score: "4.5",
    max: "5",
    count: "2 reviews",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-100",
    quote: "Originally established to serve the old bus park — a hotel rich in local heritage and warm hospitality.",
    author: "TripAdvisor Guest",
    via: "TripAdvisor",
  },
  {
    platform: "Trip.com",
    score: "2.5",
    max: "5",
    count: "2 reviews",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    quote: "A convenient choice for travellers passing through Birgunj.",
    author: "Trip.com Member",
    via: "Trip.com",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`w-4 h-4 ${i <= n ? "fill-amber-400 text-amber-400" : "text-muted fill-muted"}`} />
      ))}
    </span>
  );
}

export default function Home() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Navbar ───────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-serif font-bold text-[hsl(220,30%,12%)]">Hotel Kailash</span>
            <span className="hidden sm:flex items-center gap-0.5 ml-1">
              {[1,2,3].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {["rooms","amenities","about","reviews","contact"].map(s => (
              <button key={s} onClick={() => scrollTo(s)}
                className="capitalize hover:text-foreground transition-colors">{s}</button>
            ))}
          </div>
          <Button onClick={() => scrollTo("contact")}
            className="bg-primary text-primary-foreground hover:opacity-90 text-sm h-9 px-4">
            Book Now
          </Button>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* gradient background standing in for a photo */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,30%,12%)] via-[hsl(220,25%,20%)] to-[hsl(220,20%,30%)]" />
        {/* decorative gold orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-amber-400/8 blur-3xl" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Badge className="mb-6 bg-amber-400/20 text-amber-300 border-amber-400/30 text-xs tracking-widest uppercase">
              Aadarsh Nagar · Birgunj, Nepal
            </Badge>
            <h1 className="font-serif text-5xl sm:text-7xl font-bold text-white leading-tight mb-4">
              Hotel Kailash
            </h1>
            <p className="text-amber-300 text-lg font-light tracking-wide mb-3">
              ★★★ &nbsp;Three-Star Hospitality
            </p>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              A landmark of Birgunj's history — serving travellers with warmth and comfort for over half a century.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Button size="lg" onClick={() => scrollTo("rooms")}
                className="bg-amber-400 hover:bg-amber-500 text-[hsl(220,30%,10%)] font-semibold px-8">
                View Rooms &amp; Rates
              </Button>
              <Button size="lg" variant="outline" asChild
                className="border-white/30 text-white hover:bg-white/10 px-8">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <strong className="text-white">3.9</strong>/5 &nbsp;(738 reviews)
              </span>
              <span className="w-px h-4 bg-white/20" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Check-in 14:00 · Check-out 11:00
              </span>
              <span className="w-px h-4 bg-white/20" />
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                Birgunj 44300
              </span>
            </div>
          </motion.div>
        </div>

        {/* scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="w-5 h-8 rounded-full border-2 border-white/40 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </section>

      {/* ── Quick Info Strip ──────────────────────────────────── */}
      <section className="bg-[hsl(220,30%,12%)] text-white py-5">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          {[
            { icon: Clock,  label: "Check-in",   val: "From 14:00" },
            { icon: Clock,  label: "Check-out",  val: "Until 11:00" },
            { icon: Phone,  label: "Phone",       val: PHONE },
            { icon: MapPin, label: "Location",   val: "Aadarsh Nagar, Birgunj" },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="w-4 h-4 text-amber-400" />
              <span className="text-white/50 text-xs uppercase tracking-wide">{label}</span>
              <span className="font-medium text-white/90">{val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Amenities ─────────────────────────────────────────── */}
      <section id="amenities" className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Facilities</p>
            <h2 className="font-serif text-4xl font-bold text-foreground">Hotel Amenities</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {AMENITIES.map(({ icon: Icon, label, desc }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{label}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Separator className="max-w-6xl mx-auto" />

      {/* ── Rooms ─────────────────────────────────────────────── */}
      <section id="rooms" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Accommodation</p>
          <h2 className="font-serif text-4xl font-bold text-foreground">Rooms &amp; Rates</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            All rooms include free Wi-Fi, air-conditioning, and 24-hour front desk service.
            Rates are per night and may vary by season.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {ROOMS.map((room, i) => (
            <motion.div key={room.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-3xl border bg-card overflow-hidden flex flex-col
                ${i === 1 ? "border-amber-300 shadow-lg shadow-amber-100" : "border-border"}`}>
              {i === 1 && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-amber-400 text-amber-900 text-xs font-semibold">Most Popular</Badge>
                </div>
              )}
              {/* colour accent bar */}
              <div className={`h-1.5 w-full ${i === 1 ? "bg-amber-400" : "bg-muted"}`} />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-xl font-bold text-foreground mb-1">{room.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{room.beds}</p>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{room.desc}</p>
                <ul className="space-y-1.5 mb-6">
                  {room.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <p className="text-2xl font-bold text-primary font-serif">{room.price}</p>
                  <p className="text-xs text-muted-foreground mb-4">per night · taxes extra</p>
                  <Button asChild className={`w-full ${i === 1 ? "bg-amber-400 hover:bg-amber-500 text-amber-900" : ""}`}
                    variant={i === 1 ? "default" : "outline"}>
                    <a href={`tel:${PHONE}`}>
                      Call to Book <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-6">
          Available on{" "}
          <a href="https://rehlat.co" target="_blank" rel="noopener noreferrer"
            className="text-primary underline underline-offset-2">rehlat.co</a>{" "}and{" "}
          <a href="https://bluepillow.com" target="_blank" rel="noopener noreferrer"
            className="text-primary underline underline-offset-2">Bluepillow.com</a>.
        </p>
      </section>

      <Separator className="max-w-6xl mx-auto" />

      {/* ── About ─────────────────────────────────────────────── */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Our Story</p>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-5">
              A Piece of<br />Birgunj's History
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hotel Kailash has served travellers for over half a century, making it one of Birgunj's most storied
              establishments. Originally established to serve the old bus park, the hotel has grown into a beloved
              institution offering warm Nepali hospitality to guests from across the region and beyond.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Located in the Aadarsh Nagar neighbourhood — rated <strong className="text-foreground">3.7 (Great for
              visitors)</strong> for sightseeing, recreation, and getting around — the hotel puts you at the heart
              of Birgunj's commercial and cultural life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="default" className="bg-primary text-primary-foreground hover:opacity-90">
                <a href={PHONE_DIAL}>
                  <Phone className="w-4 h-4 mr-2" /> Call Us
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>

          {/* stat cards */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4">
            {[
              { label: "Years of Service",  val: "50+",      sub: "Est. ~1970s" },
              { label: "Google Rating",     val: "3.9★",     sub: "738 reviews" },
              { label: "TripAdvisor Score", val: "4.5★",     sub: "Highly rated" },
              { label: "Guest Amenities",   val: "6+",       sub: "All included" },
            ].map(({ label, val, sub }) => (
              <div key={label} className="rounded-2xl border border-border bg-card p-5 text-center">
                <p className="font-serif text-3xl font-bold text-primary mb-1">{val}</p>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────────────────── */}
      <section id="reviews" className="py-20 px-4 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Testimonials</p>
            <h2 className="font-serif text-4xl font-bold text-foreground">What Guests Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <motion.div key={r.platform}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`rounded-2xl border ${r.border} ${r.bg} p-6 flex flex-col`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-sm text-foreground">{r.platform}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-3xl font-bold font-serif ${r.color}`}>{r.score}</span>
                  <span className="text-muted-foreground text-sm">/ {r.max}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{r.count}</p>
                <blockquote className="text-sm text-foreground/80 leading-relaxed italic flex-1">
                  "{r.quote}"
                </blockquote>
                <p className="text-xs text-muted-foreground mt-4">— {r.author} via {r.via}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact + Map ─────────────────────────────────────── */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Find Us</p>
            <h2 className="font-serif text-4xl font-bold text-foreground">Get in Touch</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* contact info */}
            <div className="space-y-5">
              {[
                {
                  icon: Phone,
                  label: "Call / WhatsApp",
                  val: PHONE,
                  href: PHONE_DIAL,
                  sub: "Available 24 hours",
                },
                {
                  icon: Mail,
                  label: "Email",
                  val: EMAIL,
                  href: `mailto:${EMAIL}`,
                  sub: "We reply within 24 hours",
                },
                {
                  icon: MapPin,
                  label: "Address",
                  val: LOCATION,
                  href: `https://maps.google.com/?q=${PLUS_CODE}`,
                  sub: `Plus Code: ${PLUS_CODE}`,
                },
                {
                  icon: Clock,
                  label: "Check-in / Check-out",
                  val: "Check-in 14:00 · Check-out 11:00",
                  href: null,
                  sub: "Front desk open 24/7",
                },
              ].map(({ icon: Icon, label, val, href, sub }) => (
                <div key={label} className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card hover:shadow-sm transition-shadow">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="font-semibold text-foreground hover:text-primary transition-colors">
                        {val}
                      </a>
                    ) : (
                      <p className="font-semibold text-foreground">{val}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <Button asChild className="flex-1 bg-primary text-primary-foreground hover:opacity-90">
                  <a href={PHONE_DIAL}>
                    <Phone className="w-4 h-4 mr-2" /> Call Now
                  </a>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* map */}
            <div className="rounded-3xl overflow-hidden border border-border shadow-lg h-80 md:h-full min-h-72">
              <iframe
                src={MAP_EMBED}
                width="100%"
                height="100%"
                style={{ minHeight: "288px", border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Kailash location map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="bg-[hsl(220,30%,12%)] text-white/70 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div>
            <p className="font-serif font-bold text-white text-lg">Hotel Kailash</p>
            <p className="text-xs mt-0.5 text-white/50">Aadarsh Nagar, Birgunj 44300, Nepal</p>
          </div>
          <div className="flex items-center gap-5 text-white/60 text-xs">
            <a href={PHONE_DIAL} className="hover:text-white transition-colors">{PHONE}</a>
            <span>·</span>
            <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">Email Us</a>
            <span>·</span>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Hotel Kailash</p>
        </div>
      </footer>
    </div>
  );
}

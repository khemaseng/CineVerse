"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, 
  User, 
  Users, 
  Check, 
  Play, 
  Tv, 
  Star, 
  Download, 
  Crown,
  CreditCard,
  ShieldCheck,
  X,
  Lock,
  QrCode,
  Wallet
} from "lucide-react";
import { toast } from "sonner";
import { auth } from "@/components/Firebase/firebase";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";

interface Plan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  numericPrice: number;
  period: string;
  icon: React.ReactNode;
  features: string[];
  isPopular?: boolean;
  buttonVariant: "outline" | "primary";
  cardStyles: string;
  badgeText?: string;
}

const PLANS: Plan[] = [
  {
    id: "student",
    name: "STUDENT",
    subtitle: "Perfect for students",
    price: "$2.99",
    numericPrice: 2.99,
    period: "/ month",
    icon: <GraduationCap className="h-6 w-6 text-primary-gold" />,
    features: [
      "1 account",
      "Full access to premium movies",
      "Ad-free experience",
      "Download and watch offline",
      "Student-only discounts",
    ],
    buttonVariant: "outline",
    cardStyles: "bg-white/90 dark:bg-[#08192d]/80 border-slate-200 dark:border-slate-800 hover:border-primary-gold/50 dark:hover:border-primary-gold/50 shadow-sm hover:shadow-md",
  },
  {
    id: "individual",
    name: "INDIVIDUAL",
    subtitle: "Great for solo entertainment",
    price: "$5.99",
    numericPrice: 5.99,
    period: "/ month",
    icon: <User className="h-6 w-6 text-primary-gold" />,
    features: [
      "2 accounts",
      "Full access to premium movies",
      "Ad-free experience",
      "Download and watch offline",
      "Watch on multiple devices",
    ],
    isPopular: true,
    badgeText: "MOST POPULAR",
    buttonVariant: "primary",
    cardStyles: "bg-gradient-to-b from-primary-gold/10 via-white to-white dark:from-primary-gold/15 dark:via-[#08192d]/95 dark:to-[#041226] border-2 border-primary-gold shadow-[0_0_35px_rgba(243,168,18,0.25)]",
  },
  {
    id: "family",
    name: "FAMILY",
    subtitle: "More movies for everyone",
    price: "$9.99",
    numericPrice: 9.99,
    period: "/ month",
    icon: <Users className="h-6 w-6 text-accent-blue dark:text-sky-400" />,
    features: [
      "6 accounts",
      "Full access to premium movies",
      "Ad-free experience",
      "Download and watch offline",
      "Parental controls",
      "Watch on multiple devices",
    ],
    buttonVariant: "outline",
    cardStyles: "bg-white/90 dark:bg-[#08192d]/80 border-slate-200 dark:border-slate-800 hover:border-accent-blue/50 dark:hover:border-accent-blue/50 shadow-sm hover:shadow-md",
  },
];

const HIGHLIGHTS = [
  {
    icon: <Play className="h-4 w-4 text-primary-gold fill-primary-gold/20" />,
    text: "Thousands of movies & series",
  },
  {
    icon: <Tv className="h-4 w-4 text-primary-gold" />,
    text: "Watch on multiple devices",
  },
  {
    icon: <Star className="h-4 w-4 text-primary-gold fill-primary-gold/20" />,
    text: "Ad-free experience",
  },
  {
    icon: <Download className="h-4 w-4 text-primary-gold" />,
    text: "Download to watch offline",
  },
];

const STATS = [
  { value: "10K+", label: "Premium members" },
  { value: "4.9★", label: "User rating" },
  { value: "1000+", label: "Movies & series" },
  { value: "24/7", label: "Customer support" },
];

export function ExplorePremiumComponent() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  // Checkout Modal State
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "khqr" | "paypal">("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSelectPlan = (plan: Plan) => {
    // If not logged in -> redirect to login page
    if (!currentUser) {
      toast.info(`Please log in or sign up to select the ${plan.name} plan.`, {
        description: "Redirecting to login page...",
      });
      setTimeout(() => {
        router.push(`/auth/login?redirect=/explore-premium`);
      }, 1000);
      return;
    }

    // If logged in -> open payment checkout modal
    setActivePlan(plan);
    setIsCheckoutOpen(true);
  };

  const handleCompletePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePlan) return;

    setIsProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsCheckoutOpen(false);
      toast.success(`🎉 Subscription Activated!`, {
        description: `Welcome to CineVerse ${activePlan.name} Premium (${activePlan.price}/month).`,
      });
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-[#f4f6fa] dark:bg-[#041226] text-navy-blue dark:text-white transition-colors duration-200 selection:bg-primary-gold selection:text-navy-blue overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Ambient Radial Background Glows matching globals.css brand gold & accent blue */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-primary-gold/20 via-primary-gold/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-primary-gold/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent-blue/10 blur-3xl pointer-events-none rounded-full" />

      {/* Grid Overlay Effect */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#082c5908_1px,transparent_1px),linear-gradient(to_bottom,#082c5908_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      <div className="relative max-w-6xl mx-auto z-10 space-y-12">
        {/* Hero Title Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-block px-3.5 py-1 rounded-full bg-primary-gold/10 border border-primary-gold/20">
            <p className="text-xs uppercase font-bold tracking-[0.25em] text-primary-gold">
              Premium Experience
            </p>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-blue dark:text-white">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold via-amber-400 to-amber-500">Premium</span>
          </h1>
          <p className="text-navy-blue/70 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Choose the plan that fits your account and unlock a better movie experience.
          </p>
        </div>

        {/* Feature Highlights Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 pb-4">
          {HIGHLIGHTS.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 dark:bg-[#08192d]/80 border border-slate-200 dark:border-slate-800/80 backdrop-blur-md text-xs sm:text-sm text-navy-blue dark:text-slate-300 shadow-sm hover:border-primary-gold/40 dark:hover:border-primary-gold/40 transition"
            >
              <div className="p-1 rounded-full bg-primary-gold/15 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="font-semibold">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {PLANS.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between ${
                  plan.cardStyles
                } backdrop-blur-xl ${
                  plan.isPopular 
                    ? "md:-translate-y-2" 
                    : ""
                }`}
              >
                {/* Popular Floating Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-gold text-navy-blue text-[11px] font-extrabold tracking-wider uppercase shadow-[0_0_20px_rgba(243,168,18,0.5)]">
                      <Crown className="w-3.5 h-3.5 fill-navy-blue" />
                      {plan.badgeText}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Top Circle Icon */}
                  <div className="w-12 h-12 rounded-full bg-primary-gold/10 border border-primary-gold/20 flex items-center justify-center shadow-sm">
                    {plan.icon}
                  </div>

                  {/* Plan Name & Subtitle */}
                  <div>
                    <h3 className="text-xl font-extrabold tracking-wide text-navy-blue dark:text-white uppercase">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-navy-blue/70 dark:text-slate-400 mt-1 font-medium">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price Header */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-navy-blue dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-sm font-medium text-navy-blue/60 dark:text-slate-400">
                      {plan.period}
                    </span>
                  </div>

                  {/* Separator */}
                  <div className="h-px w-full bg-slate-200 dark:bg-slate-800/80" />

                  {/* Features List */}
                  <ul className="space-y-3.5 text-sm text-navy-blue/90 dark:text-slate-300">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-primary-gold shrink-0 font-bold" />
                        <span className="leading-snug font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="pt-8">
                  {plan.buttonVariant === "primary" ? (
                    <button
                      onClick={() => handleSelectPlan(plan)}
                      className="w-full py-3 px-6 rounded-xl bg-primary-gold hover:bg-primary-dark text-navy-blue font-extrabold text-sm shadow-[0_0_25px_rgba(243,168,18,0.4)] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      Choose Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSelectPlan(plan)}
                      className="w-full py-3 px-6 rounded-xl border border-navy-blue/20 dark:border-slate-700/80 hover:border-primary-gold dark:hover:border-primary-gold bg-white/80 dark:bg-slate-900/60 hover:bg-primary-gold/10 text-navy-blue dark:text-white hover:text-navy-blue dark:hover:text-primary-gold font-bold text-sm transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-sm"
                    >
                      Choose Plan
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Proof Stats Footer */}
        <div className="pt-12 text-center space-y-6">
          <p className="text-xs uppercase tracking-widest text-navy-blue/70 dark:text-slate-400 font-bold">
            Trusted by movie lovers everywhere
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-2">
            {STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-navy-blue dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-navy-blue/70 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Checkout Modal (For Authenticated Users) */}
      {isCheckoutOpen && activePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-[#08192d] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 text-navy-blue dark:text-white space-y-6">
            
            {/* Close Modal Button */}
            <button 
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-navy-blue dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-gold/15 text-primary-gold text-xs font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" /> Secure Checkout
              </div>
              <h2 className="text-2xl font-extrabold">Complete Subscription</h2>
              <p className="text-xs text-navy-blue/70 dark:text-slate-400">
                You are subscribing to <strong className="text-primary-gold uppercase">{activePlan.name}</strong> Plan.
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#041226]/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center text-sm font-bold">
                <span>{activePlan.name} Plan</span>
                <span className="text-primary-gold">{activePlan.price} / mo</span>
              </div>
              <div className="flex justify-between text-navy-blue/70 dark:text-slate-400">
                <span>Billing Frequency</span>
                <span>Monthly Recurring</span>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
              <div className="flex justify-between text-sm font-extrabold text-navy-blue dark:text-white pt-1">
                <span>Total Due Today</span>
                <span className="text-base text-primary-gold">{activePlan.price}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-navy-blue/80 dark:text-slate-300">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-1.5 transition ${
                    paymentMethod === "card" 
                      ? "border-primary-gold bg-primary-gold/10 text-primary-gold" 
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("khqr")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-1.5 transition ${
                    paymentMethod === "khqr" 
                      ? "border-primary-gold bg-primary-gold/10 text-primary-gold" 
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  ABA / KHQR
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-1.5 transition ${
                    paymentMethod === "paypal" 
                      ? "border-primary-gold bg-primary-gold/10 text-primary-gold" 
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                  PayPal
                </button>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleCompletePayment} className="space-y-4">
              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-navy-blue/70 dark:text-slate-400">Cardholder Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="mt-1 w-full h-10 px-3 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#041226] focus:outline-none focus:ring-2 focus:ring-primary-gold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-navy-blue/70 dark:text-slate-400">Card Number</label>
                    <input 
                      type="text"
                      required
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="mt-1 w-full h-10 px-3 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#041226] focus:outline-none focus:ring-2 focus:ring-primary-gold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-navy-blue/70 dark:text-slate-400">Expiry</label>
                      <input 
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="mt-1 w-full h-10 px-3 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#041226] focus:outline-none focus:ring-2 focus:ring-primary-gold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-navy-blue/70 dark:text-slate-400">CVC</label>
                      <input 
                        type="password"
                        required
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="mt-1 w-full h-10 px-3 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#041226] focus:outline-none focus:ring-2 focus:ring-primary-gold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "khqr" && (
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-2 bg-white dark:bg-[#041226]">
                  <QrCode className="w-16 h-16 mx-auto text-primary-gold animate-pulse" />
                  <p className="text-xs font-bold">Scan KHQR to Pay</p>
                  <p className="text-[11px] text-navy-blue/70 dark:text-slate-400">Open your ABA Mobile or Mobile Banking app to scan.</p>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-2 bg-white dark:bg-[#041226]">
                  <Wallet className="w-10 h-10 mx-auto text-sky-500" />
                  <p className="text-xs font-bold">Express Checkout with PayPal</p>
                  <p className="text-[11px] text-navy-blue/70 dark:text-slate-400">You will be securely redirected to PayPal to authorize payment.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl bg-primary-gold hover:bg-primary-dark text-navy-blue font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                {isProcessing ? "Processing Payment..." : `Pay ${activePlan.price} / month`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

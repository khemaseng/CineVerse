// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: {
//     template: '%s | Tos Tinh',
//     default: 'About'
//   },
//   keywords: "T-shirts for women",
//   description: "Tos Tinh is a modern platform and modern vibe for all costumers.",
//   openGraph: {
//     title: "Tos Tinh - M2",
//     description: "Tos Tinh refers to small retail and online lifestyle or fashion businesses in Phnom Penh, such as Tos Tinh 356 Store and Tos tinh-21, offering modern clothing and products through social media platforms.",
//     images: ['/thumbnail.png']
//   }
// };
// export default function Aboutpage() {
//   return (
//     <>
//     <h1 className="">Hello Everyone</h1>
//     </>

// import { imageConfigDefault } from "next/dist/shared/lib/image-config";
// import { exportTraceState } from "next/dist/trace";

//   )
  
// } 



// import Image from "next/image";

// export default function AboutUs() {
//   const team = [
//     {
//       name: "Seng SilKhema",
//       role: "Page and Fix api",
//       tag: "UX/UI",
//       blurb: "Leads product vision and long-term strategy for CineVerse.",
//       image: "/Laihoun.jpg", 
//     },
//     {
//       name: "Mom Lisa",
//       role: "Movie of register and login",
//       tag: "UX/UI",
//       blurb: "Builds the systems that keep ticket transactions fast and secure.",
//       image: "/lisa.jpg",
//     },
//     {
//       name: "Vat Laihoun",
//       role: "About Us",
//       tag: "CS",
//       blurb: "Makes sure every buyer and seller has a smooth experience.",
//       image: "/Laihoun.jpg", 
//     },
//     {
//       name: "Pharoth Chhun",
//       role: "Product Design",
//       tag: "DES",
//       blurb: "Designs a simple, trustworthy marketplace experience.",
//       image: "/Laihoun.jpg", 
//     },
//     {
//       name: "HEANH CHANRAKSMEY",
//       role: "Growth",
//       tag: "GRW",
//       blurb: "Connects CineVerse with theaters and movie communities.",
//       image: "/Laihoun.jpg", 
//     },
//     {
//       name: "Thong prominea",
//       role: "Trust & Safety",
//       tag: "T&S",
//       blurb: "Keeps listings verified and transactions fraud-free.",
//       image: "/Promnea.jpg", 
//     },
//   ];

//   const testimonials = [
//     { name: "Laihoun V.", role: "Frequent Buyer", quote: "Found a last-minute ticket to a sold-out premiere in minutes." },
//     { name: "Khema S.", role: "Ticket Seller", quote: "Listed my extra tickets and got paid within the hour." },
//     { name: "Lisa M.", role: "Movie Club Lead", quote: "Our group uses CineVerse every week to swap tickets." },
//   ];

//   const partners = ["Cloudly", "Software", "Camera", "Startup", "Natural", "Techlify"];

//   return (
//     <main className="min-h-screen bg-gray-50 text-black">
//       {/* Nav */}
//       {/* <nav className="flex items-center justify-between px-8">
//         <div className="flex items-center gap-8 text-sm text-pink-600">
//           <span className="text-black font-medium">Home</span>
//           <span className="text-black">About</span>
//           <span className="text-black">Movies</span>
//           <span className="text-black">Trending</span>
//         </div>
//         <span className="text-black">CineVerse</span>
//         <button className="bg-blue-400 hover:bg-orange-500 text-sm px-4 py-3 rounded-full">
//           Browse Tickets
//         </button>
//       </nav> */}

//       {/* Hero */}
//       <section className="text-center px-6 py-20 max-w-3xl mx-auto">
//         <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
//           <span className="text-blue-400">Hello Everyone </span> Movie
//           Tickets with Confidence
//         </h1>
//         <p className="text-black-500">
//           CineVerse connects movie fans who have tickets
//           to spare with fans who need one - fast, secure, and hassle-free.
//         </p>
//         <button className="bg-orange-400 hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium">
//           List or Find a Trending
//         </button>

//         {/* Stats */}
//         <div className="grid grid-cols-3 gap-4 mt-14 text-left">
//           <div className="bg-blue-400 border border-blue-200 rounded-xl p-4">
//             <p className="text-xs text-orange-900">Trusted By</p>
//             <p className="font-semibold">10,000 users</p>
//           </div>
//           <div className="bg-amber-500 border border-orange-300 rounded-xl p-4">
//             <p className="text-xs text-black mb-1">Tickets Traded</p>
//             <p className="font-semibold text-blue-400">25,000+</p>
//           </div>
//           <div className="bg-gray-800 border border-gray-800 rounded-xl p-4">
//             <p className="text-xs text-gray-500 mb-1">Satisfaction</p>
//             <p className="font-semibold text-green-400">98%</p>
//           </div>
//         </div>
//       </section>

//       {/* Partners */}
//       <section className="px-6 py-14 border-t border-gray-800">
//         <h2 className="text-2xl font-semibold mb-5 ms-150">Our Partners</h2>
//         <div className="grid grid-cols-3 gap-4 w-fit ms-100">
//           {partners.map((p) => (
//             <div
//               key={p}
//               className="bg-orange-400 border border-orange-400 rounded-xl px-8 py-5 w-56"
//             >
//               {p}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Our Story */}
//       <section className="px-5 py-10 border-t border-gray-800 grid md:grid-cols-1 gap-4">
//         <div className="max-w-3xl mx-auto text-center">
//         <h2 className="text-2xl font-semibold">Our Story</h2>
//         <p className="text-black leading-relaxed">
//           CineVerse started with a simple frustration: unused tickets going
//           to waste while other fans missed sold-out shows. We built a
//           marketplace where movie lovers can buy and sell tickets directly,
//           safely, and without the markup of scalpers.
//         </p>
//         </div>
//       </section>

//       {/* Team */}
//       <section className="px-6 py-16 border-t border-gray-800">
//         <h2 className="text-3xl font-bold text-center mb-2">Meet Our Team</h2>
//         <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto text-sm">
//           The people building a fair, simple way to trade movie tickets.
//         </p>
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//           {team.map((m) => (
//             <div
//               key={m.name}
//               className="bg-orange-100 border border-orange-100 rounded-xl p-6 text-center"
//             >
//               {m.image ? (
//                 <Image
//                   src={m.image}
//                   alt={m.name}
//                   width={80}
//                   height={80}
//                   className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
//                 />
//               ) : (
//                 <div className="w-16 h-16 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto mb-3 font-semibold">
//                   {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
//                 </div>
//               )}
//               <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full">
//                 {m.tag}
//               </span>
//               <h3 className="font-semibold mt-2">{m.name}</h3>
//               <p className="text-xs text-gray-700 mb-2">{m.role}</p>
//               <p className="text-sm text-gray-600">{m.blurb}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="px-6 py-16 border-t border-gray-800">
//         <h2 className="text-3xl font-bold text-center mb-10">
//           What Our Users Say
//         </h2>
//         <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//           {testimonials.map((t) => (
//             <div
//               key={t.name}
//               className="bg-orange-300 border border-gray-800 rounded-xl p-6"
//             >
//               <p className="text-black text-2xl mb-2">“</p>
//               <p className="text-sm text-black mb-4">{t.quote}</p>
//               <p className="font-semibold text-sm">{t.name}</p>
//               <p className="text-xs text-gray-500">{t.role}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

import Image from "next/image";

export default function AboutUs() {
  const team = [
    {
      name: "Seng SilKhema",
      role: "Page and Fix api",
      tag: "UX/UI",
      blurb: "Leads product vision and long-term strategy for CineVerse.",
      image: "/Seng SilKhema.jpg",
    },
    {
      name: "Mom Lisa",
      role: "Movie of register and login",
      tag: "UX/UI",
      blurb: "Builds the systems that keep ticket transactions fast and secure.",
      image: "/lisa.jpg",
    },
    {
      name: "Vat Laihoun",
      role: "About Us",
      tag: "CS",
      blurb: "Makes sure every buyer and seller has a smooth experience.",
      image: "/Laihoun.jpg",
    },
    {
      name: "Pharoth Chhun",
      role: "Product Design",
      tag: "DES",
      blurb: "Designs a simple, trustworthy marketplace experience.",
      image: "",
    },
    {
      name: "HEANH CHANRAKSMEY",
      role: "Growth",
      tag: "GRW",
      blurb: "Connects CineVerse with theaters and movie communities.",
      image: "/HEANH CHANRAKSMEY.jpg",
    },
    {
      name: "Thong prominea",
      role: "Trust & Safety",
      tag: "T&S",
      blurb: "Keeps listings verified and transactions fraud-free.",
      image: "/Promnea.jpg",
    },
  ];

  const testimonials = [
    { name: "Laihoun V.", role: "Frequent Buyer", quote: "Found a last-minute ticket to a sold-out premiere in minutes." },
    { name: "Khema S.", role: "Ticket Seller", quote: "Listed my extra tickets and got paid within the hour." },
    { name: "Lisa M.", role: "Movie Club Lead", quote: "Our group uses CineVerse every week to swap tickets." },
  ];

  const partners = ["Cloudly", "Software", "Camera", "Startup", "Natural", "Techlify"];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0a2541] text-black dark:text-white transition-colors">
      {/* Hero */}
      <section className="text-center px-6 py-20 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          <span className="text-blue-400">Hello Everyone </span> Movie
          Tickets with Confidence
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          CineVerse connects movie fans who have tickets
          to spare with fans who need one - fast, secure, and hassle-free.
        </p>
        <button className="bg-orange-300 hover:bg-blue-300 px-5 py-2 rounded-full text-sm font-medium mt-4">
          List or Find a Trending
        </button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-14 text-left">
          <div className="bg-blue-300 border border-blue-200 dark:border-blue-300 rounded-xl p-4">
            <p className="text-xs text-orange-900">Trusted By</p>
            <p className="font-semibold text-black">10,000 users</p>
          </div>
          <div className="bg-amber-400 border border-orange-300 dark:border-orange-300 rounded-xl p-4">
            <p className="text-xs text-black mb-1">Tickets Traded</p>
            <p className="font-semibold text-blue-900">25,000+</p>
          </div>
          <div className="bg-blue-300 border border-gray-800 dark:border-gray-600 rounded-xl p-4">
            <p className="text-xs text-black mb-1">Satisfaction</p>
            <p className="font-semibold text-black">98%</p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="px-6 py-14 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-semibold mb-5 text-center">Our Partners</h2>
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {partners.map((p) => (
            <div
              key={p}
              className="bg-blue-300 border border-blue-300 rounded-xl px-8 py-5 text-center text-black"
            >
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="px-5 py-10 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            CineVerse started with a simple frustration: unused tickets going
            to waste while other fans missed sold-out shows. We built a
            marketplace where movie lovers can buy and sell tickets directly,
            safely, and without the markup of scalpers.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-16 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-2">Meet Our Team</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-10 max-w-xl mx-auto text-sm">
          The people building a fair, simple way to trade movie tickets.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {team.map((m) => (
            <div
              key={m.name}
              className="bg-blue-200 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-xl p-6 text-center"
            >
              {m.image ? (
                <Image
                  src={m.image}
                  alt={m.name}
                  width={80}
                  height={80}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto mb-3 font-semibold">
                  {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
              )}
              <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full">
                {m.tag}
              </span>
              <h3 className="font-semibold mt-2 text-black dark:text-white">{m.name}</h3>
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">{m.role}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{m.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-blue-200 border border-blue-100 dark:border-gray-700 rounded-xl p-6"
            >
              <p className="text-black text-2xl mb-2">"</p>
              <p className="text-sm text-black mb-4">{t.quote}</p>
              <p className="font-semibold text-sm text-black">{t.name}</p>
              <p className="text-xs text-gray-600">{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}






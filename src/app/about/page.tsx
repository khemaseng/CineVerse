import { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    template: '%s | Tos Tinh',
    default: 'About'
  },
  keywords: "T-shirts for women",
  description: "Tos Tinh is a modern platform and modern vibe for all costumers.",
  openGraph: {
    title: "Tos Tinh - M2",
    description: "Tos Tinh refers to small retail and online lifestyle or fashion businesses in Phnom Penh, such as Tos Tinh 356 Store and Tos tinh-21, offering modern clothing and products through social media platforms.",
    images: ['/thumbnail.png']
  }
};
export default function Aboutpage() {
  return (
    <>
    <h1 className="">សួស្ដីអ្នកទាំងអស់គ្នា</h1>
    </>
  )
}
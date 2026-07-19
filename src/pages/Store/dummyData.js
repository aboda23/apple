export const storeProducts = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    category: "iPhone",
    model: "15 Pro Max",
    description: "Titanium. So strong. So light. So Pro.",
    price: 1399,
    discountPrice: 1199,
    discount: "14% OFF",
    rating: 5,
    reviews: "3.2K",
    stock: true,
    colors: [
      { name: "Natural Titanium", hex: "#b4b2ac" },
      { name: "Blue Titanium", hex: "#4d535b" },
      { name: "White Titanium", hex: "#f3f2ee" },
      { name: "Black Titanium", hex: "#464545" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    sizes: [],
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708",
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708"
    ],
    thumbnail: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708",
    featured: true
  },
  {
    id: "macbook-pro-14",
    name: "MacBook Pro 14\"",
    category: "Mac",
    model: "M3 Pro",
    description: "Supercharged by M3 Pro or M3 Max.",
    price: 1799,
    discountPrice: 1199,
    discount: "9% OFF",
    rating: 5,
    reviews: "110",
    stock: true,
    colors: [
      { name: "Space Black", hex: "#2e2e2e" },
      { name: "Silver", hex: "#e3e4e5" }
    ],
    storage: ["512GB", "1TB", "2TB"],
    sizes: ["14-inch", "16-inch"],
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1698169226653"
    ],
    thumbnail: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1698169226653",
    featured: false
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro (2nd gen)",
    category: "AirPods",
    model: "Pro 2",
    description: "Up to 2x more Active Noise Cancellation.",
    price: 299,
    discountPrice: 249,
    discount: "17% OFF",
    rating: 5,
    reviews: "2.4K",
    stock: true,
    colors: [
      { name: "White", hex: "#ffffff" }
    ],
    storage: [],
    sizes: [],
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1694014871985"
    ],
    thumbnail: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1694014871985",
    featured: false
  },
  {
    id: "apple-watch-s9",
    name: "Apple Watch Series 9",
    category: "Watch",
    model: "Series 9",
    description: "Smarter. Brighter. Mightier.",
    price: 399,
    discountPrice: null,
    discount: null,
    rating: 5,
    reviews: "1.1K",
    stock: true,
    colors: [
      { name: "Midnight", hex: "#1e1e1e" },
      { name: "Starlight", hex: "#e5e3dc" },
      { name: "Silver", hex: "#e3e4e5" },
      { name: "Pink", hex: "#fad2d3" },
      { name: "Red", hex: "#c61d31" }
    ],
    storage: [],
    sizes: ["41mm", "45mm"],
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-alum-midnight-nc-41_VW_34FR+watch-41-alum-midnight-nc-s9_VW_34FR_WF_CO_GEO_IN?wid=2000&hei=2000&fmt=png-alpha&.v=1693290610141"
    ],
    thumbnail: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-alum-midnight-nc-41_VW_34FR+watch-41-alum-midnight-nc-s9_VW_34FR_WF_CO_GEO_IN?wid=2000&hei=2000&fmt=png-alpha&.v=1693290610141",
    featured: false
  },
  {
    id: "ipad-air",
    name: "iPad Air",
    category: "iPad",
    model: "M1",
    description: "Light. Bright. Full of might.",
    price: 649,
    discountPrice: 599,
    discount: "8% OFF",
    rating: 5,
    reviews: "850",
    stock: true,
    colors: [
      { name: "Space Gray", hex: "#5b5b5b" },
      { name: "Blue", hex: "#819dbb" },
      { name: "Pink", hex: "#e0b6b8" },
      { name: "Purple", hex: "#b4a5c5" },
      { name: "Starlight", hex: "#e3dfd8" }
    ],
    storage: ["64GB", "256GB"],
    sizes: ["11-inch", "13-inch"],
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-storage-select-202207-purple-wifi?wid=540&hei=550&fmt=p-jpg&qlt=95&.v=1670856064506"
    ],
    thumbnail: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-storage-select-202207-purple-wifi?wid=540&hei=550&fmt=p-jpg&qlt=95&.v=1670856064506",
    featured: false
  },
  {
    id: "airpods-max",
    name: "AirPods Max",
    category: "AirPods",
    model: "Max",
    description: "Pro-level Active Noise Cancellation.",
    price: 549,
    discountPrice: null,
    discount: null,
    rating: 5,
    reviews: "730",
    stock: false,
    colors: [
      { name: "Space Gray", hex: "#5b5b5b" },
      { name: "Pink", hex: "#e0b6b8" },
      { name: "Silver", hex: "#e3e4e5" }
    ],
    storage: [],
    sizes: [],
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=940&hei=800&fmt=jpeg&qlt=90&.v=1604021221000"
    ],
    thumbnail: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=940&hei=800&fmt=jpeg&qlt=90&.v=1604021221000",
    featured: false
  },
  {
    id: "mac-mini",
    name: "Mac mini",
    category: "Mac",
    model: "M2",
    description: "More muscle. Much more mini.",
    price: 499,
    discountPrice: null,
    discount: null,
    rating: 5,
    reviews: "620",
    stock: true,
    colors: [
      { name: "Silver", hex: "#e3e4e5" }
    ],
    storage: ["256GB", "512GB"],
    sizes: [],
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-hero-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1670038314708"
    ],
    thumbnail: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-hero-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1670038314708",
    featured: false
  },
  {
    id: "magsafe",
    name: "MagSafe Charger",
    category: "Accessories",
    model: "MagSafe",
    description: "The easiest way to wirelessly charge.",
    price: 39,
    discountPrice: null,
    discount: null,
    rating: 5,
    reviews: "430",
    stock: true,
    colors: [],
    storage: [],
    sizes: [],
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1661269793559"
    ],
    thumbnail: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1661269793559",
    featured: false
  },
  {
    id: "airtag",
    name: "AirTag",
    category: "Accessories",
    model: "AirTag",
    description: "The easy way to find your things.",
    price: 29,
    discountPrice: null,
    discount: null,
    rating: 5,
    reviews: "900",
    stock: true,
    colors: [],
    storage: [],
    sizes: [],
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX532?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1617102645000"
    ],
    thumbnail: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX532?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1617102645000",
    featured: false
  }
];

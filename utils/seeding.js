const { Brand } = require("../models/brand");
const { Category } = require("../models/category");
const Product = require("../models/product");

const categories = [
    { _id: "64b64c715b5d4c3f489c8a83", name: "Electronics", image: "https://images.pexels.com/photos/3707205/pexels-photo-3707205.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a84", name: "Fashion", image: "https://images.pexels.com/photos/1040189/pexels-photo-1040189.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a85", name: "Home Appliances", image: "https://images.pexels.com/photos/313078/pexels-photo-313078.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a86", name: "Bookstore", image: "https://images.pexels.com/photos/1587368/pexels-photo-1587368.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a87", name: "Children's Toys", image: "https://images.pexels.com/photos/4165364/pexels-photo-4165364.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a88", name: "Beauty Products", image: "https://images.pexels.com/photos/1267299/pexels-photo-1267299.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a89", name: "Groceries", image: "https://images.pexels.com/photos/668858/pexels-photo-668858.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a8a", name: "Automotive", image: "https://images.pexels.com/photos/3931545/pexels-photo-3931545.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a8b", name: "Furniture", image: "https://images.pexels.com/photos/1289174/pexels-photo-1289174.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a8c", name: "Mobile Phones", image: "https://images.pexels.com/photos/459799/pexels-photo-459799.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a8d", name: "Computers", image: "https://images.pexels.com/photos/3822355/pexels-photo-3822355.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a8e", name: "Laptops", image: "https://images.pexels.com/photos/4482929/pexels-photo-4482929.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a90", name: "Jewelry", image: "https://images.pexels.com/photos/2286889/pexels-photo-2286889.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a91", name: "Stationery", image: "https://images.pexels.com/photos/1704166/pexels-photo-1704166.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a92", name: "Musical Instruments", image: "https://images.pexels.com/photos/215927/pexels-photo-215927.jpeg" },
];

  const brands = [
    { _id: "64b64c715b5d4c3f489c8a70", name: "Apple", logo: "https://images.pexels.com/photos/4569580/pexels-photo-4569580.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a71", name: "Samsung", logo: "https://images.pexels.com/photos/4161774/pexels-photo-4161774.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a72", name: "Sony", logo: "https://images.pexels.com/photos/1038461/pexels-photo-1038461.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a73", name: "LG", logo: "https://images.pexels.com/photos/3047753/pexels-photo-3047753.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a74", name: "Nike", logo: "https://images.pexels.com/photos/4220298/pexels-photo-4220298.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a75", name: "Adidas", logo: "https://images.pexels.com/photos/4113173/pexels-photo-4113173.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a76", name: "Microsoft", logo: "https://images.pexels.com/photos/1819315/pexels-photo-1819315.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a77", name: "Dell", logo: "https://images.pexels.com/photos/3739124/pexels-photo-3739124.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a78", name: "HP", logo: "https://images.pexels.com/photos/4181814/pexels-photo-4181814.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a79", name: "Lenovo", logo: "https://images.pexels.com/photos/4102057/pexels-photo-4102057.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a7a", name: "Canon", logo: "https://images.pexels.com/photos/6273315/pexels-photo-6273315.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a7b", name: "Nikon", logo: "https://images.pexels.com/photos/5669481/pexels-photo-5669481.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a7c", name: "Panasonic", logo: "https://images.pexels.com/photos/4102048/pexels-photo-4102048.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a7d", name: "Puma", logo: "https://images.pexels.com/photos/2998682/pexels-photo-2998682.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a7e", name: "Reebok", logo: "https://images.pexels.com/photos/6317700/pexels-photo-6317700.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a7f", name: "Asus", logo: "https://images.pexels.com/photos/710407/pexels-photo-710407.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a80", name: "Acer", logo: "https://images.pexels.com/photos/3323052/pexels-photo-3323052.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a81", name: "Toshiba", logo: "https://images.pexels.com/photos/305406/pexels-photo-305406.jpeg" },
    { _id: "64b64c715b5d4c3f489c8a82", name: "Huawei", logo: "https://images.pexels.com/photos/6050151/pexels-photo-6050151.jpeg" },
];

const products = [
    {
        title: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation and long battery life.",
        size: "XX-Large",
        price: 199.99,
        priceAfterDiscount: 149.99,
        quantity: 50,
        colors: ["black", "white"],
        imgCover: "https://images.pexels.com/photos/3707205/pexels-photo-3707205.jpeg", // Electronics category image
        images: [
            "https://images.pexels.com/photos/3707205/pexels-photo-3707205.jpeg",
            "https://images.pexels.com/photos/459799/pexels-photo-459799.jpeg",
            "https://images.pexels.com/photos/4482929/pexels-photo-4482929.jpeg"
        ],
        ratingsAverage: 4.5,
        category: "64b64c715b5d4c3f489c8a83", // Electronics
        brand: "64b64c715b5d4c3f489c8a70" // Apple
    },
    {
        title: "Running Shoes",
        description: "Comfortable running shoes designed for maximum performance.",
        size: "Medium",
        price: 120.99,
        priceAfterDiscount: 99.99,
        quantity: 40,
        colors: ["blue", "red"],
        imgCover: "https://images.pexels.com/photos/4220298/pexels-photo-4220298.jpeg", // Nike brand image
        images: [
            "https://images.pexels.com/photos/4220298/pexels-photo-4220298.jpeg",
            "https://images.pexels.com/photos/4113173/pexels-photo-4113173.jpeg",
            "https://images.pexels.com/photos/2998682/pexels-photo-2998682.jpeg"
        ],
        ratingsAverage: 4.7,
        category: "64b64c715b5d4c3f489c8a84", // Fashion
        brand: "64b64c715b5d4c3f489c8a74" // Nike
    },
    {
        title: "Fitness T-Shirt",
        description: "Lightweight and breathable fitness t-shirt.",
        size: "Small",
        price: 29.99,
        priceAfterDiscount: 19.99,
        quantity: 100,
        colors: ["black", "gray"],
        imgCover: "https://images.pexels.com/photos/3779831/pexels-photo-3779831.jpeg", // Fitness category image
        images: [
            "https://images.pexels.com/photos/3779831/pexels-photo-3779831.jpeg",
            "https://images.pexels.com/photos/3769094/pexels-photo-3769094.jpeg",
            "https://images.pexels.com/photos/1747315/pexels-photo-1747315.jpeg"
        ],
        ratingsAverage: 4.3,
        category: "64b64c715b5d4c3f489c8a92", // Fitness
        brand: "64b64c715b5d4c3f489c8a78" // Liforme
    },
    {
        title: "Yoga Pants",
        description: "Comfortable yoga pants for workouts and lounging.",
        size: "Large",
        price: 49.99,
        priceAfterDiscount: 39.99,
        quantity: 80,
        colors: ["black", "purple"],
        imgCover: "https://images.pexels.com/photos/1704125/pexels-photo-1704125.jpeg", // Fitness category image
        images: [
            "https://images.pexels.com/photos/1704125/pexels-photo-1704125.jpeg",
            "https://images.pexels.com/photos/768650/pexels-photo-768650.jpeg",
            "https://images.pexels.com/photos/1852006/pexels-photo-1852006.jpeg"
        ],
        ratingsAverage: 4.5,
        category: "64b64c715b5d4c3f489c8a92", // Fitness
        brand: "64b64c715b5d4c3f489c8a78" // Liforme
    },
    {
        title: "Office Chair",
        description: "Ergonomic office chair designed for comfort and support during long hours.",
        size: "Medium",
        price: 199.99,
        priceAfterDiscount: 179.99,
        quantity: 45,
        colors: ["black"],
        imgCover: "https://images.pexels.com/photos/1289174/pexels-photo-1289174.jpeg", // Furniture category image
        images: [
            "https://images.pexels.com/photos/1289174/pexels-photo-1289174.jpeg",
            "https://images.pexels.com/photos/4113173/pexels-photo-4113173.jpeg",
            "https://images.pexels.com/photos/5202715/pexels-photo-5202715.jpeg"
        ],
        ratingsAverage: 4.5,
        category: "64b64c715b5d4c3f489c8a8a", // Furniture
        brand: "64b64c715b5d4c3f489c8a77" // IKEA
    },
    {
        title: "Outdoor Tent",
        description: "Waterproof outdoor tent for camping and outdoor activities.",
        size: "XX-Large",
        price: 199.99,
        priceAfterDiscount: 169.99,
        quantity: 20,
        colors: ["green", "blue"],
        imgCover: "https://images.pexels.com/photos/4594333/pexels-photo-4594333.jpeg", // Outdoor category image
        images: [
            "https://images.pexels.com/photos/4594333/pexels-photo-4594333.jpeg",
            "https://images.pexels.com/photos/1267735/pexels-photo-1267735.jpeg",
            "https://images.pexels.com/photos/2958911/pexels-photo-2958911.jpeg"
        ],
        ratingsAverage: 4.6,
        category: "64b64c715b5d4c3f489c8a90", // Outdoor
        brand: "64b64c715b5d4c3f489c8a77" // Coleman
    },
    {
        title: "Yoga Mat",
        description: "Non-slip yoga mat perfect for practice at home or the gym.",
        size: "XX-Large",
        price: 29.99,
        priceAfterDiscount: 19.99,
        quantity: 150,
        colors: ["purple", "green"],
        imgCover: "https://images.pexels.com/photos/3779831/pexels-photo-3779831.jpeg", // Fitness category image
        images: [
            "https://images.pexels.com/photos/3779831/pexels-photo-3779831.jpeg",
            "https://images.pexels.com/photos/3769094/pexels-photo-3769094.jpeg",
            "https://images.pexels.com/photos/1747315/pexels-photo-1747315.jpeg"
        ],
        ratingsAverage: 4.7,
        category: "64b64c715b5d4c3f489c8a92", // Fitness
        brand: "64b64c715b5d4c3f489c8a78" // Liforme
    },
    // Additional products can be added here with varying sizes...
    {
        title: "Fitness Jacket",
        description: "Lightweight jacket for outdoor activities and workouts.",
        size: "X-Small",
        price: 89.99,
        priceAfterDiscount: 79.99,
        quantity: 60,
        colors: ["gray", "blue"],
        imgCover: "https://images.pexels.com/photos/1608884/pexels-photo-1608884.jpeg", // Fitness category image
        images: [
            "https://images.pexels.com/photos/1608884/pexels-photo-1608884.jpeg",
            "https://images.pexels.com/photos/4220302/pexels-photo-4220302.jpeg",
            "https://images.pexels.com/photos/2998682/pexels-photo-2998682.jpeg"
        ],
        ratingsAverage: 4.5,
        category: "64b64c715b5d4c3f489c8a92", // Fitness
        brand: "64b64c715b5d4c3f489c8a78" // Liforme
    },
    {
        title: "Outdoor Jacket",
        description: "Waterproof jacket for outdoor activities.",
        size: "XX-Large",
        price: 149.99,
        priceAfterDiscount: 129.99,
        quantity: 25,
        colors: ["black", "olive"],
        imgCover: "https://images.pexels.com/photos/4174587/pexels-photo-4174587.jpeg", // Outdoor category image
        images: [
            "https://images.pexels.com/photos/4174587/pexels-photo-4174587.jpeg",
            "https://images.pexels.com/photos/4594300/pexels-photo-4594300.jpeg",
            "https://images.pexels.com/photos/4553553/pexels-photo-4553553.jpeg"
        ],
        ratingsAverage: 4.6,
        category: "64b64c715b5d4c3f489c8a90", // Outdoor
        brand: "64b64c715b5d4c3f489c8a77" // Coleman
    },
    {
        title: "Sweater",
        description: "Warm and cozy sweater for cold days.",
        size: "3X-Large",
        price: 79.99,
        priceAfterDiscount: 69.99,
        quantity: 30,
        colors: ["red", "navy"],
        imgCover: "https://images.pexels.com/photos/3406266/pexels-photo-3406266.jpeg", // Fashion category image
        images: [
            "https://images.pexels.com/photos/3406266/pexels-photo-3406266.jpeg",
            "https://images.pexels.com/photos/1778944/pexels-photo-1778944.jpeg",
            "https://images.pexels.com/photos/1464265/pexels-photo-1464265.jpeg"
        ],
        ratingsAverage: 4.4,
        category: "64b64c715b5d4c3f489c8a84", // Fashion
        brand: "64b64c715b5d4c3f489c8a74" // Nike
    },
    {
        title: "Jeans",
        description: "Stylish jeans for everyday wear.",
        size: "4X-Large",
        price: 99.99,
        priceAfterDiscount: 89.99,
        quantity: 15,
        colors: ["blue", "black"],
        imgCover: "https://images.pexels.com/photos/1111389/pexels-photo-1111389.jpeg", // Fashion category image
        images: [
            "https://images.pexels.com/photos/1111389/pexels-photo-1111389.jpeg",
            "https://images.pexels.com/photos/849571/pexels-photo-849571.jpeg",
            "https://images.pexels.com/photos/1207035/pexels-photo-1207035.jpeg"
        ],
        ratingsAverage: 4.5,
        category: "64b64c715b5d4c3f489c8a84", // Fashion
        brand: "64b64c715b5d4c3f489c8a74" // Nike
    },
];


exports.seedToDataBase = async()=>{
    try{
        const categoriesData = await Category.insertMany(categories);
        console.log("Categories seeded successfully");

        const brandsData = await Brand.insertMany(brands);
        console.log("Brands seeded successfully");
        
        const productsData = await Product.insertMany(products);
        console.log("Products seeded successfully");
    }
    catch(err){
        console.log(err);
    }
  }

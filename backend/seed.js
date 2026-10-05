import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './src/models/user.js';
import Product from './src/models/product.js';
import BiddingProduct from './src/models/biddingProduct.js';
import Notification from './src/models/notifications.js';

dotenv.config();

const PASSWORD = 'password123';
const SEED_EMAILS = ['amina@rewind.local', 'hassan@rewind.local'];

const catalog = [
  {
    seller: 'amina',
    name: 'Vintage Denim Jacket',
    price: 2800,
    color: 'Blue',
    category: 'women',
    type: 'top',
    categories: ['Jacket'],
    materials: ['Denim'],
    description: 'Lightly worn blue denim jacket with a classic fit. Cotton denim, women, top.',
    images: ['https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80'],
    topSizes: { bustChest: 36, waist: 29, hips: 39, shoulderWidth: 15, armLength: 31, neckCircumference: 14 },
  },
  {
    seller: 'amina',
    name: 'Linen Button Shirt',
    price: 1600,
    color: 'White',
    category: 'men',
    type: 'top',
    categories: ['Shirt'],
    materials: ['Linen'],
    description: 'Breathable white linen shirt, barely worn. Men, top.',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'],
    topSizes: { bustChest: 38, waist: 32, hips: 38, shoulderWidth: 17, armLength: 33, neckCircumference: 15 },
  },
  {
    seller: 'hassan',
    name: 'Wool Crewneck Sweater',
    price: 3400,
    color: 'Cream',
    category: 'women',
    type: 'top',
    categories: ['Sweater'],
    materials: ['Wool'],
    description: 'Soft cream wool sweater for cooler evenings. Women, top.',
    images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80'],
    topSizes: { bustChest: 36, waist: 28, hips: 38, shoulderWidth: 15, armLength: 31, neckCircumference: 14 },
  },
  {
    seller: 'hassan',
    name: 'Straight Leg Jeans',
    price: 2200,
    color: 'Indigo',
    category: 'women',
    type: 'bottom',
    categories: ['Jeans'],
    materials: ['Denim'],
    description: 'Indigo straight-leg jeans with a mid rise. Women, bottom, denim.',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80'],
    bottomSizes: { waist: 28, hips: 39, inseam: 30, thighLegOpening: 22, rise: 10 },
  },
  {
    seller: 'amina',
    name: 'Cotton Chinos',
    price: 1900,
    color: 'Khaki',
    category: 'men',
    type: 'bottom',
    categories: ['Trousers'],
    materials: ['Cotton'],
    description: 'Khaki cotton chinos, clean condition. Men, bottom.',
    images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80'],
    bottomSizes: { waist: 32, hips: 38, inseam: 31, thighLegOpening: 23, rise: 11 },
  },
  {
    seller: 'hassan',
    name: 'Silk Scarf',
    price: 900,
    color: 'Red',
    category: 'women',
    type: 'accessories',
    categories: ['Scarf'],
    materials: ['Silk'],
    description: 'Red silk scarf, small and easy to style. Women, accessories.',
    images: ['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80'],
  },
  {
    seller: 'amina',
    name: 'Kids Knit Cardigan',
    price: 1200,
    color: 'Yellow',
    category: 'kids',
    type: 'top',
    categories: ['Cardigan'],
    materials: ['Cotton'],
    description: 'Yellow knit cardigan for kids. Soft cotton, top.',
    images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80'],
    topSizes: { bustChest: 24, waist: 22, hips: 24, shoulderWidth: 11, armLength: 16, neckCircumference: 11 },
  },
  {
    seller: 'hassan',
    name: 'Leather Tote Bag',
    price: 4500,
    color: 'Brown',
    category: 'women',
    type: 'accessories',
    categories: ['Bag'],
    materials: ['Leather'],
    description: 'Brown leather tote, sold sample so the catalogue shows a sold item.',
    images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'],
    isSold: true,
  },
];

async function clearPreviousSeed(users) {
  const ids = users.map((user) => user._id);
  if (ids.length === 0) return;
  await Product.deleteMany({ owner: { $in: ids } });
  await BiddingProduct.deleteMany({ owner: { $in: ids } });
  await Notification.deleteMany({ recipient: { $in: ids } });
  await User.deleteMany({ _id: { $in: ids } });
}

async function seed() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing from backend/.env');
  }

  await mongoose.connect(process.env.MONGO_URI);
  const dbName = mongoose.connection.name;
  console.log(`Connected to database "${dbName}"`);

  const existing = await User.find({ email: { $in: SEED_EMAILS } });
  await clearPreviousSeed(existing);

  const amina = await User.create({
    username: 'amina',
    email: 'amina@rewind.local',
    password: PASSWORD,
    isEmailVerified: true,
    stats: { productsSold: 0, totalListed: 4, itemsBought: 1, totalSpent: 900, totalEarned: 0, likesReceived: 3 },
    reviewsData: { fiveStar: 2, fourStar: 1 },
    averageRating: 4.7,
  });

  const hassan = await User.create({
    username: 'hassan',
    email: 'hassan@rewind.local',
    password: PASSWORD,
    isEmailVerified: true,
    stats: { productsSold: 1, totalListed: 4, itemsBought: 0, totalSpent: 0, totalEarned: 4500, likesReceived: 5 },
    reviewsData: { fiveStar: 3, fourStar: 1 },
    averageRating: 4.8,
  });

  const sellers = { amina, hassan };

  const products = await Product.insertMany(
    catalog.map(({ seller, ...item }) => ({
      ...item,
      owner: sellers[seller]._id,
      isSold: Boolean(item.isSold),
    }))
  );

  const jacket = products.find((product) => product.name === 'Vintage Denim Jacket');
  const ends = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await BiddingProduct.create({
    owner: amina._id,
    name: 'Vintage Wool Coat',
    startingPrice: 3500,
    description: 'Charcoal wool coat. Highest bidder wins. Auction stays open for 7 days.',
    bidStartTime: new Date(),
    bidEndTime: ends,
    biddingModel: 'Highest Bidder',
    images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80'],
  });

  await Notification.create({
    recipient: amina._id,
    title: 'Welcome to Rewind & Revive',
    description: 'Your sample closet is live. List more pieces whenever you are ready.',
    type: 'system',
  });

  if (jacket) {
    await User.updateOne(
      { _id: hassan._id },
      { $set: { viewHistory: [{ product: jacket._id, viewedAt: new Date() }] } }
    );
  }

  console.log(`Seeded ${products.length} products, 2 users, 1 auction, 1 notification.`);
  console.log('Log in with amina@rewind.local or hassan@rewind.local / password123');
}

seed()
  .catch((error) => {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });

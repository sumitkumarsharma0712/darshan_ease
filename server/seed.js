import dotenv from "dotenv";
import mongoose from "mongoose";
import Temple from "./models/Temple.js";
import DarshanSlot from "./models/DarshanSlot.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const temples = [
    {
        name: "Kashi Vishwanath Temple",
        location: "Varanasi, Uttar Pradesh",
        deity: "Lord Shiva",
        description: "One of the most famous Hindu temples dedicated to Lord Shiva. It is one of the twelve Jyotirlingas. The temple stands on the western bank of the holy river Ganga and is one of the holiest of Shiva temples. The main deity is known by the names Vishwanath and Vishweshwara, meaning the ruler of the universe.",
        timings: "3:00 AM - 11:00 PM",
        contactInfo: "+91-542-2392629",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Kashi_Vishwanath_Temple_Varanasi_India.jpg/1200px-Kashi_Vishwanath_Temple_Varanasi_India.jpg",
        latitude: 25.3109,
        longitude: 83.0107
    },
    {
        name: "Tirupati Balaji Temple",
        location: "Tirumala, Andhra Pradesh",
        deity: "Lord Venkateswara",
        description: "Sri Venkateswara Swamy Temple is a Hindu temple situated on the seventh peak of Tirumala Hills. The temple is the richest pilgrimage center of any faith after the Vatican. The presiding deity Lord Venkateswara is believed to have appeared here to save mankind from trials and troubles of Kali Yuga.",
        timings: "2:30 AM - 1:30 AM",
        contactInfo: "+91-877-2277777",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/53/Sri_Venkateswara_Temple%2C_Tirumala%2C_AP_W_IMG_8078.jpg",
        latitude: 13.6833,
        longitude: 79.3472
    },
    {
        name: "Golden Temple (Harmandir Sahib)",
        location: "Amritsar, Punjab",
        deity: "Guru Granth Sahib",
        description: "The Golden Temple, also known as Sri Harmandir Sahib, is the holiest Gurdwara and the most important pilgrimage site of Sikhism. The temple is built on a 67-foot square platform in the centre of the Sarovar. Its upper floors are covered with gold, giving it a distinctive appearance.",
        timings: "Open 24 hours",
        contactInfo: "+91-183-2553957",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/94/The_Golden_Temple_of_Amritsar_-_India_%28Sikh_holy_place%29.jpg",
        latitude: 31.6200,
        longitude: 74.8765
    },
    {
        name: "Jagannath Temple",
        location: "Puri, Odisha",
        deity: "Lord Jagannath",
        description: "The Jagannath Temple is an important Hindu temple dedicated to Lord Jagannath, a form of Vishnu. It is one of the Char Dham pilgrimages. The temple is famous for the annual Rath Yatra, where the three principal deities are pulled on huge and elaborately decorated temple cars.",
        timings: "5:00 AM - 11:00 PM",
        contactInfo: "+91-6752-222002",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/Jagannath_Temple%2C_Puri%2C_Orissa.jpg",
        latitude: 19.8048,
        longitude: 85.8182
    },
    {
        name: "Meenakshi Amman Temple",
        location: "Madurai, Tamil Nadu",
        deity: "Goddess Meenakshi (Parvati)",
        description: "The Meenakshi Temple is a historic Hindu temple located on the southern bank of the Vaigai River. Dedicated to Goddess Meenakshi, a form of Parvati, and Lord Sundareshwarar, a form of Shiva. The temple has 14 gopurams (gateway towers) with thousands of colourful mythological sculptures.",
        timings: "5:00 AM - 12:30 PM, 4:00 PM - 10:00 PM",
        contactInfo: "+91-452-2345360",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Madurai_Meenakshi_Amman_Temple.jpg/1200px-Madurai_Meenakshi_Amman_Temple.jpg",
        latitude: 9.9195,
        longitude: 78.1193
    },
    {
        name: "Somnath Temple",
        location: "Gir Somnath, Gujarat",
        deity: "Lord Shiva",
        description: "Somnath Temple is one of the most sacred pilgrimage sites for Hindus and is the first among the twelve Jyotirlinga shrines of Shiva. Rebuilt several times in the past after repeated destruction by several Muslim invaders and rulers, the present temple was reconstructed in the Chalukya style of Hindu temple architecture.",
        timings: "6:00 AM - 9:30 PM",
        contactInfo: "+91-2876-231230",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Somnath_Temple_2022.jpg/1200px-Somnath_Temple_2022.jpg",
        latitude: 20.8880,
        longitude: 70.4014
    },
    {
        name: "Kedarnath Temple",
        location: "Kedarnath, Uttarakhand",
        deity: "Lord Shiva",
        description: "Kedarnath Temple is a Hindu temple dedicated to Lord Shiva. Located on the Garhwal Himalayan range near the Mandakini river at an altitude of 3,583 m. Due to extreme weather conditions, the temple is open only between April and November. It is one of the 12 Jyotirlingas of Lord Shiva.",
        timings: "4:00 AM - 9:00 PM (Apr-Nov)",
        contactInfo: "+91-1364-262228",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Kedarnath_Temple_2022.jpg/800px-Kedarnath_Temple_2022.jpg",
        latitude: 30.7352,
        longitude: 79.0669
    },
    {
        name: "Akshardham Temple",
        location: "New Delhi",
        deity: "Swaminarayan",
        description: "Swaminarayan Akshardham is a Hindu mandir and spiritual-cultural campus. The temple showcases millennia of traditional and modern Hindu culture, spirituality, and architecture. The main monument rises 141 feet high and spans 316 feet wide, all made of Rajasthani pink sandstone and Italian carrara marble.",
        timings: "9:30 AM - 6:30 PM (Closed on Mondays)",
        contactInfo: "+91-11-43442344",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Akshardham_Delhi.jpg/1200px-Akshardham_Delhi.jpg",
        latitude: 28.6127,
        longitude: 77.2773
    },
    {
        name: "Ramanathaswamy Temple",
        location: "Rameswaram, Tamil Nadu",
        deity: "Lord Shiva",
        description: "Ramanathaswamy Temple is a Hindu temple dedicated to the god Shiva located on Rameswaram island. It is one of the twelve Jyotirlinga temples. The temple has the longest corridor among all Hindu temples in India, and its corridors are beautifully ornate with massive pillars on both sides.",
        timings: "5:00 AM - 1:00 PM, 3:00 PM - 9:00 PM",
        contactInfo: "+91-4573-221223",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Ramanathaswamy_Temple%2C_Rameswaram.jpg/1200px-Ramanathaswamy_Temple%2C_Rameswaram.jpg",
        latitude: 9.2881,
        longitude: 79.3174
    },
    {
        name: "Badrinath Temple",
        location: "Badrinath, Uttarakhand",
        deity: "Lord Vishnu",
        description: "Badrinath Temple is a Hindu temple dedicated to Lord Vishnu situated along the bank of the Alaknanda river. It is one of the four Char Dham pilgrimage sites. The temple and town are situated at an elevation of 3,133 m in the Garhwal hill tracks of the Himalayas.",
        timings: "4:15 AM - 9:00 PM (May-Nov)",
        contactInfo: "+91-1381-222017",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Badrinath_Temple%2C_Uttarakhand.jpg/1024px-Badrinath_Temple%2C_Uttarakhand.jpg",
        latitude: 30.7447,
        longitude: 79.4930
    },
    {
        name: "Siddhivinayak Temple",
        location: "Mumbai, Maharashtra",
        deity: "Lord Ganesha",
        description: "Shree Siddhivinayak Ganapati Mandir is a Hindu temple dedicated to Lord Ganesh. It is one of the richest temples in Mumbai. The wooden doors to the inner sanctum are carved with images of Ashtavinayak. The temple attracts 25,000 to 30,000 devotees on Tuesdays and during festivals.",
        timings: "5:30 AM - 10:00 PM",
        contactInfo: "+91-22-24222800",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Siddhivinayak_Temple_Mumbai_closeup.jpg/800px-Siddhivinayak_Temple_Mumbai_closeup.jpg",
        latitude: 19.0169,
        longitude: 72.8306
    },
    {
        name: "Konark Sun Temple",
        location: "Konark, Odisha",
        deity: "Surya (Sun God)",
        description: "The Konark Sun Temple is a 13th-century CE Sun temple at Konark, about 35 km from Puri. Designed in the form of a gigantic chariot drawn by seven horses on twelve pairs of wheels, it is a UNESCO World Heritage Site. The temple is a masterpiece of Kalinga architecture.",
        timings: "6:00 AM - 8:00 PM",
        contactInfo: "+91-6758-236821",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Konarka_Temple.jpg/1200px-Konarka_Temple.jpg",
        latitude: 19.8876,
        longitude: 86.0945
    },
    {
        name: "Shri Mata Vaishno Devi Temple",
        location: "Katra, Jammu and Kashmir",
        deity: "Mata Vaishno Devi",
        description: "Renowned and highly revered Hindu temple dedicated to the goddess Mata Vaishno Devi. It is located at an altitude of 5200 feet in the Trikuta Mountains.",
        timings: "Open 24 hours",
        contactInfo: "+91-1991-232238",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Trikuta_Hills_from_Katra.jpg/1200px-Trikuta_Hills_from_Katra.jpg",
        latitude: 33.0308,
        longitude: 74.9490
    },
    {
        name: "Shirdi Sai Baba Temple",
        location: "Shirdi, Maharashtra",
        deity: "Sai Baba of Shirdi",
        description: "The Sai Baba Temple in Shirdi is one of the major pilgrimage destinations in India. It is dedicated to Sai Baba, a spiritual master, revered by both Hindu and Muslim devotees.",
        timings: "4:00 AM - 11:15 PM",
        contactInfo: "+91-2423-258500",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Sai_Baba_Samadhi_Mandir_Shirdi.jpg/1200px-Sai_Baba_Samadhi_Mandir_Shirdi.jpg",
        latitude: 19.7668,
        longitude: 74.4754
    },
    {
        name: "Sri Ranganathaswamy Temple",
        location: "Srirangam, Tamil Nadu",
        deity: "Lord Ranganatha (Vishnu)",
        description: "A Hindu temple dedicated to Ranganatha, a reclining form of the Hindu deity Maha Vishnu. It is considered the first, foremost and the most important of the 108 main Vishnu temples (Divyadesams).",
        timings: "6:00 AM - 9:00 PM",
        contactInfo: "+91-431-2432246",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sri_Ranganathaswamy_Temple%2C_Srirangam_Gopuram.jpg/1200px-Sri_Ranganathaswamy_Temple%2C_Srirangam_Gopuram.jpg",
        latitude: 10.8624,
        longitude: 78.6871
    },
    {
        name: "Mehandipur Balaji Temple",
        location: "Dausa, Rajasthan",
        deity: "Lord Hanuman",
        description: "A Hindu temple dedicated to the Hindu deity Hanuman. The name Balaji is applied to Sri Hanuman in several parts of India because the childhood form of the Lord is especially celebrated there.",
        timings: "5:30 AM - 9:00 PM",
        contactInfo: "+91-1420-221235",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Mehandipur_Balaji_Temple.jpg/1200px-Mehandipur_Balaji_Temple.jpg",
        latitude: 26.9698,
        longitude: 76.7865
    },
    {
        name: "Brihadeeswara Temple",
        location: "Thanjavur, Tamil Nadu",
        deity: "Lord Shiva",
        description: "Built by Raja Raja Chola I in 1010 AD, it is one of the largest South Indian temples and a UNESCO World Heritage Site. The massive temple tower (vimana) is 66 m tall, one of the tallest in the world. The Nandi statue at the entrance weighs 25 tonnes.",
        timings: "6:00 AM - 12:30 PM, 4:00 PM - 8:30 PM",
        contactInfo: "+91-4362-274476",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Thanjavur_Brihadeeswara_Temple.jpg/1200px-Thanjavur_Brihadeeswara_Temple.jpg",
        latitude: 10.7828,
        longitude: 79.1318
    },
    {
        name: "Dilwara Temples",
        location: "Mount Abu, Rajasthan",
        deity: "Jain Tirthankaras",
        description: "A group of Jain temples renowned for their stunning use of marble. Built between the 11th and 13th centuries, they are a masterpiece of intricate marble carvings that are considered to be among the finest in India.",
        timings: "6:00 AM - 6:00 PM",
        contactInfo: "+91-2974-238257",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Dilwara_Temple_Vimal_Vasahi_Interior.jpg/1200px-Dilwara_Temple_Vimal_Vasahi_Interior.jpg",
        latitude: 24.5992,
        longitude: 72.7750
    },
    {
        name: "Mahabodhi Temple",
        location: "Bodh Gaya, Bihar",
        deity: "Lord Buddha",
        description: "A UNESCO World Heritage Site, the Mahabodhi Temple marks the location where Siddhartha Gautama attained enlightenment under the Bodhi tree. The temple is one of the four holy sites related to the life of the Lord Buddha.",
        timings: "5:00 AM - 9:00 PM",
        contactInfo: "+91-631-2200735",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Mahabodhi_Temple%2C_Bodh_Gaya%2C_Bihar%2C_India.jpg/800px-Mahabodhi_Temple%2C_Bodh_Gaya%2C_Bihar%2C_India.jpg",
        latitude: 24.6961,
        longitude: 84.9911
    },
    {
        name: "Dwarkadhish Temple",
        location: "Dwarka, Gujarat",
        deity: "Lord Krishna",
        description: "Also known as Jagat Mandir, the temple is built on the banks of the Gomti river. It is a Char Dham pilgrimage site and one of the seven most ancient religious cities in India. The temple's 5-storey structure is supported by 72 pillars.",
        timings: "6:30 AM - 1:00 PM, 5:00 PM - 9:30 PM",
        contactInfo: "+91-2892-234003",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Dwarkadhish_Temple_-_Dwarka_-_Gujarat_-_001.jpg/1200px-Dwarkadhish_Temple_-_Dwarka_-_Gujarat_-_001.jpg",
        latitude: 22.2376,
        longitude: 68.9674
    },
    {
        name: "Lingaraj Temple",
        location: "Bhubaneswar, Odisha",
        deity: "Lord Shiva (Harihara)",
        description: "The largest temple in Bhubaneswar and one of the oldest, built in the 11th century. The temple is an epitome of Kalinga architecture. The 55-metre deula (tower) dominates the skyline of the old town.",
        timings: "5:00 AM - 9:00 PM",
        contactInfo: "+91-674-2432233",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Lingaraj_Temple_Bhubaneswar_11007.jpg/800px-Lingaraj_Temple_Bhubaneswar_11007.jpg",
        latitude: 20.2385,
        longitude: 85.8321
    },
    {
        name: "Chamundeshwari Temple",
        location: "Mysore, Karnataka",
        deity: "Goddess Chamundeshwari (Durga)",
        description: "Situated on top of the Chamundi Hills at an altitude of 1,065 m, the temple is dedicated to Goddess Chamundeshwari. It is the most famous temple in Mysore and one of the 18 Maha Shakti Peethas.",
        timings: "7:30 AM - 2:00 PM, 3:30 PM - 6:00 PM, 7:30 PM - 9:00 PM",
        contactInfo: "+91-821-2516100",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Chamundeshwari_temple_in_Mysore_Hill.jpg/1200px-Chamundeshwari_temple_in_Mysore_Hill.jpg",
        latitude: 12.2724,
        longitude: 76.6699
    },
    {
        name: "Birla Mandir",
        location: "Hyderabad, Telangana",
        deity: "Lord Venkateswara",
        description: "Also known as Birla Temple, this Hindu temple was built entirely of white Rajasthani marble on a 280 ft high hill called Naubath Pahad. The temple blends South Indian, Utkala, and Rajasthani architecture.",
        timings: "7:00 AM - 12:00 PM, 2:00 PM - 9:00 PM",
        contactInfo: "+91-40-23454814",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Birla_Mandir%2C_Hyderabad.jpg/1200px-Birla_Mandir%2C_Hyderabad.jpg",
        latitude: 17.4062,
        longitude: 78.4691
    },
    {
        name: "ISKCON Temple Bangalore",
        location: "Bangalore, Karnataka",
        deity: "Lord Krishna & Radha",
        description: "One of the largest ISKCON temples in the world. The temple complex features a blend of modern and traditional architecture with grand gopurams, intricate carvings, and state-of-the-art facilities.",
        timings: "4:15 AM - 5:15 AM, 7:15 AM - 1:00 PM, 4:00 PM - 8:20 PM",
        contactInfo: "+91-80-23471956",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/ISKCON_Temple_Bangalore.jpg/1200px-ISKCON_Temple_Bangalore.jpg",
        latitude: 13.0104,
        longitude: 77.5510
    }
];

// Generate darshan slots for the next 7 days
function generateSlots(templeId) {
    const slots = [];
    const slotTimes = [
        { startTime: "06:00", endTime: "08:00", price: 0 },
        { startTime: "08:00", endTime: "10:00", price: 100 },
        { startTime: "10:00", endTime: "12:00", price: 200 },
        { startTime: "14:00", endTime: "16:00", price: 100 },
        { startTime: "16:00", endTime: "18:00", price: 50 }
    ];

    for (let day = 0; day < 7; day++) {
        const date = new Date();
        date.setDate(date.getDate() + day);
        const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD

        for (const slot of slotTimes) {
            slots.push({
                temple: templeId,
                date: dateStr,
                startTime: slot.startTime,
                endTime: slot.endTime,
                capacity: 50,
                availableSeats: Math.floor(Math.random() * 40) + 10,
                price: slot.price,
                status: "OPEN"
            });
        }
    }
    return slots;
}

async function seed() {
    try {
        const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/darshanease";
        await connectDB(uri);
        console.log("✅ Connected to MongoDB");

        // Clear existing temples and slots
        await Temple.deleteMany({});
        await DarshanSlot.deleteMany({});
        console.log("🗑️  Cleared existing temples and slots");

        // Insert temples
        const createdTemples = await Temple.insertMany(temples);
        console.log(`🛕 Inserted ${createdTemples.length} temples`);

        // Insert slots for each temple
        let totalSlots = 0;
        for (const temple of createdTemples) {
            const slots = generateSlots(temple._id);
            await DarshanSlot.insertMany(slots);
            totalSlots += slots.length;
        }
        console.log(`📅 Inserted ${totalSlots} darshan slots`);

        console.log("\n🎉 Seeding complete! Your DarshanEase database is ready.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seeding failed:", err.message);
        process.exit(1);
    }
}

seed();

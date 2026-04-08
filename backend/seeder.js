const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Temple = require('./models/Temple');
const DarshanSlot = require('./models/DarshanSlot');
const Booking = require('./models/Booking');
const Hotel = require('./models/Hotel');
const HotelBooking = require('./models/HotelBooking');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Booking.deleteMany();
        await HotelBooking.deleteMany();
        await DarshanSlot.deleteMany();
        await Hotel.deleteMany();
        await Temple.deleteMany();
        await User.deleteMany();

        // Create Admin User
        const createdUsers = await User.create([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123',
                role: 'ADMIN',
            },
            {
                name: 'Test Organizer',
                email: 'organizer@example.com',
                password: 'password123',
                role: 'ORGANIZER',
            }
        ]);

        const adminUserId = createdUsers[0]._id;

        // Create Temples
        const temples = [
            {
                name: 'Tirupati Balaji',
                location: 'Andhra Pradesh',
                address: 'Tirumala, Tirupati, Andhra Pradesh, India',
                openingHours: '04:30 AM - 08:30 PM',
                bestTimeToVisit: 'Early morning for a peaceful darshan',
                highlights: ['Suprabhata Seva', 'Brahmotsavam', 'Vaikunta Ekadasi'],
                rating: 4.9,
                imageUrl: 'http://localhost:5174/How-to-Reach-Tirupati-Balaji-Temple.jpg',
                description: 'One of the most visited pilgrimage centers in the world. Tirumala Venkateswara Temple is a Hindu temple situated on the Tirumala hills, dedicated to Lord Venkateswara.',
                organizer: adminUserId,
            },
            {
                name: 'Kashi Vishwanath',
                location: 'Uttar Pradesh',
                address: 'Vishwanath Gali, Varanasi, UP, India',
                openingHours: '05:00 AM - 11:00 PM',
                bestTimeToVisit: 'Early morning or evening aarti',
                highlights: ['Shiva darshan', 'Holy Ganga timings', 'Sarnath nearby'],
                rating: 4.8,
                imageUrl: 'http://localhost:5174/Lord-Jagannath-Temple-Puri-matchholiday.jpg',
                description: 'Dedicated to Lord Shiva, located in Varanasi. It is one of the most famous Hindu temples and a major pilgrimage destination for devotees from across the world.',
                organizer: adminUserId,
            },
            {
                name: 'Vaishno Devi',
                location: 'Jammu & Kashmir',
                address: 'Katra, Reasi district, Jammu & Kashmir, India',
                openingHours: '06:00 AM - 10:00 PM',
                bestTimeToVisit: 'Winter season for crisp mountain views',
                highlights: ['Trikuta hills trek', 'Bhairon Ghati darshan', 'Mata ki Basti'],
                rating: 4.7,
                imageUrl: 'http://localhost:5174/Mata-Vaishno-Devi-Temple-1.webp',
                description: 'Holy shrine of Mata Vaishno Devi. The cave temple is one of the most popular pilgrimage sites for Hindus in India.',
                organizer: adminUserId,
            },
            {
                name: 'Meenakshi Amman Temple',
                location: 'Tamil Nadu',
                address: 'Madurai, Tamil Nadu, India',
                openingHours: '05:00 AM - 09:00 PM',
                bestTimeToVisit: 'Night temple lighting for architecture',
                highlights: ['South Tower', 'Pannirukavalli shrine', 'Aayiram Kaal Mandapam'],
                rating: 4.8,
                imageUrl: 'http://localhost:5174/Meenakshi_Amman_West_Tower.webp',
                description: 'A historic Hindu temple dedicated to Goddess Parvati and Lord Shiva, famous for its magnificent architecture and vibrant festivals.',
                organizer: adminUserId,
            },
            {
                name: 'Somnath Temple',
                location: 'Gujarat',
                address: 'Veraval, Saurashtra, Gujarat, India',
                openingHours: '05:00 AM - 09:00 PM',
                bestTimeToVisit: 'Sunrise by the Arabian Sea',
                highlights: ['Ocean view', 'Jyotirlinga darshan', 'Light and sound show'],
                rating: 4.6,
                imageUrl: 'http://localhost:5174/Somnath-Temple.jpg',
                description: 'The first among the twelve Jyotirlinga shrines of Lord Shiva, situated on the western coast of Gujarat.',
                organizer: adminUserId,
            },
            {
                name: 'Golden Temple',
                location: 'Punjab',
                address: 'Amritsar, Punjab, India',
                openingHours: '04:00 AM - 10:00 PM',
                bestTimeToVisit: 'Morning for langar and evening for Palki Sahib',
                highlights: ['Harmandir Sahib', 'Langar (free kitchen)', 'Palki Sahib ceremony'],
                rating: 4.9,
                imageUrl: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce',
                description: 'The holiest Sikh gurdwara, known for its stunning golden architecture and the principle of equality through langar.',
                organizer: adminUserId,
            },
            {
                name: 'Konark Sun Temple',
                location: 'Odisha',
                address: 'Konark, Puri district, Odisha, India',
                openingHours: '06:00 AM - 08:00 PM',
                bestTimeToVisit: 'Sunrise for the architectural beauty',
                highlights: ['Sun chariot wheels', 'Stone carvings', 'UNESCO World Heritage'],
                rating: 4.5,
                imageUrl: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce',
                description: 'A 13th-century temple dedicated to the Hindu sun god Surya, famous for its exquisite stone carvings and chariot design.',
                organizer: adminUserId,
            },
            {
                name: 'Ajanta Caves',
                location: 'Maharashtra',
                address: 'Ajanta, Aurangabad district, Maharashtra, India',
                openingHours: '09:00 AM - 05:30 PM',
                bestTimeToVisit: 'Winter months for pleasant weather',
                highlights: ['Buddhist cave paintings', 'UNESCO site', 'Ancient murals'],
                rating: 4.7,
                imageUrl: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce',
                description: 'Ancient Buddhist cave monasteries and worship halls, renowned for their rock-cut architecture and exquisite paintings.',
                organizer: adminUserId,
            },
            {
                name: 'Mahabodhi Temple',
                location: 'Bihar',
                address: 'Bodh Gaya, Bihar, India',
                openingHours: '05:00 AM - 09:00 PM',
                bestTimeToVisit: 'Early morning for meditation',
                highlights: ['Bodhi tree', 'Buddha statue', 'UNESCO World Heritage'],
                rating: 4.6,
                imageUrl: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce',
                description: 'The temple marks the spot where Siddhartha Gautama attained enlightenment and became the Buddha.',
                organizer: adminUserId,
            },
            {
                name: 'Ramanathaswamy Temple',
                location: 'Tamil Nadu',
                address: 'Rameswaram, Tamil Nadu, India',
                openingHours: '05:00 AM - 09:00 PM',
                bestTimeToVisit: 'Morning for peaceful darshan',
                highlights: ['Corridor of 1000 pillars', 'Sea views', 'Setu Bandhanam'],
                rating: 4.7,
                imageUrl: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce',
                description: 'One of the twelve Jyotirlinga temples, famous for its long corridor and association with the Ramayana.',
                organizer: adminUserId,
            }
        ];

        const createdTemples = await Temple.insertMany(temples);

        // Create Slots
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(futureDate.getDate() + 5);
        const dateStr = futureDate.toISOString().split('T')[0];

        await DarshanSlot.insertMany([
            {
                temple: createdTemples[0]._id,
                date: dateStr,
                time: '06:00 AM - 08:00 AM',
                poojaType: 'Suprabhata Seva',
                totalTickets: 100,
                availableTickets: 100,
            },
            {
                temple: createdTemples[0]._id,
                date: dateStr,
                time: '10:00 AM - 12:00 PM',
                poojaType: 'General Darshan',
                totalTickets: 300,
                availableTickets: 300,
            },
            {
                temple: createdTemples[1]._id,
                date: dateStr,
                time: '04:00 PM - 06:00 PM',
                poojaType: 'Evening Aarti',
                totalTickets: 50,
                availableTickets: 50,
            },
            {
                temple: createdTemples[2]._id,
                date: dateStr,
                time: '07:00 AM - 09:00 AM',
                poojaType: 'Morning Aarti',
                totalTickets: 120,
                availableTickets: 120,
            },
            {
                temple: createdTemples[3]._id,
                date: dateStr,
                time: '06:30 AM - 08:30 AM',
                poojaType: 'Mandapam Darshan',
                totalTickets: 80,
                availableTickets: 80,
            },
            {
                temple: createdTemples[4]._id,
                date: dateStr,
                time: '05:30 AM - 07:30 AM',
                poojaType: 'Sunrise Darshan',
                totalTickets: 60,
                availableTickets: 60,
            },
            {
                temple: createdTemples[5]._id,
                date: dateStr,
                time: '05:00 AM - 07:00 AM',
                poojaType: 'Morning Langar',
                totalTickets: 200,
                availableTickets: 200,
            },
            {
                temple: createdTemples[6]._id,
                date: dateStr,
                time: '06:00 AM - 08:00 AM',
                poojaType: 'Sunrise Viewing',
                totalTickets: 40,
                availableTickets: 40,
            },
            {
                temple: createdTemples[7]._id,
                date: dateStr,
                time: '09:30 AM - 11:30 AM',
                poojaType: 'Cave Exploration',
                totalTickets: 30,
                availableTickets: 30,
            },
            {
                temple: createdTemples[8]._id,
                date: dateStr,
                time: '05:30 AM - 07:30 AM',
                poojaType: 'Meditation Session',
                totalTickets: 25,
                availableTickets: 25,
            },
            {
                temple: createdTemples[9]._id,
                date: dateStr,
                time: '06:00 AM - 08:00 AM',
                poojaType: 'Corridor Darshan',
                totalTickets: 90,
                availableTickets: 90,
            }
        ]);

        // Create Hotels
        const hotels = [
            {
                name: 'Sacred Stay Resort',
                location: 'Near Tirupati',
                address: 'Tirupati Road, Tirupati, Andhra Pradesh',
                description: 'Comfortable rooms and easy access to the temple city, perfect for pilgrims and families.',
                imageUrl: 'https://images.unsplash.com/photo-1501117716987-c8e54f5d2a71',
                pricePerNight: 2500,
                availableRooms: 12,
                amenities: ['Free Wi-Fi', 'Breakfast included', 'Temple pickup', 'Hot showers'],
                rating: 4.4,
                organizer: adminUserId,
            },
            {
                name: 'Ghatside Heritage Hotel',
                location: 'Varanasi',
                address: 'Dashashwamedh Ghat, Varanasi, UP',
                description: 'A calm stay close to the river and Kashi Vishwanath, with heritage charm and modern comforts.',
                imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
                pricePerNight: 3200,
                availableRooms: 8,
                amenities: ['River view', 'Rooftop terrace', 'Yoga sessions', 'Local cuisine'],
                rating: 4.7,
                organizer: adminUserId,
            },
            {
                name: 'Himalaya Inn',
                location: 'Katra',
                address: 'Main Market, Katra, Jammu & Kashmir',
                description: 'A friendly hotel for Vaishno Devi pilgrims with cozy rooms and guided trekking support.',
                imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
                pricePerNight: 2800,
                availableRooms: 10,
                amenities: ['Free shuttle', 'Hot meals', 'Luggage storage', 'Tour help desk'],
                rating: 4.5,
                organizer: adminUserId,
            }
        ];

        await Hotel.insertMany(hotels);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Booking.deleteMany();
        await DarshanSlot.deleteMany();
        await Temple.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error destroying data: ${error.message}`);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

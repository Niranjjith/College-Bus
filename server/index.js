require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/database');
const Bus = require('./models/Bus');
const Admin = require('./models/Admin');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'nilgiri-transport-secret-key-2025';

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Initialize default admin and buses data
async function initializeData() {
  try {
    // Remove old admin if exists (migration)
    const oldAdmin = await Admin.findOne({ email: 'nilgiritransport@gmail.com' });
    if (oldAdmin) {
      await Admin.deleteOne({ email: 'nilgiritransport@gmail.com' });
      console.log('🔄 Old admin removed (migration)');
    }

    // Check if admin exists
    const adminExists = await Admin.findOne({ email: 'admintransport@gmail.com' });
    if (!adminExists) {
      const admin = new Admin({
        email: 'admintransport@gmail.com',
        password: '123456' // Will be hashed by pre-save hook
      });
      await admin.save();
      console.log('✅ Default admin created');
    }

    // Check if buses exist
    const busCount = await Bus.countDocuments();
    if (busCount === 0) {
      const initialBuses = [
        {
          busNo: 'BUS NO - 2',
          routes: [
            { route: 'Vaduvanchal', fee: 6000, timing: '8:52 AM' },
            { route: 'Thomatichal', fee: 5750, timing: '8:55 AM' },
            { route: 'Andoor', fee: 5500, timing: '9:00 AM' },
            { route: 'Manjapara', fee: 5250, timing: '9:05 AM' },
            { route: 'Ambalavayal', fee: 5000, timing: '9:10 AM' },
            { route: 'Rest House', fee: 4750, timing: '9:12 AM' },
            { route: 'Maliga School', fee: 4500, timing: '9:15 AM' },
            { route: 'Aanapaara', fee: 4250, timing: '9:17 AM' },
            { route: 'Chulliyode', fee: 3750, timing: '9:20 AM' }
          ]
        },
        {
          busNo: 'BUS NO - 4',
          routes: [
            { route: 'Pakkana', fee: 7500, timing: '7:40 AM' },
            { route: 'Puthoor vayal', fee: 7250, timing: '7:50 AM' },
            { route: 'Kunnaladi', fee: 7000, timing: '8:05 AM' },
            { route: 'Ponnani', fee: 6750, timing: '8:10 AM' },
            { route: 'Nelliyalam', fee: 6500, timing: '8:15 AM' },
            { route: 'Uppaty', fee: 6250, timing: '8:20 AM' },
            { route: 'Mango Range', fee: 5750, timing: '8:25 AM' },
            { route: 'Ealammana', fee: 5600, timing: '8:35 AM' },
            { route: 'Kollapally', fee: 5500, timing: '8:45 AM' },
            { route: 'Malavan Cherambadi', fee: 5350, timing: '8:50 AM' },
            { route: 'Ayyankolli', fee: 5250, timing: '8:55 AM' },
            { route: 'Athichal', fee: 5000, timing: '9:00 AM' },
            { route: 'Karakolly', fee: 4750, timing: '9:05 AM' },
            { route: 'Pothu Kolly', fee: 4500, timing: '9:10 AM' },
            { route: 'Kayyuni', fee: 4250, timing: '9:15 AM' },
            { route: 'Erumadu', fee: 3750, timing: '9:20 AM' }
          ]
        },
        {
          busNo: 'BUS NO - 5',
          routes: [
            { route: 'Manvayal', fee: 9200, timing: '7:30 AM' },
            { route: 'Kungoorumoola', fee: 9000, timing: '7:40 AM' },
            { route: 'Machikolli', fee: 8750, timing: '7:50 AM' },
            { route: 'Kuttimoochi', fee: 8500, timing: '8:00 AM' },
            { route: 'Ottuvayal', fee: 8250, timing: '8:05 AM' },
            { route: 'Palamvayal', fee: 8000, timing: '8:10 AM' },
            { route: 'Devan II', fee: 7750, timing: '8:15 AM' },
            { route: 'Devarshola', fee: 7500, timing: '8:20 AM' },
            { route: 'Ayyankolli', fee: 5250, timing: '9:00 AM' },
            { route: 'Neelimedu', fee: 5000, timing: '9:05 AM' },
            { route: 'Kollimedu', fee: 4750, timing: '9:10 AM' },
            { route: 'Mangode', fee: 4500, timing: '9:15 AM' },
            { route: 'Thiruvambadi', fee: 4250, timing: '9:20 AM' },
            { route: 'Vettuvadi', fee: 4000, timing: '9:25 AM' }
          ]
        },
        {
          busNo: 'BUS NO - 6',
          routes: [
            { route: 'Padinjanthara', fee: 12100, timing: '7:45 AM' },
            { route: 'Chennalode', fee: 11500, timing: '7:50 AM' },
            { route: 'Kavummanam', fee: 10900, timing: '7:55 AM' },
            { route: 'Pinangode H S', fee: 10500, timing: '8:00 AM' },
            { route: 'Pinangode Town', fee: 10000, timing: '8:05 AM' },
            { route: 'Vengapalli', fee: 9750, timing: '8:08 AM' },
            { route: 'Fathima', fee: 9000, timing: '8:10 AM' },
            { route: 'Kalpatta', fee: 8500, timing: '8:25 AM' },
            { route: 'Kainatty', fee: 8250, timing: '8:30 AM' },
            { route: 'Muttil', fee: 7750, timing: '8:35 AM' },
            { route: 'Kakavayal', fee: 7250, timing: '8:40 AM' },
            { route: 'Meenagadi', fee: 6750, timing: '8:45 AM' },
            { route: 'Kumbalery', fee: 6250, timing: '8:50 AM' },
            { route: 'Ayiramkolly', fee: 5750, timing: '8:55 AM' },
            { route: 'Ambalavayal', fee: 5000, timing: '9:10 AM' },
            { route: 'Rest House', fee: 4750, timing: '9:12 AM' },
            { route: 'Malinga School', fee: 4500, timing: '9:15 AM' },
            { route: 'Anappara', fee: 4250, timing: '9:20 AM' },
            { route: 'Chulliyode', fee: 4000, timing: '9:25 AM' }
          ]
        },
        {
          busNo: 'BUS NO - 7',
          routes: [
            { route: 'Kappan Kolli', fee: 8250, timing: '8:10 AM' },
            { route: 'Meppadi Town', fee: 8000, timing: '8:30 AM' },
            { route: 'Moopanad', fee: 7750, timing: '8:35 AM' },
            { route: 'arapatta', fee: 7500, timing: '8:40 AM' },
            { route: 'Rippon', fee: 7250, timing: '8:45 AM' },
            { route: 'Nedum Karana', fee: 7000, timing: '8:47 AM' },
            { route: 'Puthiyapadi', fee: 6750, timing: '8:48 AM' },
            { route: 'Paadivayl', fee: 6500, timing: '8:49 AM' },
            { route: 'Vattathu vayal', fee: 6250, timing: '8:50 AM' }
          ]
        },
        {
          busNo: 'BUS NO - 8',
          routes: [
            { route: 'Kolagapara', fee: 6000, timing: '8:45 AM' },
            { route: 'Beenachi', fee: 5750, timing: '8:55 AM' },
            { route: 'Bathery', fee: 5250, timing: '9:00 AM' },
            { route: 'Ammaipalam', fee: 5000, timing: '9:05 AM' },
            { route: 'koliyadi', fee: 4750, timing: '9:10 AM' },
            { route: 'Madakkara', fee: 4500, timing: '9:15 AM' },
            { route: 'Chulliyode', fee: 4000, timing: '9:20 AM' }
          ]
        },
        {
          busNo: 'BUS NO - 10',
          routes: [
            { route: '9th Mile', fee: 7500, timing: '8:15 AM' },
            { route: 'Nellakota', fee: 7250, timing: '8:20 AM' },
            { route: 'Susan Padi', fee: 6750, timing: '8:30 AM' },
            { route: 'Bithirkad', fee: 6250, timing: '8:35 AM' },
            { route: 'Pattavayal', fee: 6000, timing: '8:40 AM' },
            { route: 'Vellari', fee: 5750, timing: '8:50 AM' },
            { route: 'Ambalavayal', fee: 5500, timing: '8:55 AM' },
            { route: 'Ayyankolli', fee: 5250, timing: '9:00 AM' },
            { route: 'Kallichal', fee: 4500, timing: '9:00 AM' },
            { route: 'MAdhamangalam', fee: 4250, timing: '9:05 AM' },
            { route: 'School Junction', fee: 3750, timing: '9:10 AM' }
          ]
        },
        {
          busNo: 'BUS NO - 11',
          routes: [
            { route: 'Gudalur', fee: 9000, timing: '7:30 AM' },
            { route: 'Chembala', fee: 8750, timing: '7:40 AM' },
            { route: 'Kozhipallam', fee: 8500, timing: '7:50 AM' },
            { route: 'Marapallam', fee: 8250, timing: '7:55 AM' },
            { route: 'Aamikulam', fee: 7750, timing: '8:00 AM' },
            { route: 'Nadukani', fee: 7500, timing: '8:05 AM' }
          ]
        },
        {
          busNo: 'BUS NO - 12',
          routes: [
            { route: 'Devala', fee: 6750, timing: '8:25 AM' },
            { route: 'Pandalur', fee: 6500, timing: '8:45 AM' },
            { route: 'Mango Range', fee: 5500, timing: '8:50 AM' },
            { route: 'Chetangode', fee: 5000, timing: '8:55 AM' },
            { route: 'Gols Land', fee: 4750, timing: '9:00 AM' },
            { route: 'Cherambadi', fee: 4500, timing: '9:15 AM' },
            { route: 'Kayyuni', fee: 4250, timing: '9:25 AM' },
            { route: 'Erumad', fee: 3750, timing: '9:30 AM' }
          ]
        },
        {
          busNo: 'BUS NO - 13',
          routes: [
            { route: 'Vellamunda', fee: 13500, timing: '7:30 AM' },
            { route: '8/4', fee: 13250, timing: '7:35 AM' },
            { route: '7/4', fee: 12750, timing: '7:40 AM' },
            { route: 'Tharuvana', fee: 12250, timing: '7:45 AM' },
            { route: 'Peechangode', fee: 11750, timing: '7:50 AM' },
            { route: '4th Mile', fee: 10750, timing: '7:55 AM' },
            { route: '5th Mile', fee: 10500, timing: '7:58 AM' },
            { route: 'Koolivayal', fee: 9750, timing: '8:10 AM' },
            { route: 'Kaidakkal', fee: 9500, timing: '8:15 AM' },
            { route: 'Panamaram', fee: 9250, timing: '8:20 AM' }
          ]
        },
        {
          busNo: 'BUS NO - 14',
          routes: [
            { route: 'Gudalur', fee: 9000, timing: '7:40 AM' },
            { route: '1st Mile', fee: 8750, timing: '7:40 AM' },
            { route: '2nd Mile', fee: 8500, timing: '7:40 AM' },
            { route: '3rd Mile', fee: 8250, timing: '7:40 AM' },
            { route: '4th Mile', fee: 8000, timing: '7:40 AM' },
            { route: 'Padanthorai', fee: 7750, timing: '7:40 AM' },
            { route: 'Post Office', fee: 7500, timing: '7:40 AM' }
          ]
        },
        {
          busNo: 'BUS NO - 15',
          routes: [
            { route: 'Panamaram', fee: 9250, timing: '7:45 AM' },
            { route: 'Pachilakkad', fee: 8750, timing: '7:45 AM' },
            { route: 'Millumukku', fee: 9500, timing: '7:45 AM' },
            { route: 'Kaniyampatta', fee: 9400, timing: '7:45 AM' },
            { route: 'Pallimukku', fee: 9200, timing: '7:45 AM' },
            { route: 'Kambalakkad', fee: 9000, timing: '7:45 AM' },
            { route: 'Madakkimala', fee: 8750, timing: '7:45 AM' },
            { route: 'Puliyar Mala', fee: 8500, timing: '7:45 AM' },
            { route: 'Kainatty', fee: 8250, timing: '7:45 AM' },
            { route: 'Muttil', fee: 7750, timing: '7:45 AM' },
            { route: 'Kakka Vayal', fee: 7250, timing: '7:45 AM' },
            { route: 'Meenagadi', fee: 6750, timing: '7:45 AM' },
            { route: 'Krishnagiri', fee: 6500, timing: '7:45 AM' },
            { route: 'KOllagapara', fee: 6000, timing: '7:45 AM' },
            { route: 'Kuppamudi', fee: 5850, timing: '7:45 AM' },
            { route: 'Ayiramkolly', fee: 5750, timing: '7:45 AM' },
            { route: 'Ambalavayal', fee: 5000, timing: '7:45 AM' }
          ]
        },
        {
          busNo: 'BUS NO - 16',
          routes: [
            { route: 'Santhi Nagar', fee: 13000, timing: '7:20 AM' },
            { route: 'Manandavai', fee: 12750, timing: '7:25 AM' },
            { route: 'Paayode', fee: 12250, timing: '7:30 AM' },
            { route: 'Thonichal', fee: 11750, timing: '7:35 AM' },
            { route: 'Duwaraka', fee: 11000, timing: '7:40 AM' },
            { route: '4th Mile', fee: 10750, timing: '7:45 AM' },
            { route: '5th Mile', fee: 10500, timing: '7:50 AM' },
            { route: 'Koolivayal', fee: 9750, timing: '7:55 AM' },
            { route: 'Panamaram', fee: 9250, timing: '8:05 AM' },
            { route: 'Pachilakkad', fee: 8750, timing: '8:10 AM' },
            { route: 'Varadoor', fee: 8500, timing: '8:15 AM' },
            { route: 'Karani', fee: 8000, timing: '8:20 AM' },
            { route: 'Kariyam Padi', fee: 7500, timing: '8:30 AM' },
            { route: 'Palakkamoola', fee: 7250, timing: '8:35 AM' },
            { route: 'Chendakkuni', fee: 7000, timing: '8:40 AM' },
            { route: 'Meenagadi', fee: 6750, timing: '8:45 AM' },
            { route: 'Kumbalery', fee: 6250, timing: '8:50 AM' },
            { route: 'Ayiramkolly', fee: 5750, timing: '8:55 AM' },
            { route: 'College', fee: 0, timing: '9:20 AM' }
          ]
        }
      ];

      await Bus.insertMany(initialBuses);
      console.log('✅ Initial buses data migrated to MongoDB');
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

// Initialize data after a short delay to ensure DB connection
setTimeout(initializeData, 2000);

// ============ AUTH ROUTES ============
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    
    // Ensure admin exists (fallback if initialization hasn't run)
    let admin = await Admin.findOne({ email: normalizedEmail });
    
    if (!admin && normalizedEmail === 'admintransport@gmail.com') {
      // Create admin if it doesn't exist (for the correct email)
      try {
        admin = new Admin({
          email: 'admintransport@gmail.com',
          password: '123456'
        });
        await admin.save();
        console.log('✅ Admin created during login (fallback)');
      } catch (createError) {
        console.error('Error creating admin during login:', createError);
      }
    }
    
    if (!admin) {
      console.log(`Login attempt failed: Admin not found for email: ${normalizedEmail}`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValid = await admin.comparePassword(password);
    
    if (!isValid) {
      console.log(`Login attempt failed: Invalid password for email: ${normalizedEmail}`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: admin.email }, JWT_SECRET, { expiresIn: '24h' });
    console.log(`✅ Successful login for: ${admin.email}`);
    res.json({ token, email: admin.email });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Utility route to create/reset admin (for debugging - remove in production)
app.post('/api/admin/reset', async (req, res) => {
  try {
    // Remove old admin if exists
    await Admin.deleteOne({ email: 'nilgiritransport@gmail.com' });
    
    // Remove existing admin with new email
    await Admin.deleteOne({ email: 'admintransport@gmail.com' });
    
    // Create new admin
    const admin = new Admin({
      email: 'admintransport@gmail.com',
      password: '123456'
    });
    await admin.save();
    
    console.log('✅ Admin reset successfully');
    res.json({ message: 'Admin reset successfully', email: admin.email });
  } catch (error) {
    console.error('Error resetting admin:', error);
    res.status(500).json({ error: 'Failed to reset admin' });
  }
});

// ============ BUS ROUTES ============
app.get('/api/buses', async (req, res) => {
  try {
    const buses = await Bus.find().sort({ busNo: 1 });
    res.json(buses);
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/buses/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.json(bus);
  } catch (error) {
    console.error('Error fetching bus:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes - require authentication
app.post('/api/admin/buses', authenticateToken, async (req, res) => {
  try {
    const { busNo, routes } = req.body;
    
    if (!busNo) {
      return res.status(400).json({ error: 'Bus number is required' });
    }

    const newBus = new Bus({
      busNo,
      routes: routes || []
    });

    await newBus.save();
    res.status(201).json(newBus);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Bus number already exists' });
    }
    console.error('Error creating bus:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/admin/buses/:id', authenticateToken, async (req, res) => {
  try {
    const { busNo, routes } = req.body;
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    if (busNo) bus.busNo = busNo;
    if (routes) bus.routes = routes;

    await bus.save();
    res.json(bus);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Bus number already exists' });
    }
    console.error('Error updating bus:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/admin/buses/:id', authenticateToken, async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    console.error('Error deleting bus:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route management within buses
app.post('/api/admin/buses/:busId/routes', authenticateToken, async (req, res) => {
  try {
    const { route, fee, timing } = req.body;
    const bus = await Bus.findById(req.params.busId);

    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    if (!route || fee === undefined || !timing) {
      return res.status(400).json({ error: 'Route, fee, and timing are required' });
    }

    bus.routes.push({ route, fee: parseInt(fee), timing });
    await bus.save();
    
    res.status(201).json(bus.routes[bus.routes.length - 1]);
  } catch (error) {
    console.error('Error adding route:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/admin/buses/:busId/routes/:routeId', authenticateToken, async (req, res) => {
  try {
    const { route, fee, timing } = req.body;
    const bus = await Bus.findById(req.params.busId);

    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    const routeItem = bus.routes.id(req.params.routeId);
    if (!routeItem) {
      return res.status(404).json({ error: 'Route not found' });
    }

    if (route) routeItem.route = route;
    if (fee !== undefined) routeItem.fee = parseInt(fee);
    if (timing) routeItem.timing = timing;

    await bus.save();
    res.json(routeItem);
  } catch (error) {
    console.error('Error updating route:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/admin/buses/:busId/routes/:routeId', authenticateToken, async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.busId);

    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    const routeItem = bus.routes.id(req.params.routeId);
    if (!routeItem) {
      return res.status(404).json({ error: 'Route not found' });
    }

    routeItem.remove();
    await bus.save();
    
    res.json({ message: 'Route deleted successfully' });
  } catch (error) {
    console.error('Error deleting route:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'College Bus Transport API is running',
    status: 'OK',
    version: '1.0.0',
    endpoints: {
      buses: '/api/buses',
      admin: '/api/admin/login',
      health: '/'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

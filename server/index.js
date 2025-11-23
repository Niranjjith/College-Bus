const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'nilgiri-transport-secret-key-2025';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data file path
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
async function initializeData() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    const initialData = {
      admin: {
        email: 'nilgiritransport@gmail.com',
        password: await bcrypt.hash('123456', 10)
      },
      buses: [
        {
          id: 1,
          busNo: 'BUS NO - 2',
          routes: [
            { id: 1, route: 'Vaduvanchal', fee: 6000, timing: '8:52 AM' },
            { id: 2, route: 'Thomatichal', fee: 5750, timing: '8:55 AM' },
            { id: 3, route: 'Andoor', fee: 5500, timing: '9:00 AM' },
            { id: 4, route: 'Manjapara', fee: 5250, timing: '9:05 AM' },
            { id: 5, route: 'Ambalavayal', fee: 5000, timing: '9:10 AM' },
            { id: 6, route: 'Rest House', fee: 4750, timing: '9:12 AM' },
            { id: 7, route: 'Maliga School', fee: 4500, timing: '9:15 AM' },
            { id: 8, route: 'Aanapaara', fee: 4250, timing: '9:17 AM' },
            { id: 9, route: 'Chulliyode', fee: 3750, timing: '9:20 AM' }
          ]
        },
        {
          id: 2,
          busNo: 'BUS NO - 4',
          routes: [
            { id: 10, route: 'Pakkana', fee: 7500, timing: '7:40 AM' },
            { id: 11, route: 'Puthoor vayal', fee: 7250, timing: '7:50 AM' },
            { id: 12, route: 'Kunnaladi', fee: 7000, timing: '8:05 AM' },
            { id: 13, route: 'Ponnani', fee: 6750, timing: '8:10 AM' },
            { id: 14, route: 'Nelliyalam', fee: 6500, timing: '8:15 AM' },
            { id: 15, route: 'Uppaty', fee: 6250, timing: '8:20 AM' },
            { id: 16, route: 'Mango Range', fee: 5750, timing: '8:25 AM' },
            { id: 17, route: 'Ealammana', fee: 5600, timing: '8:35 AM' },
            { id: 18, route: 'Kollapally', fee: 5500, timing: '8:45 AM' },
            { id: 19, route: 'Malavan Cherambadi', fee: 5350, timing: '8:50 AM' },
            { id: 20, route: 'Ayyankolli', fee: 5250, timing: '8:55 AM' },
            { id: 21, route: 'Athichal', fee: 5000, timing: '9:00 AM' },
            { id: 22, route: 'Karakolly', fee: 4750, timing: '9:05 AM' },
            { id: 23, route: 'Pothu Kolly', fee: 4500, timing: '9:10 AM' },
            { id: 24, route: 'Kayyuni', fee: 4250, timing: '9:15 AM' },
            { id: 25, route: 'Erumadu', fee: 3750, timing: '9:20 AM' }
          ]
        },
        {
          id: 3,
          busNo: 'BUS NO - 5',
          routes: [
            { id: 26, route: 'Manvayal', fee: 9200, timing: '7:30 AM' },
            { id: 27, route: 'Kungoorumoola', fee: 9000, timing: '7:40 AM' },
            { id: 28, route: 'Machikolli', fee: 8750, timing: '7:50 AM' },
            { id: 29, route: 'Kuttimoochi', fee: 8500, timing: '8:00 AM' },
            { id: 30, route: 'Ottuvayal', fee: 8250, timing: '8:05 AM' },
            { id: 31, route: 'Palamvayal', fee: 8000, timing: '8:10 AM' },
            { id: 32, route: 'Devan II', fee: 7750, timing: '8:15 AM' },
            { id: 33, route: 'Devarshola', fee: 7500, timing: '8:20 AM' },
            { id: 34, route: 'Ayyankolli', fee: 5250, timing: '9:00 AM' },
            { id: 35, route: 'Neelimedu', fee: 5000, timing: '9:05 AM' },
            { id: 36, route: 'Kollimedu', fee: 4750, timing: '9:10 AM' },
            { id: 37, route: 'Mangode', fee: 4500, timing: '9:15 AM' },
            { id: 38, route: 'Thiruvambadi', fee: 4250, timing: '9:20 AM' },
            { id: 39, route: 'Vettuvadi', fee: 4000, timing: '9:25 AM' }
          ]
        },
        {
          id: 4,
          busNo: 'BUS NO - 6',
          routes: [
            { id: 40, route: 'Padinjanthara', fee: 12100, timing: '7:45 AM' },
            { id: 41, route: 'Chennalode', fee: 11500, timing: '7:50 AM' },
            { id: 42, route: 'Kavummanam', fee: 10900, timing: '7:55 AM' },
            { id: 43, route: 'Pinangode H S', fee: 10500, timing: '8:00 AM' },
            { id: 44, route: 'Pinangode Town', fee: 10000, timing: '8:05 AM' },
            { id: 45, route: 'Vengapalli', fee: 9750, timing: '8:08 AM' },
            { id: 46, route: 'Fathima', fee: 9000, timing: '8:10 AM' },
            { id: 47, route: 'Kalpatta', fee: 8500, timing: '8:25 AM' },
            { id: 48, route: 'Kainatty', fee: 8250, timing: '8:30 AM' },
            { id: 49, route: 'Muttil', fee: 7750, timing: '8:35 AM' },
            { id: 50, route: 'Kakavayal', fee: 7250, timing: '8:40 AM' },
            { id: 51, route: 'Meenagadi', fee: 6750, timing: '8:45 AM' },
            { id: 52, route: 'Kumbalery', fee: 6250, timing: '8:50 AM' },
            { id: 53, route: 'Ayiramkolly', fee: 5750, timing: '8:55 AM' },
            { id: 54, route: 'Ambalavayal', fee: 5000, timing: '9:10 AM' },
            { id: 55, route: 'Rest House', fee: 4750, timing: '9:12 AM' },
            { id: 56, route: 'Malinga School', fee: 4500, timing: '9:15 AM' },
            { id: 57, route: 'Anappara', fee: 4250, timing: '9:20 AM' },
            { id: 58, route: 'Chulliyode', fee: 4000, timing: '9:25 AM' }
          ]
        },
        {
          id: 5,
          busNo: 'BUS NO - 7',
          routes: [
            { id: 59, route: 'Kappan Kolli', fee: 8250, timing: '8:10 AM' },
            { id: 60, route: 'Meppadi Town', fee: 8000, timing: '8:30 AM' },
            { id: 61, route: 'Moopanad', fee: 7750, timing: '8:35 AM' },
            { id: 62, route: 'arapatta', fee: 7500, timing: '8:40 AM' },
            { id: 63, route: 'Rippon', fee: 7250, timing: '8:45 AM' },
            { id: 64, route: 'Nedum Karana', fee: 7000, timing: '8:47 AM' },
            { id: 65, route: 'Puthiyapadi', fee: 6750, timing: '8:48 AM' },
            { id: 66, route: 'Paadivayl', fee: 6500, timing: '8:49 AM' },
            { id: 67, route: 'Vattathu vayal', fee: 6250, timing: '8:50 AM' }
          ]
        },
        {
          id: 6,
          busNo: 'BUS NO - 8',
          routes: [
            { id: 68, route: 'Kolagapara', fee: 6000, timing: '8:45 AM' },
            { id: 69, route: 'Beenachi', fee: 5750, timing: '8:55 AM' },
            { id: 70, route: 'Bathery', fee: 5250, timing: '9:00 AM' },
            { id: 71, route: 'Ammaipalam', fee: 5000, timing: '9:05 AM' },
            { id: 72, route: 'koliyadi', fee: 4750, timing: '9:10 AM' },
            { id: 73, route: 'Madakkara', fee: 4500, timing: '9:15 AM' },
            { id: 74, route: 'Chulliyode', fee: 4000, timing: '9:20 AM' }
          ]
        },
        {
          id: 7,
          busNo: 'BUS NO - 10',
          routes: [
            { id: 75, route: '9th Mile', fee: 7500, timing: '8:15 AM' },
            { id: 76, route: 'Nellakota', fee: 7250, timing: '8:20 AM' },
            { id: 77, route: 'Susan Padi', fee: 6750, timing: '8:30 AM' },
            { id: 78, route: 'Bithirkad', fee: 6250, timing: '8:35 AM' },
            { id: 79, route: 'Pattavayal', fee: 6000, timing: '8:40 AM' },
            { id: 80, route: 'Vellari', fee: 5750, timing: '8:50 AM' },
            { id: 81, route: 'Ambalavayal', fee: 5500, timing: '8:55 AM' },
            { id: 82, route: 'Ayyankolli', fee: 5250, timing: '9:00 AM' },
            { id: 83, route: 'Kallichal', fee: 4500, timing: '9:00 AM' },
            { id: 84, route: 'MAdhamangalam', fee: 4250, timing: '9:05 AM' },
            { id: 85, route: 'School Junction', fee: 3750, timing: '9:10 AM' }
          ]
        },
        {
          id: 8,
          busNo: 'BUS NO - 11',
          routes: [
            { id: 86, route: 'Gudalur', fee: 9000, timing: '7:30 AM' },
            { id: 87, route: 'Chembala', fee: 8750, timing: '7:40 AM' },
            { id: 88, route: 'Kozhipallam', fee: 8500, timing: '7:50 AM' },
            { id: 89, route: 'Marapallam', fee: 8250, timing: '7:55 AM' },
            { id: 90, route: 'Aamikulam', fee: 7750, timing: '8:00 AM' },
            { id: 91, route: 'Nadukani', fee: 7500, timing: '8:05 AM' }
          ]
        },
        {
          id: 9,
          busNo: 'BUS NO - 12',
          routes: [
            { id: 92, route: 'Devala', fee: 6750, timing: '8:25 AM' },
            { id: 93, route: 'Pandalur', fee: 6500, timing: '8:45 AM' },
            { id: 94, route: 'Mango Range', fee: 5500, timing: '8:50 AM' },
            { id: 95, route: 'Chetangode', fee: 5000, timing: '8:55 AM' },
            { id: 96, route: 'Gols Land', fee: 4750, timing: '9:00 AM' },
            { id: 97, route: 'Cherambadi', fee: 4500, timing: '9:15 AM' },
            { id: 98, route: 'Kayyuni', fee: 4250, timing: '9:25 AM' },
            { id: 99, route: 'Erumad', fee: 3750, timing: '9:30 AM' }
          ]
        },
        {
          id: 10,
          busNo: 'BUS NO - 13',
          routes: [
            { id: 100, route: 'Vellamunda', fee: 13500, timing: '7:30 AM' },
            { id: 101, route: '8/4', fee: 13250, timing: '7:35 AM' },
            { id: 102, route: '7/4', fee: 12750, timing: '7:40 AM' },
            { id: 103, route: 'Tharuvana', fee: 12250, timing: '7:45 AM' },
            { id: 104, route: 'Peechangode', fee: 11750, timing: '7:50 AM' },
            { id: 105, route: '4th Mile', fee: 10750, timing: '7:55 AM' },
            { id: 106, route: '5th Mile', fee: 10500, timing: '7:58 AM' },
            { id: 107, route: 'Koolivayal', fee: 9750, timing: '8:10 AM' },
            { id: 108, route: 'Kaidakkal', fee: 9500, timing: '8:15 AM' },
            { id: 109, route: 'Panamaram', fee: 9250, timing: '8:20 AM' }
          ]
        },
        {
          id: 11,
          busNo: 'BUS NO - 14',
          routes: [
            { id: 110, route: 'Gudalur', fee: 9000, timing: '7:40 AM' },
            { id: 111, route: '1st Mile', fee: 8750, timing: '7:40 AM' },
            { id: 112, route: '2nd Mile', fee: 8500, timing: '7:40 AM' },
            { id: 113, route: '3rd Mile', fee: 8250, timing: '7:40 AM' },
            { id: 114, route: '4th Mile', fee: 8000, timing: '7:40 AM' },
            { id: 115, route: 'Padanthorai', fee: 7750, timing: '7:40 AM' },
            { id: 116, route: 'Post Office', fee: 7500, timing: '7:40 AM' }
          ]
        },
        {
          id: 12,
          busNo: 'BUS NO - 15',
          routes: [
            { id: 117, route: 'Panamaram', fee: 9250, timing: '7:45 AM' },
            { id: 118, route: 'Pachilakkad', fee: 8750, timing: '7:45 AM' },
            { id: 119, route: 'Millumukku', fee: 9500, timing: '7:45 AM' },
            { id: 120, route: 'Kaniyampatta', fee: 9400, timing: '7:45 AM' },
            { id: 121, route: 'Pallimukku', fee: 9200, timing: '7:45 AM' },
            { id: 122, route: 'Kambalakkad', fee: 9000, timing: '7:45 AM' },
            { id: 123, route: 'Madakkimala', fee: 8750, timing: '7:45 AM' },
            { id: 124, route: 'Puliyar Mala', fee: 8500, timing: '7:45 AM' },
            { id: 125, route: 'Kainatty', fee: 8250, timing: '7:45 AM' },
            { id: 126, route: 'Muttil', fee: 7750, timing: '7:45 AM' },
            { id: 127, route: 'Kakka Vayal', fee: 7250, timing: '7:45 AM' },
            { id: 128, route: 'Meenagadi', fee: 6750, timing: '7:45 AM' },
            { id: 129, route: 'Krishnagiri', fee: 6500, timing: '7:45 AM' },
            { id: 130, route: 'KOllagapara', fee: 6000, timing: '7:45 AM' },
            { id: 131, route: 'Kuppamudi', fee: 5850, timing: '7:45 AM' },
            { id: 132, route: 'Ayiramkolly', fee: 5750, timing: '7:45 AM' },
            { id: 133, route: 'Ambalavayal', fee: 5000, timing: '7:45 AM' }
          ]
        },
        {
          id: 13,
          busNo: 'BUS NO - 16',
          routes: [
            { id: 134, route: 'Santhi Nagar', fee: 13000, timing: '7:20 AM' },
            { id: 135, route: 'Manandavai', fee: 12750, timing: '7:25 AM' },
            { id: 136, route: 'Paayode', fee: 12250, timing: '7:30 AM' },
            { id: 137, route: 'Thonichal', fee: 11750, timing: '7:35 AM' },
            { id: 138, route: 'Duwaraka', fee: 11000, timing: '7:40 AM' },
            { id: 139, route: '4th Mile', fee: 10750, timing: '7:45 AM' },
            { id: 140, route: '5th Mile', fee: 10500, timing: '7:50 AM' },
            { id: 141, route: 'Koolivayal', fee: 9750, timing: '7:55 AM' },
            { id: 142, route: 'Panamaram', fee: 9250, timing: '8:05 AM' },
            { id: 143, route: 'Pachilakkad', fee: 8750, timing: '8:10 AM' },
            { id: 144, route: 'Varadoor', fee: 8500, timing: '8:15 AM' },
            { id: 145, route: 'Karani', fee: 8000, timing: '8:20 AM' },
            { id: 146, route: 'Kariyam Padi', fee: 7500, timing: '8:30 AM' },
            { id: 147, route: 'Palakkamoola', fee: 7250, timing: '8:35 AM' },
            { id: 148, route: 'Chendakkuni', fee: 7000, timing: '8:40 AM' },
            { id: 149, route: 'Meenagadi', fee: 6750, timing: '8:45 AM' },
            { id: 150, route: 'Kumbalery', fee: 6250, timing: '8:50 AM' },
            { id: 151, route: 'Ayiramkolly', fee: 5750, timing: '8:55 AM' },
            { id: 152, route: 'College', fee: 0, timing: '9:20 AM' }
          ]
        }
      ],
      helpdesk: [],
      lostFound: [
        { id: 1, item: 'Water Bottle', location: 'Kolapally Bus', date: '02-Nov-2025', status: 'Lost', reportedBy: 'Rahul P', email: 'rahul@example.com', verified: false },
        { id: 2, item: 'Umbrella', location: 'Kalpetta Stop', date: '01-Nov-2025', status: 'Found', reportedBy: 'Office', email: 'office@nilgiri.edu', verified: true },
        { id: 3, item: 'ID Card', location: 'Kuppadi Bus', date: '30-Oct-2025', status: 'Lost', reportedBy: 'Anju M', email: 'anju@example.com', verified: false },
        { id: 4, item: 'Notebook', location: 'Panamaram Bus', date: '28-Oct-2025', status: 'Found', reportedBy: 'Driver Rajesh', email: 'rajesh@example.com', verified: true },
        { id: 5, item: 'Earphones', location: 'Kambalakkad', date: '27-Oct-2025', status: 'Lost', reportedBy: 'Niyas V', email: 'niyas@example.com', verified: false }
      ]
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Read data from file
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
}

// Write data to file
async function writeData(data) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
}

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

// Initialize data on startup
initializeData();

// ============ AUTH ROUTES ============
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await readData();

    if (!data || !data.admin) {
      return res.status(500).json({ error: 'Server error' });
    }

    if (email !== data.admin.email) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, data.admin.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: data.admin.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, email: data.admin.email });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ============ BUS ROUTES ============
app.get('/api/buses', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.buses || []);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/buses/:id', async (req, res) => {
  try {
    const data = await readData();
    const bus = data.buses.find(b => b.id === parseInt(req.params.id));
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes - require authentication
app.post('/api/admin/buses', authenticateToken, async (req, res) => {
  try {
    const { busNo, routes } = req.body;
    const data = await readData();

    const newId = Math.max(...data.buses.map(b => b.id), 0) + 1;
    const newBus = {
      id: newId,
      busNo,
      routes: routes || []
    };

    data.buses.push(newBus);
    await writeData(data);
    res.json(newBus);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/admin/buses/:id', authenticateToken, async (req, res) => {
  try {
    const { busNo, routes } = req.body;
    const data = await readData();
    const busIndex = data.buses.findIndex(b => b.id === parseInt(req.params.id));

    if (busIndex === -1) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    data.buses[busIndex] = {
      ...data.buses[busIndex],
      busNo: busNo || data.buses[busIndex].busNo,
      routes: routes || data.buses[busIndex].routes
    };

    await writeData(data);
    res.json(data.buses[busIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/admin/buses/:id', authenticateToken, async (req, res) => {
  try {
    const data = await readData();
    const busIndex = data.buses.findIndex(b => b.id === parseInt(req.params.id));

    if (busIndex === -1) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    data.buses.splice(busIndex, 1);
    await writeData(data);
    res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route management within buses
app.post('/api/admin/buses/:busId/routes', authenticateToken, async (req, res) => {
  try {
    const { route, fee, timing } = req.body;
    const data = await readData();
    const bus = data.buses.find(b => b.id === parseInt(req.params.busId));

    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    const newRouteId = Math.max(...bus.routes.map(r => r.id), 0) + 1;
    const newRoute = { id: newRouteId, route, fee: parseInt(fee), timing };
    bus.routes.push(newRoute);

    await writeData(data);
    res.json(newRoute);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/admin/buses/:busId/routes/:routeId', authenticateToken, async (req, res) => {
  try {
    const { route, fee, timing } = req.body;
    const data = await readData();
    const bus = data.buses.find(b => b.id === parseInt(req.params.busId));

    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    const routeIndex = bus.routes.findIndex(r => r.id === parseInt(req.params.routeId));
    if (routeIndex === -1) {
      return res.status(404).json({ error: 'Route not found' });
    }

    bus.routes[routeIndex] = {
      ...bus.routes[routeIndex],
      route: route || bus.routes[routeIndex].route,
      fee: fee !== undefined ? parseInt(fee) : bus.routes[routeIndex].fee,
      timing: timing || bus.routes[routeIndex].timing
    };

    await writeData(data);
    res.json(bus.routes[routeIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/admin/buses/:busId/routes/:routeId', authenticateToken, async (req, res) => {
  try {
    const data = await readData();
    const bus = data.buses.find(b => b.id === parseInt(req.params.busId));

    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    const routeIndex = bus.routes.findIndex(r => r.id === parseInt(req.params.routeId));
    if (routeIndex === -1) {
      return res.status(404).json({ error: 'Route not found' });
    }

    bus.routes.splice(routeIndex, 1);
    await writeData(data);
    res.json({ message: 'Route deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ============ HELPDESK ROUTES ============
app.get('/api/helpdesk', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.helpdesk || []);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/helpdesk', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const data = await readData();

    const newTicket = {
      id: Math.max(...(data.helpdesk || []).map(h => h.id), 0) + 1,
      name,
      email,
      subject,
      message,
      date: new Date().toISOString(),
      status: 'Open'
    };

    data.helpdesk = data.helpdesk || [];
    data.helpdesk.push(newTicket);
    await writeData(data);
    res.json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ============ LOST & FOUND ROUTES ============
app.get('/api/lost-found', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.lostFound || []);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/lost-found', async (req, res) => {
  try {
    const { name, email, status, item, location, details } = req.body;
    const data = await readData();

    const newItem = {
      id: Math.max(...(data.lostFound || []).map(l => l.id), 0) + 1,
      item,
      location,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status,
      reportedBy: name,
      email,
      details,
      verified: false
    };

    data.lostFound = data.lostFound || [];
    data.lostFound.push(newItem);
    await writeData(data);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes for Lost & Found
app.put('/api/admin/lost-found/:id', authenticateToken, async (req, res) => {
  try {
    const { status, verified } = req.body;
    const data = await readData();
    const itemIndex = data.lostFound.findIndex(item => item.id === parseInt(req.params.id));

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (status !== undefined) {
      data.lostFound[itemIndex].status = status;
    }
    if (verified !== undefined) {
      data.lostFound[itemIndex].verified = verified;
    }

    await writeData(data);
    res.json(data.lostFound[itemIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/admin/lost-found/:id', authenticateToken, async (req, res) => {
  try {
    const data = await readData();
    const itemIndex = data.lostFound.findIndex(item => item.id === parseInt(req.params.id));

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    data.lostFound.splice(itemIndex, 1);
    await writeData(data);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


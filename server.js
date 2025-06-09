const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB

mongoose.connect("mongodb+srv://admin:96PRJbcdhlMvOTT1@cs05.f73i7rp.mongodb.net/courseVoting?retryWrites=true&w=majority&appName=Cs05", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("MongoDB connection error:", err));
// Schemas
const StudentSchema = new mongoose.Schema({
    regNo: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    courses: [{ type: String }]
});
const Student = mongoose.model("Student", StudentSchema);

const CourseSchema = new mongoose.Schema({
    course: { type: String, required: true, unique: true },
    vertical: { type: String, required: true },
    count: { type: Number, default: 0 }
});
const Course = mongoose.model("Course", CourseSchema);

// List of valid register numbers
const validRegisterNumbers = [
    "710023104303",
    "710023104001", 
    "710023104002", 
    "710023104004", 
    "710023104005", 
    "710023104006", 
    "710023104007", 
    "710023104008", 
    "710023104009", 
    "710023104010", 
    "710023104011", 
    "710023104012", 
    "710023104013", 
    "710023104014", 
    "710023104016", 
    "710023104017", 
    "710023104018", 
    "710023104019", 
    "710023104020", 
    "710023104021", 
    "710023104022", 
    "710023104023", 
    "710023104024", 
    "710023104025", 
    "710023104026", 
    "710023104027", 
    "710023104029", 
    "710023104030", 
    "710023104031", 
    "710023104032", 
    "710023104033", 
    "710023104034", 
    "710023104035", 
    "710023104036", 
    "710023104037", 
    "710023104038", 
    "710023104039", 
    "710023104040", 
    "710023104041", 
    "710023104042", 
    "710023104044", 
    "710023104045",
     "710023104046",
      "710023104047",
       "710023104048",
        "710023104049",
         "710023104051", 
         "710023104301", 
         "710023104302", 
         "710023104304", 
         "710023104307", 
         "710023104305", 
         "710023104306", 
         "710023104703", 
         "710023104701",
         "710023104702", 
         "710023104707", 
         "710023104708", 
         "710023104709", 
         "710023104704", 
         "710023104705", 
         "710023104706",
        "710023104000"
];

// Initialize courses in the database
const coursesData = [
    { course: "Exploratory Data Analysis", vertical: "Vertical I", count: 0 },
    { course: "Web Technologies", vertical: "Vertical II", count: 0 },
    { course: "Cloud Computing", vertical: "Vertical III", count: 0 },
    { course: "Ethical Hacking", vertical: "Vertical IV", count: 0 },
    { course: "Augmented Reality/Virtual Reality", vertical: "Vertical V", count: 0 },
    { course: "Robotic Process Automation", vertical: "Vertical VI", count: 0 },
    { course: "Knowledge Engineering", vertical: "Vertical VII", count: 0 },
    { course: "Recommender Systems", vertical: "Vertical I", count: 0 },
    { course: "App Development", vertical: "Vertical II", count: 0 },
    { course: "Virtualization", vertical: "Vertical III", count: 0 },
    { course: "Digital and Mobile Forensics", vertical: "Vertical IV", count: 0 },
    { course: "Multimedia and Animation", vertical: "Vertical V", count: 0 },
    { course: "Neural Networks and Deep Learning", vertical: "Vertical VI", count: 0 },
    { course: "Soft Computing", vertical: "Vertical VII", count: 0 },
    { course: "Neural Networks and Deep Learning (Vertical I)", vertical: "Vertical I", count: 0 },
    { course: "Cloud Services Management", vertical: "Vertical II", count: 0 },
    { course: "Cloud Services Management (Vertical III)", vertical: "Vertical III", count: 0 },
    { course: "Video Creation and Editing", vertical: "Vertical V", count: 0 },
    { course: "Cyber Security", vertical: "Vertical VI", count: 0 },
    { course: "Neural Networks and Deep Learning (Vertical VII)", vertical: "Vertical VII", count: 0 },
    { course: "Text and Speech Analysis", vertical: "Vertical I", count: 0 },
    { course: "UI and UX Design", vertical: "Vertical II", count: 0 },
    { course: "Data Warehousing", vertical: "Vertical III", count: 0 },
    { course: "Modern Cryptography", vertical: "Vertical IV", count: 0 },
    { course: "UI and UX Design (Vertical V)", vertical: "Vertical V", count: 0 },
    { course: "Quantum Computing", vertical: "Vertical VI", count: 0 },
    { course: "Text and Speech Analysis (Vertical VII)", vertical: "Vertical VII", count: 0 },
    { course: "Business Analytics", vertical: "Vertical I", count: 0 },
    { course: "Software Testing and Automation", vertical: "Vertical II", count: 0 },
    { course: "Storage Technologies", vertical: "Vertical III", count: 0 },
    { course: "Software Security", vertical: "Vertical IV", count: 0 },
    { course: "Digital Marketing", vertical: "Vertical V", count: 0 },
    { course: "Cryptocurrency and Blockchain", vertical: "Vertical VI", count: 0 },
    { course: "Optimization Techniques", vertical: "Vertical VII", count: 0 },
    { course: "Image and Video Analytics", vertical: "Vertical I", count: 0 },
    { course: "Web Application Security", vertical: "Vertical II", count: 0 },
    { course: "Software Defined Networks", vertical: "Vertical III", count: 0 },
    { course: "Cryptocurrency and Blockchain (Vertical IV)", vertical: "Vertical IV", count: 0 },
    { course: "Visual Effects", vertical: "Vertical V", count: 0 },
    { course: "Game Development", vertical: "Vertical VI", count: 0 },
    { course: "Game Theory", vertical: "Vertical VII", count: 0 },
    { course: "Computer Vision", vertical: "Vertical I", count: 0 },
    { course: "DevOps", vertical: "Vertical II", count: 0 },
    { course: "Stream Processing", vertical: "Vertical III", count: 0 },
    { course: "Network Security", vertical: "Vertical IV", count: 0 },
    { course: "Game Development (Vertical V)", vertical: "Vertical V", count: 0 },
    { course: "3D Printing and Design", vertical: "Vertical VI", count: 0 },
    { course: "Cognitive Science", vertical: "Vertical VII", count: 0 },
    { course: "Big Data Analytics", vertical: "Vertical I", count: 0 },
    { course: "Principles of Programming Languages", vertical: "Vertical II", count: 0 },
    { course: "Security and Privacy in Cloud", vertical: "Vertical III", count: 0 },
    { course: "Security and Privacy in Cloud (Vertical IV)", vertical: "Vertical IV", count: 0 },
    { course: "Multimedia Data Compression and Storage", vertical: "Vertical V", count: 0 },
    { course: "3D Printing and Design (Vertical VI)", vertical: "Vertical VI", count: 0 },
    { course: "Ethics and AI", vertical: "Vertical VII", count: 0 }
];

// Initialize courses in the database if not already present
Course.insertMany(coursesData, { ordered: false }).catch(err => {
    if (err.code !== 11000) console.error("Error initializing courses:", err);
});

// API Endpoints
app.post("/api/check-student", async (req, res) => {
    const { regNo } = req.body;
    try {
        // Check if regNo is in the valid register numbers list
        if (!validRegisterNumbers.includes(regNo)) {
            return res.status(400).json({ message: "Invalid Register Number. You are not authorized to vote." });
        }

        // Check if student has already voted
        const student = await Student.findOne({ regNo });
        if (student) {
            return res.status(400).json({ message: "This Register Number has already voted." });
        }
        res.status(200).json({ message: "Student can vote." });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
});

app.post("/api/submit-courses", async (req, res) => {
    const { regNo, courses } = req.body;
    try {
        // Verify regNo again to ensure consistency
        if (!validRegisterNumbers.includes(regNo)) {
            return res.status(400).json({ message: "Invalid Register Number. You are not authorized to vote." });
        }

        // Save student data
        const student = new Student({ regNo, dob: new Date(), courses });
        await student.save();

        // Update course counts
        for (const course of courses) {
            await Course.findOneAndUpdate(
                { course: new RegExp(`^${course}( \\(Vertical [IVX]+\\))?$`) },
                { $inc: { count: 1 } },
                { upsert: true }
            );
        }
        res.status(200).json({ message: "Courses submitted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to submit courses." });
    }
});

app.get("/api/dashboard", async (req, res) => {
    try {
        const courses = await Course.find().sort({ count: -1 });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch dashboard data." });
    }
});

app.listen(3000, '0.0.0.0', () => console.log("Server running on http://0.0.0.0:3000"));

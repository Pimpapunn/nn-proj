const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {

    const { name, email, message } = req.body;

    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rais.soc.pim@gmail.com',
                pass: 'ndwmafzqxugvwzae'
            }
        });

        await transporter.sendMail({
            from: 'rais.soc.pim@gmail.com',
            to: 'rais.soc.pim@gmail.com',
            subject: `ติดต่อจาก ${name}`,
            html: `
                <h3>ข้อมูลผู้ติดต่อ</h3>

                <p><b>ชื่อ:</b> ${name}</p>

                <p><b>อีเมล:</b> ${email}</p>

                <p><b>ข้อความ:</b></p>

                <p>${message}</p>
            `
        });

        res.json({
            success: true
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false
        });
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
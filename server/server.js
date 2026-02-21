import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const PORT = 5000;


app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

const otpStore = new Map();

const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';

let transporter = null;
if (EMAIL_USER && EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });
    console.log('✅ Email transporter configured — OTPs will be sent via email');
} else {
    console.log('⚠️  No email credentials found — OTPs will be logged to console');
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}


const authorizedEmails = {
    student: [
        'akashregana143@gmail.com',
    ],
    admin: [
        'akashregana143@gmail.com',

    ],
    superadmin: [
        'akashregana143@gmail.com',
        // Add more superadmin emails below:
    ],
};

// ── POST /api/send-otp ──────────────────────────────────────────────
app.post('/api/send-otp', async (req, res) => {
    const { email, role } = req.body;

    if (!email || !role) {
        return res.status(400).json({ success: false, message: 'Email and role are required' });
    }

    // Check if the email is authorized for this role
    const allowedEmails = authorizedEmails[role] || [];
    if (!allowedEmails.includes(email.toLowerCase())) {
        return res.status(403).json({ success: false, message: 'This email is not authorized. Please contact your administrator.' });
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(email, { otp, role, expiresAt });

    // Clean up expired entries periodically
    setTimeout(() => {
        const entry = otpStore.get(email);
        if (entry && entry.expiresAt <= Date.now()) {
            otpStore.delete(email);
        }
    }, 5 * 60 * 1000);

    console.log(`\n📧 OTP for ${email} (${role}): ${otp}\n`);

    if (transporter) {
        try {
            await transporter.sendMail({
                from: `"GMRIT Events" <${EMAIL_USER}>`,
                to: email,
                subject: 'Your Login OTP — GMRIT Events',
                html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #0f172a; margin: 0 0 8px;">GMRIT<span style="color: #6366f1;">Events</span></h1>
              <p style="color: #64748b; margin: 0;">Login Verification</p>
            </div>
            <div style="background: white; border-radius: 12px; padding: 28px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <p style="color: #334155; font-size: 15px; margin: 0 0 20px;">Your one-time password is:</p>
              <div style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #6366f1; padding: 16px; background: #f1f5f9; border-radius: 10px; display: inline-block;">${otp}</div>
              <p style="color: #94a3b8; font-size: 13px; margin: 20px 0 0;">This code expires in 5 minutes. Do not share it with anyone.</p>
            </div>
          </div>
        `,
            });
            console.log(`   ✉️  Email sent to ${email}`);
        } catch (err) {
            console.error('   ❌ Failed to send email:', err.message);
            // Still return success — OTP is in the console for testing
        }
    }

    res.json({ success: true, message: 'OTP sent successfully' });
});

// ── POST /api/verify-otp ────────────────────────────────────────────
app.post('/api/verify-otp', (req, res) => {
    const { email, otp, role } = req.body;

    if (!email || !otp || !role) {
        return res.status(400).json({ success: false, message: 'Email, OTP, and role are required' });
    }

    const entry = otpStore.get(email);

    if (!entry) {
        return res.status(400).json({ success: false, message: 'No OTP found. Please request a new one.' });
    }

    if (entry.expiresAt < Date.now()) {
        otpStore.delete(email);
        return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
    }

    if (entry.otp !== otp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP. Please try again.' });
    }

    if (entry.role !== role) {
        return res.status(400).json({ success: false, message: 'Role mismatch. Please go back and select the correct role.' });
    }

    // OTP verified — clear it
    otpStore.delete(email);

    const routes = {
        student: '/student/dashboard',
        admin: '/admin',
        superadmin: '/superadmin',
    };

    res.json({
        success: true,
        message: 'OTP verified successfully',
        redirectTo: routes[role] || '/',
    });
});

// ── Start Server ────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 OTP Server running on http://localhost:${PORT}\n`);
});

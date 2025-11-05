# EmailJS Setup Guide

Your contact form is now ready! Follow these steps to complete the setup:

## 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## 2. Set Up Email Service

1. Go to **Email Services** section
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account
5. Copy the **Service ID**

## 3. Create Email Template

1. Go to **Email Templates** section
2. Click **Create New Template**
3. Use this template content:

### Subject:

```
New Contact Form Submission from {{from_name}}
```

### Body:

```
You have a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Service: {{service_type}}

Message:
{{message}}

---
This email was sent from your portfolio website.
```

4. Save the template and copy the **Template ID**

## 4. Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (or API Key)
3. Copy it

## 5. Update Environment Variables

Open `.env.local` file and replace the placeholder values:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

## 6. Restart Development Server

```bash
npm run dev
```

## 7. Test Your Contact Form

1. Fill out the contact form on your website
2. Click "Send Message"
3. Check your email inbox for the message

## Alternative Options

If you prefer other solutions, here are alternatives:

### Option 2: Formspree (https://formspree.io/)

- Simple endpoint-based solution
- Free tier: 50 submissions/month
- No EmailJS library needed

### Option 3: Web3Forms (https://web3forms.com/)

- Free and open source
- Unlimited submissions
- No account required

### Option 4: Your Own Backend API

- Full control
- Use Nodemailer or SendGrid
- Requires backend setup

## Important Notes

⚠️ **Security**: Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser. This is normal for EmailJS.

⚠️ **Rate Limits**: Free EmailJS tier allows 200 emails/month. For higher volume, consider upgrading.

⚠️ **Spam Protection**: Consider adding reCAPTCHA for production use.

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- Contact form issues: Check browser console for errors

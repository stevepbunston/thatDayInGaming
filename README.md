# 🎮 That Day In Gaming - Retro Game Blog

A full-stack retro game blog where each post explores a classic game's release date — complete with top 5 lists of movies, songs, and sports teams from that day. Authenticated users can browse content, while admins can create blog entries dynamically with rich game info, image uploads, and nostalgic pop culture context.

## 🚀 Live Demo

🔗 [Visit That Day In Gaming](https://thatdayingaming.onrender.com)
📹 [Watch the Demo Video](https://youtu.be/YqPq7oAdBag?si=usoyxZ2sOwrVsl7k)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Templating:** EJS
- **Frontend:** HTML, CSS
- **Authentication:** Passport.js with Mailgun email verification
- **Image Uploads:** Cloudinary + Multer
- **Email Service:** Mailgun
- **Rich Text Editor:** TinyMCE
- **Deployment:** Render


---

## ✨ Key Features

- 🕹️ **Dynamic blog posts** about retro games with rich media and metadata
- 🏆 **Top 5 lists** for:
  - Movies
  - Songs
  - NHL, NFL, NBA, MLB teams
- 🧾 **Custom form** to create new blog entries dynamically
- 🔒 **User authentication** with secure login/logout
- 📧 **Email verification** via Mailgun
- 📸 **Image uploads** for articles and media sections
- 🚨 **Error handling** for missing routes and form validation
- 🛠️ **Admin-only controls** for content creation

---

# Database
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_KEY=<your-cloudinary-api-key>
CLOUDINARY_SECRET=<your-cloudinary-api-secret>

# Email (Gmail + Mailgun for verification)
GMAIL_USER=<your-gmail-address>
GMAIL_PASS=<your-gmail-app-password>

# Mailgun config (if applicable)
MAILGUN_API_KEY=<your-mailgun-api-key>
MAILGUN_DOMAIN=<your-mailgun-domain>

# App settings
HOST=thatdayingaming.onrender.com

# TinyMCE (WYSIWYG Editor)
TINY_MCE_API=<your-tinymce-api-key>

---

## 🔧 Next Steps

- Improve mobile responsiveness for smaller screens  
(Currently optimized for desktop browsers)

---

## 🙏 Acknowledgements

- 💡 Inspired by [Colt Steele’s YelpCamp](https://github.com/Colt/YelpCamp) for structure and image upload examples
- ☁️ [Cloudinary](https://cloudinary.com/) – for image hosting and media management
- 📬 [Mailgun](https://www.mailgun.com/) – for email verification and email delivery
- 📝 [TinyMCE](https://www.tiny.cloud/) – for rich text blog editing
- 🧠 [OpenAI ChatGPT](https://openai.com/chatgpt) – for development guidance and troubleshooting help



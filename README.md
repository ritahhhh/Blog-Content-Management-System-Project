# Blog CMS Full Stack Project

Umushinga wubaka sisitemu y'itangazamakuru (CMS) yuzuye ifite API ya Node/Express/MongoDB na Frontend ya React (Vite + Tailwind). Irimo kwinjira, kuyobora inyandiko, dashboard y'abanditsi hamwe n'urubuga rusange.

## Ikoranabuhanga
- **Frontend:** React (Vite), React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB/Mongoose, JWT, bcrypt, Multer

## Ibirimo
- Kwiyandikisha, kwinjira, gusohoka, inzira zikingiwe
- CRUD ku nyandiko, gushakisha no kuyungurura kuri tags
- Uruhare rwa *admin* na *writer*
- Dashboard yoroheje yo gucunga inyandiko
- Urupapuro rw'abasura rwerekana inyandiko n'amakuru arambuye

## Imiterere y'imyubakire
```
backend/
  config/ db.js
  controllers/ authController.js, postController.js
  middleware/ authMiddleware.js
  models/ User.js, Post.js
  routes/ authRoutes.js, postRoutes.js
  uploads/
  server.js
frontend/
  src/
    components/
    context/
    pages/
    services/
    App.jsx, main.jsx
```

## Imyandikire ya .env
### backend/.env
```
PORT=5000
MONGO_URI=mongodb://localhost:27017
MONGO_DB=blog_cms
JWT_SECRET=supersecretkey
```

### frontend/.env
```
VITE_API_URL=http://localhost:5000/api
```

## Uko watangiza
### 1. Backend API
```bash
cd backend
npm install
cp .env.example .env  # hindura indangaciro
npm run dev            # cyangwa npm start
```

### 2. Frontend (Vite)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend izakoresha `VITE_API_URL` kugera kuri API. Menya ko Express irimo gutanga dosiye z'ifoto muri `/uploads`.

## API z'ibanze
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`

Kwiyandikisha by default bitanga *writer*, naho *admin* ifite uburenganzira bwuzuye. Abanditsi bemerewe guhindura no gusiba gusa inyandiko zabo.

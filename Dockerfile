# Gunakan Node.js sebagai image dasar
FROM node:20

# Setel direktori kerja
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin sisa kode aplikasi
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Jalankan aplikasi
CMD ["npm", "start"]

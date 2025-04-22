# Step 1: Install dependencies and build
# FROM node:20-alpine AS builder
FROM ubuntu AS builder

WORKDIR /app

RUN apt update
RUN apt install -y python3 pip nodejs npm
# Install dependencies
COPY package.json package-lock.json* ./
COPY requirements.txt ./
RUN npm install
# RUN python -m pip install -r requirements.txt
# RUN pip3 install --no-cache-dir -r requirements.txt
RUN python3 -m pip install --no-cache-dir --break-system-packages -r requirements.txt

RUN pip3 list

# Copy source files and build
COPY . .
RUN npm run build


# Step 2: Run the app
# FROM node:20-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# # Copy built app and dependencies
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# Copy built app and dependencies
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# Expose port for OpenShift
EXPOSE 8080


# COPY start.sh /app/
# RUN chmod +x /app/start.sh
# CMD ["/app/start.sh"]


COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh
CMD ["bash", "/app/start.sh"]

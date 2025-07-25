# 🚀 Automatic Backend Runner

## For Ubuntu/Linux Terminal:

### Option 1: One-liner (copy and paste this):
```bash
cd backend && chmod +x run.sh && ./run.sh
```

### Option 2: Step by step:
```bash
cd backend
chmod +x run.sh
./run.sh
```

## For Windows PowerShell:

### Option 1: One-liner:
```powershell
cd backend; .\run.ps1
```

### Option 2: Step by step:
```powershell
cd backend
.\run.ps1
```

## For Windows Command Prompt:
```cmd
cd backend
powershell -ExecutionPolicy Bypass -File run.ps1
```

---

## What the script does automatically:

1. ✅ **Checks if Node.js is installed**
2. ✅ **Checks if npm is installed**
3. ✅ **Creates/fixes .env file** with all required variables
4. ✅ **Installs dependencies** if needed
5. ✅ **Checks MongoDB status**
6. ✅ **Starts the server** on http://localhost:5000

---

## If you get permission errors:

### Ubuntu/Linux:
```bash
sudo chmod +x run.sh
./run.sh
```

### Windows:
Right-click on `run.ps1` → "Run with PowerShell"

---

## Manual fallback (if scripts don't work):

```bash
cd backend
npm install
npm run dev
```

---

**The server will start automatically and show you the status of each step!** 🎉 
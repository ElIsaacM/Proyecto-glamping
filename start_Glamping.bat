@echo off
title Sistema Glamping - Lanzador Automatico
set FRONTEND_PATH=C:\Users\Usuario\Desktop\GlampingProject\FrontEnd
set BACKEND_PATH=C:\Users\Usuario\Desktop\GlampingProject\BackEnd
set DOMINIO_FIJO_BACKEND=epilepsy-props-trilogy.ngrok-free.dev

:: --- 1. VERIFICAR NODE.JS Y NGROK ---
:: (Mantenemos tus validaciones intactas)
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [SISTEMA] Node.js no detectado. Instalando...
    winget install -e --id OpenJS.NodeJS.LTS
    pause & exit
)
ngrok -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [SISTEMA] Ngrok no detectado. Instalando...
    winget install -e --id ngrok.ngrok
    pause & exit
)

echo [SISTEMA] Entorno verificado correctamente.
echo [TÚNEL] Limpiando procesos de Ngrok fantasma...
taskkill /f /im ngrok.exe >nul 2>&1

:: --- 2. CREAR CONFIGURACIÓN DINÁMICA MULTI-TÚNEL ---
:: Esto agrupa Back y Front en un solo agente para no violar la regla gratuita
set NGROK_CONF=%TEMP%\ngrok_glamping.yml
echo version: "2" > "%NGROK_CONF%"
echo tunnels: >> "%NGROK_CONF%"
echo   backend: >> "%NGROK_CONF%"
echo     proto: http >> "%NGROK_CONF%"
echo     addr: 3000 >> "%NGROK_CONF%"
echo     domain: %DOMINIO_FIJO_BACKEND% >> "%NGROK_CONF%"
echo   frontend: >> "%NGROK_CONF%"
echo     proto: http >> "%NGROK_CONF%"
echo     addr: 5173 >> "%NGROK_CONF%"

:: --- 3. INICIAR NGROK MAESTRO ---
echo [TÚNEL] Iniciando Ngrok Maestro (Back y Front unificados)...
:: Se carga tu token global y la config temporal
start "Ngrok Maestro" cmd /k "ngrok start --all --config="%LocalAppData%\ngrok\ngrok.yml" --config="%NGROK_CONF%""

echo [SISTEMA] Levantando túneles e iniciando API (8 segundos)...
timeout /t 8 >nul

:: --- 4. CONSUMIR LA API LOCAL DE NGROK (METODOLOGÍA LIMPIA) ---
:: Consultamos localhost:4040/api/tunnels y extraemos solo la URL del frontend
for /f "usebackq tokens=*" %%a in (`powershell -Command "(Invoke-RestMethod -Uri 'http://127.0.0.1:4040/api/tunnels').tunnels | Where-Object { $_.name -eq 'frontend' } | Select-Object -ExpandProperty public_url"`) do (
    set URL_CAPTURADA=%%a
)

if "%URL_CAPTURADA%"=="" (
    echo [ERROR] No se pudo conectar a la API local de Ngrok.
    echo Revisa la ventana de 'Ngrok Maestro' para ver si hay un error de conexión.
    pause & exit
)

echo ======================================================
echo [EXITO] URL Front (Dinamica para empleados): %URL_CAPTURADA%
echo [EXITO] URL Back  (Estatica de glamping): https://%DOMINIO_FIJO_BACKEND%
echo ======================================================

:: --- 5. LANZAR SERVIDORES ---
cd /d "%BACKEND_PATH%"
set NGROK_FRONTEND_URL=%URL_CAPTURADA%
echo [BACKEND] Iniciando API de Node y enviando correos...
start "Node Backend" cmd /k "npm run dev"

cd /d "%FRONTEND_PATH%"
start "Vite Frontend" cmd /k "npm run dev"

timeout /t 5 >nul
exit
# Startup + memory benchmark and a real screenshot of the running app.
# Usage: pwsh bench.ps1 -Exe <path to Menschen.exe> -OutDir <dir>
param([string]$Exe, [string]$OutDir)
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$sw = [Diagnostics.Stopwatch]::StartNew()
$p = Start-Process -FilePath $Exe -PassThru
$ready = $false
while ($sw.Elapsed.TotalSeconds -lt 60) {
  try { $r = Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:47314/index.html' -TimeoutSec 2; if ($r.StatusCode -eq 200) { $ready = $true; break } } catch {}
  Start-Sleep -Milliseconds 50
}
$serverMs = [int]$sw.Elapsed.TotalMilliseconds
Start-Sleep -Seconds 12
Add-Type -AssemblyName System.Windows.Forms, System.Drawing
$b = [System.Windows.Forms.SystemInformation]::VirtualScreen
$bmp = New-Object Drawing.Bitmap $b.Width, $b.Height
$g = [Drawing.Graphics]::FromImage($bmp); $g.CopyFromScreen($b.Location, [Drawing.Point]::Empty, $b.Size)
$bmp.Save((Join-Path $OutDir 'tauri-running.png'))
$procs = Get-Process | Where-Object { $_.Name -in @('Menschen','menschen','msedgewebview2') }
$mb = [math]::Round((($procs | Measure-Object WorkingSet64 -Sum).Sum) / 1MB)
$exeMb = [math]::Round((Get-Item $Exe).Length / 1MB, 1)
"server_ready_ms=$serverMs ready=$ready total_working_set_mb_after_12s=$mb exe_size_mb=$exeMb" | Tee-Object -FilePath (Join-Path $OutDir 'bench.txt')
Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue

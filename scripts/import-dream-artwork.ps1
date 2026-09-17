param(
  [Parameter(Mandatory)][string]$Source,
  [Parameter(Mandatory)][ValidatePattern('^(card-\d{3}|dreamerie-garden)$')][string]$CardId
)

# Encode the complete generated illustration for the browser; no cropping or repainting.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path $PSScriptRoot -Parent
$destination = Join-Path $projectRoot "public/artwork/dreams/$CardId.jpg"
if ($CardId -eq 'dreamerie-garden') { $destination = Join-Path $projectRoot 'public/artwork/dreamerie-garden.jpg' }
New-Item -ItemType Directory -Force (Split-Path $destination -Parent) | Out-Null
if (Test-Path -LiteralPath $destination) { throw "Artwork already exists: $destination" }
$art = [System.Drawing.Image]::FromFile((Resolve-Path -LiteralPath $Source).Path)
try {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
  $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
  try {
    $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]88)
    $art.Save($destination, $codec, $parameters)
  } finally { $parameters.Dispose() }
  [pscustomobject]@{
    id = $CardId
    width = $art.Width
    height = $art.Height
    source = [System.IO.Path]::GetFileName($Source)
    sha256 = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash.ToLowerInvariant()
    bytes = (Get-Item -LiteralPath $destination).Length
  } | ConvertTo-Json -Compress | Set-Content -Encoding UTF8 ([System.IO.Path]::ChangeExtension($destination, 'provenance.json'))
  Write-Output "Imported $CardId ($($art.Width)x$($art.Height))"
} finally { $art.Dispose() }
